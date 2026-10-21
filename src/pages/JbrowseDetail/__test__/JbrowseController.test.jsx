/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import { act, fireEvent, render, screen, wait } from '@testing-library/react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Toaster, toast } from 'sonner';
import { http, graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import JbrowseController from '../JbrowseController';

jest.mock('@apollo/client', () => jest.requireActual('@apollo/client'));
jest.mock('../../../utils/env', () => ({
  __esModule: true,
  default: { REACT_APP_FILE_SERVICE_API: 'http://localhost/files/' },
}));
// Keep adapter/session construction real; replace the external genome renderer.
jest.mock('bento-jbrowse', () => ({
  ...jest.requireActual(
    'bento-jbrowse/lib/components/JBrowseComponent/JBrowseProperties'
  ),
  JBrowseComponent: ({ tracks }) => (
    <section aria-label="Genome viewer">
      {tracks.map(track => (
        <p key={track.trackId}>{track.name}</p>
      ))}
    </section>
  ),
}));

const files = [
  { file_uuid: 'first-bam', file_name: 'first.bam' },
  { file_uuid: 'first-index', file_name: 'first.bam.bai' },
  { file_uuid: 'second-bam', file_name: 'second.bam' },
  { file_uuid: 'second-index', file_name: 'second.bam.bai' },
  { file_uuid: 'variant', file_name: 'sample.vcf.gz' },
  { file_uuid: 'variant-index', file_name: 'sample.vcf.gz.tbi' },
];
const metadata = graphql.query('getFileIdByName', ({ variables }) =>
  HttpResponse.json({
    data: {
      fileIdsFromFileName: files.filter(file =>
        variables.file_name.includes(file.file_name)
      ),
    },
  })
);
const server = setupServer(
  metadata,
  http.get('http://localhost/files/:id', ({ params }) =>
    HttpResponse.text(`https://files.example/${params.id}`)
  )
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const findText = async text => {
  await wait(async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(screen.getByText(text)).toBeTruthy();
  });
};
let client;
let queryClient;
beforeEach(() => {
  localStorage.clear();
  client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost/graphql', fetch }),
    cache: new InMemoryCache(),
  });
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
});
afterEach(() => {
  client.stop();
  queryClient.clear();
  toast.dismiss();
});

const openViewer = (selected = ['first.bam']) => {
  const store = configureStore({
    reducer: (
      state = { jbrowseView: { jbrowseFiles: { filesName: selected } } },
      action
    ) =>
      action.type === 'select'
        ? { jbrowseView: { jbrowseFiles: { filesName: action.payload } } }
        : state,
  });
  const Journey = () => {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <button
          onClick={() =>
            store.dispatch({ type: 'select', payload: ['second.bam'] })
          }
        >
          Select second file
        </button>
        <button onClick={() => setOpen(value => !value)}>
          {open ? 'Close viewer' : 'Open viewer'}
        </button>
        {open && (
          <JbrowseController
            match={{ params: { diplayMode: 'multiFilesView' } }}
          />
        )}
      </>
    );
  };
  return render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={createTheme()}>
            <MemoryRouter>
              <Toaster />
              <Journey />
            </MemoryRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </Provider>
  );
};

it('opens the selected alignment and variant tracks', async () => {
  openViewer(['first.bam', 'sample.vcf.gz']);
  await findText('first.bam');
  expect(screen.getByText('sample.vcf.gz')).toBeTruthy();
});

it.each(['metadata', 'file URL'])(
  'lets the user retry a failed %s request',
  async kind => {
    server.use(
      kind === 'metadata'
        ? graphql.query('getFileIdByName', () =>
            HttpResponse.json({ errors: [{ message: 'Unavailable' }] })
          )
        : http.get(
            'http://localhost/files/first-index',
            () => new HttpResponse(null, { status: 503 })
          )
    );
    openViewer();
    await findText('Unable to load JBrowse files.');
    expect(screen.queryByRole('region', { name: 'Genome viewer' })).toBeNull();

    server.resetHandlers();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await findText('first.bam');
  }
);

it('shows the existing not-found page when no files match', async () => {
  server.use(
    graphql.query('getFileIdByName', () =>
      HttpResponse.json({ data: { fileIdsFromFileName: [] } })
    )
  );
  openViewer();
  await findText('PAGE NOT FOUND');
  expect(screen.queryByRole('region', { name: 'Genome viewer' })).toBeNull();
});

it('can select a file after opening without a selection', async () => {
  openViewer([]);
  await findText('PAGE NOT FOUND');
  fireEvent.click(screen.getByRole('button', { name: 'Select second file' }));
  await findText('second.bam');
});

it('keeps the current selection when earlier file URLs arrive late', async () => {
  let release;
  let started;
  const pending = new Promise(resolve => {
    release = resolve;
  });
  const requestStarted = new Promise(resolve => {
    started = resolve;
  });
  server.use(
    http.get('http://localhost/files/first-bam', async () => {
      started();
      await pending;
      return HttpResponse.text('https://files.example/first-bam');
    })
  );
  openViewer();
  await requestStarted;
  fireEvent.click(screen.getByRole('button', { name: 'Select second file' }));
  await findText('second.bam');
  await act(async () => {
    release();
    await new Promise(resolve => setTimeout(resolve, 20));
  });
  expect(screen.queryByText('first.bam')).toBeNull();
  expect(screen.getByText('second.bam')).toBeTruthy();
});

it('preserves usable tracks when another selected file has no index', async () => {
  server.use(
    graphql.query('getFileIdByName', () =>
      HttpResponse.json({
        data: {
          fileIdsFromFileName: files.filter(file =>
            ['first-bam', 'second-bam', 'second-index'].includes(file.file_uuid)
          ),
        },
      })
    )
  );
  openViewer(['first.bam', 'second.bam']);
  await findText('second.bam');
  expect(screen.queryByText('first.bam')).toBeNull();
});

it('requests usable URLs again when the user reopens the viewer', async () => {
  openViewer();
  await findText('first.bam');
  fireEvent.click(screen.getByRole('button', { name: 'Close viewer' }));
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 10));
  });
  server.use(
    http.get(
      'http://localhost/files/:id',
      () => new HttpResponse(null, { status: 503 })
    )
  );
  fireEvent.click(screen.getByRole('button', { name: 'Open viewer' }));
  await findText('Unable to load JBrowse files.');
  server.resetHandlers();
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  await findText('first.bam');
});

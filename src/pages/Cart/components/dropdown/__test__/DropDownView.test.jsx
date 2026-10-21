/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import { act, fireEvent, render, screen, wait } from '@testing-library/react';
import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { TableContext } from '../../../../../bento-core';
import DropDownView from '../DropDownView';

jest.mock('@apollo/client', () => jest.requireActual('@apollo/client'));
const csv = ids => `file_id\n${ids.join('\n')}`;
const exportUrl = ids =>
  `https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=${encodeURIComponent(`https://interop.example/${encodeURIComponent(csv(ids))}`)}`;
const server = setupServer(
  graphql
    .link('http://localhost/graphql')
    .query('createManifest', ({ variables }) =>
      HttpResponse.json({ data: { createManifest: csv(variables.uuid) } })
    ),
  graphql
    .link('http://localhost/interop')
    .query('storeManifest', ({ variables }) =>
      HttpResponse.json({
        data: {
          storeManifest: `https://interop.example/${encodeURIComponent(variables.manifest)}`,
        },
      })
    )
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

let client;
let downloads;
let destinations;
let blobs;
const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;
beforeEach(() => {
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.split(
      operation => operation.getContext().clientName === 'interopService',
      new HttpLink({ uri: 'http://localhost/interop', fetch }),
      new HttpLink({ uri: 'http://localhost/graphql', fetch })
    ),
  });
  downloads = [];
  destinations = [];
  blobs = new Map();
  URL.createObjectURL = blob => {
    const url = `blob:test-${blobs.size}`;
    blobs.set(url, blob);
    return url;
  };
  URL.revokeObjectURL = () => {};
  jest
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(function () {
      downloads.push({ name: this.download, blob: blobs.get(this.href) });
    });
  jest.spyOn(window, 'open').mockImplementation(url => {
    destinations.push(url);
    return null;
  });
});
afterEach(() => {
  client.stop();
  server.resetHandlers();
  jest.restoreAllMocks();
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
});

const openCart = ({
  allFiles = false,
  initialSelection = ['A'],
  files = ['A', 'B'],
} = {}) => {
  const Cart = () => {
    const [selected, setSelected] = React.useState(initialSelection);
    return (
      <TableContext.Provider
        value={{
          context: { selectedRows: selected, selectedFileIds: selected },
        }}
      >
        <button onClick={() => setSelected(['A'])}>Select A</button>
        <button onClick={() => setSelected(['B'])}>Select B</button>
        <button onClick={() => setSelected([])}>Clear selection</button>
        <DropDownView allFiles={allFiles} filesId={files} />
      </TableContext.Provider>
    );
  };
  render(
    <ApolloProvider client={client}>
      <Cart />
    </ApolloProvider>
  );
};

const flush = async () =>
  act(async () => {
    await new Promise(resolve => setTimeout(resolve, 20));
  });
const choose = label => {
  if (!screen.queryByText('Download File Manifest'))
    fireEvent.click(screen.getByText('Export and Download'));
  fireEvent.click(screen.getByText(label));
};
const download = async ids => {
  await wait(async () => {
    await flush();
    choose('Download File Manifest');
    expect(downloads.length).toBeGreaterThan(0);
    expect(await downloads[downloads.length - 1].blob.text()).toBe(csv(ids));
  });
  expect(downloads[downloads.length - 1].name).toMatch(/\.csv$/);
};
const exportFiles = async ids => {
  await wait(async () => {
    await flush();
    choose('Export to Cancer Genomics Cloud');
    expect(destinations[destinations.length - 1]).toBe(exportUrl(ids));
  });
};
const deferred = () => {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });
  return { promise, resolve };
};

it('downloads and exports the whole cart in all-files mode', async () => {
  openCart({ allFiles: true });
  await download(['A', 'B']);
  await exportFiles(['A', 'B']);
});

it('never downloads or exports the previous selection while a new manifest loads', async () => {
  const pending = deferred();
  server.use(
    graphql.query('createManifest', async ({ variables }) => {
      if (variables.uuid[0] === 'B') await pending.promise;
      return HttpResponse.json({
        data: { createManifest: csv(variables.uuid) },
      });
    })
  );
  openCart();
  await download(['A']);
  await exportFiles(['A']);
  fireEvent.click(screen.getByText('Select B'));
  await flush();
  downloads.length = 0;
  destinations.length = 0;
  choose('Download File Manifest');
  choose('Export to Cancer Genomics Cloud');
  expect(downloads).toHaveLength(0);
  expect(destinations).toHaveLength(0);

  pending.resolve();
  await download(['B']);
  await exportFiles(['B']);
  fireEvent.click(screen.getByText('Select A'));
  await download(['A']);
  await exportFiles(['A']);
});

it('does not reuse the previous export URL while the current URL is being prepared', async () => {
  const pending = deferred();
  server.use(
    graphql.query('storeManifest', async ({ variables }) => {
      if (variables.manifest === csv(['B'])) await pending.promise;
      return HttpResponse.json({
        data: {
          storeManifest: `https://interop.example/${encodeURIComponent(variables.manifest)}`,
        },
      });
    })
  );
  openCart();
  await exportFiles(['A']);
  fireEvent.click(screen.getByText('Select B'));
  await download(['B']);
  destinations.length = 0;
  choose('Export to Cancer Genomics Cloud');
  expect(destinations).toHaveLength(0);
  pending.resolve();
  await exportFiles(['B']);
});

it('does not use the previous manifest after the new selection fails to load', async () => {
  openCart();
  await download(['A']);
  server.use(
    graphql.query('createManifest', () =>
      HttpResponse.json({ errors: [{ message: 'Unavailable' }] })
    )
  );
  fireEvent.click(screen.getByText('Select B'));
  await flush();
  downloads.length = 0;
  destinations.length = 0;
  choose('Download File Manifest');
  choose('Export to Cancer Genomics Cloud');
  expect(downloads).toHaveLength(0);
  expect(destinations).toHaveLength(0);
});

it.each([
  { allFiles: true, files: [] },
  { allFiles: false, initialSelection: [] },
])('cannot download or export without eligible files', async options => {
  openCart(options);
  await flush();
  choose('Download File Manifest');
  choose('Export to Cancer Genomics Cloud');
  expect(downloads).toHaveLength(0);
  expect(destinations).toHaveLength(0);
});

it('cannot download or export a previous manifest after clearing selection', async () => {
  openCart();
  await download(['A']);
  await exportFiles(['A']);
  fireEvent.click(screen.getByText('Clear selection'));
  await flush();
  downloads.length = 0;
  destinations.length = 0;
  choose('Download File Manifest');
  choose('Export to Cancer Genomics Cloud');
  expect(downloads).toHaveLength(0);
  expect(destinations).toHaveLength(0);
});

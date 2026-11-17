/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  wait,
  within,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Link } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Footer from '../FooterView';
import SysInfo from '../../../pages/sysinfo/sysInfo';
import env from '../../../utils/env';

jest.mock(
  '../FooterThemConfig',
  () =>
    function Theme({ children }) {
      return <>{children}</>;
    }
);
jest.mock(
  '@bento-core/footer/node_modules/react-markdown',
  () =>
    function Markdown({ children }) {
      return <>{children}</>;
    }
);

jest.mock('../../../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_FILE_SERVICE_VERSION: 'http://localhost/fs/version',
    REACT_APP_BACKEND_VERSION: 'http://localhost/be/version',
    REACT_APP_INTEROP_SERVICE_VERSION: 'http://localhost/interop/version',
    REACT_APP_FE_VERSION: 'frontend-test',
    REACT_APP_BE_VERSION: 'backend-fallback',
  },
}));
// Avoid the unrelated privacy document request triggered when importing configuration.
jest.mock('../../../bento/globalFooterData', () => ({
  __esModule: true,
  default: {
    footerLogoText: 'National Cancer Institute',
    link_sections: [
      {
        title: 'Contact Information',
        items: [{ text: 'ICDC Help Desk', link: '/support' }],
      },
      { title: 'More Information', items: [] },
      {
        title: 'System Info',
        systemInfoInLinkSection: true,
        items: [
          { text: 'Release Notes', link: 'https://example.com/releases' },
          { text: 'FE Version: frontend-test' },
          { text: 'BE Version: backend-fallback' },
          { text: 'System Info Page', link: '/sysinfo' },
        ],
      },
    ],
    global_footer_links: [],
  },
}));

jest.mock('../../../bento-core', () => ({
  ...jest.requireActual('../../../bento-core'),
  Footer: jest.requireActual('@bento-core/footer').Footer,
  TableContext: jest.requireActual('react').createContext({ context: {} }),
  // Keep version rows visible without coupling these tests to table pagination.
  TableView: ({ tblRows }) => (
    <table>
      <tbody>
        {tblRows.map(row => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.currentVersion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

const server = setupServer(
  http.get('http://localhost/be/version', () =>
    HttpResponse.json({ version: 'backend-live' })
  ),
  http.get('http://localhost/fs/version', () =>
    HttpResponse.json({ version: 'files-live' })
  ),
  http.get('http://localhost/interop/version', () =>
    HttpResponse.json({ version: 'interop-live' })
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
beforeEach(() => {
  client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
});
afterEach(() => client.clear());

const openPage = (path = '/') => {
  window.location.hash = path;
  return render(
    <QueryClientProvider client={client}>
      <HashRouter>
        <Link to="/">Home</Link>
        <Link to="/jBrowse/example">Genome browser</Link>
        <Route exact path="/" component={Footer} />
        <Route path="/sysinfo" component={SysInfo} />
        <Route path="/jBrowse/example" component={Footer} />
      </HashRouter>
    </QueryClientProvider>
  );
};

it('shows versions and keeps them available on System Info and returning home', async () => {
  openPage();
  await findText('BE Version: backend-live');
  await findText('FS Version: files-live');
  expect(screen.getByRole('link', { name: 'ICDC Help Desk' })).toBeTruthy();

  server.use(
    http.get(
      'http://localhost/be/version',
      () => new HttpResponse(null, { status: 503 })
    ),
    http.get(
      'http://localhost/fs/version',
      () => new HttpResponse(null, { status: 503 })
    )
  );
  fireEvent.click(screen.getByRole('link', { name: 'System Info Page' }));
  await findText('ICDC Systems Info');
  expect(
    within(screen.getByRole('row', { name: 'Backend backend-live' })).getByText(
      'backend-live'
    )
  ).toBeTruthy();
  expect(screen.getByRole('row', { name: 'File files-live' })).toBeTruthy();
  await findText('interop-live');

  fireEvent.click(screen.getByRole('link', { name: 'Home' }));
  await findText('FS Version: files-live');
  expect(screen.getAllByText('FS Version: files-live')).toHaveLength(1);
  expect(screen.getAllByText('BE Version: backend-live')).toHaveLength(1);
});

it('keeps links and the file-service version available when the backend fails', async () => {
  server.use(
    http.get(
      'http://localhost/be/version',
      () => new HttpResponse(null, { status: 503 })
    )
  );
  openPage();
  await findText('FS Version: files-live');
  expect(screen.getByText('BE Version: backend-fallback')).toBeTruthy();
  expect(screen.getByRole('link', { name: 'ICDC Help Desk' })).toBeTruthy();
});

it('keeps the backend version available when the file service fails', async () => {
  server.use(
    http.get(
      'http://localhost/fs/version',
      () => new HttpResponse(null, { status: 503 })
    )
  );
  openPage();
  await findText('BE Version: backend-live');
  expect(screen.getByRole('link', { name: 'System Info Page' })).toBeTruthy();
});

it('keeps the footer usable when a version endpoint is not configured', async () => {
  const endpoint = env.REACT_APP_BACKEND_VERSION;
  env.REACT_APP_BACKEND_VERSION = '';
  try {
    openPage();
    await findText('FS Version: files-live');
    expect(screen.getByText('BE Version: backend-fallback')).toBeTruthy();
  } finally {
    env.REACT_APP_BACKEND_VERSION = endpoint;
  }
});

it('hides the footer in the genome browser', () => {
  openPage('/jBrowse/example');
  expect(screen.queryByText('System Info Page')).toBeNull();
  expect(screen.queryByText('National Cancer Institute')).toBeNull();
});

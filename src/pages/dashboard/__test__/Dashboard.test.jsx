/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import { isInaccessible } from '@testing-library/dom';
import {
  act,
  render,
  screen,
  fireEvent,
  within,
  wait,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Toaster, toast } from 'sonner';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  sideBarReducerGenerator,
  LocalFindReducerGenerator,
  cartReducerGenerator,
} from '../../../bento-core';
import { dashboardReducer } from '../store/Reducers';
import DashboardController from '../DashboardController';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { graphql, HttpResponse } from 'msw';
import { parse } from 'graphql';
import { server, endpoint } from './mocks/server';
import { DASHBOARD_QUERY } from '../../../bento/dashboardTabData';

jest.mock('../../../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'http://localhost/graphql',
    REACT_APP_INTEROP_SERVICE_URL: 'http://localhost/interop',
  },
}));
jest.setTimeout(30000);

jest.mock('@apollo/client', () => jest.requireActual('@apollo/client'));
jest.mock('../../../bento-core', () =>
  jest.requireActual('../../../bento-core')
);
jest.mock('@bento-core/paginated-table', () =>
  jest.requireActual('@bento-core/paginated-table')
);
jest.mock('@bento-core/local-find', () =>
  jest.requireActual('@bento-core/local-find')
);
// Charts are outside these filtering journeys; filters, chips, counts and tables are real.
jest.mock('../widget/WidgetView', () => () => null);
jest.mock('../../../store', () => ({
  __esModule: true,
  default: { dispatch: action => mockStore.dispatch(action) },
}));

let mockStore;
let client;
const cases = [
  {
    case_id: 'CASE-BEAGLE',
    breed: 'Beagle',
    sex: 'Male',
    other_cases: [],
    study_code: 'STUDY',
    files: 0,
  },
  {
    case_id: 'CASE-POODLE',
    breed: 'Poodle',
    sex: 'Female',
    other_cases: [],
    study_code: 'STUDY',
    files: 0,
  },
];
const samples = cases.map(row => ({
  ...row,
  sample_id: row.case_id.replace('CASE-', 'SAMPLE-'),
}));
const files = cases.flatMap(row =>
  ['case', 'study'].map(level => ({
    ...row,
    file_uuid: `${level}-${row.case_id}`,
    file_name: `${level}-${row.breed.toLowerCase()}.txt`,
    file_level: level,
    file_size: 100,
    file_format: 'txt',
    file_type: 'Clinical',
    association: level,
  }))
);
const dashboardFields =
  DASHBOARD_QUERY.definitions[0].selectionSet.selections.find(
    field =>
      field.alias?.value === 'dashboard' || field.name.value === 'dashboard'
  ).selectionSet.selections;
const respond = ({ variables, query }, caseRows = cases) => {
  const selected = variables.breed || [];
  const rows = caseRows.filter(
    row =>
      (!selected.length || selected.includes(row.breed)) &&
      (!variables.sex?.length || variables.sex.includes(row.sex)) &&
      (!variables.search_text ||
        row.case_id.includes(variables.search_text.toUpperCase())) &&
      (!variables.case_ids?.length || variables.case_ids.includes(row.case_id))
  );
  const matchingSamples = samples.filter(row =>
    rows.some(item => item.case_id === row.case_id)
  );
  const matchingFiles = files.filter(row =>
    rows.some(item => item.case_id === row.case_id)
  );
  const counts = {
    numberOfCases: rows.length,
    numberOfSamples: matchingSamples.length,
    numberOfFiles: matchingFiles.length,
    numberOfStudyFiles: matchingFiles.filter(row => row.file_level === 'study')
      .length,
  };
  const dashboard = Object.fromEntries(
    dashboardFields.map(field => [
      field.name.value,
      field.selectionSet ? [] : 0,
    ])
  );
  Object.assign(dashboard, counts, {
    filterCaseCountByBreed: cases.map(row => ({ group: row.breed, count: 1 })),
    filterCaseCountBySex: cases.map(row => ({ group: row.sex, count: 1 })),
  });
  const data = {
    dashboard,
    searchTextResults: {
      ...counts,
      caseIds: rows.map(row => row.case_id),
      sampleIds: matchingSamples.map(row => row.sample_id),
      fileIds: matchingFiles
        .filter(row => row.file_level === 'case')
        .map(row => row.file_uuid),
      studyFileIds: matchingFiles
        .filter(row => row.file_level === 'study')
        .map(row => row.file_uuid),
    },
    biospecimen_source: [],
    program: [],
    caseOverview: [...rows]
      .sort((a, b) => {
        const field = variables.order_by || 'case_id';
        const direction =
          variables.sort_direction?.toLowerCase() === 'desc' ? -1 : 1;
        return String(a[field]).localeCompare(String(b[field])) * direction;
      })
      .slice(
        variables.offset || 0,
        (variables.offset || 0) + (variables.first || rows.length)
      ),
    sampleOverview: matchingSamples.filter(
      row =>
        !variables.sample_ids?.length ||
        variables.sample_ids.includes(row.sample_id)
    ),
    fileOverview: matchingFiles.filter(
      row =>
        (!variables.file_level?.length ||
          variables.file_level.includes(row.file_level)) &&
        (!variables.file_uuids?.length ||
          variables.file_uuids.includes(row.file_uuid))
    ),
  };
  const project = (selectionSet, source) =>
    Object.fromEntries(
      selectionSet.selections.map(field => {
        const key = field.alias?.value || field.name.value;
        const value = source[key] ?? null;
        return [
          key,
          field.selectionSet && value
            ? Array.isArray(value)
              ? value.map(item => project(field.selectionSet, item))
              : project(field.selectionSet, value)
            : value,
        ];
      })
    );
  return { data: project(parse(query).definitions[0].selectionSet, data) };
};
beforeEach(() => {
  // This jsdom version has no pseudo-element styles; accessible-name queries request them.
  const getComputedStyle = window.getComputedStyle;
  jest
    .spyOn(window, 'getComputedStyle')
    .mockImplementation(element => getComputedStyle(element));
  mockStore = configureStore({
    reducer: {
      ...sideBarReducerGenerator(),
      ...LocalFindReducerGenerator(),
      ...cartReducerGenerator(),
      dashboardReducer,
      jbrowseView: (state = {}) => state,
    },
    middleware: getDefault =>
      getDefault({ serializableCheck: false, immutableCheck: false }),
  });
  server.use(
    graphql
      .link(endpoint)
      .operation(request => HttpResponse.json(respond(request)))
  );
  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: endpoint }),
  });
});
afterEach(() => {
  client.stop();
  toast.dismiss();
  jest.restoreAllMocks();
});
const openDashboard = () => {
  const history = createMemoryHistory({ initialEntries: ['/explore'] });
  render(
    <Provider store={mockStore}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <ThemeProvider theme={createTheme()}>
            <Toaster />
            <Route
              path="/explore/:filterQuery?"
              component={DashboardController}
            />
          </ThemeProvider>
        </Router>
      </ApolloProvider>
    </Provider>
  );
  return history;
};

// Tabs keep inactive tables mounted with the HTML hidden attribute.
// Avoid expensive jsdom style calculations when choosing the visible controls.
const visibleTableControl = role =>
  screen
    .queryAllByRole(role, { hidden: true })
    .find(element => !element.closest('[hidden]'));

// Control response order at the network boundary, without timers or client spies.
const deferred = () => {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });
  return { promise, resolve };
};

it('shows the available cases once loading completes', async () => {
  const response = deferred();
  server.use(
    graphql.link(endpoint).query('dashboardSearchQuery', async request => {
      await response.promise;
      return HttpResponse.json(respond(request));
    })
  );
  openDashboard();
  expect(screen.queryByText('CASE-BEAGLE')).toBeNull();
  expect(screen.queryByText('CASE-POODLE')).toBeNull();
  response.resolve();
  await screen.findByText('CASE-BEAGLE');
  await screen.findByText('CASE-POODLE');
});

it('keeps retry available when users wait before recovering from a failed load', async () => {
  server.use(
    graphql
      .link(endpoint)
      .query('dashboardSearchQuery', () => HttpResponse.error(), { once: true })
  );
  await act(async () => {
    openDashboard();
  });
  await screen.findByText('Unable to load dashboard data.');
  // Wait beyond the toast's normal four-second lifetime before trying again.
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
  });
  expect(screen.queryByText('CASE-BEAGLE')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
  await screen.findByText('CASE-BEAGLE');
  await screen.findByText('CASE-POODLE');
});

it('keeps the newly opened saved search visible when an older response arrives later', async () => {
  const oldRequestStarted = deferred();
  const oldResponse = deferred();
  const oldResponseReady = deferred();
  server.use(
    graphql.link(endpoint).query('dashboardSearchQuery', async request => {
      if (request.variables.breed?.includes('Beagle')) {
        oldRequestStarted.resolve();
        await oldResponse.promise;
        const response = HttpResponse.json(respond(request));
        oldResponseReady.resolve();
        return response;
      }
      return HttpResponse.json(respond(request));
    })
  );
  const history = openDashboard();
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await oldRequestStarted.promise;
  try {
    // Opening a saved-query URL is a browser action, available even while results load.
    act(() =>
      history.push(
        '/explore/' + encodeURIComponent(JSON.stringify({ breed: ['Poodle'] }))
      )
    );
    await screen.findByText('CASE-POODLE');
    await act(async () => {
      oldResponse.resolve();
      await oldResponseReady.promise;
    });
    expect(screen.getByText('CASE-POODLE')).toBeTruthy();
    expect(screen.queryByText('CASE-BEAGLE')).toBeNull();
  } finally {
    oldResponse.resolve();
  }
});

it('lets users filter cases and restore all cases by removing the filter', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  await screen.findByText('CASE-POODLE');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await screen.findByText('CASE-BEAGLE');
  expect(screen.queryByText('CASE-POODLE')).toBeNull();
  fireEvent.click(screen.getByText('Beagle', { selector: 'span' }));
  await screen.findByText('CASE-POODLE');
  expect(screen.getByText('CASE-BEAGLE')).toBeTruthy();
});

it('restores an earlier search result when both searches have the same count', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  for (const [search, matchingCase, excludedCase] of [
    ['BEAGLE', 'CASE-BEAGLE', 'CASE-POODLE'],
    ['POODLE', 'CASE-POODLE', 'CASE-BEAGLE'],
    ['BEAGLE', 'CASE-BEAGLE', 'CASE-POODLE'],
  ]) {
    const searchInput = screen.getByRole('textbox', { name: '' });
    fireEvent.change(searchInput, { target: { value: search } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    await screen.findByText(matchingCase);
    expect(screen.queryByText(excludedCase)).toBeNull();
    expect(
      screen.queryByRole('tab', { hidden: true, name: /Cases.*\(1\)/ })
    ).toBeTruthy();
  }
});

it('clears multiple filters and restores all cases', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(screen.getByText('Sex', { selector: 'div' }));
  fireEvent.click(screen.getByText('Male', { selector: '[role=button] p' }));
  await screen.findByText('Male', { selector: 'span' });
  expect(screen.getByText('Beagle', { selector: 'span' })).toBeTruthy();
  expect(screen.queryByText('CASE-POODLE')).toBeNull();
  fireEvent.click(screen.getByText('CLEAR ALL'));
  await screen.findByText('CASE-POODLE');
  expect(screen.getByText('CASE-BEAGLE')).toBeTruthy();
  expect(screen.queryByText('Male', { selector: 'span' })).toBeNull();
  expect(screen.queryByText('Beagle', { selector: 'span' })).toBeNull();
});

it('keeps search results when users move across dashboard tabs', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  const input = screen.getByRole('textbox', { name: '' });
  fireEvent.change(input, { target: { value: 'BEAGLE' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  await screen.findByText('CASE-BEAGLE');
  for (const [tab, matching, excluded] of [
    [/Samples.*\(1\)/, 'SAMPLE-BEAGLE', 'SAMPLE-POODLE'],
    [/Case Files.*\(1\)/, 'case-beagle.txt', 'case-poodle.txt'],
    [/Study Files.*\(1\)/, 'study-beagle.txt', 'study-poodle.txt'],
    [/Cases.*\(1\)/, 'CASE-BEAGLE', 'CASE-POODLE'],
  ]) {
    await wait(() =>
      expect(
        screen.queryByRole('tab', { hidden: true, name: tab })
      ).toBeTruthy()
    );
    fireEvent.click(screen.queryByRole('tab', { hidden: true, name: tab }));
    await wait(() =>
      expect(
        within(visibleTableControl('table')).queryByText(matching)
      ).toBeTruthy()
    );
    const table = within(visibleTableControl('table'));
    expect(table.queryByText(excluded)).toBeNull();
    expect(screen.getByRole('textbox', { name: '' }).value).toBe('BEAGLE');
  }
}, 45000);

it('lets users recover from no matching results by clearing their search', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  const input = screen.getByRole('textbox', { name: '' });
  fireEvent.change(input, { target: { value: 'UNMATCHED' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  await wait(() =>
    expect(
      screen.queryByRole('tab', { hidden: true, name: /Cases.*\(0\)/ })
    ).toBeTruthy()
  );
  await wait(() =>
    expect(
      screen
        .queryAllByText('No Matching Records Found')
        .some(element => !element.closest('[hidden]'))
    ).toBe(true)
  );
  const emptySearchInput = screen.getByRole('textbox', { name: '' });
  fireEvent.change(emptySearchInput, { target: { value: '' } });
  fireEvent.keyDown(emptySearchInput, { key: 'Enter', code: 'Enter' });
  await screen.findByText('CASE-BEAGLE');
  await screen.findByText('CASE-POODLE');
  expect(
    screen.queryByRole('tab', { hidden: true, name: /Cases.*\(2\)/ })
  ).toBeTruthy();
});

it('lets users change an expanded filter while its previous results are still loading', async () => {
  const started = deferred();
  const response = deferred();
  const finished = deferred();
  server.use(
    graphql.link(endpoint).query('dashboardSearchQuery', async request => {
      if (
        request.variables.breed?.length === 1 &&
        request.variables.breed[0] === 'Beagle'
      ) {
        started.resolve();
        await response.promise;
        finished.resolve();
      }
      return HttpResponse.json(respond(request));
    })
  );
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await started.promise;
  try {
    // Select another breed without reopening the facet or waiting for the first response.
    expect(
      isInaccessible(
        screen.getByText('Poodle', { selector: '[role=button] p' })
      )
    ).toBe(false);
    fireEvent.click(
      screen.getByText('Poodle', { selector: '[role=button] p' })
    );
    await screen.findByText('CASE-POODLE');
    expect(screen.getByText('CASE-BEAGLE')).toBeTruthy();
    await act(async () => {
      response.resolve();
      await finished.promise;
    });
    expect(
      isInaccessible(
        screen.getByText('Poodle', { selector: '[role=button] p' })
      )
    ).toBe(false);
    expect(screen.getByText('CASE-POODLE')).toBeTruthy();
  } finally {
    response.resolve();
  }
});

it('keeps filters available after a failed search and restores the submitted search on retry', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  server.use(
    graphql
      .link(endpoint)
      .query('dashboardSearchQuery', () => HttpResponse.error(), { once: true })
  );
  const input = screen.getByRole('textbox', { name: '' });
  fireEvent.change(input, { target: { value: 'BEAGLE' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  await screen.findByText('Unable to load dashboard data.');
  expect(
    isInaccessible(screen.getByText('Poodle', { selector: '[role=button] p' }))
  ).toBe(false);
  fireEvent.click(screen.getByText('Retry', { selector: 'button' }));
  await screen.findByText('CASE-BEAGLE');
  expect(screen.queryByText('CASE-POODLE')).toBeNull();
  expect(screen.getByRole('textbox', { name: '' }).value).toBe('BEAGLE');
  expect(
    isInaccessible(screen.getByText('Poodle', { selector: '[role=button] p' }))
  ).toBe(false);
});

it('preserves page size and sorting but starts on page one after filtering', async () => {
  const manyCases = Array.from({ length: 60 }, (_, index) => ({
    ...cases[index % 2],
    case_id: `CASE-${String(index).padStart(3, '0')}`,
  }));
  server.use(
    graphql
      .link(endpoint)
      .operation(request => HttpResponse.json(respond(request, manyCases)))
  );
  openDashboard();
  await screen.findByText('CASE-000');
  const table = within(visibleTableControl('table'));
  fireEvent.click(table.getByText('Case ID'));
  await screen.findByText('CASE-059');
  const pageSize = screen
    .getAllByLabelText('checkbox', { selector: '[role=button]' })
    .find(element => !element.closest('[hidden]'));
  fireEvent.mouseDown(pageSize);
  fireEvent.click(screen.getByRole('option', { name: '25' }));
  await screen.findByText('CASE-035');
  fireEvent.click(
    screen
      .getAllByTitle('Next page')
      .find(element => !element.closest('[hidden]'))
  );
  await screen.findByText('CASE-034');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await screen.findByText('CASE-058');
  expect(
    screen
      .getAllByLabelText('checkbox', { selector: '[role=button]' })
      .find(element => !element.closest('[hidden]')).textContent
  ).toContain('25');
  expect(screen.getAllByText('1-25 of 30').length).toBeGreaterThan(0);
  expect(
    within(visibleTableControl('table')).getAllByRole('row')[1].textContent
  ).toContain('CASE-058');
  expect(
    within(visibleTableControl('table')).getAllByRole('row')[2].textContent
  ).toContain('CASE-056');
  // Return to cached results and filter from their second page as well.
  fireEvent.click(screen.getByText('Beagle', { selector: 'span' }));
  await screen.findByText('CASE-059');
  fireEvent.click(
    screen
      .getAllByTitle('Next page')
      .find(element => !element.closest('[hidden]'))
  );
  await screen.findByText('CASE-034');
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await screen.findByText('CASE-058');
  expect(screen.getAllByText('1-25 of 30').length).toBeGreaterThan(0);
  expect(
    within(visibleTableControl('table')).getAllByRole('row')[1].textContent
  ).toContain('CASE-058');
});

it('keeps a hidden column hidden after filtering and returning to cached results', async () => {
  openDashboard();
  await screen.findByText('CASE-BEAGLE');
  fireEvent.click(
    screen
      .getAllByTitle('View Columns')
      .find(element => !element.closest('[hidden]'))
  );
  const columnMenu = within(screen.getByText('View Columns').parentElement);
  fireEvent.click(
    within(columnMenu.getByText('Breed').closest('li')).getByRole('checkbox')
  );
  fireEvent.keyDown(screen.getByText('View Columns'), {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
  });
  expect(within(visibleTableControl('table')).queryByText('Breed')).toBeNull();
  fireEvent.click(screen.getByText('Breed', { selector: 'div' }));
  fireEvent.click(screen.getByText('Beagle', { selector: '[role=button] p' }));
  await screen.findByText('CASE-BEAGLE');
  expect(within(visibleTableControl('table')).queryByText('Breed')).toBeNull();
  fireEvent.click(screen.getByText('Beagle', { selector: 'span' }));
  await screen.findByText('CASE-POODLE');
  expect(within(visibleTableControl('table')).queryByText('Breed')).toBeNull();
});

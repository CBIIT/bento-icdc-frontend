# Dashboard tests

The dashboard tests use Mock Service Worker, or MSW, to mock GraphQL responses. They render the dashboard with real Redux reducers, Apollo caching, filters, query-bar chips, tables, routing, and toast notifications.

Apollo sends requests through `HttpLink`. MSW intercepts them and returns test data, so the tests need no running backend. Jest uses `setupServer` from `msw/node`. It does not install a browser service worker or start an HTTP server.

## Run the tests

From the repository root:

```sh
npm test -- --runInBand --coverage=false src/pages/dashboard/__test__
```

To run the regression test for returning to an earlier search with the same result count:

```sh
npm test -- --runInBand --coverage=false src/pages/dashboard/__test__/Dashboard.test.jsx -t 'restores an earlier search'
```

## Files and setup

| File                                                             | Purpose                                                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Dashboard.test.jsx](./Dashboard.test.jsx)                       | Renders the dashboard, defines test data and request handlers, and tests user behavior. |
| [mocks/server.js](./mocks/server.js)                             | Starts MSW, resets handlers between tests, and stops interception after the suite.      |
| [test/msw-environment.cjs](../../../../test/msw-environment.cjs) | Supplies Node's Fetch API, streams, and related globals inside jsdom.                   |
| [package.json](../../../../package.json)                         | Declares MSW and the Jest transforms for its ES-module dependencies.                    |

The test file selects the custom environment with this leading comment:

```js
/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
```

The export conditions let Jest resolve `msw/node`. The custom environment keeps jsdom's DOM and supplies Node's Fetch API implementations. This setup was verified with Node 20.19.0. Jest transforms `rettime`, `until-async`, and `@open-draft/deferred-promise` to CommonJS because they ship ES modules.

## Request handling and cleanup

Importing `mocks/server.js` registers hooks that start interception before the suite, reset handler overrides after each test, and stop interception after the suite. MSW treats requests without a matching handler as errors because the server uses `onUnhandledRequest: 'error'`.

Each test gets a fresh Redux store and Apollo client with its own cache. Cleanup stops the client, dismisses toasts, and restores environment spies.

The default GraphQL handler targets `http://localhost/graphql`. Its test data contains two cases with samples, case files, and study files. The handler filters results using request variables and returns the fields requested by each operation. It handles both dashboard summaries and table requests.

The shared application test setup mocks many UI components. This suite restores the real Apollo and Bento modules it needs. It excludes charts and routes calls through the application store singleton to the test's Redux store. A `getComputedStyle` shim handles jsdom's lack of pseudo-element styling.

## Add a scenario

Change the API response, then interact with the rendered dashboard. For example, this override fails the next dashboard request:

```js
server.use(
  graphql
    .link(endpoint)
    .query('dashboardSearchQuery', () => HttpResponse.error(), { once: true })
);
```

MSW uses this override before the default handler. After the failed request, the default handler responds when the user clicks Retry. Use `HttpResponse.json({ errors: [{ message: 'Unavailable' }] })` to simulate a GraphQL error response instead of a network failure.

To test responses arriving out of order, use the suite's deferred promises to hold and release a response. Avoid arbitrary sleeps. Release held responses in cleanup if the test can fail before it reaches the release step.

Assert on user behavior. Check displayed rows and counts, click filter chips and Retry, enter searches, or open a saved-query URL. Do not assert on hook usage, Redux actions, component props, query-variable construction, cache internals, or request counts. An MSW handler can read request variables to model the API. Assertions about those variables would test implementation details.

## Current coverage

The tests cover:

- Loading results and retrying a failed load.
- Keeping a newly opened saved search when an older response finishes.
- Removing a breed filter and clearing multiple filters.
- Returning to an earlier search with the same result count, without showing stale table rows.
- Keeping search results across all four tabs and clearing a search after no matches.
- Changing an expanded filter while a previous request is pending.
- Keeping filters and the submitted search through an error and retry.
- Keeping page size, sorting, and visible columns after filtering and returning to cached results. A changed filter returns the table to page one.

The table preference tests use the real controls and check displayed row order, pagination labels, and column headers. The request handler sorts and paginates the test data. The tests do not assert on skeleton appearance or structure.

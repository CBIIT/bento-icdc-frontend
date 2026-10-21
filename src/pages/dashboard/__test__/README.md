# Dashboard tests

The dashboard tests use Mock Service Worker, or MSW, to mock GraphQL responses. They render the dashboard with real Redux reducers, Apollo caching, filters, query-bar chips, tables, routing, and toast notifications.

See the [shared MSW testing guide](../../../../test/README.md) for the Jest environment, server lifecycle, client cleanup, and assertion guidelines. This page covers the dashboard fixtures and scenarios.

## Run the tests

From the repository root:

```sh
npm test -- --runInBand --coverage=false src/pages/dashboard/__test__
```

To run the regression test for returning to an earlier search with the same result count:

```sh
npm test -- --runInBand --coverage=false src/pages/dashboard/__test__/Dashboard.test.jsx -t 'restores an earlier search'
```

## Dashboard setup

| File                                                             | Purpose                                                                                 |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Dashboard.test.jsx](./Dashboard.test.jsx)                       | Renders the dashboard, defines test data and request handlers, and tests user behavior. |
| [mocks/server.js](./mocks/server.js)                             | Starts MSW, resets handlers between tests, and stops interception after the suite.      |
| [test/msw-environment.cjs](../../../../test/msw-environment.cjs) | Supplies Node's Fetch API, streams, and related globals inside jsdom.                   |
| [package.json](../../../../package.json)                         | Declares MSW and the Jest transforms for its ES-module dependencies.                    |

Importing `mocks/server.js` starts interception before the suite, resets handlers after each test, and stops interception after the suite. Requests without a matching handler fail.

Each test gets a fresh Redux store and Apollo client with its own cache. Cleanup stops the client, dismisses toasts, and restores environment spies.

The default GraphQL handler targets `http://localhost/graphql`. Its test data contains two cases with samples, case files, and study files. The handler filters results using request variables and returns the fields requested by each operation. It handles both dashboard summaries and table requests.

The shared test setup mocks many UI components. This suite restores the real Apollo and Bento modules it needs and leaves charts mocked. Calls to the application's shared store use the test's Redux store. A `getComputedStyle` shim handles jsdom's lack of pseudo-element styling.

## Add a scenario

Change the API response, then interact with the rendered dashboard. For example, this override fails the next dashboard request:

```js
server.use(
  graphql
    .link(endpoint)
    .query('dashboardSearchQuery', () => HttpResponse.error(), { once: true })
);
```

MSW uses this override before the default handler. After the failed request, the default handler responds when the user clicks Retry.

To test responses arriving out of order, use the suite's deferred promises to hold and release a response. Avoid arbitrary sleeps. Release held responses in cleanup if the test can fail before it reaches the release step.

Check displayed rows and counts, click filter chips and Retry, enter searches, or open a saved-query URL. The handler reads request variables to model filtering, sorting, and pagination. Tests assert on the resulting UI.

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

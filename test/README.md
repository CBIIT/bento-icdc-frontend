# Testing with MSW

Use Mock Service Worker, or MSW, for component tests that make HTTP requests. Keep the real Apollo or React Query client. MSW intercepts its requests and returns the responses defined in the test, so no backend is needed.

These tests use `setupServer` from `msw/node`. It intercepts requests inside Jest. It does not start an HTTP server or install a browser service worker.

Components that only display props or transform existing data do not need MSW. See the [supporting-data tests](../src/pages/study/views/supporting-data/__test__/SupportingDataView.test.jsx).

## Run a suite

From the repository root, after installing dependencies:

```sh
nvm use
npm test -- --runInBand --coverage=false src/pages/about/__test__/aboutController.test.jsx
```

Replace the path with the test file or directory you want to run. Add `-t 'test name'` to select a scenario. Jest discovers files under `__test__` that end in `.test.js`, `.test.jsx`, `.test.ts`, or `.test.tsx`.

## Jest setup

Put this comment at the top of each MSW test file:

```js
/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
```

[msw-environment.cjs](./msw-environment.cjs) keeps jsdom's DOM and supplies Node's matching Fetch API implementations, streams, and encoding globals. The export conditions let Jest resolve `msw/node`. Use the repository's Node environment rather than adding separate fetch polyfills to individual suites.

The Jest configuration in [package.json](../package.json) transforms `rettime`, `until-async`, and `@open-draft/deferred-promise` to CommonJS because those dependencies ship ES modules. Both the transform rules and their `transformIgnorePatterns` exceptions are needed.

## Handlers and server lifecycle

Define handlers in the test file. If several tests share handlers, put them in a module alongside those tests. Match the client's URL and, for GraphQL, the operation name in the document.

```js
import { graphql, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('http://localhost/about.yml', () =>
    HttpResponse.text('- page: /about\n  title: About ICDC')
  ),
  graphql
    .link('http://localhost/graphql')
    .query('createManifest', () =>
      HttpResponse.json({ data: { createManifest: 'file_id\nA' } })
    )
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

Unhandled requests fail instead of reaching a backend. Add a handler for each request the rendered flow needs. `server.use(...)` overrides a handler for a scenario, and `resetHandlers()` removes those overrides between tests. There is no repository-wide server that automatically registers handlers.

## Clients and cleanup

[src/setupTests.tsx](../src/setupTests.tsx) globally mocks Apollo constructors and many Bento components. Restore the real Apollo module in tests that send GraphQL requests:

```js
jest.mock('@apollo/client', () => jest.requireActual('@apollo/client'));
```

For Apollo, create a client with a new `InMemoryCache`. Point its `HttpLink` at the handler's endpoint and render with `ApolloProvider`. For React Query, create a new `QueryClient` and render with `QueryClientProvider`. Each test needs its own cache and, if it uses Redux, its own store.

Restore the Bento components the user interacts with in the test. For example, use the real table to check displayed rows. The [dashboard guide](../src/pages/dashboard/__test__/README.md) shows how its tests restore these modules.

React Testing Library unmounts components automatically after each test. Add cleanup for the resources your suite creates. Stop Apollo clients, clear React Query clients, dismiss toasts, and restore spies or replaced browser APIs.

Some suites shorten retry delays to avoid slow tests. When testing the Retry button, keep the failure handler active until the error appears. Otherwise, an automatic retry may succeed before the user sees the error.

## Failures, retries, and delayed responses

Use `HttpResponse.error()` for a network failure, `new HttpResponse(null, { status: 503 })` for an HTTP failure, or `HttpResponse.json({ errors: [{ message: 'Unavailable' }] })` for a GraphQL error. Return invalid text when testing YAML parsing failures.

For a recovery test, add the failure handler and render the component. Wait for the error, replace the handler with a successful response, and click Retry. Check that the expected content appears. Render the real `Toaster` to test toast actions. Retry toasts must stay interactive until recovery or dismissal.

To test responses arriving out of order, hold a handler's response with a deferred promise. Change the selection or navigate, then release the old response and check that the current content remains correct. Release held promises in cleanup if an assertion can fail before the release step.

Wait for the expected text or controls to appear. Avoid fixed delays that assume a request has finished. This checkout's React Testing Library provides `wait`, not `waitFor`. Existing suites use `act` while waiting for asynchronous React updates.

## Assertions and examples

Check what a user sees or does: displayed rows, navigation, filter choices, Retry actions, downloaded file contents, and export destinations. Do not assert on query-hook calls, Redux actions, component props, cache internals, request counts, or constructed query variables. Handlers can read variables to model an API response without asserting on them.

| Example                                                                               | What it covers                                                                |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [About](../src/pages/about/__test__/aboutController.test.jsx)                         | REST text responses, React Query, navigation, and retry toasts                |
| [Cart manifest](../src/pages/Cart/components/dropdown/__test__/DropDownView.test.jsx) | Apollo requests to two endpoints, downloads, exports, and changing selections |
| [JBrowse](../src/pages/JbrowseDetail/__test__/JbrowseController.test.jsx)             | File URL requests, failures, and changing viewer selections                   |
| [Dashboard guide](../src/pages/dashboard/__test__/README.md)                          | GraphQL fixtures, real tables and filters, and cached searches                |

## Troubleshooting

- If Jest cannot resolve `msw/node`, check the file's environment header and export conditions.
- If Fetch API or stream globals are missing, check the Node version and custom environment before adding polyfills.
- If Jest reports an unexpected export in an MSW dependency, check the transforms and exceptions in `package.json`.
- If no request reaches a handler, check for global Apollo mocks and verify the endpoint and GraphQL operation name.
- If tests pass alone but fail together, check client caches, handler overrides, pending responses, toasts, and browser API cleanup.

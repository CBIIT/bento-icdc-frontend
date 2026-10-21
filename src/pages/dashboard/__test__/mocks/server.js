import { setupServer } from 'msw/node';

export const endpoint = 'http://localhost/graphql';
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

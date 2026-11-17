// src/components/graphql/GraphQLView.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the GraphiQL CSS import to avoid style-related issues in Jest
jest.mock('graphiql/graphiql.css', () => ({}), { virtual: true });

// Capture the fetcher prop passed to GraphiQL
let capturedFetcher;

// Mock the GraphiQL component and capture the fetcher prop
jest.mock('graphiql', () => {
  const ReactActual = jest.requireActual('react');

  const MockGraphiQL = ({ fetcher }) => {
    capturedFetcher = fetcher;
    return ReactActual.createElement(
      'div',
      { 'data-testid': 'graphiql-mock' },
      'MockGraphiQL'
    );
  };

  MockGraphiQL.displayName = 'MockGraphiQL';

  return {
    __esModule: true,
    default: MockGraphiQL,
  };
});

// Mock @material-ui/styles withStyles HOC to inject deterministic class names
jest.mock('@material-ui/styles', () => {
  const ReactActual = jest.requireActual('react');

  const withStyles = stylesArg => Component => {
    const Wrapped = props => {
      const resolvedStyles =
        typeof stylesArg === 'function' ? stylesArg() : stylesArg || {};
      const classes = Object.keys(resolvedStyles).reduce((acc, key) => {
        acc[key] = key; // class name equals the style key for easy assertions
        return acc;
      }, {});
      return ReactActual.createElement(Component, { ...props, classes });
    };
    Wrapped.displayName = `withStyles(${(Component && (Component.displayName || Component.name)) || 'Component'})`;
    return Wrapped;
  };

  return {
    __esModule: true,
    withStyles,
  };
});

// Mock env to provide a deterministic backend URL
jest.mock('../../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_BACKEND_API: 'https://example.test/graphql',
  },
}));

import GraphQLView from './GraphQLView';

describe('GraphQLView', () => {
  beforeEach(() => {
    capturedFetcher = undefined;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete global.fetch;
  });

  it('renders the GraphiQL component', () => {
    render(<GraphQLView />);
    // Avoid custom matchers to keep environment-independent
    expect(screen.queryByTestId('graphiql-mock')).not.toBeNull();
  });

  it('applies the grapqhQlContainer class to the container div', () => {
    const { container } = render(<GraphQLView />);
    expect(container.querySelectorAll('div.grapqhQlContainer')).toHaveLength(1);
  });

  it('calls fetch with correct args and resolves parsed JSON', async () => {
    render(<GraphQLView />);
    expect(typeof capturedFetcher).toBe('function');

    const params = { query: '{ hello }', variables: { x: 1 } };
    const mockResponse = { data: { hello: 'world' } };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await capturedFetcher(params);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://example.test/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    expect(result).toEqual(mockResponse);
  });

  it('rejects when response.json rejects', async () => {
    render(<GraphQLView />);
    expect(typeof capturedFetcher).toBe('function');

    const jsonError = new Error('bad json');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(jsonError),
    });

    await expect(capturedFetcher({ query: '{ broken }' })).rejects.toThrow(
      'bad json'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('rejects when fetch rejects', async () => {
    render(<GraphQLView />);
    expect(typeof capturedFetcher).toBe('function');

    global.fetch.mockRejectedValueOnce(new Error('network down'));

    await expect(capturedFetcher({ query: '{ ping }' })).rejects.toThrow(
      'network down'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('sends undefined body when graphQLParams is undefined', async () => {
    render(<GraphQLView />);
    expect(typeof capturedFetcher).toBe('function');

    const mockResponse = { data: { ok: true } };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await capturedFetcher(undefined);

    expect(global.fetch).toHaveBeenCalledWith('https://example.test/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
    expect(result).toEqual(mockResponse);
  });
});

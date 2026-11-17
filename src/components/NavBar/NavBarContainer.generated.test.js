// src/components/NavBar/NavBarContainer.test.js

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import layoutReducer from '../Layout/LayoutState';

jest.mock('./NavBarView', () => jest.fn(() => null));
import NavBarView from './NavBarView';

import NavBarContainer from './NavBarContainer';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

function makeStore(preloadedFilesId) {
  const cartReducer = (state = { filesId: preloadedFilesId }, _action) => state;

  return configureStore({
    reducer: {
      cartReducer,
      layout: layoutReducer,
    },
  });
}

function renderWithProviders(ui, { store, history }) {
  return render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>
  );
}

describe('NavBarContainer', () => {
  test('maps cartFieldIds from state.cartReducer.filesId', () => {
    const filesId = ['file-1', 'file-2', 'file-3'];
    const store = makeStore(filesId);
    const history = createMemoryHistory({ initialEntries: ['/start'] });

    renderWithProviders(<NavBarContainer />, { store, history });

    expect(NavBarView).toHaveBeenCalled();
    const lastProps =
      NavBarView.mock.calls[NavBarView.mock.calls.length - 1][0];
    expect(lastProps.cartFieldIds).toEqual(filesId);
  });

  test('passes toggleSidebar prop that dispatches the correct action', () => {
    const filesId = [];
    const store = makeStore(filesId);
    const history = createMemoryHistory({ initialEntries: ['/start'] });

    renderWithProviders(<NavBarContainer />, { store, history });

    const lastProps =
      NavBarView.mock.calls[NavBarView.mock.calls.length - 1][0];
    expect(typeof lastProps.toggleSidebar).toBe('function');

    expect(store.getState().layout.isSidebarOpened).toBe(true);

    lastProps.toggleSidebar();

    expect(store.getState().layout.isSidebarOpened).toBe(false);
  });

  test('re-renders when location pathname changes (shouldComponentUpdate returns true)', () => {
    const store = makeStore(['x']);
    const history = createMemoryHistory({ initialEntries: ['/a'] });

    renderWithProviders(<NavBarContainer />, { store, history });

    const initialRenderCount = NavBarView.mock.calls.length;

    history.push('/b');

    const afterPushRenderCount = NavBarView.mock.calls.length;
    expect(afterPushRenderCount).toBeGreaterThan(initialRenderCount);
  });

  test('re-renders even when navigating to the same pathname due to current shouldComponentUpdate implementation', () => {
    const store = makeStore(['y']);
    const history = createMemoryHistory({ initialEntries: ['/same'] });

    renderWithProviders(<NavBarContainer />, { store, history });

    const before = NavBarView.mock.calls.length;

    history.push('/same');

    const after = NavBarView.mock.calls.length;
    expect(after).toBeGreaterThan(before);
  });

  test('passes through undefined cartFieldIds when state.cartReducer.filesId is undefined', () => {
    const store = makeStore(undefined);
    const history = createMemoryHistory({ initialEntries: ['/'] });

    renderWithProviders(<NavBarContainer />, { store, history });

    const lastProps =
      NavBarView.mock.calls[NavBarView.mock.calls.length - 1][0];
    expect(lastProps.cartFieldIds).toBeUndefined();
  });
});

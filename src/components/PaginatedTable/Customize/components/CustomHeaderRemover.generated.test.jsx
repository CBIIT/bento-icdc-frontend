// src/components/PaginatedTable/Customize/components/CustomHeaderRemover.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import CustomHeaderRemover from './CustomHeaderRemover';

// Minimal mock Redux store for react-redux Provider
function makeStore(filesIdValue) {
  return {
    getState: () => ({
      cartReducer: {
        filesId: filesIdValue,
      },
    }),
    subscribe: () => () => {},
    dispatch: jest.fn(),
  };
}

describe('CustomHeaderRemover', () => {
  const getButton = () => screen.getByRole('button');

  test('should render the Clear Cart button and keep it disabled when filesId in store is empty', () => {
    const store = makeStore([]);
    render(
      <Provider store={store}>
        <CustomHeaderRemover openDialogBox={jest.fn()} />
      </Provider>
    );

    const button = getButton();
    expect(button).not.toBeNull();
    expect(button.disabled).toBe(true);
    expect(button.textContent).toMatch(/clear cart/i);
  });

  test('should enable the button when filesId has items and call openDialogBox on click', () => {
    const store = makeStore(['file-1']);
    const openDialogBox = jest.fn();

    render(
      <Provider store={store}>
        <CustomHeaderRemover openDialogBox={openDialogBox} />
      </Provider>
    );

    const button = getButton();
    expect(button.disabled).toBe(false);

    fireEvent.click(button);
    expect(openDialogBox).toHaveBeenCalledTimes(1);
  });

  test('should default filesId to [] when undefined from store and keep button disabled', () => {
    const store = makeStore(undefined);
    render(
      <Provider store={store}>
        <CustomHeaderRemover openDialogBox={jest.fn()} />
      </Provider>
    );

    const button = getButton();
    expect(button.disabled).toBe(true);
  });

  test('should not throw when clicking button if openDialogBox is not provided', () => {
    const store = makeStore(['file-1']);
    render(
      <Provider store={store}>
        <CustomHeaderRemover />
      </Provider>
    );

    const button = getButton();
    expect(button.disabled).toBe(false);

    expect(() => {
      fireEvent.click(button);
    }).not.toThrow();
  });
});

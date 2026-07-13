import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import AddToCartDialogAlertView from './AddToCartDialogAlertView';

jest.mock('./dialogThemeConfig', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock('@material-ui/core', () => ({
  __esModule: true,
  Dialog: ({ children, open, className, ...rest }) =>
    open ? (
      <div data-testid="dialog" className={className} {...rest}>
        {children}
      </div>
    ) : null,
  DialogContent: ({ children, className, ...rest }) => (
    <div data-testid="dialog-content" className={className} {...rest}>
      {children}
    </div>
  ),
  DialogContentText: ({ children, ...rest }) => <p {...rest}>{children}</p>,
}));

describe('AddToCartDialogAlertView', () => {
  const alertMessage =
    'The cart is limited to 2,000 files. Please narrow the search criteria or remove some files from the cart to add more.';

  const classes = {
    popUpWindow: 'test-popup-window',
    popUpWindowContent: 'test-popup-window-content',
  };

  beforeEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('does not render the alert message when open is false', () => {
    render(
      <AddToCartDialogAlertView
        open={false}
        classes={classes}
        onClose={jest.fn()}
      />
    );

    expect(screen.queryByText(alertMessage)).toBeNull();
  });

  it('renders the alert message when open is true', () => {
    render(
      <AddToCartDialogAlertView open classes={classes} onClose={jest.fn()} />
    );

    expect(screen.getByText(alertMessage)).not.toBeNull();
  });

  it('applies the provided class names to Dialog and DialogContent', () => {
    render(
      <AddToCartDialogAlertView open classes={classes} onClose={jest.fn()} />
    );

    expect(screen.getByTestId('dialog').className).toContain(
      'test-popup-window'
    );
    expect(screen.getByTestId('dialog-content').className).toContain(
      'test-popup-window-content'
    );
  });

  it('calls onClose exactly once after 4000ms when open is true', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <AddToCartDialogAlertView open classes={classes} onClose={onClose} />
    );

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3999);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not schedule close when open is false', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    render(
      <AddToCartDialogAlertView
        open={false}
        classes={classes}
        onClose={onClose}
      />
    );

    expect(setTimeoutSpy).not.toHaveBeenCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('schedules a timeout for 4000ms when open is true', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    render(
      <AddToCartDialogAlertView open classes={classes} onClose={onClose} />
    );

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

    const [callback, delay] = setTimeoutSpy.mock.calls[0];
    expect(typeof callback).toBe('function');
    expect(delay).toBe(4000);
  });
});

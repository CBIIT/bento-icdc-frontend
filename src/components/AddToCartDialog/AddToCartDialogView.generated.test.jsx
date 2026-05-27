// src/components/AddToCartDialog/AddToCartDialogView.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AddToCartDialogView from './AddToCartDialogView';

jest.mock('./dialogThemeConfig', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock('@material-ui/core', () => ({
  __esModule: true,
  Dialog: ({ open, children, ...props }) =>
    open ? (
      <div data-testid="dialog" {...props}>
        {children}
      </div>
    ) : null,
  DialogActions: ({ children, ...props }) => (
    <div data-testid="dialog-actions" {...props}>
      {children}
    </div>
  ),
  DialogContent: ({ children, ...props }) => (
    <div data-testid="dialog-content" {...props}>
      {children}
    </div>
  ),
  DialogContentText: ({ children, ...props }) => (
    <p data-testid="dialog-content-text" {...props}>
      {children}
    </p>
  ),
  Button: ({ children, onClick, ...props }) => (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('AddToCartDialogView', () => {
  const baseClasses = {
    popUpWindow: 'popUpWindow',
    popUpWindowContent: 'popUpWindowContent',
    okButton: 'okButton',
    cancelButton: 'cancelButton',
  };

  const renderComponent = (props = {}) =>
    render(
      <AddToCartDialogView
        open={true}
        numberOfRowsSelected={{ activeTab: 'Cases', count: 3 }}
        onYesClick={() => {}}
        onNoClick={() => {}}
        classes={baseClasses}
        {...props}
      />
    );

  it('renders message for non-"Files" activeTab with correct count', () => {
    renderComponent({
      numberOfRowsSelected: { activeTab: 'Cases', count: 3 },
    });

    expect(
      screen.getByText('Add all files for the 3 selected Cases to My Files?')
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'No' })).toBeTruthy();
  });

  it('renders message for activeTab "Files" with correct count', () => {
    renderComponent({
      numberOfRowsSelected: { activeTab: 'Files', count: 4 },
    });

    expect(screen.getByText('Add all 4 files to My Files?')).toBeTruthy();
  });

  it('renders no prompt text when numberOfRowsSelected is undefined', () => {
    renderComponent({
      numberOfRowsSelected: undefined,
    });

    expect(screen.queryByText(/Add all/i)).toBeNull();
  });

  it('falls back to 0 count and "Files" tab when values are missing', () => {
    renderComponent({
      numberOfRowsSelected: { activeTab: undefined, count: undefined },
    });

    expect(
      screen.getByText('Add all files for the 0 selected Files to My Files?')
    ).toBeTruthy();
  });

  it('calls onYesClick and onNoClick when respective buttons are clicked', () => {
    const onYesClick = jest.fn();
    const onNoClick = jest.fn();

    renderComponent({
      onYesClick,
      onNoClick,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    expect(onYesClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(onNoClick).toHaveBeenCalledTimes(1);
  });

  it('does not render dialog content when open is false', () => {
    renderComponent({
      open: false,
    });

    expect(screen.queryByRole('button', { name: 'Yes' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'No' })).toBeNull();
    expect(screen.queryByText(/Add all/i)).toBeNull();
  });
});

// src/components/OverlayWindow/OverlayWindow.test.jsx
import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import OverlayWindow from './OverlayWindow';

jest.mock('./OverlayText', () => ({
  __esModule: true,
  text: {
    content: ['Line A', 'Line B'],
    list: ['Item 1', 'Item 2', 'Item 3'],
  },
}));

jest.mock('./OverlayThemConfig', () => {
  const MockDialogThemeProvider = ({ children }) => <>{children}</>;

  MockDialogThemeProvider.displayName = 'MockDialogThemeProvider';

  return {
    __esModule: true,
    default: MockDialogThemeProvider,
  };
});

jest.mock('@mui/icons-material/FiberManualRecord', () => {
  const MockFiberManualRecord = () => <span data-testid="dot" />;

  MockFiberManualRecord.displayName = 'MockFiberManualRecord';

  return {
    __esModule: true,
    default: MockFiberManualRecord,
  };
});

describe('OverlayWindow', () => {
  test('renders dialog with title and content when open is true', () => {
    const handleClose = jest.fn();

    render(<OverlayWindow open={true} handleClose={handleClose} />);

    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Warning')).toBeTruthy();
    expect(screen.getByText('Line A')).toBeTruthy();
    expect(screen.getByText('Line B')).toBeTruthy();

    expect(
      screen.getByText(
        /By using this system, you understand and consent to the following/i
      )
    ).toBeTruthy();

    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(3);

    const dots = screen.getAllByTestId('dot');
    expect(dots).toHaveLength(3);
  });

  test('calls handleClose when Continue button is clicked', () => {
    const handleClose = jest.fn();

    render(<OverlayWindow open={true} handleClose={handleClose} />);

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not render dialog when open is false', () => {
    render(<OverlayWindow open={false} handleClose={jest.fn()} />);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('Warning')).toBeNull();
    expect(screen.queryByRole('button', { name: /continue/i })).toBeNull();
  });

  test('renders safely when handleClose is missing', () => {
    render(<OverlayWindow open={true} />);

    expect(screen.getByText('Warning')).toBeTruthy();
    expect(screen.getByText('Line A')).toBeTruthy();
    expect(screen.getByRole('button', { name: /continue/i })).toBeTruthy();
  });

  test('does not render anything when open is omitted', () => {
    render(<OverlayWindow />);

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('Warning')).toBeNull();
  });

  test('has the expected accessibility attributes', () => {
    render(<OverlayWindow open={true} handleClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('alert-dialog-title');
    expect(dialog.getAttribute('aria-describedby')).toBe(
      'alert-dialog-description'
    );

    expect(document.getElementById('alert-dialog-title')).toBeTruthy();
    expect(
      document.querySelectorAll('#alert-dialog-description').length
    ).toBeGreaterThan(0);
  });
});

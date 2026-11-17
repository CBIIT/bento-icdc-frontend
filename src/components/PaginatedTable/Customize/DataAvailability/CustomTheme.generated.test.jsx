// src/components/PaginatedTable/Customize/DataAvailability/CustomTheme.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomThemeProvider from './CustomTheme.jsx';

jest.mock('@material-ui/core/styles', () => {
  const createTheme = jest.fn(theme => theme);

  const ThemeProvider = jest.fn(({ children }) => children ?? null);

  return {
    __esModule: true,
    createTheme,
    ThemeProvider,
  };
});

jest.mock('@material-ui/core/Tooltip', () => {
  const Tooltip = ({ children }) => children ?? null;

  return {
    __esModule: true,
    default: Tooltip,
  };
});

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

describe('CustomThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders children inside provider', () => {
    render(
      <CustomThemeProvider>
        <div data-testid="child">content</div>
      </CustomThemeProvider>
    );

    const child = screen.getByTestId('child');
    expect(child.textContent).toBe('content');
    expect(ThemeProvider.mock.calls.length).toBe(1);
  });

  test('provides theme with expected MuiTooltip tooltip overrides', () => {
    render(
      <CustomThemeProvider>
        <div data-testid="child">content</div>
      </CustomThemeProvider>
    );

    expect(createTheme.mock.calls.length).toBe(1);

    const themeArg = createTheme.mock.calls[0][0];
    const providerProps = ThemeProvider.mock.calls[0][0];

    expect(providerProps.theme).toEqual(themeArg);
    expect(themeArg).toBeTruthy();
    expect(themeArg.overrides).toBeTruthy();
    expect(themeArg.overrides.MuiTooltip).toBeTruthy();
    expect(themeArg.overrides.MuiTooltip.tooltip).toBeTruthy();

    expect(themeArg.overrides.MuiTooltip.tooltip).toMatchObject({
      backgroundColor: '#ffffff',
      color: '#1c2023',
      maxWidth: '220px',
      fontSize: '0.75rem',
      border: '2px solid #a7afb3',
      fontFamily: 'Open Sans',
      fontWeight: '600',
      textAlign: 'left',
      lineHeight: '1.6',
      padding: '10px 12px',
      borderRadius: '0px',
    });
  });

  test('does not throw and renders nothing when children are null', () => {
    const { container } = render(
      <CustomThemeProvider>{null}</CustomThemeProvider>
    );

    expect(container.childElementCount).toBe(0);
    expect(container.textContent).toBe('');
  });

  test('renders without children prop (undefined) without crashing', () => {
    const { container } = render(<CustomThemeProvider />);

    expect(container.childElementCount).toBe(0);
    expect(container.textContent).toBe('');
  });

  test('Tooltip renders under provider', () => {
    render(
      <CustomThemeProvider>
        <Tooltip title="Hello tooltip">
          <button type="button">Hover me</button>
        </Tooltip>
      </CustomThemeProvider>
    );

    const button = screen.getByText('Hover me');
    expect(button).not.toBeNull();
    expect(button.tagName).toBe('BUTTON');
  });
});

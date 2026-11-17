// src/components/NavBar/NavBarThemeConfig.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@material-ui/core/styles';

// Mock themes module to provide a stable, minimal theme shape for tests
jest.mock('../../themes', () => ({
  __esModule: true,
  default: {
    light: {
      overrides: {},
      palette: { primary: { main: '#000000' } },
    },
    dark: {},
  },
  overrides: {
    typography: {
      h1: { fontSize: '3rem' },
    },
  },
}));

import NavBarThemeProvider from './NavBarThemeConfig';
import themes, { overrides as exportedOverrides } from '../../themes';

const ThemeProbe = () => {
  const theme = useTheme();
  return (
    <div>
      <div data-testid="child">child</div>
      <div data-testid="appbar-width">
        {theme?.overrides?.MuiAppBar?.root?.width || ''}
      </div>
      <div data-testid="appbar-position">
        {theme?.overrides?.MuiAppBar?.positionFixed?.position || ''}
      </div>
      <div data-testid="button-exists">
        {theme?.overrides?.MuiButton?.root ? 'true' : ''}
      </div>
      <div data-testid="typography-h1">
        {theme?.typography?.h1?.fontSize || ''}
      </div>
    </div>
  );
};

describe('NavBarThemeProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('happy path: provides theme with MuiAppBar and MuiButton overrides and renders children', () => {
    // Arrange & Act
    render(
      <NavBarThemeProvider>
        <ThemeProbe />
      </NavBarThemeProvider>
    );

    // Assert (no jest-dom matchers; use plain properties)
    expect(screen.getByTestId('child').textContent).toBe('child');
    expect(screen.getByTestId('appbar-width').textContent).toBe(
      '100% !important'
    );
    expect(screen.getByTestId('appbar-position').textContent).toBe('relative');
    expect(screen.getByTestId('button-exists').textContent).toBe('true');
  });

  test('merges exported overrides (typography) into the computed theme', () => {
    // Arrange & Act
    render(
      <NavBarThemeProvider>
        <ThemeProbe />
      </NavBarThemeProvider>
    );

    // Assert typography from exported overrides
    expect(screen.getByTestId('typography-h1').textContent).toBe(
      exportedOverrides.typography.h1.fontSize
    );
  });

  test('mutates themes.light.overrides to include MuiAppBar and MuiButton', () => {
    // Arrange & Act: render once to trigger mutation
    render(
      <NavBarThemeProvider>
        <div />
      </NavBarThemeProvider>
    );

    // Assert side-effects on the mocked themes object
    expect(themes.light.overrides).toBeDefined();
    expect(themes.light.overrides.MuiAppBar).toBeDefined();
    expect(themes.light.overrides.MuiButton).toBeDefined();

    expect(themes.light.overrides.MuiAppBar.root.width).toBe('100% !important');
    expect(themes.light.overrides.MuiAppBar.positionFixed.position).toBe(
      'relative'
    );
    expect(
      Object.prototype.hasOwnProperty.call(
        themes.light.overrides.MuiButton.root,
        '&#button_navbar_mycases'
      )
    ).toBe(true);
  });

  test('does not throw when rendered without children (null/edge case)', () => {
    expect(() => render(<NavBarThemeProvider />)).not.toThrow();
  });
});

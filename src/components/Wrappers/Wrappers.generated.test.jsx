import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import { Badge, Typography, Button } from './Wrappers';

function buildTheme(overrides = {}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#64b5f6',
      },
      secondary: {
        main: '#9c27b0',
      },
      text: {
        primary: '#111111',
      },
      ...(overrides.palette || {}),
    },
    typography: {
      fontSize: 16,
      h6: {
        fontSize: '20px',
      },
      ...(overrides.typography || {}),
    },
    shape: {
      borderRadius: 8,
      ...(overrides.shape || {}),
    },
  });

  theme.customShadows = {
    widget: '0 1px 3px rgba(0,0,0,0.2)',
    widgetWide: '0 4px 6px rgba(0,0,0,0.3)',
    ...(overrides.customShadows || {}),
  };

  return theme;
}

function renderWithTheme(ui, themeOverrides = {}) {
  return render(
    <ThemeProvider theme={buildTheme(themeOverrides)}>{ui}</ThemeProvider>
  );
}

describe('Wrappers', () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Typography', () => {
    test('applies color, weight, size, and family based on props and theme', () => {
      renderWithTheme(
        <Typography
          color="primary"
          colorBrightness="light"
          weight="bold"
          size="xl"
          family="Inter"
        >
          Hello World
        </Typography>
      );

      const el = screen.getByText('Hello World');

      expect(el).toHaveStyle('font-weight: 600');
      expect(el).toHaveStyle('font-size: calc(16px * 1.7)');
      expect(el).toHaveStyle('font-family: Inter');
      expect(el.style.color).toMatch(/^(rgb\(100,\s*181,\s*246\)|#64b5f6)$/);
    });

    test('uses variant font size when provided', () => {
      renderWithTheme(
        <Typography size="sm" variant="h6">
          Variant Size
        </Typography>
      );

      const el = screen.getByText('Variant Size');
      expect(el).toHaveStyle('font-size: calc(20px * 0.8)');
    });

    test('defaults to normal weight and default size multiplier', () => {
      renderWithTheme(<Typography>Defaults</Typography>);

      const el = screen.getByText('Defaults');

      expect(el.style.color).toBe('');
      expect(el).toHaveStyle('font-weight: 400');
      expect(el).toHaveStyle('font-size: calc(16px * 1)');
    });

    test('handles unknown size and missing theme color', () => {
      renderWithTheme(
        <Typography size="unknown" color="tertiary">
          Edge Case
        </Typography>,
        {
          palette: {
            primary: { main: '#000000' },
          },
          typography: {
            fontSize: 14,
          },
        }
      );

      const el = screen.getByText('Edge Case');

      expect(el.style.color).toBe('');
      expect(el).toHaveStyle('font-size: calc(14px * 1)');
    });
  });

  describe('Badge', () => {
    test('renders children and forwards props to BadgeBase', () => {
      renderWithTheme(
        <Badge data-testid="the-badge" overlap="circular">
          <span data-testid="child-node">child</span>
        </Badge>
      );

      expect(screen.getByTestId('child-node')).toHaveTextContent('child');
      expect(screen.getByTestId('the-badge')).toBeInTheDocument();
    });

    test('renders even when the theme color does not exist', () => {
      renderWithTheme(
        <Badge color="nonExisting">
          <span>content</span>
        </Badge>
      );

      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    test('renders children and respects disabled state', () => {
      renderWithTheme(<Button disabled>Click Me</Button>);

      const btn = screen.getByRole('button', { name: /click me/i });
      expect(btn).toBeDisabled();
    });

    test('keeps the provided className and adds generated classes when select is true', () => {
      renderWithTheme(
        <Button className="my-custom-class" select>
          Selectable
        </Button>
      );

      const btn = screen.getByRole('button', { name: /selectable/i });
      const className = btn.className || '';

      expect(className).toEqual(expect.stringContaining('my-custom-class'));
      expect(className.trim().split(/\s+/).length).toBeGreaterThan(1);
    });

    test('renders with provided className when select is false', () => {
      renderWithTheme(<Button className="only-custom">Plain</Button>);

      const btn = screen.getByRole('button', { name: /plain/i });
      expect(btn.className).toEqual(expect.stringContaining('only-custom'));
    });

    test('works with variant="contained"', () => {
      renderWithTheme(<Button variant="contained">Contained</Button>);

      const btn = screen.getByRole('button', { name: /contained/i });
      expect(btn.className || '').toContain('MuiButton-contained');
    });
  });
});

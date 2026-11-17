// src/components/Footer/FooterThemConfig.generated.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@material-ui/core/styles', () => ({
  createTheme: jest.fn(obj => obj),
  MuiThemeProvider: ({ theme, children }) => (
    <div data-testid="mui-provider" data-theme={JSON.stringify(theme)}>
      {children}
    </div>
  ),
}));

jest.mock('../../themes', () => {
  const light = {
    overrides: {
      SomeOther: { a: 1 },
    },
    palette: { primary: { main: '#000' } },
  };

  const dark = {};

  const namedOverrides = {
    typography: {
      fontSize: 14,
      h1: { fontSize: '3rem' },
    },
  };

  return {
    __esModule: true,
    default: { light, dark },
    overrides: namedOverrides,
  };
});

import FooterThemeConfig from './FooterThemConfig.jsx';
import themes, { overrides as namedOverrides } from '../../themes';
import { createTheme } from '@material-ui/core/styles';

describe('FooterThemeConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children within MuiThemeProvider', () => {
    render(
      <FooterThemeConfig>
        <span data-testid="child">content</span>
      </FooterThemeConfig>
    );

    const child = screen.getByTestId('child');
    expect(child).not.toBeNull();
    expect(child.textContent).toBe('content');

    const provider = screen.getByTestId('mui-provider');
    expect(provider).not.toBeNull();
  });

  it('should compute theme by cloning light theme, setting MuiDivider height to 0px, and merging named overrides', () => {
    render(
      <FooterThemeConfig>
        <span>child</span>
      </FooterThemeConfig>
    );

    expect(createTheme).toHaveBeenCalledTimes(1);
    const themeArg = createTheme.mock.calls[0][0];

    expect(themeArg.palette).toEqual({ primary: { main: '#000' } });
    expect(themeArg.overrides.SomeOther).toEqual({ a: 1 });
    expect(themeArg.overrides.MuiDivider).toEqual({
      root: { height: '0px' },
    });
    expect(themeArg.typography).toEqual(
      expect.objectContaining(namedOverrides.typography)
    );

    const provider = screen.getByTestId('mui-provider');
    const providerTheme = JSON.parse(provider.getAttribute('data-theme'));
    expect(providerTheme).toEqual(themeArg);
  });

  it('should not mutate the original themes.light object (cloneDeep usage)', () => {
    expect(themes.light.overrides.MuiDivider).toBeUndefined();

    render(<FooterThemeConfig />);

    expect(themes.light.overrides.MuiDivider).toBeUndefined();
    expect(themes.light.overrides.SomeOther).toEqual({ a: 1 });
  });

  it('should render without children (null/undefined) without throwing', () => {
    const { container } = render(<FooterThemeConfig />);

    const provider = screen.getByTestId('mui-provider');
    expect(provider).not.toBeNull();

    expect(container.querySelector('[data-testid="child"]')).toBeNull();
  });
});

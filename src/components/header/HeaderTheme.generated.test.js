// src/components/header/HeaderTheme.generated.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@material-ui/core/styles';
import HeaderThemeProvider from './HeaderTheme';

jest.mock('../../assets/header/Vector.svg', () => 'mock-vector.svg');
jest.mock(
  '../../assets/header/global_search_input_find.svg',
  () => 'mock-search.svg'
);

describe('HeaderThemeProvider', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const ThemeProbe = () => {
    const theme = useTheme();

    const svgIconBg = theme.overrides?.MuiSvgIcon?.root?.backgroundImage;
    const vectorBg =
      theme.overrides?.MuiAutocomplete?.listbox?.['& li']?.[
        '&:nth-last-child(1)'
      ]?.['& span']?.backgroundImage;
    const paperZIndex = theme.overrides?.MuiPaper?.root?.zIndex;
    const inputAdornedEndHeight =
      theme.overrides?.MuiOutlinedInput?.inputAdornedEnd?.height;

    return (
      <div
        data-testid="theme-probe"
        data-svgicon-bg={svgIconBg}
        data-vector-bg={vectorBg}
        data-paper-z={paperZIndex}
        data-input-adorned-end-height={inputAdornedEndHeight}
      />
    );
  };

  const EdgeProbe = () => {
    const theme = useTheme();

    const gridHeaderZ =
      theme.overrides?.MuiGrid?.container?.['& div#header']?.zIndex;
    const textFieldWidth = theme.overrides?.MuiTextField?.root?.width;
    const autocompletePaperRadius =
      theme.overrides?.MuiAutocomplete?.paper?.borderRadius;
    const inputBaseFont = theme.overrides?.MuiInputBase?.root?.fontFamily;

    return (
      <div
        data-testid="edge-probe"
        data-grid-header-z={String(gridHeaderZ)}
        data-textfield-width={textFieldWidth}
        data-autocomplete-paper-radius={autocompletePaperRadius}
        data-inputbase-font={inputBaseFont}
      />
    );
  };

  it('renders children inside the provider', () => {
    render(
      <HeaderThemeProvider>
        <span data-testid="child">Hello</span>
      </HeaderThemeProvider>
    );

    expect(screen.getByTestId('child').textContent).toBe('Hello');
  });

  it('exposes the expected theme overrides and asset URLs', () => {
    render(
      <HeaderThemeProvider>
        <ThemeProbe />
      </HeaderThemeProvider>
    );

    const probe = screen.getByTestId('theme-probe');

    expect(probe.getAttribute('data-svgicon-bg')).toBe('url(mock-search.svg)');
    expect(probe.getAttribute('data-vector-bg')).toMatch(
      /^url\(mock-(vector|search)\.svg\)$/
    );
    expect(probe.getAttribute('data-paper-z')).toBe('900');
    expect(probe.getAttribute('data-input-adorned-end-height')).toBe('35px');
  });

  it('renders safely when children is null', () => {
    const { container } = render(
      <HeaderThemeProvider>{null}</HeaderThemeProvider>
    );

    expect(container).toBeTruthy();
    expect(container.innerHTML).toBe('');
  });

  it('keeps the main structural theme overrides intact', () => {
    render(
      <HeaderThemeProvider>
        <EdgeProbe />
      </HeaderThemeProvider>
    );

    const probe = screen.getByTestId('edge-probe');

    expect(probe.getAttribute('data-grid-header-z')).toBe('0');
    expect(probe.getAttribute('data-textfield-width')).toBe('260px');
    expect(probe.getAttribute('data-autocomplete-paper-radius')).toBe('8px');
    expect(probe.getAttribute('data-inputbase-font')).toBe('Open Sans');
  });

  it('does not throw when rendered without a children prop', () => {
    expect(() => render(<HeaderThemeProvider />)).not.toThrow();
  });
});

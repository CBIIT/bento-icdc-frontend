// src/components/ReadMeDialog/ReadMe.theme.config.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  useTheme,
  createTheme as mockedCreateTheme,
} from '@mui/material/styles';
import ReadMeThemeConfig from './ReadMe.theme.config.jsx';

jest.mock('@mui/material/styles', () => {
  const actual = jest.requireActual('@mui/material/styles');

  return {
    ...actual,
    createTheme: jest.fn(actual.createTheme),
  };
});

describe('ReadMeThemeConfig', () => {
  const TestConsumer = () => {
    const theme = useTheme();

    const dialogPaperMaxWidth =
      theme?.components?.MuiDialog?.styleOverrides?.paper?.maxWidth;
    const dialogScrollPaperMaxHeight =
      theme?.components?.MuiDialog?.styleOverrides?.paperScrollPaper?.maxHeight;
    const dialogPaperWidthMdMinWidth =
      theme?.components?.MuiDialog?.styleOverrides?.paperWidthMd?.minWidth;
    const backdropBg =
      theme?.components?.MuiBackdrop?.styleOverrides?.root?.backgroundColor;
    const svgIconColor =
      theme?.components?.MuiSvgIcon?.styleOverrides?.root?.color;

    return (
      <div>
        <span data-testid="paper-max-width">{dialogPaperMaxWidth}</span>
        <span data-testid="scrollpaper-max-height">
          {dialogScrollPaperMaxHeight}
        </span>
        <span data-testid="paperwidthmd-minwidth">
          {dialogPaperWidthMdMinWidth}
        </span>
        <span data-testid="backdrop-bg">{backdropBg}</span>
        <span data-testid="svgicon-color">{svgIconColor}</span>
      </div>
    );
  };

  beforeEach(() => {
    mockedCreateTheme.mockClear();
  });

  it('should render provided children inside ThemeProvider', () => {
    render(
      <ReadMeThemeConfig>
        <div data-testid="child">Hello Theme</div>
      </ReadMeThemeConfig>
    );

    expect(screen.getByTestId('child').textContent).toBe('Hello Theme');
  });

  it('should provide expected MUI component overrides in theme', () => {
    render(
      <ReadMeThemeConfig>
        <TestConsumer />
      </ReadMeThemeConfig>
    );

    expect(screen.getByTestId('paper-max-width').textContent).toBe('960px');
    expect(screen.getByTestId('scrollpaper-max-height').textContent).toBe(
      '650px'
    );
    expect(screen.getByTestId('paperwidthmd-minwidth').textContent).toBe(
      '750px'
    );
    expect(screen.getByTestId('backdrop-bg').textContent).toBe('#4a4a4a52');
    expect(screen.getByTestId('svgicon-color').textContent).toBe('#0d71a3');
  });

  it('should render nothing when children is null', () => {
    const { container } = render(<ReadMeThemeConfig>{null}</ReadMeThemeConfig>);
    expect(container.firstChild).toBeNull();
  });

  it('should not throw and render nothing when children is undefined', () => {
    const { container } = render(<ReadMeThemeConfig />);
    expect(container.firstChild).toBeNull();
  });

  it('should call createTheme with the expected overrides', () => {
    render(
      <ReadMeThemeConfig>
        <div />
      </ReadMeThemeConfig>
    );

    expect(mockedCreateTheme).toHaveBeenCalledTimes(1);

    expect(mockedCreateTheme).toHaveBeenCalledWith(
      expect.objectContaining({
        components: expect.objectContaining({
          MuiDialog: expect.objectContaining({
            styleOverrides: expect.objectContaining({
              paper: expect.objectContaining({
                maxWidth: '960px',
                maxHeight: '650px',
                borderRadius: '5px',
                padding: '0px 0px 0px 20px',
                boxShadow: 'none',
                overflowX: 'hidden',
                overflowY: 'hidden',
              }),
              paperScrollPaper: expect.objectContaining({
                maxHeight: '650px',
              }),
              paperWidthMd: expect.objectContaining({
                minWidth: '750px',
              }),
            }),
          }),
          MuiBackdrop: expect.objectContaining({
            styleOverrides: expect.objectContaining({
              root: expect.objectContaining({
                backgroundColor: '#4a4a4a52',
              }),
            }),
          }),
          MuiSvgIcon: expect.objectContaining({
            styleOverrides: expect.objectContaining({
              root: expect.objectContaining({
                color: '#0d71a3',
              }),
            }),
          }),
        }),
      })
    );
  });
});

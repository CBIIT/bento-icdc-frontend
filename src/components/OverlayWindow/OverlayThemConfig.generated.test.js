// src/components/OverlayWindow/OverlayThemConfig.test.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import OverlayWindow from './OverlayThemConfig';
import themes from '../../themes';

jest.mock('../../themes', () => {
  const overrides = {};

  return {
    __esModule: true,
    default: {
      light: {
        overrides,
      },
    },
    overrides: {
      typography: {
        fontSize: 14,
      },
    },
  };
});

jest.mock('@mui/material/styles', () => {
  const React = jest.requireActual('react');

  const mockCreateTheme = jest.fn(theme => ({
    __mockTheme: true,
    theme,
  }));

  const mockAdaptV4Theme = jest.fn(theme => ({
    __adapted: true,
    theme,
  }));

  const ThemeProvider = ({ theme, children }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'theme-provider',
        'data-theme-present': !!theme,
      },
      children
    );

  const StyledEngineProvider = ({ children }) =>
    React.createElement(React.Fragment, null, children);

  return {
    __esModule: true,
    ThemeProvider,
    StyledEngineProvider,
    createTheme: mockCreateTheme,
    adaptV4Theme: mockAdaptV4Theme,
  };
});

describe('OverlayWindow', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    themes.light.overrides = {};

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    consoleErrorSpy.mockRestore();
  });

  it('computes the theme and passes it to ThemeProvider', () => {
    render(
      <OverlayWindow>
        <div data-testid="child">child</div>
      </OverlayWindow>
    );

    expect(screen.queryByTestId('child')).not.toBeNull();
    expect(screen.queryByTestId('theme-provider')).not.toBeNull();

    expect(adaptV4Theme).toHaveBeenCalledTimes(1);
    expect(createTheme).toHaveBeenCalledTimes(1);

    const adaptArg = adaptV4Theme.mock.calls[0][0];

    expect(adaptArg).toEqual(
      expect.objectContaining({
        0: expect.objectContaining({
          MuiDialog: {
            paper: {
              width: '770px',
              height: '620px',
              borderRadius: '5px !important',
              backgroundColor: '#ffffff !important',
              padding: '0px 20px 0px 20px !important',
            },
          },
          MuiTypography: {
            root: {
              fontSize: '14px !important',
              color: '#000000',
            },
          },
          MuiDialogTitle: {
            root: {
              padding: '15px 15px 15px 0 !important',
              '& h2': {
                fontSize: '22px !important',
              },
            },
          },
          MuiDialogContent: {
            root: {
              color: '#000045',
              '& p': {
                fontSize: '14px',
              },
              padding: '20px 0px 0px 0px !important',
              '& ul': {
                marginTop: '0px',
                paddingTop: '0px',
              },
            },
          },
          MuiButton: {
            root: {
              width: '133px',
              height: '35px',
              backgroundColor: '#337ab7',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#2e6da4',
              },
            },
          },
          MuiListI: {
            root: {
              marginTop: '-15px !important',
              fontSize: '14px',
            },
            padding: {
              paddingTop: '0px !important',
            },
          },
          MuiListItem: {
            root: {
              fontSize: '14px',
              padding: '2px 0px 0px 25px !important',
            },
          },
          MuiListItemIcon: {
            root: {
              marginBottom: 'auto',
              fontSize: '12px',
              color: '#000000',
              width: '10px',
              minWidth: '2px',
              paddingTop: '10px',
            },
          },
          MuiDialogContentText: {
            root: {
              color: '#000000',
              marginBottom: '10px',
              '& p.lastChild': {
                marginBottom: '0px',
              },
            },
          },
          MuiBackdrop: {
            root: {
              backgroundColor: '#00000047',
            },
          },
          MuiDialogActions: {
            root: {
              height: '75px',
              justifyContent: 'right !important',
              padding: '30px 10px 25px 0px !important',
            },
          },
        }),
      })
    );

    expect(createTheme).toHaveBeenCalledWith(
      adaptV4Theme.mock.results[0].value
    );
  });

  it('renders safely when children is undefined', () => {
    render(<OverlayWindow />);

    expect(adaptV4Theme).toHaveBeenCalledTimes(1);
    expect(createTheme).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('theme-provider')).not.toBeNull();
  });

  it('overwrites existing override keys on themes.light.overrides', () => {
    themes.light.overrides.MuiDialog = {
      paper: { width: '123px', custom: true },
    };
    themes.light.overrides.MuiDialogActions = { root: { height: '10px' } };

    render(<OverlayWindow />);

    expect(themes.light.overrides.MuiDialog).toMatchObject({
      paper: {
        width: '770px',
        height: '620px',
        borderRadius: '5px !important',
        backgroundColor: '#ffffff !important',
        padding: '0px 20px 0px 20px !important',
      },
    });

    expect(themes.light.overrides.MuiDialogActions).toMatchObject({
      root: {
        height: '75px',
        justifyContent: 'right !important',
        padding: '30px 10px 25px 0px !important',
      },
    });
  });
});

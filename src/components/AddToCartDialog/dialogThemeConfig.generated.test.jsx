import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useTheme } from '@material-ui/core/styles';
import DialogThemeProvider from './dialogThemeConfig.jsx';

jest.mock('../../themes', () => {
  const lightTheme = { overrides: {} };
  const darkTheme = { overrides: {} };
  const namedOverrides = {
    typography: {
      fontSize: 14,
    },
  };

  return {
    __esModule: true,
    default: {
      light: lightTheme,
      dark: darkTheme,
    },
    overrides: namedOverrides,
  };
});

const getThemesMock = () => jest.requireMock('../../themes');

const ThemeCaptureChild = ({ onTheme, label = 'child' }) => {
  const theme = useTheme();

  React.useEffect(() => {
    onTheme(theme);
  }, [onTheme, theme]);

  return <div data-testid="child">{label}</div>;
};

describe('DialogThemeProvider', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  beforeEach(() => {
    const themesMock = getThemesMock();
    themesMock.default.light.overrides = {};
    themesMock.default.dark.overrides = {};
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  test('renders children and provides the expected theme overrides', async () => {
    let capturedTheme = null;

    render(
      <DialogThemeProvider>
        <ThemeCaptureChild
          onTheme={theme => {
            capturedTheme = theme;
          }}
        />
      </DialogThemeProvider>
    );

    await screen.findByTestId('child');

    expect(capturedTheme).toBeTruthy();
    expect(screen.getByTestId('child')).toHaveTextContent('child');

    expect(capturedTheme.overrides).toBeTruthy();
    expect(capturedTheme.overrides.MuiDialog).toEqual({
      paper: {
        width: '431px',
        height: '200px',
        borderRadius: '25px !important',
        textAlign: 'center',
        backgroundColor: '#E8DFDC !important',
        border: '2px solid #A61401',
      },
    });

    expect(capturedTheme.overrides.MuiDialogContent).toEqual({
      root: {
        padding: '40px 20px 0px 20px !important',
      },
    });

    expect(capturedTheme.overrides.MuiButton).toEqual({
      root: {
        width: '133px',
        height: '45px',
      },
    });

    expect(capturedTheme.overrides.MuiDialogActions).toEqual({
      root: {
        justifyContent: 'center !important',
        paddingBottom: '25px !important',
      },
    });
  });

  test('mutates themes.light.overrides with the expected keys', () => {
    render(
      <DialogThemeProvider>
        <div>content</div>
      </DialogThemeProvider>
    );

    const themesMock = getThemesMock();

    expect(themesMock.default.light.overrides.MuiDialog).toEqual({
      paper: {
        width: '431px',
        height: '200px',
        borderRadius: '25px !important',
        textAlign: 'center',
        backgroundColor: '#E8DFDC !important',
        border: '2px solid #A61401',
      },
    });

    expect(themesMock.default.light.overrides.MuiDialogContent).toEqual({
      root: {
        padding: '40px 20px 0px 20px !important',
      },
    });

    expect(themesMock.default.light.overrides.MuiButton).toEqual({
      root: {
        width: '133px',
        height: '45px',
      },
    });

    expect(themesMock.default.light.overrides.MuiDialogActions).toEqual({
      root: {
        justifyContent: 'center !important',
        paddingBottom: '25px !important',
      },
    });
  });

  test('does not throw when children is null', () => {
    expect(() => {
      render(<DialogThemeProvider>{null}</DialogThemeProvider>);
    }).not.toThrow();

    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  test('works with arbitrary child content', async () => {
    const childText = 'Any nested UI';
    let capturedTheme = null;

    render(
      <DialogThemeProvider>
        <ThemeCaptureChild
          label={childText}
          onTheme={theme => {
            capturedTheme = theme;
          }}
        />
      </DialogThemeProvider>
    );

    await screen.findByTestId('child');

    expect(capturedTheme).toBeTruthy();
    expect(screen.getByTestId('child')).toHaveTextContent(childText);
  });
});

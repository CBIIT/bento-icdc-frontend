import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

const NavBarThemeProvider = ({ children }) => {
  const style = [];
  const overridesObj = themes.light.overrides;
  const MuiButton = {
    root: {
      '&#button_navbar_mycases': {},
    },
  };

  const MuiAppBar = {
    root: {
      width: '100% !important',
    },
    positionFixed: {
      position: 'relative',
      zIndex: 10,
    },
  };

  overridesObj.MuiButton = MuiButton;
  overridesObj.MuiAppBar = MuiAppBar;

  style.push(overridesObj);
  const computedTheme = createTheme({
    ...themes.light,
    ...overrides,
    ...style,
  });

  return <MuiThemeProvider theme={computedTheme}>{children}</MuiThemeProvider>;
};

export default NavBarThemeProvider;

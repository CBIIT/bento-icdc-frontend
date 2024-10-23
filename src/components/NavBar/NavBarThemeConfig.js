import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';
import { StyledEngineProvider } from '@mui/material';

export default ({
  children,
}) => {
  const style = [];
  const overridesObj = themes.light.overrides;
  const MuiButton = {
    root: {
      '&#button_navbar_mycases': {
        marginRight: '-16px',
      },
    },
  };

  const MuiAppBar = {
    positionFixed: {
      position: 'relative',
    },
  };

  overridesObj.MuiButton = MuiButton;
  overridesObj.MuiAppBar = MuiAppBar;

  style.push(overridesObj);
  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <StyledEngineProvider>
        <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

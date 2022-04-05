import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

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

  overridesObj.MuiButton = MuiButton;

  style.push(overridesObj);
  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

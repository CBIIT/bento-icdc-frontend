import React from 'react';
import _ from 'lodash';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiDivider = {
    root: {
      height: '0px',
    },
  };

  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
  });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

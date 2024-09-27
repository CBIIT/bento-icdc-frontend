import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import _ from 'lodash';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
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

  const computedTheme = createTheme(adaptV4Theme({
    ...themesLight,
    ...overrides,
  }));

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={computedTheme}>
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

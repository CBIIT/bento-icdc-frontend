import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import _ from 'lodash';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTab = {
    root: {
      minWidth: '130px',
      '@media (min-width: 600px)': {
        minWidth: '110px',
      },
      '&:first-child': {
        paddingLeft: '0px',
        marginLeft: '-5px',
      },
    },
  };

  const computedTheme = createTheme(adaptV4Theme({
    ...themesLight,
    ...overrides,
  }));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={computedTheme}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

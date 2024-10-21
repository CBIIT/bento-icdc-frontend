import React from 'react';
//import { adaptV4Theme } from '@mui/material/styles';
import {ThemeProvider} from '@material-ui/core'
import _ from 'lodash';
import { StyledEngineProvider, createTheme } from '@mui/material';
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

  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={computedTheme}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

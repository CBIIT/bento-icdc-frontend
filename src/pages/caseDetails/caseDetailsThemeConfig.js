import React from 'react';
import _ from 'lodash';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTableCell = {
    ...themesLight.overrides.MuiTableCell,
    root: {
      '&:first-child': {
        paddingLeft: '38px',
      },
      '&:last-child': {
        paddingRight: '38px',
      },
    },
  };
  themesLight.overrides.GridView = {
    tableGrid: {
      marginLeft: '0px',
    },
  };
  themesLight.overrides.MuiGrid = {
    ...themesLight.overrides.MuiGrid,
    item: {
      paddingLeft: '0px',
      margin: '0px',
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

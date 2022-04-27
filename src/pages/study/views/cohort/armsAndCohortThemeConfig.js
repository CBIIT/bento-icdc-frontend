import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTableCell = {
    ...themesLight.overrides.MuiTableCell,
    root: {
      '&:first-child': {
        paddingLeft: '30px',
      },
      '&:lastchild': {
        paddingRight: '30px',
      },
    },
  };

  themesLight.overrides.MUIDataTableToolbar = {
    ...themesLight.overrides.MUIDataTableToolbar,
    root: {
      backgroundColor: '#ffffff',
      paddingLeft: '0px',
    },
    actions: {
      '& span': {
        '& button': {
          right: '0px',
        },
      },
    },
    titleText: {
      fontSize: '1.142rem',
    },
  };

  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
  });

  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};

import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import _ from 'lodash';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTableCell = {
    ...themesLight.overrides.MuiTableCell,
    root: {
      '&:first-child': {
        paddingLeft: '35px',
      },
      '&:last-child': {
        paddingRight: '35px',
        textAlign: 'center',
      },
    },
  };

  themesLight.overrides.MUIDataTableHeadCell = {
    ...themesLight.overrides.MUIDataTableHeadCell,
    fixedHeader: {
      ...themesLight.overrides.MUIDataTableHeadCell.fixedHeader,
      '&:first-child': {
        paddingLeft: '35px',
      },
      '&:last-child': {
        paddingRight: '35px',
      },
    },
  };

  themesLight.overrides.MUIDataTableToolbar = {
    ...themesLight.overrides.MUIDataTableToolbar,
    actions: {
      paddingRight: '35px',
      '& span': {
        '& button': {
          right: '0px',
        },
      },
    },
    root: {
      maxHeight: '50px',
      minHeight: '50px',
    },
  };

  themesLight.overrides.MuiTablePagination = {
    ...themesLight.overrides.MuiTablePagination,
    root: {
      '&:last-child': {
        paddingRight: '35px',
      },
    },
  };

  themesLight.overrides.MuiIconButton = {
    ...themesLight.overrides.MuiIconButton,
    root: {
      '&:first-child': {
        marginLeft: '-8px',
      },
      '&:last-child': {
        marginRight: '-16px',
      },
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

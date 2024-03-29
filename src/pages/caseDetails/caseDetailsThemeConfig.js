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
      padding: '0px 11px',
      margin: '0px',
    },
    container: {
      display: 'unset',
    },
  };
  themesLight.overrides.MuiTableCell = {
    root: {
      borderBottom: '0px',
      padding: '5px',
    },
    paddingCheckbox: {
      padding: '0px 5px',
    },
  };
  themesLight.overrides.MuiButton = {
    root: {
      '&#jbrowse_multi_view_button': {
        marginLeft: '28px',
        height: '43px',
        color: '#ffffff',
        textTransform: 'inherit',
      },
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

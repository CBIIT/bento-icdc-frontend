import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

export default ({
  children,
}) => {
  const style = [];
  const overridesObj = themes.light.overrides;

  const tableBorder = '#004c73 3px solid';
  overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
  overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderTop = tableBorder;
  overridesObj.MUIDataTableHeadCell.fixedHeader.borderBottom = tableBorder;
  overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
  overridesObj.MuiTableCell.paddingCheckbox.padding = '0px 31px';
  overridesObj.MUIDataTableToolbarSelect = {
    root: {
      backgroundColor: '#FFFFFF',
    },
    title: {
      marginLeft: '15px',
    },
  };
  overridesObj.MUIDataTableToolbar = {
    root: {
      minHeight: '15px',
      paddingTop: '20px',
      backgroundColor: '#fffff',
      paddingLeft: '0px',
      paddingRight: '35px',
    },
    titleRoot: {
      minHeight: '50px',
    },
    actions: {
      paddingRight: '35px',
      '& span': {
        '& button': {
          right: '10px',
          top: '-10px',
        },
      },
      '& button': {
        right: '10px',
        top: '-10px',
      },
    },
  };
  overridesObj.MuiGrid.xs = {
    paddingLeft: '0px',
  };
  overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';
  overridesObj.MuiTablePagination.actions.marginRight = '6px';
  overridesObj.MuiTableCell.head.paddingLeft = '37px';
  overridesObj.MuiTableCell.body.paddingLeft = '37px';

  style.push(overridesObj);
  const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../../themes';

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
  overridesObj.MUIDataTableToolbar = { root: { minHeight: '15px' } };
  overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';
  overridesObj.MuiTablePagination.actions.marginRight = '30px';
  overridesObj.MuiTableCell.head.paddingLeft = '30px';
  overridesObj.MuiTableCell.body.paddingLeft = '30px';

  style.push(overridesObj);
  const computedTheme = createMuiTheme({ ...themes.light, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

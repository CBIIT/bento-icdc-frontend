import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({
  children, extraStyles, tableBorder, tablecolor,
}) => {
  const style = [];

  const overridesObj = themes.light.overrides;

  if (extraStyles) style.push(extraStyles);

  if (tableBorder) {
    overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
    overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeaderCommon.borderTop = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeaderCommon.borderBottom = tableBorder;
    overridesObj.MuiPrivateTabIndicator.root.transitionProperty = 'none';
    overridesObj.MuiPrivateTabIndicator.colorPrimary = { backgroundColor: tableBorder.split(' ')[0] };
    overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
    overridesObj.MUIDataTableToolbar = { root: { minHeight: '15px' } };
  }

  const MuiTabs = {
    root: {
      marginTop: '15px',
    },
    flexContainer: {
      borderBottom: '1px solid #6B6B6B',
      overflow: 'visible !important',
    },
  };

  const MuiTab = {
    root: {
      width: '250px',
      height: '45px',
      minHeight: '40px',
      marginRight: '10px',
      background: '#EAEAEA',
      '&$selected': {
        background: tablecolor,
      },
    },
    labelContainer: {
      fontSize: '18px',
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      lineHeight: '18px',
      paddingLeft: '5px',
      letterSpacing: '0.25px',
    },
  };

  overridesObj.MuiTabs = MuiTabs;
  overridesObj.MuiTab = MuiTab;

  const MUIDataTable = {
    responsiveStacked: {
      transform: 'rotateX(180deg)',
    },
    tableRoot: {
      transform: 'rotateX(180deg)',
    },
  };

  overridesObj.MUIDataTable = MUIDataTable;
  style.push(overridesObj);

  const computedTheme = createMuiTheme({
    ...themes.light,
    ...overrides,
    ...style,
    typography: {
      useNextVariants: true,
    },
  });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

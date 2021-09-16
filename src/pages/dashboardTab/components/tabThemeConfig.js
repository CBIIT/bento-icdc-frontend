import React from 'react';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../themes';

export default ({
  children, extraStyles, tableBorder, tablecolor,
}) => {
  const style = [];

  const themesLight = _.cloneDeep(themes.light);
  const overridesObj = themesLight.overrides;

  if (extraStyles) style.push(extraStyles);

  if (tableBorder) {
    overridesObj.MUIDataTableToolbarSelect.root.borderTop = '2px solid #e7e5e5';
    overridesObj.MUIDataTableSelectCell.headerCell.borderTop = tableBorder;
    overridesObj.MUIDataTableSelectCell.headerCell.borderBottom = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeader.borderTop = tableBorder;
    overridesObj.MUIDataTableHeadCell.fixedHeader.borderBottom = tableBorder;
    overridesObj.MuiTableFooter = { root: { borderTop: tableBorder } };
    overridesObj.MUIDataTableToolbar = {
      root: {
        minHeight: '0px',
        maxHeight: '0px',
      },
      actions: {
        '& span': {
          '& button': {
            right: '37px',
            bottom: '80px',
          },
        },
        '& button': {
          right: '72px',
          bottom: '65px',
        },
      },
    };
    overridesObj.MuiTablePagination.toolbar.paddingTop = '11px';
    overridesObj.MuiTablePagination.actions.marginRight = '32px';
    overridesObj.MUIDataTableFooter.root.borderBottom = tableBorder;
  }

  const PrivateTabIndicator = {
    root: {
      transitionProperty: 'none',
      height: '0px',
    },
  };

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
      borderTop: '7px solid #c6c9cd',
      '&$selected': {
        borderTop: `7px solid ${tablecolor}`,
        color: tablecolor,
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
  overridesObj.PrivateTabIndicator = PrivateTabIndicator;

  style.push(overridesObj);

  const computedTheme = createMuiTheme({ ...themesLight, ...overrides, ...style });

  return (
    <MuiThemeProvider theme={computedTheme}>
      {children}
    </MuiThemeProvider>
  );
};

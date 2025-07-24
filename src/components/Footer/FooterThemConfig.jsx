import React from 'react';
import _ from 'lodash';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../themes';

const FooterThemeConfig = ({ children }) => {
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiDivider = {
    root: {
      height: '0px',
    },
  };

  const computedTheme = createTheme({
    ...themesLight,
    ...overrides,
  });

  return <MuiThemeProvider theme={computedTheme}>{children}</MuiThemeProvider>;
};

export default FooterThemeConfig;

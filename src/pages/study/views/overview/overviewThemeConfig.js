import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides } from '../../../../themes';

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
      '&:nth-child(-n+2)': {
        paddingLeft: '0px',
        marginLeft: '0px',
        '& span:first-child': {
          borderRight: '1px solid #6e6e6e',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
      },
    },
  };

  themesLight.overrides.MuiGrid = {
    item: {
      marginBottom: '0px',
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

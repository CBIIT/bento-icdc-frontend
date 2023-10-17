import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    MuiPaper: {
      root: {
        paddingRight: '0px !important',
      },
    },
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};

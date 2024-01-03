import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const GSThemeProvider = ({
  children,
}) => {
  const theme = {
    override: {
      
    },
  };
  return (
    <ThemeProvider theme={createTheme(theme)}>
      {children}
    </ThemeProvider>
  );
};

export default GSThemeProvider;
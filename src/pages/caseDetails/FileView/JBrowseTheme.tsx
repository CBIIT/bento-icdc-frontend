import React, { ReactNode } from 'react';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: '43px',
          marginLeft: '22px',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

type CustomThemeProviderProps = {
  children: ReactNode;
};

const JBrowseThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default JBrowseThemeProvider;

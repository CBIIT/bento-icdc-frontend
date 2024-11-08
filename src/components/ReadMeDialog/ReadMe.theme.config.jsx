import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ReadMeThemeConfig = ({ children }) => {
  const theme = {
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            maxWidth: '960px',
            maxHeight: '650px',
            borderRadius: '5px',
            padding: '0px 0px 0px 20px',
            boxShadow: 'none',
            overflowX: 'hidden',
            overflowY: 'hidden',
          },
          paperScrollPaper: {
            maxHeight: '650px',
          },
          paperWidthMd: {
            minWidth: '750px',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: '#4a4a4a52',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#0d71a3',
          },
        },
      },
    },
  };

  const computedTheme = createTheme(theme);
  return <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>;
};

export default ReadMeThemeConfig;

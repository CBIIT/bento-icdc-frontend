import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DashboardThemeProvider = ({ children }) => {
  const theme = {
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            borderTop: '5px solid red',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&#jbrowse_multi_view_button': {
              padding: '0px',
              color: '#ffffff',
              height: '43px',
              marginLeft: '22px',
              textTransform: 'inherit',
              opacity: 1,
              '& img': {
                width: '2.25em',
              },
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&#jbrowse_help_icon_btn': {
              marginTop: '7px',
              zIndex: '10',
            },
          },
        },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default DashboardThemeProvider;

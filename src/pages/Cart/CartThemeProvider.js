import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CartThemeProvider = ({ children }) => {
  const theme = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&#jbrowse_multi_view_button': {
              fontFamily: 'Lato',
              fontWeight: 400,
              marginLeft: '22px',
              height: '43px',
              color: '#09557B !important',
              backgroundColor: '#ffffff',
              textTransform: 'inherit',
              border: '2px solid #09557B',
              fontSize: '16px',
              '& img': {
                width: '2.25em',
              },
            },
          },
        },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default CartThemeProvider;

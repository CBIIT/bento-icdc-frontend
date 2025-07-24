import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const GlobalSearchThemeProvider = ({ children }) => {
  const theme = {
    overrides: {
      MuiInputLabel: {
        root: {
          width: 0,
          height: 0,
        },
      },
      MuiInputBase: {
        root: {
          background: '#fff',
          //   border: '2px solid #044A84',
          color: '#0B3557',
        },
      },
      MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
        },
      },
      MuiAutocomplete: {
        inputRoot: {
          padding: '2px 20px 3px 20px !important',
        },
        input: {
          padding: '9.5px 4px',
        },
        endAdornment: {
          top: 'calc(50% - 17px)',
          right: '45px !important',
        },
        listbox: {
          color: '#142D64',
          border: '2px solid #044A84',
          fontSize: '18px',
          fontFamily: 'Lato',
          fontWeight: '500',
          borderRadius: '8px',
          padding: '0',
        },
        paper: {
          borderRadius: '8px',
        },
        option: {
          border: '1px solid #4A8ECB',
        },
      },
      MuiOutlinedInput: {
        root: {
          border: 'none',
          color: '#0B3557',
          fontSize: '25px',
          fontFamily: 'Lato',
          '&:hover': {
            borderColor: '#747474 !important',
          },
        },
        notchedOutline: {
          border: '2px solid #747474',
          borderColor: '#747474 !important',
          '&:hover': {
            borderColor: '#747474 !important',
          },
        },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default GlobalSearchThemeProvider;

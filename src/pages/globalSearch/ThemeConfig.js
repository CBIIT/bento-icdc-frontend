import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';

export default ({
  children,
}) => {
  const theme = {
    overrides: {
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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(adaptV4Theme(theme))}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

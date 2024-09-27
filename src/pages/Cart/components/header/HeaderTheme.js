import React from 'react';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material';

export default ({
    children,
  }) => {
  const theme = {
    overrides: {
      MuiRadio: {
        root: {
          color: '#09557B',
        },
        colorSecondary: {
          '&$checked': {
            color: '#09557B',
          },
        },
      },
      MuiFormControlLabel: {
        label: {
          color: '#525252',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: '400',
        },
        root: {
          "&.selectFilesBtn":{
              marginRight: '30px',
          }
        }
      },
      MuiList: {
        root: {
            width: '250px',
        }
      },
      MuiListItem: {
        root: {
          padding: '2px 12px',
          color: '#fff',
          overflow: 'auto',
          whiteSpace: 'wrap',
          '&.donwloadManiFestBtn': {
            borderTop: '1px solid #fff',
          },
          '&:hover': {
            background: '#1A3D69',
          }
        },
      },
      MuiOutlinedInput: {
        root: {
          height: '100%',
          '& textarea': {
            height: '172px !important',
          },
        },
      },
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};
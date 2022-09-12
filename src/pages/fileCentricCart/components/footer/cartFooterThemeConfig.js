import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

export default ({
  children,
}) => {
  const theme = {
    overrides: {
      MuiButton: {
        root: {
          height: ' 36px',
          color: '#ffffff',
          textTransform: 'inherite',
          borderRadius: '2px',
        },
        '&.disabled': {
          color: '#ffffff',
        },
      },
      '&.MuiButton-disabled': {
        color: '#ffffff',
      },
      MuiIconButton: {
        root: {
        },
      },
    },
  };

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      {children}
    </MuiThemeProvider>
  );
};

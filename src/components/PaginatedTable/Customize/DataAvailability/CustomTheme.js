import React from 'react';
// import { adaptV4Theme } from '@mui/material/styles';
import {
    MuiThemeProvider,
    // createTheme 
} from '@material-ui/core/styles';
import {
    // ThemeProvider as MuiThemeProvider, // use this after bento-frontend has been migrated to v5
    StyledEngineProvider,
    createTheme
} from '@mui/material';

export default ({
  children,
}) => {
  const theme = {
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: '#ffffff',
          color: '#1c2023',
          maxWidth: '220px',
          fontSize: '0.75rem',
          border: '2px solid #a7afb3',
          fontFamily: 'Open Sans',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.6',
          padding: '10px 12px',
          borderRadius: '0px',
        },
      },
    },
  };

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={createTheme(theme)}>
        {children}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

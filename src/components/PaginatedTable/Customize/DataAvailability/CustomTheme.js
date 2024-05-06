import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

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
    <ThemeProvider theme={createTheme(theme)}>
      {children}
    </ThemeProvider>
  );
};

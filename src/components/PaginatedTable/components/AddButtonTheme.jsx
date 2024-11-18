import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const AddFilesButtonTheme = ({ children }) => {
  const theme = {
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: '#ffffff',
          color: '#1c2023',
          maxWidth: '220px',
          fontSize: '0.75rem',
          border: '2px solid #a7afb3 !important',
          fontFamily: 'Open Sans',
          fontWeight: '600',
          textAlign: 'left',
          lineHeight: '1.6',
          padding: '10px 12px',
          borderRadius: '0px',
        },
      },
      MuiContainer: {
        maxWidthXl: {
          '@media (min-width: 1920px)': {
            maxWidth: '100%',
            background: '#f3f3f3',
          },
        },
        root: {
          paddingLeft: '19px !important',
          '& img': {
            width: '17px',
            '&.addAllTooltip': {
              verticalAlign: 'top',
              marginTop: '8px',
            },
            '&.add_selected_file_tooltip_icon': {
              verticalAlign: 'top',
              marginTop: '8px',
            },
          },
        },
      },
      MuiButton: {
        text: {
          padding: '10px 16px',
        },
        root: {
          color: '#fff',
          fontSize: '12px',
          marginTop: '6px',
          fontFamily: 'Lato',
          borderRadius: '10px',
          marginBottom: '10px',
          textTransform: 'uppercase',
          '&.add_selected_button': {
            color: '#fff',
            backgroundColor: '#ff7e15',
            marginRight: '10px',
            textTransform: 'none',
          },
          '&$disabled': {
            opacity: '0.3',
          },
        },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default AddFilesButtonTheme;

import React from 'react';
import { ThemeProvider, createTheme, Theme } from '@material-ui/core/styles';

const theme: Theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#ffffff',
        color: '#1c2023',
        maxWidth: '220px',
        fontSize: '0.75rem',
        border: '2px solid #a7afb3 !important',
        fontFamily: 'Open Sans',
        fontWeight: 600,
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
        },
        '&.add_all_button': {
          marginRight: '10px',
          marginLeft: '25px',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          backgroundColor: '#B35000',
          textTransform: 'none',
        },
      },
      root: {
        paddingTop: '5px',
        '&.container_header': {
          textAlign: 'left',
        },
        '&.container_footer': {
          paddingTop: '10px',
          textAlign: 'left',
        },
        '&.container_footer_link': {
          textAlign: 'left',
          paddingRight: '100px',
          height: '65px',
          color: '#3E6886',
          fontSize: '12px',
          fontFamily: 'Lato',
          textDecoration: 'none',
        },
        '& img': {
          width: '17px',
          '&.add_all_file_tooltip_icon': {
            verticalAlign: 'top',
            marginTop: '8px',
            marginLeft: '3px',
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
        '&.add_all_button': {
          color: '#fff',
          fontSize: '16px',
          marginTop: '6px',
          fontFamily: 'Lato',
          marginRight: '5px',
          borderRadius: '10px',
          marginBottom: '10px',
          backgroundColor: '#142D64',
          textTransform: 'none',
        },
        '&.add_selected_button': {
          marginRight: '10px',
          marginLeft: '25px',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          backgroundColor: '#B35000',
          textTransform: 'none',
          '& img': {
            width: '2.25em',
          },
          '&$disabled': {
            opacity: '0.7',
            textTransform: 'none',
          },
        },
        '&.yesBtn': {
          width: '133px',
          height: '45px',
          cursor: 'pointer',
          background: '#757575',
        },
        '&.noBtn': {
          width: '133px',
          height: '45px',
          cursor: 'pointer',
          background: '#42779a',
        },
      },
    },
    MuiLink: {
      root: {
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
        '&.go_to_cart': {
          color: '#3E6886',
          fontsize: '12px',
          fontFamily: 'Lato',
          marginLeft: '55px',
          borderBottom: '1px solid #3E6886',
        },
      },
    },
    MuiDialog: {
      paper: {
        width: '431px',
        height: '170px',
        borderRadius: '25px !important',
        textAlign: 'center',
        backgroundColor: '#E8DFDC !important',
        border: '2px solid #A61401',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '40px 20px 0px 20px',
        '&.alter-content': {
          fontFamily: 'Lato',
          size: '16px',
        },
      },
    },
    MuiDialogActions: {
      root: {
        justifyContent: 'center',
        paddingBottom: '25px',
      },
    },
  },
});

interface ComponentProps {
  children: React.ReactNode;
}

export const TableLayoutTheme: React.FC<ComponentProps> = ({ children }) => (
  <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>
);

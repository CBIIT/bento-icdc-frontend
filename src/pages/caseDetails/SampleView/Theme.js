export const customTheme = {
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
  MuiContainer: {
    maxWidthXl: {
      '@media (min-width: 1920px)': {
        maxWidth: '100%',
      },
    },
    root: {
      background: '#f3f3f3',
      paddingTop: '5px',
      paddingLeft: '19px !important',
      '& .add_selected_file_tooltip_icon': {
        width: '17px !important',
      },
      '&.container_header': {
        textAlign: 'right',
      },
      '&.container_footer': {
        paddingTop: '10px',
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '100px',
        height: '65px',
        color: '#3E6886',
        fontSize: '12px',
        fontFamily: 'Lato',
        borderBottom: '1px solid #3E6886',
        textDecoration: 'none',
      },
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
      '&.add_all_button': {
        marginRight: '24px',
        // width: '120px',
        backgroundColor: '#142D64',
      },
      '&.add_selected_button': {
        marginRight: '10px',
        textTransform: 'none',
      },
      '&.add_selected_button_sample': {
        backgroundColor: '#ff7e15',
      },
      '&.add_selected_button_file': {
        backgroundColor: '#ff7e15',
      },
      '&#jbrowse_multi_view_button': {
        padding: '0px 6px',
        color: '#00000',
        height: '43px',
        marginLeft: '22px',
        textTransform: 'inherit',
        '& img': {
          width: '2.25em',
        },
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_sample': {
          opacity: 0.3,
        },
        '&.add_selected_button_file': {
          opacity: 0.3,
        },
      },
    },
  },
  MuiIconButton: {
    root: {
      padding: '4px 12px 12px 15px',
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
};

export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: "'Lato', 'Raleway', sans-serif",
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
    },
  },
  MuiTableCell: {
    root: {
      backgroundColor: '#f5f5f5',
      color: '#194563',
    },
  },
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
};

const tblBody = {
  MuiCheckbox: {
    colorSecondary: {
      '&.Mui-checked': {
        color: '#13344A',
      },
    },
  },
  MuiTableCell: {
    root: {
      padding: '0px 5px 0px 15px',
    },
  },
  MuiTypography: {
    body1: {
      fontSize: '10pt',
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: '600',
      color: '#13344A',
      letterSpacing: '0.025em',
    },
  },
  MuiSvgIcon: {
    root: {
      color: '#0B3556',
    },
  },
};

export const extendedView = ({
  primaryColor = '#FF9742',
  selectedRows = [],
}) => {
  const hidden = selectedRows.length > 0;
  return {
    extendedView: {
      MuiContainer: {
        background: '#fff',
      },
      tblTopPgn: {
        MuiTablePagination: {
          root: {
            paddingRight: '43px',
            borderTop: `3px solid ${primaryColor}`,
          },
        },
      },
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
      MuiList: {
        root: {
          '&.viewColumnList': {
            padding: '8px 42px 8px 10px',
            '& img': {
              width: '25px',
              marginRight: '10px',
            },
          },
        },
      },
      MuiToolbar: {
        root: {
          display: 'block',
          position: 'relative',
          textAlign: 'right',
          '&.downloadAndColumnView': {
            '& button': {
              '&.download-icon': {
                marginRight: '-10px',
                display: hidden ? 'none' : '',
              },
              '&.manageViewColumnBtn': {
                display: hidden ? 'none' : '',
                marginBottom: '0px',
                zIndex: '10',
              },
            },
          },
        },
      },
    },
  };
};

export const tblePaginationTheme = (data) => ({
  tblPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '43px',
        borderTop: '3px solid #004c73',
        paddingTop: '0',
        paddingBottom: '0',
        display: `${data.length > 0 ? '' : 'none'}`,
        borderBottom: `3px solid ${data.length > 0 ? '#004c73' : '#e7e5e5'}`,
        '&:last-child': {
          paddingRight: '43px',
        },
      },
      toolbar: {
        minHeight: '45px',
      },
    },
  },
});

const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      // transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    },
  },
  MuiTable: {
    root: {
      // transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
    },
  },
};

// export const themeConfig = {
//   customTheme,
//   tblHeader,
//   tblBody,
// };

export const themeConfig = (table, data) => ({
  customTheme,
  tblBody,
  tblHeader,
  ...tblePaginationTheme(data),
  tblContainer,
  ...extendedView(table),
});

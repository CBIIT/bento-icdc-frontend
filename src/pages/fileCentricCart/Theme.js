export const headerTheme = ({ primaryColor = '#004c73' }) => ({
  tblHeader: {
    MuiTableSortLabel: {
      root: {
        color: '#13344A',
        position: 'relative',
        fontSize: '11pt',
        fontFamily: 'Lato Regular,Raleway, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '0.06em',
        textDecoration: 'none',
        '&:hover': {
          color: '#13344A',
        },
        '&:hover $svg': {
        },
      },
    },
    MuiTableCell: {
      root: {
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        '&.data_availability': {
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '600',
          padding: '0',
        },
        '&.del_all_row': {
          textAlign: 'center',
          padding: '0px 20px, 0px, 0px',
        },
        '&.group_1': {
          padding: '0',
        },
      },
      paddingCheckbox: {
        '& label': {
          marginRight: '5px',
        },
      },
    },
    MuiTableRow: {
      head: {
        height: '40px',
        borderBottom: `3px solid ${primaryColor}`,
        background: '#f5f5f5',
        '&.column_grouping': {
          background: '#fff',
          padding: '0',
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
      arrow: {
        color: '#ffffff',
        marginTop: '-0.71em',
        marginLeft: '0px',
        marginRight: '4px',
        fontSize: '1.25rem',
        '&:before': {
          border: '2px solid #a7afb3',
        },
      },
    },
  },
});

export const tblContainer = {
  overrides: {
    MuiGrid: {
      container: {
        margin: '50px 0px 30px 0px',
        background: '#f3f3f4',
        padding: '30px 0px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      },
      root: {
        padding: '0px 30px',
      },
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
      tblTopPgn: {
        MuiTablePagination: {
          root: {
            paddingRight: '20px',
            borderTop: `3px solid ${primaryColor}`,
          },
        },
      },
      MuiTooltip: {
        root: {
          background: '#fff',
        },
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
        regular: {
          background: '#fff',
        },
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

export const customTheme = {
  MuiIconButton: {
    label: {
      width: '17px',
    },
  },
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '&.container_outer_layout': {
        maxWidth: '100%',
        height: '75px',
        borderBottom: '#686F7F 3px solid',
        '& img': {
          float: 'left',
          marginTop: '-25px',
          marginLeft: '-33px',
          width: '101px',
          filter: 'drop-shadow(-3px 2px 6px rgba(27,28,28,0.29))',
        },
        '& span': {
          color: '#03a383',
          fontSize: '18pt',
          fontFamily: 'Open Sans, sans-serif',
          lineHeight: '55px',
          '&.cart_header_text': {
            letterSpacing: '0.017em',
            fontWeight: 'bold',
            color: '#ff8a00',
            fontSize: '30px',
            lineHeight: '55px',
            marginLeft: '20px',
          },
        },
      },
      '&.container_footer': {
        maxWidth: '100%',
        textAlign: 'left',
        paddingLeft: '24px',
      },
    },
  },
  MuiButton: {
    root: {
      '&#jbrowse_multi_view_button': {
        marginLeft: '22px',
        height: '43px',
        color: '#ffffff',
        textTransform: 'inherit',
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

export const tblPgn = {
  MuiTablePagination: {
    root: {
      background: '#fff',
      paddingRight: '50px',
      borderTop: '3px solid #004c73',
      paddingTop: '0',
      paddingBottom: '0',
      borderBottom: '3px solid #e7e5e5',
      '&:last-child': {
        paddingRight: '28px',
      },
    },
    toolbar: {
      minHeight: '45px',
    },
  },
};

const displayErr = {
  MuiContainer: {
    root: {
      background: '#fff',
    },
    maxWidthLg: {
      '@media (min-width: 1920px)': {
        maxWidth: '100%',
      },
      '@media (min-width: 1280px)': {
        maxWidth: '100%',
      },
    },
  },
};

export const themeConfig = (table) => ({
  ...headerTheme(table),
  ...extendedView(table),
  customTheme,
  tblPgn,
  displayErr,
});

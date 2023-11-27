export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#003559',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#003559',
      },
      '&:hover $svg': {
        color: '#003559',
      },
    },
  },
  MuiTableCell: {
    root: {
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '15px',
      paddingBottom: '15px',
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      background: '#ffffff',
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
};

export const tblContainer = {
  tblContainer: {
    MuiTableContainer: {
      root: {
        width: '100%',
        overflowX: 'auto',
        transform: 'rotateX(180deg)',
        boxShadow: 'none',
        borderRadius: '0',
      },
    },
    MuiTable: {
      root: {
        transform: 'rotateX(180deg)',
        width: '100%',
        display: 'table',
        borderSpacing: '0',
        borderCollapse: 'collapse',
      },
    },
  },
};

export const extendedView = () => ({
  extendedView: {
    tblTopPgn: {
      MuiTablePagination: {
        root: {
          width: '30%',
          float: 'right',
          minWidth: '500px',
        },
        toolbar: {
          minHeight: '45px',
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
        fontFamily: 'Open Sans',
        border: '2px solid #a7afb3',
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
        width: '40%',
        display: 'block',
        position: 'relative',
        textAlign: 'right',
        '&.downloadAndColumnView': {
          width: '100px',
          float: 'right',
          padding: '0px',
          marginRight: '5px',
          backgroundColor: '#ffffff',
          minHeight: '44px',
          '& button': {
            '&.download-icon': {
              marginRight: '-10px',
            },
            '&.manageViewColumnBtn': {
              zIndex: '10',
            },
          },
        },
      },
    },
  },
});

export const customTheme = {
  MuiAccordionDetails: {
    root: {
      paddingLeft: '10%',
    },
  },
  MuiTable: {
    root: {
      borderTop: '5px solid red',
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      display: 'none',
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

const toolbar = {
  MuiToolbar: {
    root: {
      minHeight: '44px !important',
    },
    gutters: {
      '@media (min-width: 600px)': {
        paddingLeft: '20px',
      },
    },
  },
};

const tblBody = {
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
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '10px 5px 10px 5px',
      // padding: '16px',
      color: '#004C73',
      borderBottom: 'none',
      '&.dataValue': {
        maxWidth: '420px',
        minWidth: '300px',
      },
      '& p': {
        fontSize: '10pt',
        fontStyle: 'normal',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '0.025em',
      },
    },
  },
};

export const themeConfig = () => ({
  tblHeader,
  tblBody,
  ...extendedView(),
  customTheme,
  tblPgn,
  toolbar,
  displayErr,
  tblContainer,
});

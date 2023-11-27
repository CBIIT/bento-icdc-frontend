export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      position: 'relative',
      fontFamily: 'Nunito Sans',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '18px',
      color: '#0B3556 !important',
      '&.active': {
        color: '#0B3556',
      },
      '&:hover': {
        color: '#003559',
      },
      '&:hover $svg': {
        color: '#003559',
      },
    },
    icon: {
      color: '#003559 !important',
    },
  },
  MuiTableCell: {
    root: {
      paddingLeft: '25px',
      paddingRight: '5px',
      paddingTop: '15px',
      paddingBottom: '15px',
      '& span': {
        color: '#0B3556',
      },
      '&.property': {
        maxWidth: '400px',
        width: '400px',
      },
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

const tblContainer = {
  MuiTableContainer: {
    root: {
      overflowY: 'scroll',
      boxShadow: 'none',
      borderRadius: '0',
      maxHeight: '420px',
    },
  },
  MuiTable: {
    root: {
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
    },
  },
};

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
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
      maxHeight: '400px',
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
  MuiTableBody: {
    root: {
      maxHeight: '400px',
      overflow: 'scroll',
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
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '10px 5px 10px 25px',
      // padding: '16px',
      color: '#004C73',
      borderBottom: 'none',
      '&.property': {
        '& p': {
          fontFamily: 'Open Sans',
          fontSize: '15px',
          fontWeight: '600',
          lineHeight: '20px',
          letterSpacing: '0em',
          color: '#015774',
        },
      },
    },
  },
};

export const themeConfig = () => ({
  tblHeader,
  tblBody,
  customTheme,
  tblPgn,
  toolbar,
  displayErr,
  tblContainer,
});

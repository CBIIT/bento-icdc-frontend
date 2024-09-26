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
    active: {
      textDecoration: 'underline',
    },
  },
  MuiTableCell: {
    root: {
      padding: '15px 5px 15px 5px',
      '& span': {
        color: '#0B3556',
      },
      '&.clinicalDataNode': {
        width: '20%',
        paddingLeft: '25px',
      },
      '&.csvDownload': {
        width: '10%',
        textAlign: 'center',
      },
      '&.clinicalDataDescription': {
        width: '30%',
        textAlign: 'center',
      },
      '&.caseCount': {
        width: '20%',
        textAlign: 'center',
      },
      '&.recordCount': {
        textAlign: 'center',
      },
      '&.nodeCount': {
        width: '20%',
        textAlign: 'center',
      },
    },
  },
  MuiTableRow: {
    head: {
      backgroundColor: '#F2F2F2',
      borderTop: '3px solid #686F7F',
      borderBottom: '3px solid #686F7F',
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
      maxHeight: '600px',
      marginBottom: '40px',
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
      // transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
      maxHeight: '400px',
    },
  },
  MuiAccordionSummary: {
    root: {
      '& span': {
        fontFamily: 'Nunito Sans',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '30px',
        letterSpacing: '0.25px',
        textAlign: 'left',
        textTransform: 'uppercase',
      },
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
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
      },
      '@media (min-width: 1280px)': {
        maxWidth: '100%',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
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
      padding: '10px 5px 10px 5px',
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
      '&.clinicalDataNode': {
        width: '20%',
        padding: '10px 5px 10px 25px',
        '& p': {
          fontFamily: 'Open Sans',
          fontSize: '15px',
          fontWeight: '600',
          lineHeight: '20px',
          letterSpacing: '0em',
          color: '#0296C9',
          textTransform: 'uppercase',
        },
      },
      '&.clinicalDataDescription': {
        width: '30%',
        '& p': {
          fontFamily: 'Open Sans',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '0em',
          color: '#0B3556',
        },
      },
      '&.caseCount': {
        width: '20%',
        textAlign: 'center',
        '& p': {
          color: '#0B3556',
          fontFamily: 'Open Sans',
          fontSize: '16px',
        },
      },
      '&.nodeCount': {
        width: '20%',
        textAlign: 'center',
        '& p': {
          color: '#0B3556',
          fontFamily: 'Open Sans',
          fontSize: '16px',
        },
      },
      '&.recordCount': {
        textAlign: 'center',
      },
      '&.csvDownload': {
        width: '10%',
        textAlign: 'center',
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

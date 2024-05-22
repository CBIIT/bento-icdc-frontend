export const headerTheme = ({ primaryColor = '#004c73' }) => ({
  tblHeader: {
    MuiCheckbox: {
      colorPrimary: {
        color: '#13344A',
        marginLeft: '12px',
        '&.Mui-checked': {
          color: '#0B3556',
        },
      },
    },
    MuiTableSortLabel: {
      root: {
        color: '#13344A',
        position: 'relative',
        textDecoration: 'none',
        fontFamily: 'Nunito Sans',
        fontSize: '18px',
        fontWeight: '400',
        lineHeight: '18px',
        letterSpacing: '0em',
        '&:hover': {
          color: '#13344A',
        },
        '&:hover $svg': {
        },
      },
    },
    MuiTableCell: {
      root: {
        padding: '5px',
        '&.del_all_row': {
          padding: '0px 20px, 0px, 0px',
          width: '120px',
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
        margin: '0px 0px 20px 0px',
        background: '#f3f3f4',
        padding: '9px 30px 30px 30px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      },
      root: {
        // padding: '0px 30px',
        borderRadius: '15px',
        paddingTop: '10px',
        backgroundColor: '#fff',
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
        paddingLeft: '26px',
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
      paddingRight: '43px',
      borderTop: '3px solid #004c73',
      paddingTop: '0',
      paddingBottom: '0',
      borderBottom: '3px solid #004c73',
      '&:last-child': {
        paddingRight: '105px',
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
  MuiTypography: {
    body1: {
      '&:after': {
        content: '" to view in JBrowse"',
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
      minHeight: '50px',
      height: '50px',
      padding: '0px 5px 0px 5px',
      color: '#004C73',
      borderBottom: 'none',
      '& a': {
        color: '#DC762F',
        cursor: 'pointer',
        '& p': {
          fontSize: '15px',
        },
      },
      '& p': {
        fontSize: '16px',
        fontStyle: 'normal',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: '400',
        letterSpacing: '0.025em',
        padding: '18px 0px 18px 0px',
      },
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0',
    },
    body: {
      color: '#13344A',
      '&.file_name': {
        maxWidth: '300px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.acl': {
        textAlign: 'center',
      },
      '&.delete_row': {
        textAlign: 'center',
      },
    },
  },
  MuiCheckbox: {
    root: {
      marginLeft: '5px',
    },
    colorSecondary: {
      '&Mui-checked': {
        color: '#0B3556',
      },
    },
  },
  MuiSvgIcon: {
    root: {
      color: '#0B3556',
    },
  },
};
  
export const themeConfig = (table) => ({
  ...headerTheme(table),
  tblBody,
  ...extendedView(table),
  customTheme,
  tblPgn,
  toolbar,
  displayErr,
});
  
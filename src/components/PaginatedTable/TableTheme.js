export const headerTheme = ({ primaryColor = '#004c73' }) => ({
  tblHeader: {
    MuiTableSortLabel: {
      root: {
        color: '#13344A',
        position: 'relative',
        fontSize: '11pt',
        fontFamily: "'Lato','Raleway', sans-serif",
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
        '&.data_availability': {
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '600',
          padding: '0',
        },
        '&.del_all_row': {
          padding: '0',
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
      padding: '0px 5px 0px 5px',
      // padding: '16px',
      color: '#004C73',
      borderBottom: 'none',
      '& a': {
        color: '#DC762F',
        cursor: 'pointer',
        textDecoration: 'underline',
        '& p': {
          fontSize: '15px',
        },
      },
      '& p': {
        fontSize: '10pt',
        fontStyle: 'normal',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: 'bold',
        letterSpacing: '0.025em',
      },
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
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
    colorSecondary: {
      '&.Mui-checked': {
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

export const extendedView = ({
  primaryColor = '#FF9742',
}) => ({
  extendedView: {
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
          maxHeight: '2px',
          minHeight: '0px',
          '& button': {
            marginTop: '-50px',
            '&.download-icon': {
              marginRight: '-10px',
            },
            '&.manageViewColumnBtn': {
              marginBottom: '0px',
              zIndex: '10',
            },
          },
        },
      },
    },
  },
});

export const tablePag = ({ primaryColor = '#004c73' }) => ({
  tblPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '43px',
        background: '#ffffff',
        borderTop: `3px solid ${primaryColor}`,
        borderBottom: `3px solid ${primaryColor}`,
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

export const tblContainer = ({ primaryColor = '#004c73' }) => ({
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
        // transform: 'rotateX(180deg)',
        width: '100%',
        display: 'table',
        borderSpacing: '0',
        borderCollapse: 'collapse',
        borderTop: `3px solid ${primaryColor}`,
      },
    },
  },
});

export const customTheme = {
  MuiContainer: {
    maxWidthXl: {
      '@media (min-width: 1920px)': {
        maxWidth: '100%',
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
      '&#jbrowse_multi_view_button': {
        padding: '0px',
        color: '#ffffff',
        height: '43px',
        marginLeft: '22px',
        textTransform: 'inherit',
        '& img': {
          width: '2.25em',
        },
      },
      '&.add_selected_button': {
        marginRight: '10px',
        marginLeft: '25px',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        backgroundColor: '#ff7f15',
        textTransform: 'none',
        '& img': {
          width: '2.25em',
        },
        '&.Mui-disabled': {
          opacity: '0.7',
          textTransform: 'none',
        },
      },
      '&.yesBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#98a19e',
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
};

export const themeConfig = (styles = {}, table) => ({
  ...headerTheme(styles),
  tblBody,
  ...tblContainer(styles),
  ...tablePag(styles),
  ...extendedView({ ...styles, ...table }),
});

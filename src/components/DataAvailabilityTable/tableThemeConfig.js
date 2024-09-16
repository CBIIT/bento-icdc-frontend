const dynamicDataAvailColStyling = (table, isBody = false) => {
  const dataAvailabilityCols = [
    'numberofcasefiles',
    'numberofstudyfiles',
    'numberofimagecollections',
    'numberofpublications',
    'crdclinks',
  ];
  const { columns = [] } = table;
  const displayDavaAvailCols = columns
    .filter((col) => dataAvailabilityCols.includes(`${col.dataField}`.toLowerCase()) && col.display);
  const customStyle = {};
  if (displayDavaAvailCols) {
    const { length } = displayDavaAvailCols;
    const firstItem = displayDavaAvailCols[0];
    const lastItem = displayDavaAvailCols[length - 1];
    if (length === 1) {
      customStyle[`&.${firstItem.dataField}`] = {
        borderLeft: isBody ? undefined : '1px solid #808080',
        borderRight: isBody ? undefined : '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      };
    }
    if (length > 1) {
      customStyle[`&.${firstItem.dataField}`] = {
        borderLeft: isBody ? undefined : '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      };
      customStyle[`&.${lastItem.dataField}`] = {
        borderRight: isBody ? undefined : '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      };
    }
  }
  return customStyle;
};

export const tblBody = (table) => {
  const customDataAvailColStyles = dynamicDataAvailColStyling(table, true);
  return {
    tblBody: {
      MuiTableCell: {
        root: {
          minHeight: '45px',
          padding: '16px',
          color: '#004C73',
          borderBottom: 'none',
          '& a': {
            color: '#00579E',
            cursor: 'pointer',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            '& p': {
              fontSize: '15px',
              textDecoration: 'underline',
              fontWeight: '600'
            },
          },
          '& a:hover': {
            color: '#007ACC',
            cursor: 'pointer',
          },
          '& p': {
            fontSize: '16px',
            fontStyle: 'normal',
            fontFamily: 'Open Sans',
            fontWeight: '400',
            letterSpacing: '0.025em',
          },
        },
        paddingCheckbox: {
          width: '48px',
          padding: '0 0 0 5px',
        },
        body: {
          color: '#323232',
          padding: '15px',
          ...customDataAvailColStyles,
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
      MuiCheckbox: {
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
    },
  };
};

export const headerTheme = (table) => {
  const customDataAvailColStyles = dynamicDataAvailColStyling(table);

  return {
    tblHeader: {
      MuiTableSortLabel: {
        root: {
          color: '#0B3556',
          position: 'relative',
          fontSize: '18px',
          fontFamily: "Nunito Sans",
          fontWeight: '400',
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
          paddingLeft: '15px',
          paddingRight: '15px',
          '&.data_availability': {
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Nunito Sans',
            fontSize: '18px',
            fontWeight: '400',
            padding: '0',
          },
          '&.group_1': {
            padding: '0',
          },
          '&.numberOfCaseFiles': {
            textAlign: 'center',
            padding: '15px',
          },
          '&.numberOfStudyFiles': {
            textAlign: 'center',
            padding: '15px',
          },
          '&.numberOfImageCollections': {
            textAlign: 'center',
            padding: '15px',
          },
          '&.numberOfPublications': {
            textAlign: 'center',
            padding: '15px',
          },
          '&.CRDCLinks': {
            textAlign: 'center',
            padding: '15px',
          },
          ...customDataAvailColStyles,
        },
        head: {
          '&.other_columns_right': {
            borderLeft: '1px solid #EDF0F1'
          },
          '&.other_columns_left': {
            borderRight: '1px solid #EDF0F1'
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
          borderBottom: '3px solid #004c73',
          background: '#f5f5f5',
          '&.column_grouping': {
            background: '#4C6973',
            padding: '0',
            height: '55px',
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
    },
  };
};

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

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '43px',
        borderTop: '3px solid #FF9742',
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
      minHeight: '45px',
      display: 'block',
      position: 'relative',
      textAlign: 'right',
      '& svg': {
        fill: '#fff'
      },
      '&.downloadAndColumnView': {
        maxHeight: '2px',
        minHeight: '0px',
        '& button': {
          marginBottom: '-50px',
          zIndex: '10',
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
};

const tblPgn = {
  MuiTablePagination: {
    caption: {
        fontFamily: 'Open Sans',
        color: '#000000'
    },
    input: {
        fontFamily: 'Open Sans',
        color: '#000000'
    },
    root: {
      paddingRight: '43px',
      background: '#ffffff',
      borderTop: '3px solid #42779a',
      borderBottom: '3px solid #e7e5e5',
      '&:last-child': {
        paddingRight: '43px',
      },
    },
    toolbar: {
      minHeight: '43px',
    },
  },
};

export const themeConfig = (table) => ({
  ...tblBody(table),
  tblPgn,
  tblContainer,
  extendedView,
  ...headerTheme(table),
});

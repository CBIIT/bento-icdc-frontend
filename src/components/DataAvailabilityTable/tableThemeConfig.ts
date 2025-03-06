import { ExtendedCSSProperties, TableConfig } from './types';

const dynamicDataAvailColStyling = (table: TableConfig, isBody = false) => {
  const dataAvailabilityCols = [
    'numberofcasefiles',
    'numberofstudyfiles',
    'numberofimagecollections',
    'numberofpublications',
    'crdclinks',
  ];
  const { columns = [] } = table;
  const displayDavaAvailCols = columns.filter(
    col =>
      dataAvailabilityCols.includes(`${col.dataField}`.toLowerCase()) &&
      col.display
  );
  const customStyle: ExtendedCSSProperties = {};
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

export const tblBody = (table: TableConfig) => {
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
            color: '#B85300',
            cursor: 'pointer',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            textDecoration: 'underline',
            '&:hover': {
              color: '#9E4700',
            },
            '& p': {
              fontSize: '15px',
              textDecoration: 'underline',
              fontWeight: '600',
            },
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
          padding: '15px 32px',
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

export const headerTheme = (table: TableConfig) => {
  const customDataAvailColStyles = dynamicDataAvailColStyling(table);

  return {
    tblHeader: {
      MuiTableSortLabel: {
        root: {
          color: '#0B3556',
          position: 'relative',
          fontSize: '18px',
          fontFamily: 'Nunito Sans',
          fontWeight: '400',
          letterSpacing: '0.06em',
          textDecoration: 'none',
          '&:hover': {
            color: '#13344A',
          },
          '&:hover $svg': {},
        },
      },
      MuiTableCell: {
        root: {
          paddingLeft: '30px',
          paddingRight: '30px',
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
            borderLeft: '1px solid #EDF0F1',
          },
          '&.other_columns_left': {
            borderRight: '1px solid #EDF0F1',
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
          background: '#fff',
          '&.column_grouping': {
            background: '#4C6973',
            padding: '0',
            height: '44px',
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
        fill: '#fff',
      },
      '&.downloadAndColumnView': {
        maxHeight: '2px',
        minHeight: '0px',
        '& button': {
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
  MuiFormControl: {
    root: {
      '&.filterTextInput': {
        width: '275px',
        marginTop: '10px',
      },
    },
  },
  MuiInputBase: {
    root: {
      fontFamily: 'Open Sans',
      fontSize: '13.5px',
      fontWeight: 400,
      padding: '0px',
      fontStyle: '1rem',
      lineHeight: '16px',
      texttransform: 'uppercase',
    },
    input: {
      fontSize: '1rem',
      color: '#25557E',
    },
  },
  MuiOutlinedInput: {
    root: {
      border: '#4A8ECB solid 1px',
      borderRadius: '8px',
    },
    notchedOutline: {
      border: 'none',
    },
    inputAdornedEnd: {
      height: '35px',
      padding: '0 8px !important',
    },
  },
  MuiInputAdornment: {
    root: {
      '&.filterTextSearchButton': {
        width: '12px',
      },
    },
  },
  MuiSvgIcon: {
    root: {
      cursor: 'pointer',
      '&.filterTextCrossIcon': {
        color: '#25557E',
        stroke: '#4A8ECB',
      },
      '&.filterTextSearchIcon': {
        color: '#25557E',
        stroke: '#4A8ECB',
        strokeWidth: '1.1px',
        marginRight: '8px',
        marginTop: '5px',
      },
    },
  },
};

const tblPgn = {
  MuiTablePagination: {
    caption: {
      fontFamily: 'Open Sans',
      color: '#000000',
    },
    input: {
      fontFamily: 'Open Sans',
      color: '#000000',
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
      position: 'relative',
      left: '23px',
    },
  },
};

export const themeConfig = (table: TableConfig) => {
  return {
    ...tblBody(table),
    tblPgn,
    tblContainer,
    extendedView,
    ...headerTheme(table),
  };
};

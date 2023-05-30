import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: '#ffffff',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto',
        },
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '0',
        display: 'inherit',
      },
    },
    MuiIconButton: {
      root: {
        padding: '5px',
      },
    },
    MuiList: {
      padding: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        marginLeft: '0',
        '&:first-child': {
          color: '#000000',
        },
      },
      root: {
        marginLeft: '0 !important',
      },
    },
    MuiListItem: {
      root: {
        '& CheckBoxView-checkboxRoot': {
          marginLeft: '0',
        },
        padding: '10px 2px 10px 0px !important',
        '&.filter_by_casesCheckedEven': {
          backgroundColor: '#fdf1e8',
          '&:hover': {
            backgroundColor: '#fdf1e8',
          },
        },
        '&.filter_by_casesCheckedOdd': {
          backgroundColor: '#fff9f5',
          '&:hover': {
            backgroundColor: '#fff9f5',
          },
        },
        '&.filter_by_samplesCheckedEven': {
          backgroundColor: '#dafafb',
          '&:hover': {
            backgroundColor: '#dafafb',
          },
        },
        '&.filter_by_samplesCheckedOdd': {
          backgroundColor: '#eafafb',
          '&:hover': {
            backgroundColor: '#eafafb',
          },
        },
        '&.filter_by_filesCheckedEven': {
          backgroundColor: '#d4ddf7',
          '&:hover': {
            backgroundColor: '#d4ddf7',
          },
        },
        '&.filter_by_filesCheckedOdd': {
          backgroundColor: '#e9eefb',
          '&:hover': {
            backgroundColor: '#e9eefb',
          },
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.filter_by_casesCheckedIcon': {
          color: '#ff7f15',
        },
        '&.filter_by_cases': {
          color: '#ff7f15',
        },
        '&.filter_by_samplesCheckedIcon': {
          color: '#9dc1d9',
        },
        '&.filter_by_samples': {
          color: '#9dc1d9',
        },
        '&.filter_by_filesCheckedIcon': {
          color: '#667a87',
        },
        '&.filter_by_files': {
          color: '#667a87',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.filter_by_casesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          color: '#ff7f15',
        },
        '&.filter_by_samplesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          color: '#9dc1d9',
        },
        '&.filter_by_filesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          color: '#667a87',
        },
      },
    },
    MuiDivider: {
      middle: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      root: {
        height: '7px',
        '&.divider0': {
          backgroundColor: '#ff7f15',
        },
        '&.divider1': {
          backgroundColor: '#9dc1d9',
        },
        '&.divider2': {
          backgroundColor: '#667a87',
        },
      },
    },
    checkboxRoot: {
      color: 'inherit',
      '&$checked': {
        color: '#8dcaff',
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

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};

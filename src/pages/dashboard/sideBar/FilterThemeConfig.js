import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
        // '.CheckBoxView-listItemGutters': {
        //   padding: '10px 2px 10px 0px',
        // },
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
      expandIcon: {
        '&.Mui-expanded': {
        },
      },
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
        },
        '&.filter_by_casesCheckedOdd': {
          backgroundColor: '#fff9f5',
        },
        '&.filter_by_samplesCheckedEven': {
          backgroundColor: '#dafafb',
        },
        '&.filter_by_samplesCheckedOdd': {
          backgroundColor: '#eafafb',
        },
        '&.filter_by_filesCheckedEven': {
          backgroundColor: '#d4ddf7',
        },
        '&.filter_by_filesCheckedOdd': {
          backgroundColor: '#e9eefb',
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
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          color: '#ff7f15',
        },
        '&.filter_by_samplesSubjects': {
          fontSize: '12px',
          fontFamily: 'Nunito',
          marginRight: '0px',
          color: '#9dc1d9',
        },
        '&.filter_by_filesSubjects': {
          fontSize: '12px',
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

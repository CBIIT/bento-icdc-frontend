import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    MuiContainer: {
      root: {
        paddingLeft: '0',
        paddingRight: '0',
        '@media (min-width: 180px)': {
          paddingLeft: '0',
          paddingRight: '0',
        },
        '&.floatRight': {
          margin: '7px 0px 15px 6px',
          paddingTop: '10px',
        },
      },
    },
    MuiButton: {
      root: {
        '&.resetButton': {
          color: '#AEBDBE',
          backgroundColor: '#FFF',
          fontSize: '10px',
          marginTop: '4px',
          minHeight: '25px',
          fontFamily: 'Nunito sans',
          fontWeight: '600',
          marginLeft: '16px',
          borderRadius: '100px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#566672',
            color: '#fff',
          },
        },
        '&.uploadButton': {
          color: '#fff',
          width: '100%',
          border: '1px solid #f2ab71',
          height: '32px',
          display: 'flex',
          fontSize: '11px',
          boxShadow: 'none',
          boxSizing: 'border-box',
          fontFamily: 'Lato',
          fontWeight: '400',
          paddingLeft: '16px',
          borderRadius: '10px',
          paddingRight: '12px',
          justifyContent: 'space-between',
          backgroundColor: '#FCA359',
          '&:hover': {
            backgroundColor: '#FCA359',
          },
          '& span.iconSpan': {
            marginTop: '5.2px',
            '& img.uploadIcon': {
              height: '19px',
              width: '19px',
            },
          },
        },
      },
    },
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
      root: {
        '&.customExpansionPanelSummaryRoot': {
          flexDirection: 'row-reverse',
          paddingLeft: 0,
          '& div.sectionSummaryText': {
            marginLeft: '10px',
            lineHeight: 1,
            color: '#323232',
            fontFamily: 'Raleway',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.25px',
          },
        },
      },
      content: {
        margin: '0',
        display: 'inherit',
        '& div.searchContainer': {
          paddingTop: '15px',
          margin: '0 2px',
          marginRight: 6,
        },
        '& div.sectionSummaryTextContainer': {
          marginLeft: '10px',
          color: '#323232',
          fontFamily: 'Raleway',
          fontSize: '15px',
          fontWeight: '600',
          letterSpacing: '0.25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '& div.findCaseButton': {
          backgroundColor: '#FCA359',
          boxSizing: 'border-box',
          height: 30,
          width: 40,
          border: '1.25px solid #f2ab71',
          cursor: 'pointer',
          borderRadius: 11,
          display: 'flex',
          marginRight: 6,
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& img.findCaseIcon': {
          width: 17,
          height: 17,
        },
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
        '&#localFindCaseUploadSet': {
          '& hr': {
            height: '1px',
            marginLeft: '12px',
            marginRight: '11px',
            backgroundColor: '#B1B1B1',
          },
          '& li': {
            color: '#FCA359',
            paddingLeft: '17px !important',
            paddingTop: '2px !important',
            fontSize: '11px',
            fontStyle: 'italic',
            fontFamily: 'Lato',
            lineHeight: '20px',
            minWidth: '200px',
            '& div:nth-child(2)': {
              marginLeft: '60%',
            },
          },
          '& img': {
            width: '10px',
          },
        },
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
        color: '#000000',
        fontFamily: 'Nunito',
        fontWeight: '200',
        fontSize: '14px',
        '& CheckBoxView-checkboxRoot': {
          marginLeft: '0',
        },
        '& p': {
          color: '#000000',
          fontFamily: 'Nunito',
          fontWeight: '200',
          fontSize: '14px',
        },
        padding: '10px 2px 10px 0px !important',
        '&.filter_by_casesCheckedEven': {
          backgroundColor: '#FDF3EB',
          '&:hover': {
            backgroundColor: '#FDF3EB',
          },
        },
        '&.filter_by_casesCheckedOdd': {
          backgroundColor: '#F5EBE2',
          '&:hover': {
            backgroundColor: '#F5EBE2',
          },
        },
        '&.filter_by_samplesCheckedEven': {
          backgroundColor: '#E5F2FA',
          '&:hover': {
            backgroundColor: '#E5F2FA',
          },
        },
        '&.filter_by_samplesCheckedOdd': {
          backgroundColor: '#D4E9F6',
          '&:hover': {
            backgroundColor: '#D4E9F6',
          },
        },
        '&.filter_by_filesCheckedEven': {
          backgroundColor: '#EAECED',
          '&:hover': {
            backgroundColor: '#EAECED',
          },
        },
        '&.filter_by_filesCheckedOdd': {
          backgroundColor: '#CDD5DB',
          '&:hover': {
            backgroundColor: '#CDD5DB',
          },
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.filter_by_casesCheckedIcon': {
          color: '#0B3556',
        },
        '&.filter_by_cases': {
          color: '#0B3556',
        },
        '&.filter_by_samplesCheckedIcon': {
          color: '#0B3556',
        },
        '&.filter_by_samples': {
          color: '#0B3556',
        },
        '&.filter_by_filesCheckedIcon': {
          color: '#0B3556',
        },
        '&.filter_by_files': {
          color: '#0B3556',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.filter_by_casesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          fontWeight: '400',
          marginRight: '0px',
          color: '#505050',
        },
        '&.filter_by_samplesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          fontWeight: '400',
          marginRight: '0px',
          color: '#505050',
        },
        '&.filter_by_filesSubjects': {
          fontSize: '14px',
          fontFamily: 'Nunito',
          fontWeight: '400',
          marginRight: '0px',
          color: '#505050',
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
          backgroundColor: '#DA781B',
        },
        '&.divider1': {
          backgroundColor: '#60ADCF',
        },
        '&.divider2': {
          backgroundColor: '#607280',
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
    MuiAutocomplete: {
      popper: {
        zIndex: '100',
      },
      root: {
        marginBottom: '7px',
      },
    },
  },
};

export default ({ children }) => {
  const computedTheme = createTheme(theme);
  return <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>;
};

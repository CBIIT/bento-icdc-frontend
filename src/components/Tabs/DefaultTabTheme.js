const customTheme = {
  MuiTabs: {
    root: {
      width: '100%',
      borderBottom: '1px solid #6B6B6B',
    },
  },
  MuiTab: {
    root: {
      marginTop: '15px',
      color: '#696969 !important',
      height: '45px',
      overflow: 'hidden',
      background: '#EAEAEA',
      fontWeight: '500',
      lineHeight: '1.75',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '17px',
      width: '250px',
      textTransform: 'none',
      fontFamily: 'Lato',
      borderTop: '7px solid #c6c9cd',
      '&.Mui-selected': {
        '&.cases': {
          color: '#AD4E00 !important',
          borderTop: '7px solid #FF9742',
        },
        '&.samples': {
          color: '#3A6D8D !important',
          borderTop: '7px solid #9DC1D9',
        },
        '&.case_files': {
          color: '#667A87 !important',
          borderTop: '7px solid #667A87',
        },
        '&.study_files': {
          color: '#0A6F94 !important',
          borderTop: '7px solid #39C0F0',
        },
      },
      '& span.cases_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.samples_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.case_files_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.study_files_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
    },
  },
};

export { customTheme as default };

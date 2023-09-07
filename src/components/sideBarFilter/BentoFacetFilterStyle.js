export default () => ({
  resetButton: {
    fontSize: '9px',
    marginTop: '4px',
    minHeight: '25px',
    fontFamily: 'Lato, Open Sans, sans-serif',
    marginLeft: '16px',
    borderRadius: '100px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#566672',
      color: '#fff',
    },
  },
  floatRight: {
    margin: '7px 0px 15px 6px',
    paddingTop: '10px',
  },
  restBtn: {
    margin: '7px 0px 15px 6px',
    paddingTop: '10px',
    textAlign: 'center',
  },
  dropDownIconSection: {
    color: '#000000',
  },
  sectionSummaryText: {
    marginLeft: '10px',
    lineHeight: 0,
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 0,
  },
  disableExpansion: {
    backgroundColor: 'rgba(0, 0, 0 , 0.17)',
  },
  sectionSummaryTextContainer: {
    marginLeft: '10px',
    color: '#323232',
    fontFamily: 'Raleway',
    fontSize: '15px',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeFacetFilterByCases: {
    color: '#ff7f15',
  },
  activeFacetFilterBySamples: {
    color: '#9dc1d9',
  },
  activeFacetFilterByFiles: {
    color: '#667a87',
  },
  searchContainer: {
    paddingTop: '15px',
    margin: '0 2px',
    marginRight: 6,
  },
  findCaseButton: {
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
  findCaseIcon: {
    width: 17,
    height: 17,
  },
  uploadButton: {
    boxSizing: 'border-box',
    fontWeight: '400',
    height: 32,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FCA359',
    color: '#fff',
    border: '1px solid #f2ab71',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 11,
    boxShadow: 'none',
    paddingLeft: 16,
    paddingRight: 12,
    '&:hover': {
      backgroundColor: '#FCA359',
    },
  },
  iconSpan: {
    marginTop: '5.2px',
  },
  uploadIcon: {
    height: 19,
    width: 19,
  },

});

export const customStyles = {
  listbox: {
    height: 223,
    paddingTop: '0px',
    '& li': {
      borderBottom: '1px solid #fff',
      '&:nth-last-child(1)': {
        borderBottom: 'none',
      },
    },
    '& :hover': {
      color: 'white',
      backgroundColor: '#ff7f15;',
    },
  },
  paper: {
    border: '1.25px solid #FCA359',
    backgroundColor: '#717171',
    color: '#fff',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 12,
    fontWeight: 500,
    boxShadow: '0 0 0 2px rgba(255, 127, 21,0.36)',
    '& ::-webkit-scrollbar': {
      width: '0.6em',
      height: '1em',
    },
    '& ::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'none',
      borderRadius: '0px',
      backgroundColor: 'transparent',
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: '#000',
      borderRadius: '0px',
    },
  },
  autocomplete: {
    marginBottom: '7px',
    boxSizing: 'border-box',
    width: '100%',
  },
  inputRoot: {
    borderRadius: 10,
    height: 32,
    color: '#555555',
    fontFamily: 'Lato',
    fontSize: 11,
    paddingLeft: 12,
    paddingRight: 35,
    backgroundColor: '#fff',
    '& input': {
      height: '7px',
      fontSize: 11,
      paddingLeft: '12px !important',
    },
    '& fieldset': {
      borderWidth: '1.25px !important',
      borderColor: '#FCA359 !important',
    },
  },
};

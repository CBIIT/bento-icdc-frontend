export default () => ({
  restBtn: {
    margin: '7px 0px 15px 6px',
    paddingTop: '10px',
    textAlign: 'center',
  },
  dropDownIconSection: {
    color: '#000000',
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  disableExpansion: {
    backgroundColor: 'rgba(0, 0, 0 , 0.17)',
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
  searchResultDetailText: {
    color: '#FCA359',
    lineHeight: '20px',
    fontFamily: 'Lato',
    fontSize: '11px',
    fontStyle: 'italic',
  },
};

export const uploadCustomStyles = {
  uploadButton: {
    backgroundColor: '#1D79A8',
  },
  tableColumn: {
    color: '#0b3556',
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '22px',
  },
  programHeading: {
    color: '#1d79a8',
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '22px',
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 33,
    paddingLeft: 33,
    backgroundColor: '#CBE2EE',
  },
  summaryContainer: {
    backgroundColor: '#CBE2EE',
    paddingLeft: 33,
    paddingRight: 33,
  },
  title: {
    color: '#174479',
    fontSize: '18px',
    fontFamily: 'Lato',
    fontWeight: '700',
    lineHeight: '18px',
    letterSpacing: '0em',
    textAlign: 'center',
  },
  unselectedButton: {
    fontSize: 12,
    fontWeight: 500,
    color: '#fff',
    backgroundColor: '#437BBE',
    cursor: 'pointer',
    padding: '11px 22px',
    fontFamily: 'Lato',
    textTransform: 'none',
  },
  summaryButton: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#fff',
    borderBottom: '4px solid #437bbe',
    cursor: 'pointer',
    padding: '11px 22px',
    fontFamily: 'Lato',
    textTransform: 'none',
  },
  summary: {
    color: '#000',
    fontSize: '16px',
    textAlign: 'center',
    margin: 0,
    paddingTop: 10,
    fontFamily: 'Lato',
    fontWeight: '400',
    fontStyle: 'inherit',
    lineHeight: '15px',
    letterSpacing: '0em',
  },
  submitBtn: {
    backgroundColor: '#FF9742',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '16px',
    textTransform: 'capitalize',
  },
  clearBtn: {
    backgroundColor: '#0B3556',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '16px',
    textTransform: 'capitalize',
  },
  cancelBtn: {
    backgroundColor: '#667A87',
    fontFamily: 'Lato',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '16px',
    textTransform: 'capitalize',
  },
  refresh: {
    transform: 'rotateY(180deg)',
  },
  listTitle: {
    fontFamily: 'Raleway',
    fontSize: '17px',
    fontWeight: '500',
    lineHeight: '22px',
    color: '#000000',
  },
  textSection: {
    width: '50%',
    border: '1px solid white',
    margin: '20px 4px',
    padding: '10px 25px 13px 29px',
  },
  uploadFile: {
    width: '50%',
    border: '1px solid white',
    margin: '20px 4px',
    padding: '10px',
    textAlign: 'center',
  },
  tableBox: {
    maxHeight: 150,
    overflowY: 'auto',
    maxWidth: '100%',
  },
  heading: {
    color: '#437BBE',
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '22px',
    letterSpacing: '0.01em',
    textAlign: 'center',
  },
  fileName: {
    color: '#000',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '15px',
    letterSpacing: '0em',
    textAlign: 'center',
    maxWidth: '210px',
  },
  filesection: {
    marginTop: '15px',
  },
  horizontal: {
    marginTop: '20px',
  },
};

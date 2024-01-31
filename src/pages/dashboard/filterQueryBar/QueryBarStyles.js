const styles = () => ({
  queryWrapper: {
    height: '120px',
    backgroundColor: '#F3F8FB !important',
    padding: '14px 14px 14px 35px !important',
    overflowY: 'auto',
    borderBottom: '1px solid #D4D6D7',
  },
  queryContainer: {
    marginLeft: 7,
    position: 'relative',
    lineHeight: '2.4em',
    letterSpacing: '0.5px',
    fontFamily: 'Nunito',
    fontSize: '14px',
    // color: '#0e3151',
    color: 'red',
  },
  filterName: {
    textTransform: 'uppercase',
    padding: '5px 6px 5px 7px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  filterCheckboxes: {
    padding: '4px 7px 3px 6px',
    marginRight: '5px !important',
    borderRadius: 5,
    fontSize: 12,
    border: '0.5px solid #646464',
    width: 'fit-content',
    backgroundColor: '#fff',
    cursor: 'pointer',
    color: '#80430A',
    fontFamily: 'Nunito',
    fontWeight: '500',
    lineHeight: '16px',
    letterSpacing: '0em',
    '&:after': {
      content: '" "',
    },
  },
  bracketsOpen: {
    fontSize: 18,
    fontFamily: 'Nunito Sans Semibold',
    color: '#787878',
    marginRight: 3,
    fontWeight: 600,
  },
  bracketsClose: {
    fontSize: 18,
    fontFamily: 'Nunito Sans Semibold',
    color: '#787878',
    marginLeft: 3,
    fontWeight: 600,
  },
  operators: {
    color: '#646464',
    marginLeft: '3px',
    marginRight: '3px',
    borderBottom: 'none',
    textDecoration: 'none',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clearQueryButton: {
    margin: '1px',
    marginLeft: -6,
    fontWeight: 600,
    fontSize: '12px !important',
    color: '#fff',
    fontFamily: 'Nunito',
    lineHeight: '16px',
    height: '23px !important',
    borderRadius: '5px !important',
    textTransform: 'uppercase !important',
    boxSizing: 'border-box',
    backgroundColor: '#646464 !important',
    border: '1px solid #B4B4B4',
    padding: '2px 7px 2px 7px',
    '&:hover': {
      backgroundColor: '#646464 !important',
    },
  },
  divider: {
    borderRight: '10px solid #969696',
    marginLeft: 7,
  },
  /* Custom Styling by Project */
  localFind: {
    color: '#ff7f15',
  },
  localFindBackground: {
    color: '#646464',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#FDF3EB',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
  },
  facetSectionCases: {
    color: '#ff7f15',
  },
  facetSectionCasesBackground: {
    backgroundColor: '#FFB170',
  },
  facetSectionFilesBackground: {
    backgroundColor: '#F5C3F1',
  },
  facetSectionSamples: {
    color: '#10BEFF',
  },
  facetSectionSamplesBackground: {
    backgroundColor: '#C3EAF5',
  },
});

export const customStyles = {
  localFind: {
    color: '#ff7f15',
  },
  localFindBackground: {
    // backgroundColor: '#FFB170',
  },
  facetSectionCases: {
    color: '#ff7f15',
  },
  facetSectionFilterByCases: {
    color: '#80430A',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
  },
  facetSectionFilterByCasesBackground: {
    color: '#646464',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#FDF3EB',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
  },
  facetSectionFilterBySamples: {
    color: '#1F536A',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
  },
  facetSectionFilterBySamplesBackground: {
    color: '#000000',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#E5F2FA',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
  },
  facetSectionFilterByFiles: {
    color: '#353F47',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    letterSpacing: '0em',
  },
  facetSectionFilterByFilesBackground: {
    color: '#000000',
    padding: '2px 5px 2px 5px',
    borderRadius: '5px',
    border: '0.5px solid #646464',
    backgroundColor: '#EAECED',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    letterSpacing: '0em',
    whiteSpace: 'nowrap',
  },
};

export default styles;

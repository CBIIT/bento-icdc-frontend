const styles = () => ({
  queryWrapper: {
    height: '120px',
    backgroundColor: '#f1f1f1',
    padding: '14px 14px 0px 35px',
    overflowY: 'auto',
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
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    border: '0.75px solid #898989',
    width: 'fit-content',
    backgroundColor: '#fff',
    cursor: 'pointer',
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
    fontSize: '13px',
    color: '#fff',
    borderRadius: '15px',
    fontFamily: 'Nunito',
    boxSizing: 'border-box',
    backgroundColor: '#969696',
    textTransform: 'capitalize',
    border: '1px solid #B4B4B4',
    padding: '1px 5px 0px 6px',
    '&:hover': {
      backgroundColor: '#969696',
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
    backgroundColor: '#FFB170',
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
    backgroundColor: '#FFB170',
  },
  facetSectionCases: {
    color: '#ff7f15',
  },
  facetSectionFilterByCases: {
    color: '#ff7f15',
  },
  facetSectionFilterByCasesBackground: {
    color: '#ff7f15',
  },
  facetSectionFilterBySample: {
    color: '#9dc1d9',
  },
  facetSectionFilterBySampleBackground: {
    color: '#9dc1d9',
  },
  facetSectionFilterByFile: {
    color: '#667a87',
  },
  facetSectionFilterByFileBackground: {
    color: '#667a87',
  },
};

export default styles;

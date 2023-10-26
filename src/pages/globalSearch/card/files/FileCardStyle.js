const styles = () => ({
  card: {
    color: '#000',
  },
  indexContainer: {
    padding: '18px 0px 18px 18px',
    color: '#747474',
    fontFamily: 'Inter',
    fontSize: '13px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    padding: '2px 8px',
    backgroundColor: '#BBC0C3',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
  title: {
    color: '#606060',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
    lineHeight: '15px',
    letterSpacing: '-0.28px',
  },
  content: {
    color: '#000',
    marginLeft: '5px',
    fontSize: '15px',
    fontWeight: '400',
    whiteSpace: 'normal',
    paddingLeft: '6px',
    letterSpacing: '-0.28px',
  },
  contentLink: {
    fontFamily: 'Nunito',
    fontSize: '15px',
    whiteSpace: 'normal',
    paddingLeft: '6px',
    letterSpacing: '-0.075px',
    color: '#007EA8',
    fontWeight: '600',
    lineHeight: '12px',
    textDecoration: 'underline',
  },
  propertyContainer: {
    padding: '16px 16px 16px 0px',
    borderBottom: '2px solid #E7EEF5',
  },
  cardTitle: {
    marginLeft: '5px',
    textDecoration: 'none',
    color: '#0054D1',
    fontSize: '17px',
    fontFamily: 'Nunito',
    fontWeight: '700',
    paddingLeft: '9px',
    verticalAlign: 'middle',
    lineHeight: '16px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default styles;

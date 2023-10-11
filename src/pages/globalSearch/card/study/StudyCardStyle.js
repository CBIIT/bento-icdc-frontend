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
    backgroundColor: '#0296c9',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
  title: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.7px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  content: {
    color: '#000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    whiteSpace: 'normal',
    paddingLeft: '6px',
    letterSpacing: '0.7px',
  },
  contentLink: {
    fontFamily: 'Nunito',
    fontSize: '14px',
    whiteSpace: 'normal',
    paddingLeft: '6px',
    letterSpacing: '0.7px',
  },
  propertyContainer: {
    padding: '16px 16px 16px 0px',
    borderBottom: '2px solid #E7EEF5',
  },
  cardTitle: {
    textDecoration: 'none',
    color: '#0296c9',
    fontSize: '16px',
    fontFamily: 'Nunito',
    paddingLeft: '9px',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default styles;

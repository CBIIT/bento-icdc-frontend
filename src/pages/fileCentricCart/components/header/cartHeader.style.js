export default (theme) => ({
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '30px',
    width: '96px',
  },
  header: {
    paddingLeft: '27px',
    paddingRight: '27px',
    borderBottom: '#81a6b9 4px solid',
    height: '124px',
    margin: 'auto 27px',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#ff8a00',
    fontSize: '30px',
    lineHeight: '18px',
    paddingLeft: '5px',
    paddingBottom: '8px',
  },
  marginTop80: {
    marginTop: '80px',
  },
});

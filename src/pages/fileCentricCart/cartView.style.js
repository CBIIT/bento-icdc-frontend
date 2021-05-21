export default (theme) => ({
  bodyWrapper: {
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    paddingTop: '30px',
    margin: 'auto auto 30px auto',
    maxWidth: '93%',
    background: '#f3f3f4',
    paddingBottom: '30px',
  },
  tableWrapper: {
    margin: '0 30px',
    backgroundColor: theme.palette.background.paper,
  },
  customFooterStyle: {
    background: '#f3f3f4',
  },
  headerMainSubTitle: {

  },
  tableTitleWizard: {
    width: '400px',
    float: 'right',
    paddingTop: '8px',
  },
  link: {
    color: '#dc762f',
    fontWeight: 'bolder',
    '&:hover': {
      color: '#dc762f',
    },
  },
  linkIcon: {
    color: '#dc762f',
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  helpIcon: {
    verticalAlign: 'top',
    width: '17px',
    zIndex: '600',
  },
  topButtonGroup: {
    textAlign: 'right',
    padding: '10px 43px 15px 0px',
    position: 'relative',
  },
  messageTopOne: {
    position: 'absolute',
    left: '360px',
    top: '-125px',
    zIndex: '400',
  },
  messageTopTwo: {
    position: 'absolute',
    left: '5px',
    top: '-140px',
    zIndex: '400',
  },
  manifestButtonGroup: {
    marginTop: '10px',
    float: 'right',
  },
  manifestTextarea: {
    position: 'relative',
    marginTop: '20px',
  },
  downloadButton: {
    height: '36px',
    minWidth: '191px',
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#3890c5',
    padding: '6px 16px',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    lineHeight: '1.75',
    fontWeight: '500',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '4px',
    textTransform: 'uppercase',
    border: 'none',
    verticalAlign: 'top',
    marginTop: '6px',
  },
  popUpWindowText: {
    fontFamily: 'Lato',
    size: '16px',
  },
  tableDeleteButton: {
    background: '#fff',
    border: '1px solid #ccc',
    width: '29px',
    cursor: 'pointer',
    height: '26px',
    borderRadius: '15%',
    padding: '0',
  },
  tableDeleteButtonDiv: {
    textAlign: 'center',
  },
  removeCell: {
    cursor: 'pointer',
    display: 'inline-flex',
    outline: 'none',
  },
  removeThCell: {
    top: '0px',
    color: '#A61401',
    zIndex: '100',
    position: 'relative',
    fontSize: '11pt',
    borderTop: '#024466 3px solid',
    fontStyle: 'normal',
    fontFamily: "'Lato Regular','Raleway', sans-serif",
    fontWeight: 'bold',
    paddingRight: '-15px',
    borderBottom: '#024466 3px solid',
    letterSpacing: '0.06em',
    backgroundColor: '#F5F5F5',
    width: '120px',
    textAlign: 'center',
  },
  removeHeadCell: {
    display: 'flex',
    alignContent: 'space-around',
  },
  removeHeadCellText: {
    lineHeight: '37px',
  },
  removeHeadCellIcon: {
    marginTop: '1px',
    verticalAlign: 'top',
  },
  removeHeadCellIconButton: {
    color: '#A61401',
    width: '25px',
    marginTop: '5px',
    height: '25px',
  },
  removeAllMessage: {
    fontWeight: '500',
    position: 'absolute',
    top: '36px',
    right: '0',
    zIndex: '400',
    background: '#fff',
    border: '2px solid #A61401',
    borderRadius: '7px',
    fontSize: '12px',
    width: '110px',
    height: '48px',
    padding: '5px 0px',
  },
  message: {
    color: '#000000',
    fontSize: '15px',
    fontFamily: '"Open Sans", sans-serif',
    lineHeight: '22px',
    marginBottom: '5px',
  },
  paddingLeftRight: {
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  buttonGroup: {
    position: 'relative',
    paddingBottom: '10px',
  },
  paddingBottom40: {
    paddingBottom: '40px',
  },
  marginTopNegative20: {
    marginTop: '-38px',
  },
});

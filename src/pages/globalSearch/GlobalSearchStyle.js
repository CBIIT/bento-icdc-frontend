import backgroundImg from '../../assets/search/backgroundImg.svg';
import searchIcon from '../../assets/search/searchIcon.svg';

const styles = () => ({
  container: {
    paddingTop: '47px',
  },
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#142D64',
  },
  indicator: {
    backgroundColor: '#1C75BC',

  },
  tabContainter: {
    display: 'flex',
    maxWidth: '1180px',
    margin: '0 auto',
  },
  tabColor: {
    color: '#142D64',
    '& span': {
      '& span:first-child': {
        color: '#0B3556',
        fontSize: '13px',
        fontWeight: '600',
        lineHeight: '14px',
        textTransform: 'uppercase',
      },
      '& span:last-child': {
        marginLeft: '8px',
        color: '#0B3556',
        fontSize: '15px',
        fontWeight: '300',
        lineHeight: '14px',
      },
    },
  },
  '& .Mui-selected': {
    color: 'red',
  },
  buttonRoot: {
    minWidth: '100px',
    padding: '6px, 28px',
    marginRight: '30px',
    textTransform: 'none',
    '&:last-child': {
      marginRight: '0px',
    },
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
    borderColor: '#616161',
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  heroArea: {
    width: '100%',
    height: '167px',
    marginTop: '-47px',
    backgroundImage: `url(${backgroundImg})`,
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '57px',
  },
  chipSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
  enterIcon: {
    height: '12px',
    margin: '0px 18px 0px 6px',
  },
  button: {
    borderRadius: '30px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '32px',
    marginBottom: '32px',
    marginRight: '24px',
    borderWidth: '1px',
    borderColor: 'black',
  },
  bodyContainer: {
    background: '#FFFFFF',
    color: '#000000',
    fontSize: '15px',
    lineHeight: '22px',
  },
  width1100: {
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
  },
  searchItem: {
    minHeight: '100px',
    padding: '16px',
  },
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
  filterIcon: {
    height: '0.86rem',
    margin: '0px 16px 0px 6px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      paddingLeft: '20px',
      paddingTop: '2px',
      paddingBottom: '3px',
      color: '#0B3557',
      fontFamily: 'Lato',
      fontSize: '25px',
      '& fieldset': {
        border: '2px solid #747474',
      },
      '&:hover fieldset': {
        border: '2px solid #747474',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #747474',
      },
    },
  },

  root: {
    '& .MuiAutocomplete-listbox': {
      borderRadius: '4px',
      border: '2px solid #044A84',
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#142D64',
      fontWeight: 500,
      padding: '0px',
      background: '#fff',
      '& li': {
        // list item specific styling
        border: '1px solid #D2D2D2',
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
    '& .MuiTabs-flexContainer': {
      background: 'yellow',
    },
  },
  searchIcon: {
    height: '22px',
    margin: '0px 6px 0px 6px',
  },
  searchIconSpan: {
    cursor: 'pointer',
    zIndex: 40,
    width: '22px',
    display: 'block',
    height: '21px',
    backgroundImage: `url(${searchIcon})`,
    '& img': {
      display: 'none',
    },
  },
  clearIcon: {
    height: '18px',
    margin: '-8px 4px 0px 19px',
  },
  totalCount: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '20px',
    fontWeight: '300',
    lineHeight: '14px',
  },
  totalResults: {
    fontWeight: '400',
    fontFamily: 'Open Sans',
    fontSize: '20px',
    lineHeight: '20px',
    margin: '16px auto 30px auto',
  },
});

export default styles;

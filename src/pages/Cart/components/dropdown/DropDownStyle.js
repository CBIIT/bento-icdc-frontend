import zIndex from "@material-ui/core/styles/zIndex";

export default () => ({
  dropDownBtnContainer : {
    float: 'right',
  },
  disableDropDownBtn: {
    opacity: '0.5',
    backgroundColor: '#F2F2F2',
    cursor: 'not-allowed',
  },
  availableDownloadDropdownBtnIsOpen: {
    backgroundColor: '#F2F2F2',
    borderTop: '1px solid #155F97',
    borderRight: '1px solid #155F97',
    borderLeft: '1px solid #155F97',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    borderBottomRightRadius: '0px',
    width: '250px',
    borderBottomLeftRadius: '0px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtn: {
    backgroundColor: '#F2F2F2',
    border: '1px solid #155F97',
    borderRadius: '8px',
    boxShadow: 'none',
    width: '250px',
    textWrap: 'nowrap',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnLabel: {
    color: '#09557B',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    fontFamily: 'Lato',
    textTransform: 'capitalize',
    paddingRight: '6px',
  },
  availableDownloadBtn: {
    backgroundColor: '#3C597C !important',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnStartIcon: {
    margin: '0px',
  },
  dropdownMenuList: {
    paddingTop: '0px',
    paddingBottom: '0px',
    backgroundColor: '#0d71a3',
    color: '#ffffff',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    border: '2px solid #0d71a3',
  },
  dropdownPaper: {
    maxWidth: '250px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    zIndex: '100',
  },
  downloadFileManifestBtn: {
    backgroundColor: '#3C597C',
    borderRadius: '8px',
    border: '1px solid #3C597C',
    boxShadow: 'none',
    width: '250px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    // maxWidth: '287px',
    fontWeight: 400,
    fontSize: '16px',
    textTransform: 'none',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1A3D69',
      boxShadow: 'none',
    },
  },
  endIcon: {
    marginRight: '12px',
    marginLeft: '30px',
  },
  downloadFileManifestTooltipWrapper: {
    // display: 'flex',
    gap: '8px',
  },
  downloadFileManifestTooltip: {
    // display: 'flex',
    gap: '8px'
  },
  cgcIcon: {
    marginTop: '10px',
    marginLeft: '7px',
  },
  cgcLabal: {
    float: 'left',
    width: '180px',
    textWrap: 'wrap',
    lineHeight: '18px',
    fontSize: '15px',
    fontFamily: 'Lato',
  },
  linkIcon: {
    width: '12px',
    height: '12px',
    marginLeft: '3px',
  },
  fileManifestLabal: {
    float: 'left',
    width: '190px',
    height: '35px',
    lineHeight: '35px',
    fontSize: '15px',
    fontFamily: 'Lato',
  },
  downloadFileIcon: {
    width: '20px',
    height: '20px',
    margingLeft: '4px',
    float: 'right',
    marginTop: '10px',
  },
});
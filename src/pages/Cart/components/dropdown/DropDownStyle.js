export default () => ({
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
    width: '260px',
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
    width: '260px',
    textWrap: 'nowrap',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnLabel: {
    color: '#1D79A8',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'Lato',
    textTransform: 'capitalize',
    paddingRight: '6px',
  },
  availableDownloadBtn: {
    backgroundColor: '#155F97 !important',
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
  },
  dropdownPaper: {
    maxWidth: '260px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  downloadFileManifestBtn: {
    backgroundColor: '#1A8CCB',
    borderRadius: '8px',
    border: '1px solid #1A8CCB',
    boxShadow: 'none',
    width: '260px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    // maxWidth: '287px',
    fontWeight: 400,
    fontSize: '16px',
    textTransform: 'none',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1A8CCB',
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
    marginTop: '15px',
  },
  cgcLabal: {
    float: 'left',
    width: '180px',
  },
  linkIcon: {
    width: '12px',
    height: '12px',
    marginLeft: '3px',
  },
  fileManifestLabal: {
    float: 'left',
    width: '180px',
    height: '50px',
    paddingTop: '15px',
  },
  downloadFileIcon: {
    width: '20px',
    height: '20px',
    margingLeft: '4px',
    float: 'right',
    marginTop: '15px',
  },
});
export default () => ({
  button: {
    borderRadius: '10px',
    width: '210px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#ffffff',
    backgroundColor: '#566672',
    marginTop: '6px',
    marginBottom: '10px',
    textTransform: 'none',
    marginRight: '5px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  disbaleButton: {
    // opacity: '0.7',
    color: '#ffffff !important',
    backgroundColor: '#CCD1D4',
  },
  helpIconButton: {
    verticalAlign: 'top',
    position: 'absolute',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  helpIcon: {
    zIndex: '600',
    width: '17px',
  },
  jbrowseIcon: {
    width: '2.25em',
  },
  diableLink: {
    pointerEvents: 'none',
    marginRight: '-5px',
  },
  activeLink: {
    cursor: 'pointer',
    marginRight: '-5px',
  },
  warning: {
    color: '#971818',
    fontWeight: '900',
  },
  descripText: {
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1.6',
    textAlign: 'left',
    fontFamily: 'Open Sans',
  },
});
  
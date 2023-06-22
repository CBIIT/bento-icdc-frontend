export default () => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    margin: 'auto',
    display: 'flex',
    paddingTop: '30px',
  },
  sideBar: {
    width: '250px',
    maxHeight: '1300px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
    boxShadow: 'inset 0 0 87px 7px #E2E7EC',
  },
  rightContent: {
    marginLeft: '20px',
    width: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
  multiStudyHeader: {
    display: 'flex',
  },
  multiStudyIcon: {
    width: '36px',
    height: '36px',
    margin: '19px 8px 4px 0px',
    padding: '0px',
  },
  chip: {
    marginTop: '26px',
    marginLeft: '10px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #CF6A1A',
    color: '#CF6A1A',
  },
  multiStudyHeaderText: {
    color: '#CF6A1A',
    fontFamily: 'Open Sans',
    fontSize: '24px',
    lineHeight: '17px',
    height: '21px',
    marginTop: '29px',
  },
});

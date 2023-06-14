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
    width: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
});

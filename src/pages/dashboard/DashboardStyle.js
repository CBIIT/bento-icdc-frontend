export default () => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    margin: 'auto',
    display: 'flex',
    paddingTop: '20px',
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
  },
  rightContent: {
    width: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
});

export default (theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  LinkBar: {
    position: 'relative',
    zIndex: '1000',
  },
  Header: {
    position: 'relative',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: 'none',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 2px #ccc',
      borderRadius: '0px',
      backgroundColor: '#FFFFFF',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(94,140,165)',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },
  container: {
    top: '20px',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    zIndex: '9999',
  },
  content: {
    flexGrow: 1,
    width: 'calc(100%)', // Remove this on adding sidebar
    background: theme.custom.bodyBackGround,
    overflowY: 'auto',
    position: 'absolute',
    height: '100%',
  },
});

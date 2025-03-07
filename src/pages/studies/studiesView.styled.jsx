import styled from '@emotion/styled';

export const TableContainer = styled.div({
  background: '#eee',
  padding: '70px 0 80px',
  flex: 1,
  display: 'flex',
  '& .container': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '27px',
    paddingRight: '27px',
    '& .header': {
      background: '#eee',
      paddingLeft: '35px',
      paddingRight: '50px',
      borderBottom: '#004c73 10px solid',
      height: '154px',
      display: 'flex',
      position: 'relative',
      '& .logo-and-title-wrapper': {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '60px',
        '& .logo': {
          width: '94px',
          marginRight: '16px',
          zIndex: '10',
        },

        '& .header-title': {
          fontFamily: 'Raleway',
          fontWeight: '500',
          letterSpacing: '0.025em',
          color: '#0290C0',
          fontSize: '28px',
          lineHeight: '25px',
        },
      },
    },
    '& .table-div': {
      fontSize: '10pt',
      fontFamily: '"Open Sans", sans-serif',
      letterSpacing: '0.025em',
      textAlign: 'left',
    },
  },
});

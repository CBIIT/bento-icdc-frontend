import styled from '@emotion/styled';
import Container from '@mui/material/Container';

export const TitleContainer = styled(Container)({
  height: '35px',
  maxWidth: '100%',
  lineHeight: '40px',
  marginBottom: '24px',
});

export const TableTitle = styled('span')({
  color: '#ff8a00',
  fontSize: '17px',
  fontFamily: 'Lato',
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
});

export const TableContainer = styled('div')({
  background: '#ffffff',
});

export const ButtonContainer = styled(Container)({
  padding: '10px 0px 0px 0px',
  '@media (min-width: 600px)': {
    padding: '10px 0px 0px 0px',
  },
});

import styled from '@emotion/styled';
import Container from '@mui/material/Container';

export const TitleContainer = styled(Container)({
  position: 'absolute',
  zIndex: '1',
  maxWidth: '100%',
  lineHeight: '40px',
  background: '#fff',
  top: '16px',
});

export const TableTitle = styled('span')({
  color: '#ff8a00',
  fontSize: '17px',
  fontFamily: 'Lato',
  letterSpacing: '0.025em',
  textTransform: 'uppercase',
});

export const TableContainer = styled.div<{ hasSelected: boolean }>(props => ({
  position: 'relative',

  '& > :nth-child(2)': {
    background: '#fff',
    minHeight: '84px',
    position: 'relative',
  },

  '& > :nth-child(3)': props.hasSelected
    ? {
        // row selected toolbar styles
        borderStyle: 'solid',
        borderWidth: '3px 0',
        borderColor: '#606060',
      }
    : {},
}));

export const ButtonContainer = styled(Container)({
  padding: '8px 0 0 !important',
});

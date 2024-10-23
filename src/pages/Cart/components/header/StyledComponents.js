import { MuiButtonV6, styled } from '../../../../dependencies/material-ui-6';

export const ReadMeButton = styled(MuiButtonV6)({
  boxShadow: 'none',
  background: '#3C597C',
  borderRadius: '8px',
  border: '1.25px solid #0B3556',
  height: '38px',
  '&:hover': {
    backgroundColor: '#3C597C',
    boxShadow: 'none',
  },
});

export const ReadMeButtonOuterLayer = styled('div')({
  color: '#ffffff',
  fontFamily: 'Lato',
  fontSize: '16px',
  fontWeight: 400,
  fontStyle: 'normal',
  paddingTop: '35px',
  marginLeft: '5px',
});
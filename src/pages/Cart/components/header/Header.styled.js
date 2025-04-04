import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export const CartHeader = styled('div')({
  width: '100%',
  height: '85px',
  borderBottom: '3px solid #686F7F',
  minWidth: '1500px',
});

export const CartHeaderLogo = styled('div')({
  float: 'left',
  display: 'flex',
  height: '100px',
  lineHeight: '100px',
  color: '#C25700',
  width: '225px',
  margin: '0 24px',
  alignItems: 'center',
});

export const FileCartCount = styled.div({
  width: '220px',
  height: '33px',
  border: '3px solid #81A6B9',
  background: '#F6F4F4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '85px',
  padding: '4px 0',
  fontFamily: 'Roboto',
  fontWeight: '700',
  fontSize: '13px',
  lineHeight: '14px',
  letterSpacing: '0.15px',

  '& span': {
    color: '#B85300',
    fontFamily: 'Roboto',
    fontWeight: '900',
  },
});

export const OverviewWidgetWrapper = styled.div({
  display: 'flex',
  margin: '40px 0 32px',
  flex: 1,
});

export const CartHeaderLogoIcon = styled('img')({
  width: '85px',
  marginRight: '16px',
  zIndex: '100',
});

export const PageTitle = styled('span')({
  marginLeft: '10px',
  color: '#C25700',
  fontFamily: 'Raleway',
  lineHeight: '25px',
  letterSpacing: '0%',
  fontSize: '25px',
  fontWeight: 500,
});

export const ReadMeBtnDiv = styled('div')({
  display: 'flex',
  height: '100%',
  paddingTop: '18px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const ReadMeButton = styled(Button)({
  color: '#ffffff',
  fontFamily: 'Lato',
  fontSize: '16px',
  fontWeight: 400,
  fontStyle: 'normal',
  letterSpacing: '0%',
  boxShadow: 'none',
  background: '#3C597C',
  borderRadius: '8px',
  border: '1.25px solid #0B3556',
  height: '38px',
  width: '141px',
});

export const SelectFilesActionContainer = styled(Box)({
  width: '100%',
  minWidth: '1279px',
  textAlign: 'right',
  paddingRight: '80px',
  justifyContent: 'flex-end',
});

export const RadioInput = styled(Radio)({
  color: '#09557B',
});

export const SelectAllFilesBtn = styled(FormControlLabel)({
  color: '#525252',
  fontSize: '16px',
  fontFamily: 'Lato',
  fontWeight: 400,
});

export const SelectFilesBtn = styled(FormControlLabel)({
  marginRight: '30px',
  color: '#525252',
  fontSize: '16px',
  fontFamily: 'Lato',
  fontWeight: 400,
});

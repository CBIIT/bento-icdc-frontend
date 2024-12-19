import Button from '@mui/material/Button';
import styled from '@emotion/styled';

export const ProgramDetailContainer = styled('div')({
  width: '100%',
  padding: '12px 47px 60px 47px',
});

export const ProgramDetailHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '300px',
  padding: '0px 64px 10px 64px',
  borderBottom: '4px solid #81A6B9',
});

export const ProgramDetailHeaderExternalLinkWrapper = styled('div')({
  position: 'relative',
  top: '15px',
});

export const IconTitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  top: '25px',
  gap: '16px',
});

export const ClipboardIcon = styled('img')({
  width: '88px',
  height: '88px',
});

export const ProgramDetailTitle = styled('div')({
  color: '#00660F',
  fontFamily: 'Lato',
  fontWeight: '500',
  fontSize: '25px',
  paddingBottom: '16px',
  display: 'grid',
  gridTemplateColumns: 'min-content auto',
  gap: '8px',
  lineHeight: '25px',
});

export const ProgramDetailSubTitle = styled('div')({
  color: '#00660F',
  fontFamily: 'Lato',
  fontWeight: '800',
  fontSize: '25px',
  lineHeight: '25px',
});

export const ProgramDetailSubTitleAcronym = styled('div')({
  color: '#00660F',
  fontFamily: 'Lato',
  fontWeight: '800',
  lineHeight: '25px',
  fontSize: '22px',
});

export const ProgramDetailContent = styled('div')({
  backgroundColor: '#ffffff',
  padding: '32px 64px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const TableContainer = styled('div')({
  backgroundColor: '#F3F6F7',
  padding: '47px',
  paddingBottom: '88px',
});

export const TableContainerTitle = styled('h3')({
  marginLeft: '63px',
  fontFamily: 'Open Sans',
  fontWeight: '400',
  color: '#00660F',
  fontSize: '17px',
  lineHeight: '30px',
});

export const ProgramDetailHeaderExternalLinkButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: '400',
  fontSize: '16px',
  minWidth: '162px',
  minHeight: '38px',
  borderRadius: '8px',
  backgroundColor: '#F5F5F5',
  color: '#125B82',
  border: '1.5px solid #125B82',
  fontFamily: 'Lato',
  /*'&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },*/
});

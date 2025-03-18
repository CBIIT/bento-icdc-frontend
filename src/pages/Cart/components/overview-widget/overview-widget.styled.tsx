import { TabPanel } from '@mui/lab';
import { Dialog, DialogContent, Tab, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const modalWidth = '1000px';

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  lineHeight: '14px',
  fontWeight: 'bold',
  position: 'relative',
  top: '2px',
  color: '#dc762f',
  '&:hover': {
    textDecoration: 'none',
  },
});

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    maxWidth: modalWidth,
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
  },
});

export const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    padding: '32px 16px',
    overflowY: 'hidden',
  },
});

export const StyledTab = styled(Tab)({
  '&.MuiTab-root': {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    color: '#000',
  },
});

export const StyledDialogTitle = styled(DialogTitle)({
  '&.MuiDialogTitle-root': {
    borderBottom: '1px solid #d1dbe0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const StyledTabPanel = styled(TabPanel)({
  '&.MuiTabPanel-root': {
    display: 'flex',
    height: '100%',
    // '& .recharts-responsive-container': {
    //   width: '580px',
    // },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
    // '@media (max-width: 959px)': {
    //   height: '100%',
    // },
  },
});

export const Container = styled.div({
  padding: '24px 38px',
  flex: 1,
});

export const Wrapper = styled.div({
  // background: "yellow",
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  borderRadius: '8px',
  border: '1px solid black',
  height: '60px',
});

export const Panel = styled(Wrapper)({
  height: '100%',
});
export const LeftContainerSection = styled.div<{ error: boolean }>(props => ({
  borderRight: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  color: props.error ? '#cc0000' : '#CB8311',
  fontSize: '23px',
  fontWeight: '700',
  fontFamily: 'Lato',
  lineHeight: '19px',
  textAlign: 'center',
}));
export const RightContainerSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
export const LeftPanelSection = styled.div({
  borderRight: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  alignItems: 'center',
  '& .left-panel-title': {
    marginBottom: '16px',
    color: '#CB8311',
    fontSize: '23px',
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: '19px',
  },
  // gap: "16px",
});
export const RightPanelSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
export const IconAndTextWrapper = styled.div({
  display: 'flex',
  gap: '32px',
  marginBottom: '32px',
  '& .icon': {
    height: '50px',
    width: '50px',
  },
  '& .title-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  '& .title': {
    color: '#6A6A6A',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: 'Lato',
    lineHeight: '19px',
  },
  '& .subtitle': {
    color: '#383838',
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Lato',
    lineHeight: '32px',
  },
});
export const IconAndTextContainer = styled.div({
  display: 'grid',
  // minHeight: '347px',
  gridTemplateRows: '1fr 1fr 1fr',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

import { TabPanel } from '@mui/lab';
import { Dialog, DialogContent, Tab, DialogTitle, Tabs } from '@mui/material';
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
  '& .MuiDialogContent-root': {
    padding: '32px 16px',
    overflowY: 'hidden',
  },
});

export const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    height: '5px ',
    background: '#0296C9',
  },
});

export const StyledTab = styled(Tab)({
  '& .MuiTab-root': {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    color: '#000',
  },
});

export const StyledDialogTitle = styled(DialogTitle)({
  '& .MuiDialogTitle-root': {
    borderBottom: '1px solid #d1dbe0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const StyledTabPanel = styled(TabPanel)({
  '& .MuiTabPanel-root': {
    display: 'flex',
    height: '100%',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
  },
});

export const Container = styled.div({
  padding: '0 98px',
  flex: 1,
  maxHeight: '413px',
});

export const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  borderRadius: '20px',
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
  paddingTop: '16px',
  maxHeight: '413px',
  display: 'flex',
  alignItems: 'center',
  // padding: '40px',
  flexDirection: 'column',
  // alignItems: 'center',
  '& .left-panel-title': {
    marginBottom: '30px',
    color: '#CB8311',
    fontSize: '23px',
    fontWeight: '700',
    fontFamily: 'Lato',
    textAlign: 'center',
    letterSpacing: '0%',
  },
});
export const RightPanelSection = styled.div({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  '& .error-overlay': {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '0.15px',
    color: '#000',
    zIndex: '999',
    alignSelf: 'anchor-center',
  },
});
export const IconAndTextWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: '55px 1fr',
  alignItems: 'center',
  marginBottom: '60px',
  width: '300px',
  justifyContent: 'center',
  '& .icon': {
    height: '50px',
    width: '50px',
    marginLeft: '20px',
    alignSelf: 'start',
  },
  '& .title-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginLeft: '40px',
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  width: '100%',
  marginBottom: '35px',
});

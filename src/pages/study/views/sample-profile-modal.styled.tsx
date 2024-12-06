import styled from '@emotion/styled';
import { TabPanel } from '@mui/lab';
import { Dialog, DialogContent, DialogTitle, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

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
    '@media (max-width: 959px)': {
      height: '100%',
    },
  },
});

import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Grid } from '@mui/material';

export const RadioInput = styled(Radio)({
  color: '#09557B',
});

export const SelectAllFilesBtn = styled(FormControlLabel)({
  '& .MuiTypography-root': {
    fontFamily: 'Lato',
    color: '#525252',
    fontSize: '16px',
    fontWeight: 400,
  },
});

export const SelectFilesBtn = styled(FormControlLabel)({
  marginRight: '30px',
  '& .MuiTypography-root': {
    fontFamily: 'Lato',
    color: '#525252',
    fontSize: '16px',
    fontWeight: 400,
  },
});

export const Container = styled(Grid)({
  padding: '24px',
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
});

export const TableContainer = styled(Grid)({
  padding: '0px 98px',
  margin: '42px 0',
  minWidth: 0,
  width: '100%',
  boxSizing: 'border-box',
});

export const BodyWrapper = styled.div({
  background: '#EEF7FE',
  borderRadius: '20px',
  border: '1px solid #D5D5D5',
  paddingTop: '9px',
  position: 'relative',
});

export const ActionsContainer = styled.div({
  width: 'auto',
  maxWidth: 'calc(100% - 86px)',
  minWidth: 0,
  textAlign: 'right',
  justifyContent: 'flex-end',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '20px',
  left: '43px',
  right: '43px',
  '@media (max-width: 900px)': {
    left: '24px',
    right: '24px',
    maxWidth: 'calc(100% - 48px)',
  },
});

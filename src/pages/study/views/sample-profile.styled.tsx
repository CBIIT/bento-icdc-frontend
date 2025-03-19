import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';

export const StyledTabs = styled(Tabs)({
  '& .Mui-selected': {
    color: '#0296c9',
    fontWeight: '900',
  },
});

export const MarginTopTenGrid = styled(Grid)({
  marginTop: '10px',
});

export const DetailContainerHeader = styled.span({
  textTransform: 'uppercase',
  fontFamily: 'Open Sans',
  fontSize: '17px',
  letterSpacing: '0.017em',
  color: '#0296c9',
});

export const HeaderButton = styled.div({
  fontFamily: 'Open Snans',
  border: '3px solid #81a6b9',
  marginTop: '15px',
  width: '220px',
  height: '35px',
  textAlign: 'center',
  background: '#f6f4f4',
  padding: '4px 10px 4px 5px',
});

export const HeaderButtonLinkSpan = styled.span({
  fontFamily: 'Open Sans',
  width: '200px',
  fontSize: '13px',
  display: 'inherit',
  height: '15px',
  marginTop: '-2px',
});

export const HeaderButtonLink = styled(Link)({
  textDecoration: 'none',
  lineHeight: '14px',
  fontWeight: 'bold',
  position: 'relative',
  top: '2px',
  '&:hover': {
    textDecoration: 'none',
  },
});

export const HeaderButtonLinkNumber = styled.div({
  fontFamily: 'Roboto',
  fontSize: '13px',
  paddingBottom: '3px',
  margin: '0',
  color: '#B85300',
  display: 'inherit',
  fontWeight: '900',
  marginRight: '4px',
});

export const HeaderButtonLinkText = styled.span({
  fontFamily: 'Roboto',
  color: '#0B3556',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: '900',
  lineHeight: '14px',
  letterSpacing: '0.15px',
});

export const DetailContainerItems = styled(Grid)({
  paddingTop: '7px',
});

export const BarChartWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // gap: '8px',
});

export const Content = styled.div({
  fontSize: '12px',
});

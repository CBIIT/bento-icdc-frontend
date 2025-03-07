import { styled } from '@material-ui/styles';
export const DashboardContainer = styled('div')({
  backgroundColor: '#FFFFFF',
  flex: 1,
});
export const Content = styled('div')({
  margin: 'auto',
  display: 'flex',
  marginTop: '60px',
});
export const SideBar = styled('div')({
  width: '250px',
  maxHeight: '1300px',
  overflowX: 'hidden',
  backgroundColor: 'transparent',
  borderRight: 'thin solid #B1B1B1',
  borderLeft: 'thin solid #B1B1B1',
  overflow: 'auto',
  zIndex: 99,
  boxShadow: 'inset 0 0 87px 7px #E2E7EC',
});
export const WidgetTableContent = styled('div')({
  marginLeft: '20px',
  // paddingTop: '68px',
  width: 'calc(100% - 250px)',
  position: 'relative',
  // borderRight: 'thin solid #B1B1B1',
});

import { styled } from '@material-ui/styles';
export const DashboardContainer = styled('div')({
  backgroundColor: '#FFFFFF',
  flex: 1,
});
export const Content = styled('div')({
  display: 'flex',
  marginTop: '60px',
  gap: '20px',
  width: '100%',
  minWidth: 0,
});
export const SideBar = styled('div')({
  flex: '0 0 250px',
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
  // paddingTop: '68px',
  flex: 1,
  minWidth: 0,
  position: 'relative',
  // borderRight: 'thin solid #B1B1B1',
});

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Container = styled.div({
  color: '#5e8ca5',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  whiteSpace: 'nowrap',
});

export const BreadcrumbNavLink = styled(Link)({
  paddingLeft: '2px',
  paddingRight: '2px',
  textDecoration: 'none',
  color: '#0B4E75',
  fontFamily: 'Lato',
  fontWeight: '700',
  fontSize: '12px',
  letterSpacing: '0.12px',
  lineHeight: '17.16px',
});

export const BreadcrumbSpan = styled.span({
  paddingLeft: '2px',
  paddingRight: '2px',
  textDecoration: 'none',
  color: '#0B4E75',
  fontFamily: 'Lato',
  fontWeight: '500',
  fontSize: '12px',
  letterSpacing: '0.12px',
  lineHeight: '17.16px',
});

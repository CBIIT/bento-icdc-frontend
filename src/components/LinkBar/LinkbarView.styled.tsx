import styled, { CSSObject } from '@emotion/styled';

export const Wrapper = styled.div({
  width: '100%',
  height: '20px',
  margin: '0 auto',
  display: 'flex',
  // position: 'fixed',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0px',
  zIndex: '1201',
  background: '#F1F1F1',
  borderBottom: '1px #999999 solid',
});

const sharedStyled: CSSObject = {
  textDecoration: 'none',
  color: '#333333',
  fontFamily: 'Raleway',
  fontSize: '10px',
};

export const Link = styled.a(sharedStyled);
export const NoLink = styled.span(sharedStyled);

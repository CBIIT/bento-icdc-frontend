import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export const Container = styled.div({
  marginTop: '80px',
  fontFamily: 'Raleway, sans-serif',
  paddingLeft: '27px',
  paddingRight: '27px',
  minWidth: '1404px',
});

export const Header = styled.div({
  borderBottom: '#81a6b9 4px solid',
  height: '130px',
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  '& .header-content': {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '39px',
    flex: 1,
    width: '100%',

    '& .title-and-button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      marginRight: '18px',
    },
  },
});

export const Breadcrumb = styled.div({
  fontFamily: 'Open Sans',
  padding: '0 18px',
});

export const Logo = styled.div({
  width: '94px',
  margin: '0 18px',
});

export const HeaderTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const HeaderMainTitle = styled.div({
  fontFamily: 'Open Sans',
  fontWeight: '800',
  letterSpacing: '0.017em',
  color: '#025F7E',
  fontSize: '19px',
  height: '12px',
  lineHeight: '17px',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',

  '& .title-wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const HeaderPropertyName = styled.div({
  fontWeight: '600',
  color: '#025F7E',
  marginRight: '4px',
});

export const HeaderBar = styled.div({
  fontWeight: '10',
  color: '#5e8ca5',
});

export const HeaderAccessionItem = styled.div({
  borderRadius: '100px',
  border: '2px solid',
  background: 'rgb(203 226 238 / 11%)',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  height: 'fit-content',
  padding: '4px',
});

export const AccessionLabel = styled.div({
  fontSize: '14px',
  fontWeight: '600',
  color: '#385966',
});

export const AccessionValue = styled.div({
  fontSize: '13px',
  fontWeight: '800',
});

export const NameWrapper = styled.div<{ isLong: boolean }>(({ isLong }) => {
  const base: CSSProperties = {
    paddingTop: '8px',
  };

  if (isLong) {
    return {
      ...base,
      color: '#606061',
      fontWeight: '400',
      fontFamily: 'Sans-Serif',
      textTransform: 'uppercase',
      fontSize: '14px',
      paddingLeft: '3px',
      lineHeight: '17px',
      textOverflow: 'ellipsis',
      paddingRight: '200px',
      letterSpacing: '0.01em',
      marginBottom: '-9px',
    };
  }

  return {
    ...base,
    color: '#606061',
    fontWeight: '400',
    fontFamily: 'Sans-Serif',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    fontSize: '14px',
    maxHeight: '45px',
    paddingLeft: '3px',
    textOverflow: 'ellipsis',
    paddingRight: '200px',
  };
});

export const EmbargoWrapper = styled.div({
  color: '#BB2040',
  float: 'right',
  background: '#F6F4F4',
  width: '220px',
  height: '33px',
  marginTop: '25px',
  fontWight: 'bolder',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '4px',
  textAlign: 'center',
  border: '3px solid #BB2040',
  '& p': {
    display: 'inline ! important',
    fontWeight: '600',
    width: '122px',
    fontSize: '13px',
    marginTop: '3px',
  },
});

export const FileIcon = styled.img({
  width: '20px',
});

export const PendingWrapper = styled.div({
  color: '#6D6E71',
  background: '#fff6f6',
  width: '220px',
  height: '33px',
  marginTop: '25px',
  fontWight: 'bolder',
  textAlign: 'center',
  fontFamily: 'Open Sans',
  border: '3px solid #F3A933',
  '& p': {
    display: 'inline ! important',
    fontWeight: '600',
    width: '122px',
    fontSize: '13px',
  },
});

export const HeaderButton = styled.div({
  fontFamily: 'Open Sans',
  border: '3px solid #81a6b9',
  width: '220px',
  height: '33px',
  textAlign: 'center',
  background: '#f6f4f4',
});

export const HeaderButtonLinkSpan = styled.span({
  fontFamily: 'Open Sans',
  width: '200px',
  fontSize: '13px',
  display: 'inherit',
  height: '15px',
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
  fontFamily: 'sans-serif',
  fontSize: '13px',
  paddingBottom: '3px',
  display: 'inherit',
  fontWeight: '900',
  color: '#B85300',
});

export const HeaderButtonLinkText = styled.span({
  fontFamily: 'Open Sans',
  color: '#0B3556',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '14px',
  letterSpacing: '0.15px',
});

export const DetailContainer = styled.div({
  margin: 'auto',
  paddingTop: '30px',
  paddingLeft: '50px',
  paddingRight: '50px',
  fontFamily: 'Open Sans',
  letterSpacing: '0.014em',
  color: '#000000',
  size: '12px',
  lineHeight: '23px',
  minWidth: '1404px',
});

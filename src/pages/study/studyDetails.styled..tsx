import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export const Container = styled.div({
  marginTop: '80px',
  fontFamily: 'Raleway, sans-serif',
  paddingLeft: '27px',
  paddingRight: '27px',
  width: '100%',
  boxSizing: 'border-box',
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
      position: 'relative',
      top: '5px',
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
  position: 'relative',
  top: '10px',
});

export const HeaderTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const HeaderMainTitle = styled.div({
  fontFamily: 'Open Sans',
  fontWeight: '800',
  letterSpacing: '0.017em',
  color: '#025F7E',
  fontSize: '19px',
  height: '12px',
  lineHeight: '17px',
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  '& .clinical-study-designation': {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '19px',
    lineHeight: '17px',
    letterSpacing: '0.32px',
    color: '#025F7E',
  },

  '& .title-wrapper': {
    display: 'flex',
    alignItems: 'center',
  },
});

export const HeaderPropertyName = styled.div({
  fontWeight: '600',
  fontFamily: 'Raleway',
  fontSize: '19px',
  lineHeight: '17px',
  letterSpacing: '0.32px',
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
  padding: '4px 8px',
  gap: '8px',
  height: '21px',
});

export const AccessionLabel = styled.div({
  fontFamily: 'Open Sans',
  fontSize: '10px',
  fontWeight: '600',
  color: '#385966',
  lineHeight: '17px',
  letterSpacing: '0.32px',
  textTransform: 'uppercase',
});

export const AccessionValue = styled.div({
  fontSize: '10px',
  fontFamily: 'Open Sans',
  fontWeight: '700',
  lineHeight: '17px',
  letterSpacing: '0.32px',
  color: '#027AA2',
});

export const NameWrapper = styled.div<{ isLong: boolean }>(({ isLong }) => {
  const base: CSSProperties = {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20.02px',
    letterSpacing: '0',
    color: '#606061',
    textOverflow: 'ellipsis',
  };

  if (isLong) {
    return {
      ...base,
      paddingRight: '200px',
      marginBottom: '-9px',
    };
  }

  return {
    ...base,
    maxHeight: '45px',
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
  background: '#f6f4f4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const HeaderButtonLinkSpan = styled.span({});

export const HeaderButtonLink = styled(Link)({
  textDecoration: 'none',
  // lineHeight: '14px',
  // fontWeight: 'bold',
  // position: 'relative',
  // top: '2px',
  display: 'flex',
  gap: '8px',
  '&:hover': {
    textDecoration: 'none',
  },
});

export const HeaderButtonLinkNumber = styled.div({
  fontFamily: 'Roboto',
  fontSize: '13px',
  fontWeight: 700,
  lineHeight: '14px',
  letterSpacing: '0.15px',
  color: '#B85300',
});

export const HeaderButtonLinkText = styled.span({
  fontFamily: 'Roboto',
  color: '#0B3556',
  fontSize: '13px',
  fontWeight: 400,
  lineHeight: '14px',
  letterSpacing: '0.15px',
});

export const DetailContainer = styled.div({
  margin: 'auto',
  paddingTop: '30px',
  paddingLeft: '56px',
  paddingRight: '56px',
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  fontFamily: 'Open Sans',
  letterSpacing: '0.014em',
  color: '#000000',
  size: '12px',
  lineHeight: '23px',
});

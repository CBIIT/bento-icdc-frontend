import React from 'react';
import { styled } from '@mui/material';
import usFlag from '../../../public/images/us_flag.png';

const BannerArea = styled('div')({
  flexDirection: 'row',
  width: '100%',
  height: '46px',
  background: '#F0F0F0',
});

const BannerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  paddingLeft: '3.2rem',
  '& img': {
    marginRight: '14px',
  },
  '& .text': {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    width: 'fit-content',
    height: '16px',
  },
  '@media (max-width: 1023px)': {
    paddingLeft: '1rem',
  },
});

const USABanner = () => (
  <BannerArea data-testid="navigation-flag-banner">
    <BannerContainer>
      <img src={usFlag} alt="us flag" />
      <div className="text">
        An official website of the United States government
      </div>
    </BannerContainer>
  </BannerArea>
);

export default USABanner;

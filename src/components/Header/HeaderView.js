import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { Header, LinkBar } from 'bento-components';
import { useLocation } from 'react-router';
import headerData from '../../bento/globalHeaderData';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '8px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const ICDCHeader = ({
  classes,
  offsetHeight = 0,
}) => {
  const location = useLocation();
  // const govAlertEl = document.getElementById('govAlertMsg');
  const initialTopValue = offsetHeight + 20; // Set your initial top value here

  const [topValue, setTopValue] = useState(initialTopValue);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the new top value based on scroll position
      const scrolledDownAmt = window.scrollY;
      const newTopValue = Math.max(0, initialTopValue - scrolledDownAmt);
      setTopValue(newTopValue);
    };

    window.addEventListener('scroll', handleScroll);
    console.log('init top val ', topValue);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setTopValue(initialTopValue);
  }, [offsetHeight]);

  return location.pathname.match('/search') ? (
    <>
      <LinkBar
        url="https://datacommons.cancer.gov/?cid=caninecommons.cancer.gov"
        classes={classes}
      />
      <Header
        logo={headerData.globalHeaderLogo}
        alt={headerData.globalHeaderLogoAltText}
        homeLink={headerData.globalHeaderLogoLink}
        customStyle={{
          ...customStyle,
          headerBar: {
            ...customStyle.headerBar,
            top: `${topValue}px`,
          },
        }}
      />
    </>
  ) : (
    <>
      <LinkBar
        url="https://datacommons.cancer.gov/?cid=caninecommons.cancer.gov"
        classes={classes}
      />
      <Header
        logo={headerData.globalHeaderLogo}
        alt={headerData.globalHeaderLogoAltText}
        homeLink={headerData.globalHeaderLogoLink}
        customStyle={{
          ...customStyle,
          headerBar: {
            ...customStyle.headerBar,
            top: `${topValue}px`,
          },
        }}
      />
    </>
  );
};

const styles = ({
  wrapper: {
    top: '0px',
    width: '100%',
    height: '20px',
    margin: '0 auto',
    display: 'flex',
    zIndex: '1201',
    position: 'fixed',
    background: '#F1F1F1',
    alignItems: 'center',
    borderBottom: '1px #999999 solid',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333333',
    fontFamily: 'Raleway',
    fontSize: '10px',
  },
});

export default withStyles(styles)(ICDCHeader);

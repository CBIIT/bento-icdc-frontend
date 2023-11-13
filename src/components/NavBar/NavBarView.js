import React, { useState, useEffect } from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import { useLocation } from 'react-router';
import {
  navBarData, navBarCartData, navBarstyling, externalLinks,
} from '../../bento/navigationBarData';
import NavBarThemeProvider from './NavBarThemeConfig';

const BentoNavBar = ({ cartFieldIds }) => {
  const location = useLocation();
  const { pathname } = location;

  const govAlertEl = document.getElementById('govAlertMsg');
  const initialTopValue = govAlertEl?.scrollHeight + 120; // Set your initial top value here
  const [topValue, setTopValue] = useState(initialTopValue);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the new top value based on scroll position
      const scrolledDownAmt = window.scrollY;
      const newTopValue = Math.max(100, initialTopValue - scrolledDownAmt);

      setTopValue(newTopValue);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialTopValue]);

  const scrollingStyle = {
    ...navBarstyling.global,
    position: 'relative',
    marginTop: `${topValue}px`,
  };

  return (
    <NavBarThemeProvider>
      <NavBar
        navBarData={pathname.includes('/jBrowse/')
          ? []
          : navBarData}
        navBarCartData={pathname.includes('/jBrowse/')
          ? undefined
          : navBarCartData}
        navBarstyling={{ ...navBarstyling, top: `${topValue}px`, global: scrollingStyle }}
        numberOfCases={cartFieldIds.length || 0}
        externalLinksFlag
        externalLinks={externalLinks}
        components={{
          Tooltip,
        }}
      />
    </NavBarThemeProvider>
  );
};
export default BentoNavBar;

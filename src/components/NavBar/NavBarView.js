import React, { useState, useEffect } from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';

const BentoNavBar = ({ cartFieldIds = [] }) => {
  const govAlertEl = document.getElementById('govAlertMsg');
  const initialTopValue = govAlertEl.scrollHeight + 100; // Set your initial top value here
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
    <>
      <NavBar
        navBarData={navBarData}
        navBarCartData={navBarCartData}
        navBarstyling={{ ...navBarstyling, top: `${topValue}px`, global: scrollingStyle }}
        numberOfCases={cartFieldIds.length}
      />
    </>
  );
};

export default BentoNavBar;

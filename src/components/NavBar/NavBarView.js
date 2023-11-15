import React from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import { useLocation } from 'react-router';
import {
  navBarData, navBarCartData, navBarstyling, externalLinks,
} from '../../bento/navigationBarData';
import NavBarThemeProvider from './NavBarThemeConfig';

const BentoNavBar = ({ cartFieldIds }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <NavBarThemeProvider>
      <div style={{ position: 'relative' }}>
        <NavBar
          navBarData={pathname.includes('/jBrowse/')
            ? []
            : navBarData}
          navBarCartData={pathname.includes('/jBrowse/')
            ? undefined
            : navBarCartData}
          navBarstyling={navBarstyling}
          numberOfCases={cartFieldIds.length || 0}
          externalLinksFlag
          externalLinks={externalLinks}
          components={{
            Tooltip,
          }}
        />
      </div>
    </NavBarThemeProvider>
  );
};
export default BentoNavBar;

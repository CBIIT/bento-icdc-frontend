import React from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling, externalLinks,
} from '../../bento/navigationBarData';
import NavBarThemeProvider from './NavBarThemeConfig';

const BentoNavBar = ({ cartFieldIds }) => (
  <NavBarThemeProvider>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      externalLinksFlag
      externalLinks={externalLinks}
      components={{
        Tooltip,
      }}
    />
  </NavBarThemeProvider>
);
export default BentoNavBar;

import React from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarData,
  navBarCartData,
  navBarstyling,
  externalLinks,
} from '../../bento/navigationBarData';

import NavBarThemeProvider from './NavBarThemeConfig';

const BentoNavBar = ({ cartFieldIds = [] }) => (
  <>
    <NavBarThemeProvider>
      <div style={{ position: 'relative' }}>
        <NavBar
          navBarData={navBarData}
          navBarCartData={navBarCartData}
          navBarstyling={navBarstyling}
          numberOfCases={cartFieldIds.length}
          externalLinksFlag
          externalLinks={externalLinks}
        />
      </div>
    </NavBarThemeProvider>
  </>
);
export default BentoNavBar;

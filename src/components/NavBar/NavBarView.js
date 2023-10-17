import React from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
import NavThemeProvider from './NavTheme';

const BentoNavBar = ({ cartFieldIds = [] }) => (
  <NavThemeProvider>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length}
    />
  </NavThemeProvider>
);
export default BentoNavBar;

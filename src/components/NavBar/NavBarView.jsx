import React from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarData,
  navBarCartData,
  navBarstyling,
  externalLinks,
} from '../../bento/navigationBarData';

import NavBarThemeProvider from './NavBarThemeConfig';
import styled from '@emotion/styled';

const NavContrainer = styled('div')({
  position: 'relative',
});

const BentoNavBar = ({ cartFieldIds = [] }) => (
  <>
    <NavBarThemeProvider>
      <NavContrainer>
        <NavBar
          navBarData={navBarData}
          navBarCartData={navBarCartData}
          navBarstyling={navBarstyling}
          numberOfCases={cartFieldIds.length}
          externalLinksFlag
          externalLinks={externalLinks}
          externalLinksFirst
        />
      </NavContrainer>
    </NavBarThemeProvider>
  </>
);
export default BentoNavBar;

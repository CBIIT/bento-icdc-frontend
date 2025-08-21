import React from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarCartData,
  HeaderLinks,
  HeaderSubLinks,
  headerData,
} from '../../bento/navigationBarData';

import NavBarThemeProvider from './NavBarThemeConfig';
import styled from '@emotion/styled';

const NavContainer = styled('div')({
  position: 'relative',
});

const BentoNavBar = ({ cartFieldIds = [] }) => (
  <>
    <NavBarThemeProvider>
      <NavContainer>
        <NavBar
          navBarCartData={navBarCartData}
          config={{
            HeaderLinks,
            HeaderSubLinks,
            headerData,
          }}
          numberOfCases={cartFieldIds.length}
          endComponent={true}
        />
      </NavContainer>
    </NavBarThemeProvider>
  </>
);

export default BentoNavBar;

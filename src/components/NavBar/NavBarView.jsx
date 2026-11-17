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
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  '& *': {
    boxSizing: 'border-box',
  },
  '& ul': {
    maxWidth: '100%',
    minWidth: 0,
  },
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

import React from 'react';
import { NavBar } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';

const BentoNavBar = () => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={0}
    />
  </>
);
export default BentoNavBar;

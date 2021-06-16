import React from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';

const BentoNavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      components={{
        Tooltip,
      }}
    />
  </>
);
export default BentoNavBar;

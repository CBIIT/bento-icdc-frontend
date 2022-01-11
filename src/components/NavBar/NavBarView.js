import React from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling, extraLinks,
} from '../../bento/navigationBarData';

const BentoNavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      extraLinksFlag
      extraLinks={extraLinks}
      components={{
        Tooltip,
      }}
    />
  </>
);
export default BentoNavBar;

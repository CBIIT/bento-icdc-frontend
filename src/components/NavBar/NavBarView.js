import React from 'react';
import { NavBar, ToolTip as Tooltip } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
import env from '../../utils/env';

const releaseNotesLink = `https://github.com/CBIIT/bento-icdc-frontend/releases/tag/${env.REACT_APP_FE_VERSION}`;

const BentoNavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      releaseNotesFlag
      releaseNotesLink={releaseNotesLink}
      components={{
        Tooltip,
      }}
    />
  </>
);
export default BentoNavBar;

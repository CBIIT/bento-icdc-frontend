import React from 'react';
import { NavBar } from '@bento-core/nav-bar';
import {
    navBarData,
    navBarCartData,
    navBarstyling,
    externalLinks,
} from '../../bento/navigationBarData';
import styled from '@emotion/styled';

const NavBarWrapper = styled.div`
> header {
    position: relative;
}
`

const BentoNavBar = ({ cartFieldIds = [] }) => (
    <>
        <NavBarWrapper>
            <NavBar
                navBarData={navBarData}
                navBarCartData={navBarCartData}
                navBarstyling={navBarstyling}
                numberOfCases={cartFieldIds.length}
                externalLinksFlag
                externalLinks={externalLinks}
                externalLinksFirst
            />
        </NavBarWrapper>
    </>
);
export default BentoNavBar;

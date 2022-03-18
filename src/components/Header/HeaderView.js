import React from 'react';
import { Header } from 'bento-components';
import headerData from '../../bento/globalHeaderData';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '28px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const ICDCHeader = () => (
  <>
    <Header
      logo={headerData.globalHeaderLogo}
      // easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={customStyle}
    />
  </>
);
export default ICDCHeader;

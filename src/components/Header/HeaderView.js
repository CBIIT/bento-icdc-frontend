import React from 'react';
import { Header } from 'bento-components';
import headerData from '../../bento/globalHeaderData';

const nihLogoImgStyle = {
  height: '54px',
  width: '463px',
  marginLeft: '9px',
};

const ICDCHeader = () => (
  <>
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      nihLogoImg={nihLogoImgStyle}
    />
  </>
);
export default ICDCHeader;

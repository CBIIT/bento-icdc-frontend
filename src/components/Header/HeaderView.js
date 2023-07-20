import React from 'react';
import { Header } from 'bento-components';
import { useLocation } from 'react-router';
import headerData from '../../bento/globalHeaderData';

const customStyle = {
  nihLogoImg: {
    height: '54px',
    width: '463px',
    marginLeft: '8px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const ICDCHeader = () => {
  const location = useLocation();

  return (
    <>
      {
        location.pathname.includes('/jBrowse') ? (
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            noLink
            customStyle={customStyle}
          />
        ) : (
          <Header
            logo={headerData.globalHeaderLogo}
            alt={headerData.globalHeaderLogoAltText}
            homeLink={headerData.globalHeaderLogoLink}
            customStyle={customStyle}
          />
        )
      }
    </>
  );
};
export default ICDCHeader;

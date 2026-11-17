import React from 'react';
import { useLocation } from 'react-router';
import FooterData from '../../bento/globalFooterData';
import { useServiceVersions } from '../../hooks/useServiceVersions';
import CustomThemeProvider from './FooterThemConfig';
import { Footer } from '../../bento-core';

const ICDC_FOOTER_STYLE = {
  padding: '24px 294px 45px',
};

const ICDCFooter = () => {
  const location = useLocation();
  const { pathname } = location;

  const [backend, fileService] = useServiceVersions(['backend', 'fileService']);
  const footerUpdatedData = {
    ...FooterData,
    link_sections: FooterData.link_sections.map(section => {
      if (!section.systemInfoInLinkSection) return section;
      return {
        ...section,
        items: [
          ...section.items.map(item =>
            item.text?.startsWith('BE Version:') && backend.data !== undefined
              ? { ...item, text: `BE Version: ${backend.data}` }
              : item
          ),
          ...(fileService.data !== undefined
            ? [{ text: `FS Version: ${fileService.data}` }]
            : []),
        ],
      };
    }),
  };

  if (pathname.includes('/jBrowse/')) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <Footer data={footerUpdatedData} styles={ICDC_FOOTER_STYLE} />
    </CustomThemeProvider>
  );
};

export default ICDCFooter;

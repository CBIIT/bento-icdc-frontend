import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';
import CustomThemeProvider from './FooterThemConfig';
import { Footer } from '../../bento-core';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const ICDC_FOOTER_STYLE = {
  padding: '24px 294px 45px',
};

const ICDCFooter = () => {
  // const location = useLocation();
  // const { pathname } = location;

  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  useEffect(() => {
    const getSystems = async () => {
      const response = await axios.get(`${FILE_SERVICE_API}version`);
      try {
        const { data } = response;
        // const FSverison = { FileServiceVersion: data.version || '' };
        const SystemInfo = FooterData.link_sections[2];
        SystemInfo.items.push({ text: `FS Version: ${data.version}` });
        setFooterUpdatedData({ ...FooterData, ...SystemInfo });
      } catch (error) {
        const FSverison = { FileServiceVersion: 'Error in getting File service verison' };
        setFooterUpdatedData({ ...FooterData, ...FSverison });
      }
    };
    getSystems();
  }, [FooterData]);

  return (
    <CustomThemeProvider>
      <Footer data={footerUpdatedData} styles={ICDC_FOOTER_STYLE} />
    </CustomThemeProvider>
  );
};

export default ICDCFooter;

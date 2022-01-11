import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const ICDCFooter = () => {
  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  useEffect(() => {
    const getSystems = async () => {
      const response = await axios.get(`${FILE_SERVICE_API}version`);
      try {
        const { data } = response;
        const FSverison = { FileServiceVersion: data.version || '' };
        setFooterUpdatedData({ ...FooterData, ...FSverison });
      } catch (error) {
        console.error(error);
      }
    };
    getSystems();
  }, [FooterData]);
  return <><Footer data={footerUpdatedData} /></>;
};

export default ICDCFooter;

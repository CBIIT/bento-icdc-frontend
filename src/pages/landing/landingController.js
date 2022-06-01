/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import yaml from 'js-yaml';
import { parse, stringify } from 'yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
// import env from '../../utils/env';
import LandingView from './landingView';
import NewsView from './views/newsView';

const ABOUT_CONTENT_URL = 'https://raw.githubusercontent.com/CBIIT/bento-icdc-static-content/main/yaml/newsView.yaml';
const NEWS_PATH = '/news';

const LandingController = ({ match }) => {
  const [data, setData] = useState([]);
  const [landingPageData, setLandingPageData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(ABOUT_CONTENT_URL);

        resultData = parse(result.data);
      } catch (error) {
        result = await axios.get(YAMLData);
        resultData = parse(result.data);
      }

      const supportObj = resultData.find(({ page }) => page === '/news');
      const landingPageObj = resultData.find(({ page }) => page === 'landing');
      setLandingPageData(landingPageObj);
      setData(supportObj);
    };
    fetchData();
  }, []);

  if (data.length === 0 || data === undefined) {
    return <CircularProgress />;
  }

  if (data && match.path === NEWS_PATH) {
    return (
      <NewsView
        availableSoonImage={data && data.availableSoonImage}
        news={data && data.content}
      />
    );
  }

  return (
    <LandingView
      link={data.sourceLink1 || 'testlink'}
      pageData={landingPageData && landingPageData}
      primaryContentImage={data && data.primaryContentImage}
    />
  );
};

export default LandingController;

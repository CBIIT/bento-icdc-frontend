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

const LANDING_CONTENT_URL = 'https://raw.githubusercontent.com/CBIIT/bento-icdc-static-content/develop/landingView.yaml';
const NEWS_CONTENT_URL = 'https://raw.githubusercontent.com/CBIIT/bento-icdc-static-content/develop/newsView.yaml';
const NEWS_PATH = '/news';

const LandingController = ({ match }) => {
  const [newsData, setNewsData] = useState([]);
  const [landingPageData, setLandingPageData] = useState([]);
  useEffect(() => {
    const fetchStaticContent = async (url, setter) => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(url);

        resultData = parse(result.data);
        if (setter === 'landing') {
          setLandingPageData(resultData[0]);
        } else {
          setNewsData(resultData[0]);
        }
      } catch (error) {
        result = await axios.get(YAMLData);
        resultData = parse(result.data);
      }
    };
    fetchStaticContent(LANDING_CONTENT_URL, 'landing');
    fetchStaticContent(NEWS_CONTENT_URL, 'news');
  }, []);

  if (newsData.length === 0 || newsData === undefined || landingPageData === undefined) {
    return <CircularProgress />;
  }

  if (newsData && match.path === NEWS_PATH) {
    return (
      <NewsView
        availableSoonImage={newsData && newsData.availableSoonImage}
        news={newsData && newsData.content}
      />
    );
  }
  console.log('lamding', landingPageData);
  console.log('nes', newsData);
  return (
    <LandingView
      link={newsData.sourceLink1 || 'testlink'}
      pageData={landingPageData && landingPageData}
      primaryContentImage={newsData && newsData.primaryContentImage}
    />
  );
};

export default LandingController;

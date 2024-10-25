import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { parse } from 'yaml';
import axios from 'axios';
import LandingView from './landingView';
import NewsView from './views/newsView';
import env from '../../utils/env';

const LANDING_CONTENT_URL = env.REACT_APP_LANDING_DATA;
const NEWS_CONTENT_URL = env.REACT_APP_NEWS_DATA;
const NEWS_PATH = '/news';

const LandingController = ({ match }) => {
  const [newsData, setNewsData] = useState(undefined);
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
          setNewsData(resultData);
        }
      } catch (error) {
      }
    };
    fetchStaticContent(LANDING_CONTENT_URL, 'landing');
    fetchStaticContent(NEWS_CONTENT_URL, 'news');
  }, []);

  if (newsData === undefined || landingPageData === undefined
    || landingPageData.tabs === undefined) {
    return <CircularProgress />;
  }

  if (newsData && match.path === NEWS_PATH) {
    return (
      <NewsView
        availableSoonImage={newsData && newsData.availableSoonImage}
        news={newsData && newsData}
      />
    );
  }

  return (
    <LandingView
      link={newsData.sourceLink1 || 'testlink'}
      pageData={landingPageData && landingPageData}
      primaryContentImage={newsData && newsData.primaryContentImage}
    />
  );
};

export default LandingController;

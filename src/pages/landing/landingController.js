import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import env from '../../utils/env';
import LandingView from './landingView';
import NewsView from './views/newsView';

const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;
const NEWS_PATH = '/news';

const LandingController = ({ match }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      try {
        result = await axios.get(ABOUT_CONTENT_URL);
        resultData = yaml.safeLoad(result.data);
      } catch (error) {
        result = await axios.get(YAMLData);
        resultData = yaml.safeLoad(result.data);
      }

      const supportObj = resultData.find(({ page }) => page === '/news');
      setData(supportObj);
    };
    fetchData();
  }, []);

  if (data.length === 0 || data === undefined) {
    return <CircularProgress />;
  }

  if (data && match.path === NEWS_PATH) {
    console.log('news deets', data);
    return (
      <NewsView
        availableSoonImage={data && data.availableSoonImage}
      />
    );
  }

  return (
    <LandingView
      link={data.sourceLink1 || 'testlink'}
      primaryContentImage={data && data.primaryContentImage}
    />
  );
};

export default LandingController;

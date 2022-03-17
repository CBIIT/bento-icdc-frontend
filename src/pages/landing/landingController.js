import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import env from '../../utils/env';
import LandingView from './landingView';

const ABOUT_CONTENT_URL = env.REACT_APP_ABOUT_CONTENT_URL;

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

      console.log(match.path);
      const supportObj = resultData.find(({ page }) => page === match.path);
      setData(supportObj);
    };
    fetchData();
    console.log(data);
  }, [match.path]);

  const title = '123123 ambac';

  return (
    <LandingView data={title} />
  );
};

export default LandingController;

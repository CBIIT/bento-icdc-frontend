import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import CRDCImg from '../../assets/about/Photo-About_CRDC.jpg';
import developerImg from '../../assets/about/Photo-About_Developer.jpg';
import dataViewImg from '../../assets/about/Photo-About_ICDC_model.jpg';
import purposeImg from '../../assets/about/Photo-About_Purpose.jpg';
import committeeImg from '../../assets/about/Photo-About_SteeringCommittee.jpg';
import supportImg from '../../assets/about/About_Support.jpg';
import submitDataImg from '../../assets/about/Photo-About_SubmittingData.jpg';
import AboutBody from './aboutBodyView';

const ABOUT_CONTENT_URL = process.env.REACT_APP_ABOUT_CONTENT_URL;

const About = ({ match }) => {
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

      const supportObj = resultData.find(({ page }) => page === match.path);

      switch (match.path) {
        case '/crdc':
          supportObj.image = CRDCImg;
          break;
        case '/developers':
          supportObj.image = developerImg;
          break;
        case '/purpose':
          supportObj.image = purposeImg;
          break;
        case '/steeringCommittee':
          supportObj.image = committeeImg;
          break;
        case '/support':
          supportObj.image = supportImg;
          break;
        case '/icdcData':
          supportObj.image = dataViewImg;
          break;
        case '/submit':
          supportObj.image = submitDataImg;
          break;
        default:
          supportObj.image = purposeImg;
      }
      setData(supportObj);
    };
    fetchData();
  }, [match.path]);

  return (
    <>
      <AboutBody data={{
        img: data.image ? data.image : '',
        title: data.title ? data.title : '',
        content: data.content ? data.content : '',
        table: data.table ? data.table : '',
      }}
      />
    </>
  );
};
export default About;

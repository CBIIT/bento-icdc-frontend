import React from 'react';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import yaml from 'js-yaml';
import styles from './ClinicalDataStyle';
import env from '../../../../utils/env';

const DataTable = () => {
  const getData = async (url) => {
    const response = await axios.get(url);
    const data = yaml.safeLoad(response.data);
    return data;
  };
  const DATA_MODEL = env.REACT_APP_DATA_MODEL;
  const DATA_MODEL_PROPS = env.REACT_APP_DATA_MODEL_PROPS;

  const getdata = async () => {
    const icdcMData = await getData(DATA_MODEL);
    const icdcMPData = await getData(DATA_MODEL_PROPS);
  };

  getdata();

  return (
    <>
    </>
  );
};

export default withStyles(styles)(DataTable);

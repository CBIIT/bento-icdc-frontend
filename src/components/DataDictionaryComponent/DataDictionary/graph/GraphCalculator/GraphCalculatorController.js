/* eslint-disable no-unused-vars */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import GraphCalculator from './GraphCalculator';

const DictionarySearcherController = (props) => {
  if (!props.dictionary && !props.linksSearch && !props.countsSearch) {
    return <CircularProgress />;
  }

  // eslint-disable-next-line no-console
  console.log('GraphCalculatorController.js', props);

  return <GraphCalculator {...props} />;
};

export default DictionarySearcherController;

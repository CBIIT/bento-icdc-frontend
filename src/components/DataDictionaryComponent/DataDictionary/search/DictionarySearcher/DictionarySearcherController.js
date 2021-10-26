import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DictionarySearcher from './DictionarySearcher';

const DictionarySearcherController = (props) => {
  // eslint-disable-next-line no-console
  if (!props.dictionary) {
    return <CircularProgress />;
  }
  return <DictionarySearcher {...props} />;
};

export default DictionarySearcherController;

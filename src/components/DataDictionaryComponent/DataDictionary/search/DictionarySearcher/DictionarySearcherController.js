import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DictionarySearcher from './DictionarySearcher';

const DictionarySearcherController = (props) => {
  if (!props.dictionary) {
    return <CircularProgress />;
  }

  // eslint-disable-next-line no-console
  console.log(props);
  return <DictionarySearcher {...props} />;
};

export default DictionarySearcherController;

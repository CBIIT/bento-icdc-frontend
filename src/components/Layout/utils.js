/* eslint-disable block-scoped-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import _ from 'lodash';
import { ReduxDataDictionary, getModelExploreData } from 'model-explorer';
import store from '../../store';

async function getData() {
  const response = await getModelExploreData();
  Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        payload: { data: response.data },
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: response.version,
      }),
    ],
  );
}

const ModelExplorer = () => {
  getData();
  return (
    <ReduxDataDictionary />
  );
};

export default ModelExplorer;

import React from 'react';
import _ from 'lodash';
import { withStyles } from '@mui/styles';
import { ReduxDataDictionary, getModelExploreData } from 'data-model-navigator';
import store from '../../store';
import {
  filterConfig,
  pdfDownloadConfig,
  readMeConfig,
  controlVocabConfig,
  graphViewConfig,
} from '../../bento/dataDictionaryData';
import env from '../../utils/env';
import { Typography } from '../../components/Wrappers/Wrappers';

const DATA_MODEL = env.REACT_APP_DATA_MODEL;
const DATA_MODEL_PROPS = env.REACT_APP_DATA_MODEL_PROPS;
const DATA_MODEL_README = env.REACT_APP_DMN_README;

async function getData() {
  const response = await getModelExploreData(DATA_MODEL, DATA_MODEL_PROPS);
  Promise.all(
    [
      store.dispatch({
        type: 'REACT_FLOW_GRAPH_DICTIONARY',
        dictionary: response.data,
        pdfDownloadConfig,
        graphViewConfig,
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY',
        payload: {
          data: response.data,
          facetfilterConfig: filterConfig,
          readMeConfig: {
            readMeUrl: DATA_MODEL_README,
            readMeTitle: readMeConfig.title,
          },
          ctrlVocabConfig: controlVocabConfig,
          pdfDownloadConfig,
          graphViewConfig,
        },
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: response.version,
      }),
    ],
  );
}

// added for demo - will be replaced with ReadMe file url for DMN

const NavigatorView = ({
  classes,
}) => {
  if (!DATA_MODEL || !DATA_MODEL_PROPS || !DATA_MODEL_README) {
    return (
      <Typography variant="h4" color="error" size="sm">
        <ul>
          {(!DATA_MODEL) && (<li>Provided URL for Data model </li>)}
          {(!DATA_MODEL_PROPS) && (<li>Provided URL for Data model Properties</li>)}
          {(!DATA_MODEL_README) && (<li>Provided URL for Data model ReadMe</li>)}
        </ul>
      </Typography>
    );
  }
  getData();
  return (
    <div className={classes.container}>
      <ReduxDataDictionary pdfDownloadConfig={pdfDownloadConfig} />
    </div>
  );
};

const styles = () => ({
  container: {
    marginTop: '60px',
  },
});

export default withStyles(styles)(NavigatorView);

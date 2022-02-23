/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import JBrowseDetailView from './JbrowseDetailView';
import {
  jBrowseOptions,
  GET_JBROWSE_DETAIL_DATA_QUERY,
} from '../../bento/JBrowseData';
import env from '../../utils/env';
import { Typography } from '../../components/Wrappers/Wrappers';
import Error from '../error/Error';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const JbrowseDetailContainer = ({ match }) => {
  const [bamFiles, setBamFiles] = useState([]);

  const { loading, error, data } = useQuery(GET_JBROWSE_DETAIL_DATA_QUERY, {
    variables: { sample_id: match.params.id },
  });

  const getAllFilesUri = async (file) => {
    const resp = await axios.get(
      `${FILE_SERVICE_API}${file.uuid}`,
      {
        headers: {
          'Content-Type': 'application/pdf',
        },
      },
    );

    return {
      file_location: resp.data,
      file_type: file.file_format,
      file_name: file.file_name,
    };
  };
  const getBamFiles = async () => {
    if (data && data.filesBySampleId) {
      const promiseArr = data.filesBySampleId.filter(
        (file) => (file.file_format === 'bam' || file.file_format === 'bai'),
      ).map(getAllFilesUri);
      const responses = await Promise.all(promiseArr);
      setBamFiles(responses);
    }
  };
  useEffect(() => {
    if (data && data.filesBySampleId && !loading) {
      getBamFiles();
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (data.filesBySampleId && data.filesBySampleId.length === 0) {
    return <Error />;
  }
  if (error || !data.filesBySampleId) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return (
    <JBrowseDetailView
      bamFiles={bamFiles}
      options={jBrowseOptions}
    />
  );
};

export default JbrowseDetailContainer;

/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import JBrowseDetailView from './JbrowseDetailView';
import {
  jBrowseOptions,
  // GET_JBROWSE_DETAIL_DATA_QUERY,
  GET_FILES_ID_BY_NAME,
  FILE_TYPE_BAM,
  FILE_TYPE_BAI,
  FILE_TYPE_VCF,
  FILE_TYPE_VCF_INDEX,
} from '../../bento/JBrowseData';
import env from '../../utils/env';
import { Typography } from '../../components/Wrappers/Wrappers';
import Error from '../error/Error';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const JbrowseDetailContainer = ({ match }) => {
  const [bamFiles, setBamFiles] = useState([]);
  const [vcfFiles, setVcfFiles] = useState([]);
  const { type, id } = match.params;
  const files = [id];
  switch (type) {
    case FILE_TYPE_BAM:
      files.push(`${id}.${FILE_TYPE_BAI}`);
      break;
    case FILE_TYPE_BAI:
      files.push(`${id}`.replace(`.${FILE_TYPE_BAI}`, ''));
      break;
    case FILE_TYPE_VCF:
      files.push(`${id}.${FILE_TYPE_VCF_INDEX}`);
      break;
    case FILE_TYPE_VCF_INDEX:
      files.push(`${id}`.replace(`.${FILE_TYPE_VCF_INDEX}`, ''));
      break;
    default:
      break;
  }

  const { loading, error, data } = useQuery(GET_FILES_ID_BY_NAME, {
    variables: { file_name: files },
  });

  const getAllFilesUri = async (file) => {
    const resp = await axios.get(
      `${FILE_SERVICE_API}${file.file_uuid}`,
      {
        headers: {
          'Content-Type': 'application/pdf',
        },
      },
    );
    return {
      file_location: resp.data,
      file_type: `${file.file_name}`.split('.').pop(),
      file_name: file.file_name,
    };
  };
  const getFiles = async () => {
    if (data && data.fileIdsFromFileName) {
      const promiseArr = data.fileIdsFromFileName.map(getAllFilesUri);
      const responses = await Promise.all(promiseArr);
      if (type === FILE_TYPE_VCF || type === FILE_TYPE_VCF_INDEX) {
        setVcfFiles(responses);
      }
      if (type === FILE_TYPE_BAM || type === FILE_TYPE_BAI) {
        setBamFiles(responses);
      }
    }
  };
  useEffect(() => {
    if (data && data.fileIdsFromFileName && !loading) {
      getFiles();
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (data.fileIdsFromFileName && data.fileIdsFromFileName.length === 0) {
    return <Error />;
  }
  if (error || !data.fileIdsFromFileName) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return (
    <JBrowseDetailView
      bamFiles={bamFiles}
      vcfFiles={vcfFiles}
      options={jBrowseOptions}
    />
  );
};

export default JbrowseDetailContainer;

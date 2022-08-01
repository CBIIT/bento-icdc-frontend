/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GET_FILES_ID_BY_NAME,
  FILE_TYPE_BAI,
  FILE_TYPE_BAM,
  FILE_TYPE_VCF,
  FILE_TYPE_VCF_INDEX,
  jBrowseOptions,
} from '../../bento/JBrowseData';
import { Typography } from '../../components/Wrappers/Wrappers';
import Error from '../error/Error';
import {
  getAllFilesUri,
} from './util';
import JbrowseDetailView from './JbrowseDetailView';

const JbrowseController = ({ match }) => {
  const { params } = match;
  const [jbrowseFiles, setJbrowseFiles] = useState([]);
  const allFiles = useSelector((state) => (state.jbrowseView
    && state.jbrowseView.jbrowseFiles && state.jbrowseView.jbrowseFiles.filesName
    ? state.jbrowseView.jbrowseFiles.filesName : JSON.parse(localStorage.getItem('jbrowseFiles'))));
  if (!allFiles) {
    return <CircularProgress />;
  }
  const generateIndexFile = (selectedFiles) => {
    const files = [];
    const vcfFiles1 = selectedFiles.filter((item) => item.includes(FILE_TYPE_VCF));
    const bamFiles1 = selectedFiles.filter((item) => item.includes(FILE_TYPE_BAM));
    vcfFiles1.forEach((fileName) => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_VCF_INDEX}`);
    });
    bamFiles1.forEach((fileName) => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_BAI}`);
      files.push(`${fileName}`.replace(`${FILE_TYPE_BAM}`, `${FILE_TYPE_BAI}`));
    });
    return files;
  };

  const generateFiles = generateIndexFile(allFiles);
  const { loading, error, data } = useQuery(GET_FILES_ID_BY_NAME, {
    variables: { file_name: generateFiles },
  });

  const formatFiles = (files, selectedFiles) => {
    const formatedFiles = [];
    selectedFiles.forEach((item) => {
      const fileName = `${item}`.replace(`.${FILE_TYPE_VCF}`, '').replace(`.${FILE_TYPE_BAM}`, '');
      const file = files.filter((c) => c.file_name.includes(fileName));
      formatedFiles.push(file);
    });
    return formatedFiles;
  };

  const getFiles = async () => {
    if (data && data.fileIdsFromFileName) {
      const promiseArr = data.fileIdsFromFileName.map(getAllFilesUri);
      const responses = await Promise.all(promiseArr);
      const formatedFiles = formatFiles(responses, allFiles);
      setJbrowseFiles(formatedFiles);
    }
  };

  useEffect(() => {
    if (data && data.fileIdsFromFileName && !loading) {
      getFiles();
    }
  }, [data]);

  if (loading || jbrowseFiles.length === 0) return <CircularProgress />;
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
    <>
      <JbrowseDetailView
        displayMode={params.diplayMode}
        jbrowseFiles={jbrowseFiles}
        options={jBrowseOptions}
      />
    </>
  );
};

export default JbrowseController;

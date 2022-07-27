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
} from '../../../bento/JBrowseData';
import { Typography } from '../../../components/Wrappers/Wrappers';
import Error from '../../error/Error';
import {
  getAllFilesUri,
} from '../util';

const JbrowseMultiViewController = (props) => {
  const [jbrowseFiles, setJbrowseFiles] = useState([]);
  const allFiles = useSelector((state) => (state.jbrowseView
    && state.jbrowseView.jbrowseFiles && state.jbrowseView.jbrowseFiles.filesName
    ? state.jbrowseView.jbrowseFiles.filesName : null));
  if (!allFiles) return <CircularProgress />;

  const generateIndexFile = (selectedFiles) => {
    const files = [];
    const vcfFiles = selectedFiles.filter((item) => item.includes(FILE_TYPE_VCF));
    const bamFiles = selectedFiles.filter((item) => item.includes(FILE_TYPE_BAM));
    vcfFiles.forEach((fileName) => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_VCF_INDEX}`);
    });
    bamFiles.forEach((fileName) => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_BAI}`);
    });
    return files;
  };

  const generateFiles = generateIndexFile(allFiles);

  const { loading, error, data } = useQuery(GET_FILES_ID_BY_NAME, {
    variables: { file_name: generateFiles },
  });
  console.log('get fileid');
  console.log(data);

  const getFiles = async () => {
    if (data && data.fileIdsFromFileName) {
      const promiseArr = data.fileIdsFromFileName.map(getAllFilesUri);
      const responses = await Promise.all(promiseArr);
      console.log(responses);
      setJbrowseFiles(responses);
    }
  };
  useEffect(() => {
    if (data && data.fileIdsFromFileName && !loading) {
      getFiles();
      console.log(jbrowseFiles);
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
    <>
      <h2>Multi view page</h2>
    </>
  );
};

export default JbrowseMultiViewController;

import React, { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
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
import { useJbrowseFileUrls } from './useJbrowseFileUrls';
import JbrowseDetailView from './JbrowseDetailView';
import { SkeletonLoader } from '../../components/Skeleton';

const JbrowseController = ({ match }) => {
  const { params } = match;
  const allFiles = useSelector(state =>
    state.jbrowseView &&
    state.jbrowseView.jbrowseFiles &&
    state.jbrowseView.jbrowseFiles.filesName
      ? state.jbrowseView.jbrowseFiles.filesName
      : JSON.parse(localStorage.getItem('jbrowseFiles'))
  );

  /**
   * 1. Generate possible jbrowse index files
   * 2. result set include valid and invalid index files which is use for retriving files uuid
   * 3. if file name is valid it will return index file url for Jbrowse
   * @param {*} selectedFiles
   * @returns
   */
  const generateIndexFile = selectedFiles => {
    const files = [];
    const vcfFiles1 = selectedFiles.filter(item =>
      item.includes(FILE_TYPE_VCF)
    );
    const bamFiles1 = selectedFiles.filter(item =>
      item.includes(FILE_TYPE_BAM)
    );
    vcfFiles1.forEach(fileName => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_VCF_INDEX}`);
    });
    bamFiles1.forEach(fileName => {
      files.push(fileName);
      files.push(`${fileName}.${FILE_TYPE_BAI}`);
      files.push(`${fileName}`.replace(`${FILE_TYPE_BAM}`, `${FILE_TYPE_BAI}`));
    });
    return files;
  };

  const generateFiles = generateIndexFile(allFiles || []);
  const { loading, error, data, refetch } = useQuery(GET_FILES_ID_BY_NAME, {
    variables: { file_name: generateFiles },
    skip: generateFiles.length === 0,
  });

  const formatFiles = (files, selectedFiles) => {
    const formatedFiles = [];
    selectedFiles.forEach(item => {
      const fileName = `${item}`
        .replace(`.${FILE_TYPE_VCF}`, '')
        .replace(`.${FILE_TYPE_BAM}`, '');
      const filteredFiles = files.filter(c => c.file_name.includes(fileName));
      // rename BAM index file - to BAM file
      const renameIndexFiles = filteredFiles.map(file => {
        if (file.file_type === FILE_TYPE_BAI) {
          return {
            ...file,
            file_name: `${fileName}.${FILE_TYPE_BAM}`,
          };
        }
        return file;
      });
      formatedFiles.push(renameIndexFiles);
    });
    return formatedFiles;
  };

  const fileUrls = useJbrowseFileUrls(
    data?.fileIdsFromFileName ?? [],
    generateFiles.length > 0 && !loading && !error
  );
  const jbrowseFiles = useMemo(
    () => (fileUrls.data ? formatFiles(fileUrls.data, allFiles || []) : []),
    [fileUrls.data, allFiles]
  );
  const { error: urlError, refetch: refetchUrls } = fileUrls;

  useEffect(() => {
    if (!error && !urlError) return;
    const message = 'Unable to load JBrowse files.';
    toast.error(message, {
      id: message,
      duration: Infinity,
      action: {
        label: 'Retry',
        onClick: () => {
          toast.dismiss(message);
          void (error ? refetch() : refetchUrls()).catch(() => undefined);
        },
      },
    });
    return () => toast.dismiss(message);
  }, [error, urlError, refetch, refetchUrls]);

  if (error || urlError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {`An error has occurred in loading component: ${error || urlError}`}
      </Typography>
    );
  }
  if (generateFiles.length === 0) return <Error />;
  if (loading) return <SkeletonLoader />;
  if (!data?.fileIdsFromFileName) {
    return (
      <Typography variant="h5" color="error" size="sm">
        Recieved wrong data
      </Typography>
    );
  }
  if (data.fileIdsFromFileName.length === 0) return <Error />;
  if (fileUrls.isPending) return <SkeletonLoader />;

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

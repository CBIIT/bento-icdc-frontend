import React from 'react';
import { useQuery } from '@apollo/client';
import {CircularProgress} from '@mui/material';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DATA_QUERY } from '../../bento/studiesData';
import { convertCRDCLinksToValue } from '../../utils/utils';

const studiesContainer = ({ invalid }) => {
  const { loading, error, data } = useQuery(GET_STUDY_DATA_QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="headline" color="error" size="sm">{error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}</Typography>;

  return <Studies data={convertCRDCLinksToValue(data)} invalid={invalid} />;
};

export default studiesContainer;

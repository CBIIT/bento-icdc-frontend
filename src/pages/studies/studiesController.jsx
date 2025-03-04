import React from 'react';
import { useQuery } from '@apollo/client';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DATA_QUERY } from '../../bento/studiesData';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { SkeletonLoader } from '../../components/Skeleton';

const studiesContainer = ({ invalid }) => {
  const { loading, error, data } = useQuery(GET_STUDY_DATA_QUERY);
  if (loading) return <SkeletonLoader variant="withRounded" />;
  if (error)
    return (
      <Typography variant="h2" color="error" size="sm">
        {error
          ? `An error has occurred in loading stats component: ${error}`
          : 'Recieved wrong data'}
      </Typography>
    );

  return <Studies data={convertCRDCLinksToValue(data)} invalid={invalid} />;
};

export default studiesContainer;

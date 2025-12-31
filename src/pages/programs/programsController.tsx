import React from 'react';
import { useQuery } from '@apollo/client';
import View from './programs-view';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GetProgramsDataQueryDocument,
  GetProgramsDataQueryQuery,
} from '../../generated-types/graphql';
import { SkeletonLoader } from '../../components/Skeleton';

const container: React.FC = () => {
  const { loading, error, data } = useQuery<GetProgramsDataQueryQuery>(
    GetProgramsDataQueryDocument
  );
  if (loading) return <SkeletonLoader variant="withRounded" />;
  if (error)
    return (
      <Typography variant="headline" color="error" size="sm">
        An error has occurred in loading stats component: {error.message}
      </Typography>
    );
  return <View data={data} />;
};

export default container;

import React, { useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GetStudyDataQueryStudiesDataDocument,
  GetStudyDataQueryStudiesDataQuery,
} from '../../generated-types/graphql';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { SkeletonLoader } from '../../components/Skeleton';

interface StudiesContainerProps {
  invalid?: boolean;
}

const studiesContainer: React.FC<StudiesContainerProps> = ({ invalid }) => {
  const { loading, error, data } =
    apolloUseQuery<GetStudyDataQueryStudiesDataQuery>(
      GetStudyDataQueryStudiesDataDocument
    );

  const repositories = useMemo(() => {
    // const links = data?.externalDataOverview?.[0]?.CRDCLinks;
    const links = data?.externalDataOverview?.flatMap(
      item => item?.CRDCLinks || []
    );
    return links?.map(link => link.repository) || [];
  }, [data]);

  if (loading) return <SkeletonLoader variant="withRounded" />;
  if (error)
    return (
      <Typography variant="h2" color="error" size="sm">
        An error has occurred in loading stats component: {error.message}
      </Typography>
    );

  return (
    <Studies
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data={convertCRDCLinksToValue(data, undefined, repositories)}
      invalid={invalid}
      interOpData={data || {}}
    />
  );
};

export default studiesContainer;

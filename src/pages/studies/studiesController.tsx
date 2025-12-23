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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { loading, error, data } =
    apolloUseQuery<GetStudyDataQueryStudiesDataQuery>(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      GetStudyDataQueryStudiesDataDocument
    );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const repositories = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const links = data?.externalDataOverview?.[0]?.CRDCLinks;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      interOpData={data || {}}
    />
  );
};

export default studiesContainer;

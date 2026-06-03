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
      GetStudyDataQueryStudiesDataDocument,
      {
        errorPolicy: 'all',
      }
    );

  const repositories = useMemo(() => {
    return (
      data?.externalDataOverview
        ?.flatMap(item => item?.CRDCLinks ?? [])
        .map(link => link?.repository)
        .filter((repo): repo is string => Boolean(repo)) ?? []
    );
  }, [data]);

  const safeData = useMemo(() => {
    return {
      ...data,
      studiesByProgram: data?.studiesByProgram ?? [],
      externalDataOverview: data?.externalDataOverview ?? [],
    };
  }, [data]);

  if (loading && !data) return <SkeletonLoader variant="withRounded" />;

  return (
    <>
      {error && (
        <Typography variant="h2" color="error" size="sm">
          Some data could not be loaded.
        </Typography>
      )}

      <Studies
        data={convertCRDCLinksToValue(safeData as GetStudyDataQueryStudiesDataQuery, undefined, repositories)}
        invalid={invalid}
        interOpData={safeData}
      />
    </>
  );
};

export default studiesContainer;

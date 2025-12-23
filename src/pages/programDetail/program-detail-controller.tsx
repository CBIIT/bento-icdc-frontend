import React, { useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import ProgramDetailView from './program-detail-view';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Typography } from '@mui/material';
import {
  ProgramDocument,
  ProgramQuery,
  ProgramQueryVariables,
} from '../../generated-types/graphql';
import { SkeletonLoader } from '../../components/Skeleton';

interface ProgramDetailControllerProps {
  match: RouteComponentProps<{ id: string }>['match'];
}
const ProgramDetailController: React.FC<ProgramDetailControllerProps> = ({
  match,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { loading, error, data } = apolloUseQuery<
    ProgramQuery,
    ProgramQueryVariables
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  >(ProgramDocument, {
    variables: { programTitle: match.params.id },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const repositories = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const links = data?.externalDataOverview?.[0]?.CRDCLinks;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return links?.map(link => link.repository) || [];
  }, [data]);

  if (loading) return <SkeletonLoader variant="withRounded" />;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!data || data.program.length === 0) {
    return (
      <Typography color="error">
        {error
          ? `An error has occurred in loading stats component: ${error?.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <ProgramDetailView
      data={
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        convertCRDCLinksToValue(
          data,
          'studiesByProgramId',
          repositories
        ) as ProgramQuery
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      interOpData={data}
    />
  );
};

export default ProgramDetailController;

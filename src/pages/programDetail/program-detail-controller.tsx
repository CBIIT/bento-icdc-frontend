import React, { useMemo } from 'react';
import { useQuery as apolloUseQuery } from '@apollo/client';
import ProgramDetailView from './program-detail-view';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Typography } from '@mui/material';
import {
  GetStudiesByProgramProgramDetailTwoDocument,
  ProgramDocument,
  ProgramQuery,
  ProgramQueryVariables,
} from '../../generated-types/graphql';
import { SkeletonLoader } from '../../components/Skeleton';
import request from 'graphql-request';
import env from '../../utils/env';
import { useQuery } from '@tanstack/react-query';

interface ProgramDetailControllerProps {
  match: RouteComponentProps<{ id: string }>['match'];
}
const ProgramDetailController: React.FC<ProgramDetailControllerProps> = ({
  match,
}) => {
  const { loading, error, data } = apolloUseQuery<
    ProgramQuery,
    ProgramQueryVariables
  >(ProgramDocument, {
    variables: { programTitle: match.params.id },
  });

  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(
        /* eslint-disable-next-line */
        env.REACT_APP_INTEROP_SERVICE_URL,
        GetStudiesByProgramProgramDetailTwoDocument
      ),
  });

  const repositories = useMemo(() => {
    const links = interOpData?.studiesByProgram?.[0]?.CRDCLinks;
    return links?.map(link => link.repository) || [];
  }, [interOpData]);

  if (loading || isLoading) return <SkeletonLoader variant="withRounded" />;
  if (!data || data.program.length === 0) {
    return (
      <Typography color="error">
        {error
          ? `An error has occurred in loading stats component: ${error.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography component="h5" color="error">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  return (
    <ProgramDetailView
      data={
        convertCRDCLinksToValue(
          data,
          'studiesByProgramId',
          repositories
        ) as ProgramQuery
      }
      interOpData={interOpData}
    />
  );
};

export default ProgramDetailController;

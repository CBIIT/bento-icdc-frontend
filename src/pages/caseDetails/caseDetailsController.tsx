import React from 'react';
import { useQuery } from '@apollo/client';
import CaseDetailView from './caseDetailsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { SkeletonLoader } from '../../components/Skeleton';
import { RouteComponentProps } from 'react-router';
import {
  CaseDocument,
  CaseQuery,
  CaseQueryVariables,
} from '../../generated-types/graphql';

type MatchParams = {
  id: string;
};

const CaseDetailContainer = ({ match }: RouteComponentProps<MatchParams>) => {
  const { loading, error, data } = useQuery<CaseQuery, CaseQueryVariables>(
    CaseDocument,
    {
      variables: { case_record_id: match.params.id },
    }
  );

  if (loading) return <SkeletonLoader variant="withRounded" />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error
          ? `An error has occurred in loading component: ${error.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <CaseDetailView data={data} />;
};

export default CaseDetailContainer;

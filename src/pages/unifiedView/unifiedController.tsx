import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CaseDocument,
  CaseQuery,
  CaseQueryVariables,
  UnifiedViewDataDocument,
  UnifiedViewDataQuery,
  UnifiedViewDataQueryVariables,
} from '../../generated-types/graphql';
import Dashboard from './unifiedView';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  id: string;
}

interface UnifiedControllerProps {
  match: RouteComponentProps<MatchParams>['match'];
}

const UnifiedController: React.FC<UnifiedControllerProps> = ({ match }) => {
  const caseID = match.params.id;

  const { data: multiStudyData, loading: multistudyLoading } = useQuery<
    CaseQuery,
    CaseQueryVariables
  >(CaseDocument, {
    variables: { case_id: caseID },
  });

  const { data: unifiedViewStats, loading: unifiedViewStatsLoading } = useQuery<
    UnifiedViewDataQuery,
    UnifiedViewDataQueryVariables
  >(UnifiedViewDataDocument, {
    variables: {
      case_ids: multiStudyData?.multiStudyCases?.caseIds
        ? multiStudyData.multiStudyCases.caseIds.filter(
            (id): id is string => id !== null
          )
        : [],
    },
    skip: !multiStudyData?.multiStudyCases?.caseIds?.length,
  });

  if (multistudyLoading || unifiedViewStatsLoading) {
    return <CircularProgress />;
  }
  const unifiedViewData = {
    ...multiStudyData?.case?.[0],
    ...unifiedViewStats?.searchCases,
    individualId: multiStudyData?.multiStudyCases?.individualId,
  };

  return <Dashboard unifiedViewData={unifiedViewData} />;
};

export default UnifiedController;

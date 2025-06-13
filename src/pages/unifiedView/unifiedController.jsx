import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_UNIFIED_VIEW_DATA } from '../../bento/multiStudyData';
import { GET_CASE_DETAIL_DATA_QUERY } from '../../bento/caseDetailsData';
import Dashboard from './unifiedView';

const UnifiedController = ({ match }) => {
  const caseID = match.params.id;

  const { data: multiStudyData, loading: multistudyLoading } = useQuery(
    GET_CASE_DETAIL_DATA_QUERY,
    {
      variables: { case_id: caseID },
    }
  );

  const { data: unifiedViewStats, loading: unifiedViewStatsLoading } = useQuery(
    GET_UNIFIED_VIEW_DATA,
    {
      variables: {
        case_ids: multiStudyData?.multiStudyCases?.caseIds,
      },
      skip: !multiStudyData?.multiStudyCases?.caseIds,
    }
  );

  if (multistudyLoading || unifiedViewStatsLoading) {
    return <CircularProgress />;
  }

  const unifiedViewData = {
    ...multiStudyData.multiStudyCases,
    ...unifiedViewStats.searchCases,
  };

  return <Dashboard unifiedViewData={unifiedViewData} />;
};

export default UnifiedController;

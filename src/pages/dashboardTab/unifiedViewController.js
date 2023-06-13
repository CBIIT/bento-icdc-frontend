/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_UNIFIED_VIEW_DATA } from '../../bento/multiStudyData';
import {
  GET_CASE_DETAIL_DATA_QUERY,
} from '../../bento/caseDetailsData';
import Dashboard from './dashboardController';

const UnifiedViewController = ({ match }) => {
  const caseID = match.params.id;

  const { data: multiStudyData } = useQuery(GET_CASE_DETAIL_DATA_QUERY, {
    variables: { case_id: caseID },
  });
  const { data: unifiedViewStats, error } = useQuery(GET_UNIFIED_VIEW_DATA, {
    variables: {
      case_ids: multiStudyData && multiStudyData.multiStudyCases.caseIds
        ? multiStudyData.multiStudyCases.caseIds : null,
    },
    skip: !multiStudyData || !multiStudyData.multiStudyCases.caseIds,
  });

  if (error || !unifiedViewStats) {
    return <CircularProgress />;
  }

  const unifiedViewData = {
    ...multiStudyData.multiStudyCases,
    ...unifiedViewStats.searchCases,
  };
  return (
    <Dashboard
      unifiedViewData={unifiedViewData}
    />
  );
};

export default UnifiedViewController;

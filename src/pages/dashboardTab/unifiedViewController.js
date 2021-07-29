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
  /**
 * Returns an array containing multistudy cases
 * @return {Array}
 */
  const getCasesArray = () => {
    const data = JSON.parse(match.params.id);
    return (
      Object.keys(data).filter((elem) => elem !== 'caseID')
        .map((elem) => data[elem])
    );
  };

  const { caseID } = JSON.parse(match.params.id);
  const cases = getCasesArray();

  const unifiedViewStats = useQuery(GET_UNIFIED_VIEW_DATA, {
    variables: { case_ids: cases },
  });
  const multiStudyData = useQuery(GET_CASE_DETAIL_DATA_QUERY, {
    variables: { case_id: caseID },
  });

  const error = unifiedViewStats.error || multiStudyData.error;
  const loading = unifiedViewStats.loading || multiStudyData.loading;

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  const unifiedViewData = {
    ...multiStudyData.data.multiStudyCases,
    ...unifiedViewStats.data.unifiedViewData,
  };

  return (
    <Dashboard
      unifiedViewData={unifiedViewData}
    />
  );
};

export default UnifiedViewController;

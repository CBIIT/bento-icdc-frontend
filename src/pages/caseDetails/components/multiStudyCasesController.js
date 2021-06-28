import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { GET_UNIFIED_VIEW_DATA } from '../../../bento/multiStudyData';
import MultiStudyCases from './multiStudyCases';

const multiStudyCasesController = ({ cases, caseID, multiStudyData }) => {
  const { loading, error, data } = useQuery(GET_UNIFIED_VIEW_DATA, {
    variables: { case_ids: multiStudyData.caseIds },
  });
  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <MultiStudyCases
      cases={cases}
      caseID={caseID}
      multiStudyData={{ ...multiStudyData, ...data.unifiedViewData }}
    />
  );
};

export default multiStudyCasesController;

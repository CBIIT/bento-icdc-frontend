import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_CASE_DETAIL_DATA_QUERY,
} from '../../bento/caseDetailsData';

const CaseDetailContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_CASE_DETAIL_DATA_QUERY, {
    variables: { case_id: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <CaseDetailView data={data} />;
};

export default CaseDetailContainer;

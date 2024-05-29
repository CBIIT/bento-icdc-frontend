import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramDetailView from './program-detail-view';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../bento/programDetailData';
import { convertCRDCLinksToValue } from '../../utils/utils';

const ProgramDetailController = ({ match }) => {
  const { loading, error, data } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { programTitle: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (!data || data.program.length === 0) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <ProgramDetailView data={convertCRDCLinksToValue(data, 'studiesByProgramId')} />;
};

export default ProgramDetailController;

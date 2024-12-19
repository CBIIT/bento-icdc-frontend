import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramDetailView from './program-detail-view';
import { convertCRDCLinksToValue } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { Typography } from '@mui/material';
import {
  ProgramDocument,
  ProgramQuery,
  ProgramQueryVariables,
} from '../../generated-types/graphql';

interface ProgramDetailControllerProps {
  match: RouteComponentProps<{ id: string }>['match'];
}
const ProgramDetailController: React.FC<ProgramDetailControllerProps> = ({
  match,
}) => {
  const { loading, error, data } = useQuery<
    ProgramQuery,
    ProgramQueryVariables
  >(ProgramDocument, {
    variables: { programTitle: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (!data || data.program.length === 0) {
    return (
      <Typography color="error">
        {error
          ? `An error has occurred in loading stats component: ${error.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  return (
    <ProgramDetailView
      data={convertCRDCLinksToValue(data, 'studiesByProgramId') as ProgramQuery}
    />
  );
};

export default ProgramDetailController;

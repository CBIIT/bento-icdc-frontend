import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramDetailView from './components/programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';
import Error from '../error/Error';

const ProgramDetailContainer = ({ match }) => (
  <Query query={GET_PROGRAM_DETAIL_DATA_QUERY} variables={{ programTitle: match.params.id }}>
    {({ data, loading, error }) => {
      // loading status
      if (loading) {
        return <CircularProgress />;
      }

      // error as a internet error
      if (error) {
        return <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading component: ${error}`}</Typography>;
      }

      // error as not thing return from api
      if (!data || data.program.length === 0) {
        return <Error />;
      }

      return <ProgramDetailView data={data} />;
    }}
  </Query>
);

export default ProgramDetailContainer;

import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './components/studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_STUDY_DETAIL_DATA_QUERY,
} from '../../bento/studyDetailsData';
import Error from '../error/Error';

const StudyDetailContainer = ({ match }) => (
  <Query query={GET_STUDY_DETAIL_DATA_QUERY} variables={{ csd: match.params.id }}>
    {({ data, loading, error }) => {
      // loading status
      if (loading) {
        return <CircularProgress />;
      }
      // error as a internet error
      if (error) {
        return <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading  component: ${error}`}</Typography>;
      }

      return <StudyDetailView data={data} />;
    }}
  </Query>
);

export default StudyDetailContainer;
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_STUDY_DETAIL_DATA_QUERY,
} from '../../bento/studyDetailsData';
import Error from '../error/Error';

const StudyDetailContainer = ({ match, history }) => {
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { csd: match.params.id, accessionId: match.params.id },
  });

  // redirect url from Identifiers.org (replace accession_id with study designation - icdc_2072
  if (data && data.study) {
    const { study } = data;
    if (study.length > 0
      && study[0].clinical_study_designation !== match.params.id) {
      const redirectUrl = '/study/'.concat(study[0].clinical_study_designation);
      history.push(redirectUrl);
    }
    if (study.length === 0) {
      return <Error />;
    }
  }

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <StudyDetailView data={data} />;
};

export default StudyDetailContainer;

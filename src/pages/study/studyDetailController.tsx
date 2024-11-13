import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import StudyDetailView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import Studies from '../studies/studiesController';
import {
  StudyDocument,
  StudyQuery,
  StudyQueryVariables,
} from '../../generated-types/graphql';
import { RouteComponentProps } from 'react-router-dom';

interface MatchProps extends RouteComponentProps {
  params: {
    id: string;
    fileType: string;
  };
}

const StudyDetailContainer = ({
  match,
  history,
}: {
  match: MatchProps;
  history: RouteComponentProps['history'];
}) => {
  const { loading, error, data } = useQuery<StudyQuery, StudyQueryVariables>(
    StudyDocument,
    {
      variables: { csd: match.params.id, accessionId: match.params.id },
    }
  );

  // redirect url from Identifiers.org (replace accession_id with study designation - icdc_2072
  if (data && data.study) {
    const { study } = data;
    if (
      study.length > 0 &&
      study[0].clinical_study_designation &&
      study[0].clinical_study_designation !== match.params.id
    ) {
      const redirectUrl = '/study/'.concat(study[0].clinical_study_designation);
      history.push(redirectUrl);
    }
    if (study.length === 0) {
      return <Studies invalid />;
    }
  }

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography
        variant="h5"
        color="error"
        size="sm"
        weight={undefined}
        colorBrightness={undefined}
        family={undefined}
      >
        {error
          ? `An error has occurred in loading component: ${error.message}`
          : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <StudyDetailView data={data} initTab={match?.params?.fileType} />;
};

export default StudyDetailContainer;

import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import GlobalSearchView from './GlobalSerachView';
import { STUDIES_PROGRAM } from '../../bento/search';

const GlobalSearchController = ({ match }) => {
  /**
  * resolve study program match
  */
  const { loading, data } = useQuery(STUDIES_PROGRAM);

  if (loading || !data) {
    return <CircularProgress />;
  }
  // get study program
  const study2Program = data.studiesByProgram.reduce((acc, item) => {
    acc[item.clinical_study_designation] = item.program_id;
    return acc;
  }, {});

  return (
    <>
      <GlobalSearchView
        searchparam={match.params.id}
        study2Program={study2Program || {}}
      />
    </>
  );
};

export default GlobalSearchController;

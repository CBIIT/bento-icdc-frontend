import React from 'react';
import GlobalSearchView from './GlobalSerachView';

const GlobalSearchController = ({ match }) => {
  console.log('global search controller');
  return (
    <>
      <GlobalSearchView
        searchparam={match.params.id}
      />
    </>
  );
};

export default GlobalSearchController;

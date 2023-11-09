import React from 'react';
import GlobalSearchView from './GlobalSerachView';

const GlobalSearchController = ({ match }) => (
  <>
    <GlobalSearchView
      searchparam={match.params.id}
    />
  </>
);

export default GlobalSearchController;

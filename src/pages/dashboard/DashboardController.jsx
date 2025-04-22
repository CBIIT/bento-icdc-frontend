import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { getFilters } from '../../bento-core';
import DashboardView from './DashboardView';
import { DASHBOARD_QUERY } from '../../bento/dashboardTabData';
import { setActiveFilterByPathQuery } from '../../components/sideBarFilter/BentoFilterUtils';
import { SkeletonLoader } from '../../components/Skeleton';

const getDashData = states => {
  const { filterState, localFindUpload, localFindAutocomplete, searchText } =
    states;
  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client
      .query({
        query: DASHBOARD_QUERY,
        variables: activeFilters,
      })
      .then(response => {
        if (response.data) {
          const {
            dashboard: searchCases,
            searchTextResults,
            biospecimen_source,
            program,
          } = response.data;
          return {
            searchCases,
            searchTextResults,
            biospecimen_source,
            program,
          };
        }
      });
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    search_text: searchText || '',
    case_ids: [
      ...(localFindUpload || []).map(obj => obj.case_id),
      ...(localFindAutocomplete || []).map(obj => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then(result => {
      if (result) {
        setDashData(result);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete, searchText]);

  return { dashData, activeFilters };
};

const DashTemplateController = props => {
  const { match, history } = props;
  if (match.params.filterQuery) {
    setActiveFilterByPathQuery(match);
    const redirectUrl = '/explore';
    history.push(redirectUrl);
  }

  const { dashData, activeFilters } = getDashData(props);

  if (!dashData) {
    return <SkeletonLoader variant="withSidebar" />;
  }

  // set dashfilter tooltip text
  const {
    biospecimen_source: biospecimenSource,
    program,
    searchCases,
    searchTextResults,
  } = dashData;

  const {
    caseIds,
    sampleIds,
    fileIds: caseFileIds,
    studyFileIds,
  } = searchTextResults;

  return (
    <DashboardView
      {...props}
      searchResultIds={{
        caseIds,
        sampleIds,
        caseFileIds,
        studyFileIds,
      }}
      searchCases={{ ...searchCases, ...searchTextResults }}
      biospecimenSource={biospecimenSource}
      program={program}
      activeFilters={activeFilters}
    />
  );
};

const mapStateToProps = state => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
  searchText: state.dashboardReducer.searchQuery,
});

export default connect(mapStateToProps, null)(DashTemplateController);

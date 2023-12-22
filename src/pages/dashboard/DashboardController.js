import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '../../bento-core';
import DashboardView from './DashboardView';
import { DASHBOARD_QUERY } from '../../bento/dashboardTabData';
import { setActiveFilterByPathQuery } from '../../components/sideBarFilter/BentoFilterUtils';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload,
    localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY,
      variables: activeFilters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    case_ids: [
      ...(localFindUpload || []).map((obj) => obj.case_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result) {
        setDashData(result);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);

  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { match, history } = props;
  if (match.params.filterQuery) {
    setActiveFilterByPathQuery(match);
    const redirectUrl = '/explore';
    history.push(redirectUrl);
  }

  const {
    dashData,
    activeFilters,
  } = getDashData(props);

  if (!dashData) {
    return (<CircularProgress />);
  }

  // set dashfilter tooltip text
  const { biospecimen_source: biospecimenSource, program, searchCases } = dashData;

  return (
    <DashboardView
      {...props}
      searchCases={searchCases}
      biospecimenSource={biospecimenSource}
      program={program}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);

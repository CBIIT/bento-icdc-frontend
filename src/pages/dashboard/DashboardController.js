import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashboardView from './DashboardView';
import { DASHBOARD_QUERY } from '../../bento/dashboardTabData';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
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
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      console.log(result);
      if (result) {
        setDashData(result);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);
  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashboardView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.dashboard.filterState,
});

export default connect(mapStateToProps, null)(DashTemplateController);

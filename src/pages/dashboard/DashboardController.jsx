import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import { toast } from 'sonner';
import { getFilters } from '../../bento-core';
import DashboardView from './DashboardView';
import { DASHBOARD_QUERY } from '../../bento/dashboardTabData';
import { setActiveFilterByPathQuery } from '../../components/sideBarFilter/BentoFilterUtils';
import { SkeletonLoader } from '../../components/Skeleton';

const DashboardDataController = props => {
  const { filterState, localFindUpload, localFindAutocomplete, searchText } =
    props;
  const activeFilters = {
    ...getFilters(filterState),
    search_text: searchText || '',
    case_ids: [
      ...(localFindUpload || []).map(obj => obj.case_id),
      ...(localFindAutocomplete || []).map(obj => obj.title),
    ],
  };

  const { data, previousData, loading, error, refetch } = useQuery(
    DASHBOARD_QUERY,
    {
      variables: activeFilters,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (!error) return;

    const message = 'Unable to load dashboard data.';
    toast.error(message, {
      id: message,
      duration: Infinity,
      action: {
        label: 'Retry',
        onClick: () => {
          toast.dismiss(message);
          void refetch().catch(() => undefined);
        },
      },
    });
    return () => toast.dismiss(message);
  }, [error, refetch]);

  const displayData = data || previousData;
  if (!displayData) {
    return <SkeletonLoader variant="withSidebar" />;
  }

  // set dashfilter tooltip text
  const {
    biospecimen_source: biospecimenSource,
    program,
    dashboard: searchCases,
    searchTextResults,
  } = displayData;

  const {
    caseIds,
    sampleIds,
    fileIds: caseFileIds,
    studyFileIds,
  } = searchTextResults;

  return (
    <DashboardView
      {...props}
      loading={loading || !!error}
      searchResultIds={{
        caseIds: caseIds,
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

const DashTemplateController = props => {
  const { match, history } = props;
  const filterQuery = match.params.filterQuery;

  useEffect(() => {
    if (filterQuery) {
      setActiveFilterByPathQuery({ params: { filterQuery } });
      history.push('/explore');
    }
  }, [filterQuery, history]);

  return filterQuery ? null : <DashboardDataController {...props} />;
};

const mapStateToProps = state => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
  searchText: state.dashboardReducer.searchQuery,
});

export default connect(mapStateToProps, null)(DashTemplateController);

import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { filterData } from '../../bento-core';

import StatsView from './StatsView';

const Stats = ({ filter }) => {
  const data = useSelector(state => {
    if (!state.dashboard.isFetched) {
      // initDashboardStatus();
    }
    return state.dashboard &&
      state.dashboard.subjectOverView &&
      state.dashboard.subjectOverView.data
      ? (function extraData(_d) {
          // return getFilteredStat(d);
        })(
          state.dashboard.subjectOverView.data.filter(d =>
            filterData(d, filter)
          )
        )
      : [];
  });
  return !data || data.length === 0 ? (
    <CircularProgress />
  ) : (
    <StatsView data={data} />
  );
};

export default Stats;

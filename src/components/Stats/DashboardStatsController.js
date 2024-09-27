import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import StatsView from './StatsView';

const Stats = () => {
  const data = useSelector((state) => (
    state.dashboardTab
    && state.dashboardTab.stats
      ? state.dashboardTab.stats : []));

  return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={data} />);
};

export default (Stats);

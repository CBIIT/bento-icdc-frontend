import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import StatsView from './StatsView';
import { fetchDataForStats } from './StatsState';

const Stats = () => {
  const data = useSelector((state) => {
    if (!state.stats.isFetched) {
      const dispatch = useDispatch();
      dispatch(fetchDataForStats());
    }
    return state.stats.data;
  });

  return (!data || data.length === 0 ? (<CircularProgress />) : <StatsView data={data} />);
};

export default (Stats);

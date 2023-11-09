import React, { useState, useEffect } from 'react';
import { StatsBar } from '../../bento-core';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';
import { updateStat } from './utils';
/**
* Bento-core 4.0 update 5/17/2023
*/
const StatsView = ({ data }) => {
  const govAlertEl = document.getElementById('govAlertMsg');
  const initialTopValue = govAlertEl?.scrollHeight + 139; // Set your initial top value here
  const [topValue, setTopValue] = useState(initialTopValue);
  useEffect(() => {
    const handleScroll = () => {
      // Calculate the new top value based on scroll position
      const scrolledDownAmt = window.scrollY;
      const newTopValue = Math.max(139, initialTopValue - scrolledDownAmt);

      setTopValue(newTopValue);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialTopValue]);
  const scrollingStyle = {
    ...statsStyling.global,
    top: `${topValue}px`,
  };
  const updateData = updateStat(data);
  const stats = globalStatsData.map((e) => ({
    name: e.statTitle,
    val: updateData[e.statAPI],
    statIconSrc: e.statIconSrc,
  }));

  return (
    <>
      <StatsBar
        stats={stats}
        styles={{ ...statsStyling, global: scrollingStyle }}
      />
    </>
  );
};

export default StatsView;

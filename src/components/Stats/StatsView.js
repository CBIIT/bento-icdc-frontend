import React from 'react';
import { StatsBar } from '../../bento-core';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';
import { updateStat } from './utils';
/**
* Bento-core 4.0 update 5/17/2023
*/
const StatsView = ({ data }) => {
  const updateData = updateStat(data);
  const stats = globalStatsData.map((e) => ({
    name: e.statTitle,
    val: updateData[e.statAPI],
    statIconSrc: e.statIconSrc,
    statIconAlt: `${e.statTitle}-icon`
  }));

  return (
    <>
      <StatsBar
        stats={stats}
        styles={statsStyling}
      />
    </>
  );
};

export default StatsView;

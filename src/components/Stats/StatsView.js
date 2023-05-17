import React from 'react';
import StatsBar from '@bento-core/stats-bar';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';
import humanFileSize from './utils';

/* subtract study file count from total files count */
const updateStat = (stat) => {
  const { numberOfStudyFiles, numberOfFiles, volumeOfData } = stat;
  const numberOfCaseFiles = numberOfFiles - numberOfStudyFiles;
  return {
    ...stat,
    numberOfFiles: (numberOfCaseFiles > 0) ? numberOfCaseFiles : 0,
    volumeOfData: humanFileSize(volumeOfData),
  };
};

/**
* Bento-core 4.0 update 5/17/2023
*/
const StatsView = ({ data }) => {
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
        styles={statsStyling}
      />
    </>
  );
};

export default StatsView;

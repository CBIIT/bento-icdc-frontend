import React from 'react';
import { StatsBar } from 'bento-components';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';
import humanFileSize from './utils';

/* subtract study file count from total files count */
const updateStat = (stat) => {
  const { numberOfFiles, volumeOfData } = stat;
  const numberOfCaseFiles = numberOfFiles;
  return {
    ...stat,
    numberOfFiles: (numberOfCaseFiles > 0) ? numberOfCaseFiles : 0,
    volumeOfData: humanFileSize(volumeOfData),
  };
};

const StatsView = ({ data }) => (
  <>
    <StatsBar
      data={updateStat(data)}
      globalStatsData={globalStatsData}
      statsStyling={statsStyling}
    />
  </>
);

export default StatsView;

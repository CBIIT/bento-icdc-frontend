import React from 'react';
import { StatsBar } from 'bento-components';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

/* subtract study file count from total files count*/
const updateStatCount = (stat) => {
  const { numberOfStudyFiles, numberOfFiles } = stat;
  if (numberOfStudyFiles > 0) {
    return {
      ...stat,
      numberOfFiles: numberOfFiles - numberOfStudyFiles,
    };
  }
  return stat;
};

const StatsView = ({ data }) => (
  <>
    <StatsBar
      data={updateStatCount(data)}
      globalStatsData={globalStatsData}
      statsStyling={statsStyling}
    />
  </>
);

export default StatsView;

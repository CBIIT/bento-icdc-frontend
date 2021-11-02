import React from 'react';
import { StatsBar } from 'bento-components';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

/* subtract study file count from total files count */
const updateStat = (stat) => {
  const { numberOfStudyFiles, numberOfFiles } = stat;
  const numberOfCaseFiles = numberOfFiles - numberOfStudyFiles;
  return {
    ...stat,
    numberOfFiles: (numberOfCaseFiles > 0) ? numberOfCaseFiles : 0,
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

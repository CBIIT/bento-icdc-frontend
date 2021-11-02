import React from 'react';
import { StatsBar } from 'bento-components';
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

const StatsView = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log('data', data);
  return (
    <>
      <StatsBar
        data={updateStat(data)}
        globalStatsData={globalStatsData}
        statsStyling={statsStyling}
      />
    </>
  );
};

export default StatsView;

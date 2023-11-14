import React, { useState, useEffect } from 'react';
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
  const govAlertEl = document.getElementById('govAlertMsg');
  if (govAlertEl && !govAlertEl.scrollHeight) {
    return null;
  }
  const initialTopValue = (govAlertEl?.scrollHeight || 0) + 159; // Set your initial top value here
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
  return (
    <div className="stats-bar">
      <StatsBar
        data={updateStat(data)}
        globalStatsData={globalStatsData}
        statsStyling={{ ...statsStyling, global: scrollingStyle }}
      />
    </div>
  );
};

export default StatsView;

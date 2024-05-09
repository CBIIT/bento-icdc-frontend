export const humanFileSize = (size) => {
  if (typeof size !== 'number') {
    return '';
  }
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeStr = (size / (1024 ** i)).toFixed(2) * 1;
  const suffix = ['B', 'KB', 'MB', 'GB', 'TB'][i];
  return `${sizeStr} ${suffix}`;
};

/* subtract study file count from total files count */
export const updateStat = (stat) => {
  const { numberOfStudyFiles, numberOfFiles, volumeOfData } = stat;
  const numberOfCaseFiles = numberOfFiles - numberOfStudyFiles;
  return {
    ...stat,
    numberOfFiles: (numberOfCaseFiles > 0) ? numberOfCaseFiles : 0,
    volumeOfData: humanFileSize(volumeOfData),
  };
};

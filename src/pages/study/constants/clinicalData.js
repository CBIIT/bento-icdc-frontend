export const CLINICAL_DATA_MESSAGES = {
  partialLoad:
    'Some clinical data could not be loaded. Downloads may be incomplete.',
  combinedLoadFailure:
    'Some clinical data and its descriptions could not be loaded. Downloads may be incomplete.',
  dictionaryUnavailable: 'Clinical data descriptions could not be loaded.',
  unavailable: 'Clinical Data is temporarily unavailable.',
  downloadCountMismatch:
    'Some reported clinical records are unavailable for download.',
  downloadAvailableTooltip: 'Click to download the contents of this node',
  downloadIconAlt: 'csv download icon',
  downloadAllLabel: 'Download All',
  fallbackNodeLabel: 'This clinical',
};

export const getDownloadCountMismatchTooltip = nodeLabel =>
  `${nodeLabel} reports records, but its CSV data is unavailable.`;

export const getDownloadUnavailableTooltip = nodeLabel =>
  `${nodeLabel} data could not be loaded, so its CSV is unavailable.`;

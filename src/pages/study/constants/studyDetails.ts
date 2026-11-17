export const STUDY_DETAILS_MESSAGES = {
  partialLoad: 'Some study details could not be loaded.',
  unavailable: 'Study data is temporarily unavailable. Please try again later.',
  sectionUnavailable: 'This section is temporarily unavailable.',
  clinicalNodeCountUnavailable: 'Node count unavailable',
} as const;

export const STUDY_DETAILS_ACTION_LABELS = {
  refresh: 'Retry',
  close: 'Close',
} as const;

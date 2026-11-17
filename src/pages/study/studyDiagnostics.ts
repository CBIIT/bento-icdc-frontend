export interface StudyGraphQLErrorDiagnostic {
  message: string;
  path?: ReadonlyArray<string | number>;
}

export interface StudyDiagnosticDetails {
  operation?: string;
  routeIdentifier?: string;
  studyCode?: string;
  section?: string;
  clinicalRoot?: string;
  graphQLErrors?: ReadonlyArray<StudyGraphQLErrorDiagnostic>;
  networkError?: string;
  errorMessage?: string;
  errorStack?: string;
  componentStack?: string;
  dictionaryUrl?: string;
  httpStatus?: number;
}

export const logStudyDiagnostic = (details: StudyDiagnosticDetails): void => {
  console.error('[Study Details]', details);
};

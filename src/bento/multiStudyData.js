import gql from 'graphql-tag';

export const GET_UNIFIED_VIEW_DATA = gql`
  query unifiedViewData($case_record_ids: [String]) {
    searchCases(case_record_ids: $case_record_ids) {
      numberOfStudies
      numberOfCases
      numberOfFiles
      numberOfSamples
      numberOfStudyFiles
      numberOfPrograms
      numberOfAliquots
      volumeOfData
      caseRecordIds
      sampleIds
      fileIds
      studyFileIds
    }
  }
`;

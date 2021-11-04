/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_UNIFIED_VIEW_DATA = gql`
    query unifiedViewData($case_ids: [String]) {
        unifiedViewData(case_ids: $case_ids) {
            numberOfStudies
            numberOfCases
            numberOfFiles
            numberOfSamples
            numberOfStudyFiles
            numberOfAliquots
            volumeOfData
        }
    }
`;

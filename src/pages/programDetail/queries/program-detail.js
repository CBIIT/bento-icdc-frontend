import { gql } from 'graphql-request';

export const studiesByProgram = gql`
  query studiesByProgram {
    studiesByProgram {
      clinical_study_designation
      CRDCLinks {
        url
        repository
      }
      numberOfCRDCNodes
      numberOfImageCollections
    }
  }
`;
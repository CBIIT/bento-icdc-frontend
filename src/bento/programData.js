import gql from 'graphql-tag';

export const pageData = {
  studyListingIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/bento/src/assets/icons/Icon-StudiesDetail.svg',
    alt: 'ICDC Studies detail header logo',
  },
  externalLinkIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
    alt: 'External link icon',
  },
  table: {
    // Set 'display' to false to hide the table entirely
    display: true,
    // Table title
    title: 'Studies',
    // Field name for table data, need to be updated only when using a different GraphQL query
    dataField: 'studiesByProgram',
    // Value must be one of the 'field' in columns
    defaultSortField: 'program_acronym',
    // 'asc' or 'desc'
    defaultSortDirection: 'asc',
    // showHideColumns 'true' or 'false'
    showHideColumns: true,
    // download csv 'true' or 'false'
    download: true,
    // downloaded File Name
    downloadFileName: 'Bento_case_samples_download',
    // Set 'selectableRows' to true to show the row selection
    selectableRows: false,
    // A maximum of 10 columns are allowed
    columns: [
      {
        dataField: 'clinical_study_designation',
        header: 'Study Code',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program ID',
      },
      {
        dataField: 'clinical_study_name',
        header: 'Study Name',
      },
      {
        dataField: 'clinical_study_type',
        header: 'Study Type',
      },
      {
        dataField: 'numberOfCases',
        header: 'Cases',
      },
    ],
  },
};

// --------------- GraphQL query - Retrieve program info --------------
export const GET_STUDY_DATA_QUERY = gql`{
    studiesByProgram {
        program_id
        clinical_study_designation
        clinical_study_name
         clinical_study_type
         numberOfCases
    }
  }
  `;

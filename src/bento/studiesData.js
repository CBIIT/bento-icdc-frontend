import gql from 'graphql-tag';

export const pageData = {
  studyListingIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-StudiesDetail.svg',
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
    // defaultSortField: 'clinical_study_designation',
    // 'asc' or 'desc'
    // defaultSortDirection: 'asc',
    // viewColumns 'true' or 'false'
    viewColumns: true,
    // download csv 'true' or 'false'
    download: true,
    // downloaded File Name
    downloadFileName: 'ICDC_Studies_data',
    // Set 'selectableRows' to true to show the row selection
    selectableRows: false,
    // A maximum of 10 columns are allowed
    filterOptions: {
      useDisplayedColumnsOnly: true,
    },
    columns: [
      {
        dataField: 'clinical_study_designation',
        header: 'Study Code',
        link: '/program/{program_id}',
        display: true,
      },
      {
        dataField: 'program_id',
        header: 'Program',
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

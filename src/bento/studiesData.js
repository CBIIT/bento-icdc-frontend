import gql from 'graphql-tag';

export const pageData = {
  embargoFileIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-Embargo-File.svg',
  studyListingIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-StudiesDetail.svg',
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
    downloadFileName: 'ICDC_Studies_download',
    // Set 'selectableRows' to true to show the row selection
    selectableRows: false,
    columns: [
      {
        dataField: 'clinical_study_designation',
        header: 'Study Code',
        link: '/study/{clinical_study_designation}',
        display: true,
        viewColumns: false,
      },
      {
        dataField: 'program_id',
        header: 'Program',
        display: true,
      },
      {
        dataField: 'clinical_study_name',
        header: 'Study Name',
        display: true,
      },
      {
        dataField: 'clinical_study_type',
        header: 'Study Type',
        display: true,
      },
      {
        dataField: 'accession_id',
        header: 'Accession ID',
        display: true,
      },
      {
        dataField: 'study_disposition',
        header: 'study disposition',
        display: false,
      },
      {
        dataField: 'numberOfCases',
        header: 'Cases',
        link: '/cases',
        totalNumberOfCases: true,
        display: true,
      },
    ],
  },
};

export const textLabels = {
  textLabels: {
    toolbar: {
      search: 'Search',
      downloadCsv: 'Download Table Contents As CSV',
      print: 'Print',
      viewColumns: 'View Columns',
      filterTable: 'Filter Table',
    },
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
        accession_id
        study_disposition
    }
  }
  `;

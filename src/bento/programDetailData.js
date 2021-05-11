import gql from 'graphql-tag';

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const pageData = {
  headerIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-Programs.svg',
};

// --------------- Table configuration --------------
const table = {
  display: true,
  download: true,
  viewColumns: true,
  title: 'STUDIES IN THIS PROGRAM',
  selectableRows: false,
  downloadFileName: 'ICDC_Program_Studies_download',
  columns: [
    {
      dataField: 'program_id',
      header: 'Program',
    },
    {
      dataField: 'clinical_study_designation',
      header: 'Study Code',
      link: '/study/{clinical_study_designation}',
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
};

const textLabels = {
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

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query program($programTitle: String!) {
  sampleCountOfProgram(program_id: $programTitle)
  fileCountOfProgram(program_id: $programTitle)
  aliquotCountOfProgram(program_id: $programTitle)
  studyCountOfProgram(program_id: $programTitle)
  caseCountOfProgram(program_id: $programTitle)
 
  
  program(program_acronym: $programTitle)
  { 
    program_name
    program_acronym
    program_short_description
    program_full_description
    program_external_url
    program_sort_order
    }
    studiesByProgramId(program_id: $programTitle)
    { 
      program_id
      clinical_study_id
      clinical_study_designation
      clinical_study_name
      clinical_study_description
      clinical_study_type
      date_of_iacuc_approval
      dates_of_conduct
      numberOfCases
      }
}`;

export {
  pageData,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
  textLabels,
};

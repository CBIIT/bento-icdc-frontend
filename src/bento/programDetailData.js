import gql from 'graphql-tag';

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const pageData = {
  headerIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-Programs.svg',
  embargoFileIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-Embargo-File.svg',
  pendingFileIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/PendingRelease-icons.Studies-Listing.svg',
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
      display: true,
    },
    {
      dataField: 'clinical_study_designation',
      header: 'Study Code',
      link: '/study/{clinical_study_designation}',
      viewColumns: false,
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
      header: 'Study Disposition',
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
  optionalColumns: [
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
      accession_id
      study_disposition
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

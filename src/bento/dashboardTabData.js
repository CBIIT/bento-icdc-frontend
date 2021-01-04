import gql from 'graphql-tag';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {

    name: 'Cases',
    dataField: 'dataCase',
    api: 'GET_CASES_OVERVIEW_QUERY',
    paginationAPIField: 'caseOverviewPaged',
    paginationAPIFieldDesc: 'caseOverviewPagedDesc',
    count: 'numberOfCases',
    dataKey: 'subject_id',
    defaultSortField: 'subject_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#09A175',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    columns: [
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{case_id}',
        primary: true,
        display: true,
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        sort: 'asc',
        link: '/study/{study_code}',
        display: true,
      },
      {
        dataField: 'study_type',
        header: 'Study Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'stage_of_disease',
        header: 'Stage Of Disease',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'age',
        header: 'Age',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sex',
        header: 'Sex',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'neutered_status',
        header: 'Neutered Status',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'weight',
        header: 'Weight (kg)',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'response_to_treatment',
        header: 'Response to Treatment',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'cohort',
        header: 'Cohort',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'case_tab',
    onRowsSelect: 'type1',
    disableRowSelection: 'type1',
    tableID: 'case_tab_table',
    selectableRows: true,
    tabIndex: '0',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Samples',
    dataField: 'dataSample',
    api: 'GET_SAMPLES_OVERVIEW_QUERY',
    count: 'numberOfSamples',
    paginationAPIField: 'sampleOverview',
    paginationAPIFieldDesc: 'sampleOverviewDesc',
    dataKey: 'sample_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#00AEEF',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'case_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{case_id}',
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_site',
        header: 'Sample Site',
        display: true,
      },
      {
        dataField: 'sample_type',
        header: 'Sample Type',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_pathology',
        header: 'Sample Pathology',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'tumor_grade',
        header: 'Tumor Grade',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_chronology',
        header: 'Sample Chronology',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'percentage_tumor',
        header: 'Percentage Tumor',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'necropsy_sample',
        header: 'Necropsy Sample',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'sample_preservation',
        header: 'Sample Preservation',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'sample_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type2',
    buttonText: 'Add Selected Files',
    tableID: 'sample_tab_table',
    selectableRows: true,
    tabIndex: '1',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
  {
    name: 'Files',
    dataField: 'dataFile',
    api: 'GET_FILES_OVERVIEW_QUERY',
    paginationAPIField: 'fileOverview',
    paginationAPIFieldDesc: 'fileOverviewDesc',
    defaultSortField: 'file_name',
    defaultSortDirection: 'asc',
    count: 'numberOfFiles',
    buttonText: 'Add Selected Files',
    dataKey: 'file_id',
    saveButtonDefaultStyle: {
      color: '#fff',
      backgroundColor: '#DC2FDA',
      opacity: '1',
      border: '0px',
      cursor: 'pointer',
    },
    DeactiveSaveButtonDefaultStyle: {
      opacity: '0.3',
      cursor: 'auto',
    },
    ActiveSaveButtonDefaultStyle: {
      cursor: 'pointer',
      opacity: 'unset',
      border: 'unset',
    },
    columns: [
      {
        dataField: 'file_name',
        header: 'File Name',
        sort: 'asc',
        primary: true,
        display: true,
      },
      {
        dataField: 'file_type',
        header: 'File Type',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'association',
        header: 'Association',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_description',
        header: 'Description',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_format',
        header: 'File Format',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'file_size',
        header: 'Size',
        sort: 'asc',
        display: true,
        formatBytes: true,
      },
      {
        dataField: 'case_id',
        header: 'Case Id',
        sort: 'asc',
        link: '/case/{case_id}',
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        sort: 'asc',
        display: false,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        sort: 'asc',
        display: true,
      },
      {
        dataField: 'study_code',
        header: 'Study Code',
        sort: 'asc',
        display: true,
      },
    ],
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,

    tabIndex: '2',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  },
];

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'case_tab',
    title: 'Cases',
    dataField: 'dataCase',
    count: 'numberOfCases',
  },
  {
    id: 'sample_tab',
    title: 'Samples',
    dataField: 'dataSample',
    count: 'numberOfSamples',
  },
  {
    id: 'file_tab',
    title: 'Files',
    dataField: 'dataFile',
    count: 'numberOfFiles',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Cases',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  },
  {
    title: 'Samples',
    primaryColor: '#CFEDF9',
    secondaryColor: '#C9F1F1',
    selectedColor: '#0DAFEC',
  },
  {
    title: 'Files',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
];

export const DASHBOARD_QUERY = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfAliquots
  caseCountByStudyCode{
    study_code
    cases
}

caseCountByDiagnosis{
    diagnosis,
    cases
}

caseCountByGender{
    gender,
    cases
}

caseCountByBreed{
    breed,
    cases
}

caseCountByNeuteredStatus{
    neutered_status,
    cases
}

caseCountByStageOfDisease{
    stage_of_disease,
    cases
}

caseCountByDiseaseSite{
    disease_site,
    cases
}

caseCountByStudyType{
    study_type,
    cases
}

caseCountByAge{
    age,
    cases
}

caseCountByDataType{
    data_type,
    cases
}

caseCountByFileFormat{
    file_format,
    cases
}

caseCountByProgram{
    program,
    cases
}

caseOverviewPaged(first: 10) {
    case_id
    study_code
    study_type
    cohort
    breed
    diagnosis
    stage_of_disease
    age
    sex
    neutered_status
    weight
    response_to_treatment
    disease_site
  }

  }`;

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($case_ids: [String]){
    caseCountByStudyCode(case_ids: $case_ids){
      study_code
      cases
  }

  caseCountByDiagnosis(case_ids: $case_ids){
      diagnosis,
      cases
  }

  caseCountByGender(case_ids: $case_ids){
      gender,
      cases
  }

  caseCountByBreed(case_ids: $case_ids){
      breed,
      cases
  }

  caseCountByNeuteredStatus(case_ids: $case_ids){
      neutered_status,
      cases
  }

  caseCountByStageOfDisease(case_ids: $case_ids){
      stage_of_disease,
      cases
  }

  caseCountByDiseaseSite(case_ids: $case_ids){
      disease_site,
      cases
  }
  
  caseCountByStudyType(case_ids: $case_ids){
      study_type,
      cases
  }

  caseCountByAge(case_ids: $case_ids){
      age,
      cases
  }

  caseCountByDataType(case_ids: $case_ids){
      data_type,
      cases
  }

  caseCountByFileFormat(case_ids: $case_ids){
      file_format,
      cases
  }

  caseCountByProgram(case_ids: $case_ids){
      program,
      cases
  }
   
}
 `;

export const FILTER_QUERY = gql`
query searchCases(
  $study: [String], 
  $study_type: [String], 
  $breed: [String], 
  $diagnosis: [String], 
  $disease_site: [String], 
  $stage_of_disease: [String], 
  $response_to_treatment: [String], 
  $sex: [String], 
  $neutered_status: [String], 
  $sample_type: [String], 
  $sample_pathology: [String], 
  $file_association: [String], 
  $file_type: [String], 
  $file_format: [String],
  $first: Int
){
searchCases(
    study: $study, 
    study_type: $study_type, 
    breed: $breed, 
    diagnosis: $diagnosis, 
    disease_site: $disease_site, 
    stage_of_disease: $stage_of_disease, 
    response_to_treatment: $response_to_treatment, 
    sex: $sex,
    neutered_status: $neutered_status,
    sample_type: $sample_type, 
    sample_pathology: $sample_pathology, 
    file_association: $file_association, 
    file_type: $file_type,
    file_format: $file_format
    first: $first
  ) {
      numberOfStudies
      numberOfCases
      numberOfSamples
      numberOfFiles
      numberOfAliquots
      caseIds
      sampleIds
      fileIds
      firstPage {
          case_id
          study_code
          study_type
          cohort
          breed
          diagnosis
          stage_of_disease
          age
          sex
          neutered_status
          weight
          response_to_treatment
          disease_site
      }
}
filterCaseCountByStudyCode (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByStudyType (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByBreed (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByDiagnosis (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByDiseaseSite (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByStageOfDisease (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByResponseToTreatment (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountBySex (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByNeuteredStatus (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountBySampleType (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountBySamplePathology (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByFileAssociation (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByFileType (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}

filterCaseCountByFileFormat (
  study: $study, 
  study_type: $study_type, 
  breed: $breed, 
  diagnosis: $diagnosis, 
  disease_site: $disease_site, 
  stage_of_disease: $stage_of_disease, 
  response_to_treatment: $response_to_treatment, 
  sex: $sex,
  neutered_status: $neutered_status,
  sample_type: $sample_type, 
  sample_pathology: $sample_pathology, 
  file_association: $file_association, 
  file_type: $file_type,
  file_format: $file_format
) {
    group
    count
}
}`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_OVERVIEW_QUERY = gql`
query fileOverview($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){

  fileOverview(case_ids: $case_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
    file_type
    association
    file_description
    file_format
    file_size
    case_id
    breed
    diagnosis
    study_code
    file_uuid
  }
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_SAMPLES_OVERVIEW_QUERY = gql`
  query sampleOverview($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(case_ids: $case_ids, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    case_id
    breed
    diagnosis
    sample_site
    sample_type
    sample_pathology
    tumor_grade
    sample_chronology
    percentage_tumor
    necropsy_sample
    sample_preservation
}
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_QUERY = gql`
  query subjectOverViewPaged($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
    caseOverviewPaged (case_ids: $case_ids, order_by: $order_by, first: $first, offset: $offset) {
      case_id
      study_code
      study_type
      cohort
      breed
      diagnosis
      stage_of_disease
      age
      sex
      neutered_status
      weight
      response_to_treatment
      disease_site
    }
}

  `;

export const GET_ALL_FILEIDS_FOR_SELECT_ALL = gql`
  query subjectOverViewPaged($subject_ids: [String], $first: Int = 10000000){
    subjectOverViewPaged(subject_ids: $subject_ids, first: $first) {
        files {
              file_id
        }
    }
}

  `;
export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
query fileOverviewDesc($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){

  fileOverviewDesc(case_ids: $case_ids, offset: $offset,first: $first, order_by: $order_by) {    
    file_name
    file_type
    association
    file_description
    file_format
    file_size
    case_id
    breed
    diagnosis
    study_code
    file_uuid
  }
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_SAMPLES_OVERVIEW_DESC_QUERY = gql`
  query sampleOverview($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverviewDesc(case_ids: $case_ids,, offset: $offset,first: $first, order_by: $order_by) {
    sample_id
    case_id
    breed
    diagnosis
    sample_site
    sample_type
    sample_pathology
    tumor_grade
    sample_chronology
    percentage_tumor
    necropsy_sample
    sample_preservation
}
}
  `;

// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_DESC_QUERY = gql`
  query subjectOverViewPaged($subject_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
    caseOverviewPagedDesc (case_ids: $case_ids, order_by: $order_by, first: $first, offset: $offset) {
      case_id
      study_code
      study_type
      cohort
      breed
      diagnosis
      stage_of_disease
      age
      sex
      neutered_status
      weight
      response_to_treatment
      disease_site
    }
}

  `;

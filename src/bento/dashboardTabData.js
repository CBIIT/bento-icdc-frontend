import gql from 'graphql-tag';
import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Add filtered files associated with selected case(s) to My Files',
  1: 'Add filtered files associated with selected sample(s) to My Files',
  2: 'Add selected files to My Files',
};

// --------------- Tooltip configuration --------------
export const selectAllToolTip = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Add filtered files associated with all cases to My Files',
  1: 'Add filtered files associated with all samples to My Files',
  2: 'Add all filtered files to My Files',
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
    dataKey: 'case_id',
    defaultSortField: 'case_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Associated Files',
    addAllButtonText: 'Add Associated Files for All',
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
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
        link: '/study/{study_code}',
        display: true,
      },
      {
        dataField: 'study_type',
        header: 'Study Type',
        display: true,
      },
      {
        dataField: 'breed',
        header: 'Breed',
        display: true,
      },
      {
        dataField: 'diagnosis',
        header: 'Diagnosis',
        display: true,
      },
      {
        dataField: 'stage_of_disease',
        header: 'Stage Of Disease',
        display: true,
      },
      {
        dataField: 'age',
        header: 'Age',
        display: true,
      },
      {
        dataField: 'sex',
        header: 'Sex',
        display: true,
      },
      {
        dataField: 'neutered_status',
        header: 'Neutered Status',
        display: true,
      },
      {
        dataField: 'weight',
        header: 'Weight (kg)',
        display: true,
      },
      {
        dataField: 'response_to_treatment',
        header: 'Response to Treatment',
        display: true,
      },
      {
        dataField: 'cohort',
        header: 'Cohort',
        display: true,
      },
    ],
    id: 'case_tab',
    onRowsSelect: 'type3',
    disableRowSelection: 'type3',
    tableID: 'case_tab_table',
    selectableRows: true,
    tabIndex: '0',
    tableDownloadCSV: customCasesTabDownloadCSV,
    viewColumns: true,
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
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
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
        header: 'Pathology/Morphology',
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
    buttonText: 'Add Associated Files',
    addAllButtonText: 'Add Associated Files for All',
    tableID: 'sample_tab_table',
    tableDownloadCSV: customSamplesTabDownloadCSV,
    viewColumns: true,
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
    addAllButtonText: 'Add All Filtered Files',
    dataKey: 'file_name',
    saveButtonDefaultStyle: {
      borderRadius: '10px',
      width: '180px',
      lineHeight: '37px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#ff7f15',
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
        display: true,
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
        display: true,
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
    tableDownloadCSV: customFilesTabDownloadCSV,
    viewColumns: true,
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
    primaryColor: '#C7621E',
    secondaryColor: '#FFDFB8',
    selectedColor: '#FFF',
  },
  {
    title: 'Samples',
    primaryColor: '#3FA604',
    secondaryColor: '#C9F1F1',
    selectedColor: '#FFF',
  },
  {
    title: 'Files',
    primaryColor: '#1693C0',
    secondaryColor: '#E1E5FF',
    selectedColor: '#FFF',
  },
];

export const DASHBOARD_QUERY = gql`{
  numberOfStudies
  numberOfCases
  numberOfSamples
  numberOfFiles
  numberOfAliquots
caseCountByDiagnosis{
  group,
  count
}
caseCountByGender{
  group,
  count
}
caseCountByBreed{
  group,
  count
}
caseCountByStageOfDisease{
  group,
  count
}
caseCountByDiseaseSite{
  group,
  count
}
filterCaseCountByStudyCode{
  group,
  count
}
filterCaseCountByStudyType{
  group,
  count
}
filterCaseCountByBreed{
  group,
  count
}
filterCaseCountByDiagnosis{
  group,
  count
}
filterCaseCountByDiseaseSite{
  group,
  count
}
filterCaseCountByStageOfDisease{
  group,
  count
}
filterCaseCountByResponseToTreatment{
  group,
  count
}
filterCaseCountBySex{
  group,
  count
}
filterCaseCountByNeuteredStatus{
  group,
  count
}
filterCaseCountBySampleType{
  group,
  count
}
filterCaseCountBySamplePathology{
  group,
  count
}
filterCaseCountByFileAssociation{
  group,
  count
}
filterCaseCountByFileType{
  group,
  count
}
filterCaseCountByFileFormat{
  group,
  count
}
programsAndStudies{
  program
  caseSize
  studies{
      study
      caseSize
  }
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
      group
      count
  }
  caseCountByDiagnosis(case_ids: $case_ids){
    group,
    count
  }
  caseCountByGender(case_ids: $case_ids){
    group,
    count
  }
  caseCountByBreed(case_ids: $case_ids){
    group,
    count
  }
  caseCountByStageOfDisease(case_ids: $case_ids){
    group,
    count
  }
  caseCountByDiseaseSite(case_ids: $case_ids){
    group,
    count
  }
  programsAndStudies(case_ids: $case_ids){
    program
    caseSize
    studies{
        study
        caseSize
    }
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
query fileOverview($file_uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
  fileOverview(file_uuids: $file_uuids, offset: $offset,first: $first, order_by: $order_by) {
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

export const GET_FILES_OVERVIEW_DESC_QUERY = gql`
  query fileOverviewDesc($file_uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
    fileOverviewDesc(file_uuids: $file_uuids, offset: $offset,first: $first, order_by: $order_by) {    
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
  query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
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
    files
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
    files
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
      files
    }
}
  `;
// --------------- GraphQL query - Retrieve sample tab details --------------

export const GET_CASES_OVERVIEW_DESC_QUERY = gql`
  query subjectOverViewPaged($case_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
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
      files
    }
}
  `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
  query subjectOverViewPaged($case_ids: [String], $first: Int = 10000000){
    caseOverviewPaged(case_ids: $case_ids, first: $first) {
        files 
    }
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10000000, $order_by:String =""){
  sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
    files
}
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query fileOverview($file_uuids: [String], $offset: Int = 0, $first: Int = 10000000, $order_by:String ="file_name"){
  fileOverview(file_uuids: $file_uuids, offset: $offset,first: $first, order_by: $order_by) {
    file_uuid
  }
}
  `;

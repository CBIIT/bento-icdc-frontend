import gql from 'graphql-tag';
import { btnTypes } from '@bento-core/paginated-table';
import {
  cellTypes,
  types,
  dataFormatTypes,
} from '../bento-core';
import {
  customFilesTabDownloadCSV,
  customSamplesTabDownloadCSV,
} from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
  sample: 'Add files associated with selected sample(s) to My Files',
  file: 'Add selected files to My Files',
  arrow: true,
  clsName: 'addSelectedTooltip',
};

// --------------- table wrapper configuration --------------
export const addAssociatedFilesBtn = {
  title: 'ADD ASSOCIATED FILES',
  clsName: 'add_selected_button',
  type: types.BUTTON,
  role: btnTypes.ADD_SELECTED_FILES,
  btnType: btnTypes.ADD_SELECTED_FILES,
  tooltipCofig: tooltipContent,
  conditional: true,
};

export const jBrowseBtn = {
  type: types.CUSTOM_ELEM,
  Jbrowse: true,
};

export const sampleWrapperConfig = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
      addAssociatedFilesBtn,
    ],
  },
];

export const fileWrapperConfig = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
      addAssociatedFilesBtn,
      jBrowseBtn,
    ],
  },
];

export const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-CaseDetail.svg';

// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// multi study icon

export const multiStudyIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/icon-multiStudy.svg',
  alt: 'multi study icon',
};

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query sampleOverview(
    $case_ids: [String] = [],
    $sample_ids: [String] = [],
    $program: [String] = [],
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
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "sample_ids",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    sampleOverview
    (
      case_ids: $case_ids,
      sample_ids: $sample_ids,
      program: $program,
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
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      files
    }  
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
 query fileOverview(
    $file_level: [String] = [],
    $case_ids: [String] = [],
    $program: [String] = [],
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
    $sample_site:[String],
    $file_association: [String], 
    $file_type: [String], 
    $file_format: [String],
    $biobank: [String],
    $study_participation: [String],
    $order_by: String = "file_name",
    $sort_direction: String = "ASC",
    $first: Int = 10,
    $offset: Int = 0,
  ){
    fileOverview
    (
      file_level: $file_level,
      case_ids: $case_ids,
      program: $program,
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
      sample_site: $sample_site, 
      file_association: $file_association, 
      file_type: $file_type,
      file_format: $file_format,
      biobank: $biobank,
      study_participation: $study_participation,
      order_by: $order_by,
      sort_direction: $sort_direction,
      first: $first,
      offset: $offset,
    )
    {
      file_uuid
    }
  }
  `;

export const GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL = gql`
 query fileOverview (
  $file_name: [String]
 ) {
  fileIdsFromFileName(
    file_name: $file_name
  ) {
    file_uuid
  }
 }
  `;

// --------------- Case Table configuration --------------
export const sampleTable = {
  // Set 'display' to false to hide the table entirely
  name: 'sample',
  display: true,
  dataKey: 'sample_id',
  // Table title
  tableTitle: 'ASSOCIATED SAMPLES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'samples',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'sample_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Associated Files',
  // Help Icon Message
  tooltipMessage: 'Add files associated with selected sample(s) to My Files',
  helpMessage: 'Here help message',
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  // download csv
  download: true,
  tableDownloadCSV: customSamplesTabDownloadCSV,
  // downloaded File Name
  downloadFileName: 'ICDC_Case_Samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  extendedViewConfig: {
    download: {
      downloadCsv: 'Download Table Contents As CSV',
      ...customSamplesTabDownloadCSV,
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
    },
    {
      dataField: 'sample_id',
      header: 'Sample ID',
      sort: 'asc',
      primary: true,
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sample_site',
      header: 'Sample Site',
      dataFromRoot: true,
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'summarized_sample_type',
      header: 'Sample Type',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'specific_sample_pathology',
      header: 'Pathology/Morphology',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'tumor_grade',
      header: 'Tumor Grade',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sample_chronology',
      header: 'Sample Chronology',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'percentage_tumor',
      header: 'Percentage Tumor',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'necropsy_sample',
      header: 'Necropsy Sample',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'sample_preservation',
      header: 'Sample Preservation',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
  addFilesRequestVariableKey: 'sample_ids',
  addFilesResponseKeys: ['sampleOverview', 'files'],
  addAllFilesResponseKeys: ['sampleOverview', 'files'],
  addAllFileQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  addSelectedFilesQuery: GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
};

export const fileTable = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'ASSOCIATED FILES',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'files',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'sample_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
  displayViewJBowseBtn: true,
  saveButtonDefaultStyle: {
    color: '#fff',
    opacity: '1',
    cursor: 'pointer',
  },
  ActiveSaveButtonDefaultStyle: {
    disabled: true,
    opacity: '0.3',
    cursor: 'auto',
  },
  DeactiveSaveButtonDefaultStyle: {
    cursor: 'pointer',
    opacity: 'unset',
    border: 'unset',
  },
  // Help Icon Message
  tooltipMessage: 'Add selected files to My Files',
  // viewColumns 'true' or 'false'
  viewColumns: true,
  // download csv 'true' or 'false'
  download: true,
  // downloaded File Name
  downloadFileName: 'ICDC_Case_Files_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,

  primaryKeyIndex: 7,

  // Set 'display' to false to hide the table entirely
  name: 'file',
  dataKey: 'file_name',
  helpMessage: 'Here help message',
  jbrowse: true,
  // showHideColumns 'true' or 'false'
  showHideColumns: true,
  tableDownloadCSV: customFilesTabDownloadCSV,
  // A maximum of 10 columns are allowed
  extendedViewConfig: {
    download: {
      downloadCsv: 'Download Table Contents As CSV',
      ...customFilesTabDownloadCSV,
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
    },
    {
      dataField: 'sample_id',
      header: 'Sample ID',
      sort: 'asc',
      primary: true,
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_name',
      header: 'File Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'access_file',
      header: 'Access',
      sort: 'asc',
      display: true,
      downloadDocument: true,
      documentDownloadProps: {
        maxFileSize: 12000000,
        toolTipTextFileDownload: 'Download a copy of this file',
        toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
        fileSizeColumn: 'file_size',
        fileFormatColumn: 'file_format',
        fileLocationColumn: 'uuid',
        caseIdColumn: 'file_name',
        iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
        iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
      },
      cellType: cellTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_format',
      header: 'Format',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_size',
      header: 'Size',
      dataFormatType: dataFormatTypes.FORMAT_BYTES,
      cellType: cellTypes.FORMAT_DATA,
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'parent',
      header: 'Association',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_description',
      header: 'Description',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'uuid',
      header: 'UUID',
      display: false,
      primary: true,
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
  addFilesRequestVariableKey: 'file_name',
  addFilesResponseKeys: ['fileIdsFromFileName', 'file_uuid'],
  addAllFilesResponseKeys: ['fileIdsFromFileName', 'file_uuid'],
  addAllFileQuery: GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  addSelectedFilesQuery: GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL,
};

// --------- Table Wrapper configuration --------------
export const alertMessage = 'The cart is limited to 1000 files. Please narrow the search criteria or remove some files from the cart to add more.';

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

// --------------- GraphQL query configuration --------------
export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query Case($case_id: String!) {
    sampleCountOfCase(case_id:$case_id)
    fileCountOfCase(case_id: $case_id)
    aliquotCountOfCase(case_id: $case_id)
    fileCountOfCase(case_id: $case_id)
    studyFileCountOfCase(case_id: $case_id)
    programsCountOfCase(case_id: $case_id)
    volumeOfDataOfCase(case_id: $case_id)
    multiStudyCases(case_id: $case_id){
      caseIds
      sampleIds
      fileIds
      studyFileIds
      individualId
    }
    case(case_id:$case_id){
        case_id
        patient_id
        patient_first_name
        study{
            clinical_study_name
            clinical_study_designation
            program{
            program_acronym
          }
        }
        demographic{
            breed
            sex
            patient_age_at_enrollment
            neutered_indicator
            weight
        }
        cohort{
            cohort_description
            study_arm{
                arm
                ctep_treatment_assignment_code
            }
        }
        enrollment{
            site_short_name
            date_of_registration
            patient_subgroup
            date_of_informed_consent
            initials
        }
        diagnoses{
            best_response
            disease_term
            stage_of_disease
            date_of_diagnosis
            primary_disease_site
            histological_grade
            histology_cytopathology
        }
    }
    filesOfCase(case_id:$case_id)
    {   
        parent 
        file_name 
        file_type 
        file_description 
        file_format 
        file_size 
        md5sum 
        uuid
    }
    samplesByCaseId(case_id:$case_id){
      sample_id
      sample_site
      summarized_sample_type
      specific_sample_pathology
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      files{
        uuid
      }
    }
 }`;

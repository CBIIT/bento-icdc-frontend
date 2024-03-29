import gql from 'graphql-tag';
import { FileOnRowsSelect, getSelectedFileNames } from '../pages/caseDetails/fileTable';
import { SampleOnRowsSelect } from '../pages/caseDetails/sampleFileTable';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
};

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

// --------------- Table 1 configuration --------------
export const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
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
  tooltipMessage: 'Add files associated with selected sample(s) to My Files',
  // viewColumns 'true' or 'false'
  viewColumns: true,
  // download csv
  download: true,
  // downloaded File Name
  downloadFileName: 'ICDC_Case_Samples_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  columns: [
    {
      dataField: 'sample_id',
      header: 'Sample ID',
      sort: 'asc',
      primary: true,
      display: true,
      viewColumns: false,
    },
    {
      dataField: 'sample_site',
      header: 'Sample Site',
    },
    {
      dataField: 'summarized_sample_type',
      header: 'Sample Type',
    },
    {
      dataField: 'specific_sample_pathology',
      header: 'Pathology/Morphology',
    },
    {
      dataField: 'tumor_grade',
      header: 'Tumor Grade',
    },
    {
      dataField: 'sample_chronology',
      header: 'Sample Chronology',
    },
    {
      dataField: 'percentage_tumor',
      header: 'Percentage Tumor',
    },
    {
      dataField: 'necropsy_sample',
      header: 'Necropsy Sample',
    },
    {
      dataField: 'sample_preservation',
      header: 'Sample Preservation',
    },
  ],
  optionalColumns: [
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: SampleOnRowsSelect,
};

// --------------- Table 2 configuration --------------
export const table2 = {
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

  columns: [
    {
      dataField: 'sample_id',
      header: 'Sample ID',
    },
    {
      dataField: 'file_name',
      header: 'File Name',
      viewColumns: false,
    },
    {
      dataField: '',
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
    },
    {
      dataField: 'file_type',
      header: 'File Type',
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
    },
    {
      dataField: 'parent',
      header: 'Association',
    },
    {
      dataField: 'file_description',
      header: 'Description',
    },
    {
      dataField: 'uuid',
      header: 'UUID',
      display: false,
      primary: true,
      // set formatBytes to true to display file size (in bytes) in a more human readable format
    },
  ],
  optionalColumns: [
  ],
  // Util Functions
  // Custom function on selct checkbox is selected.
  customOnRowsSelect: FileOnRowsSelect,
  selectedFileNames: getSelectedFileNames,
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

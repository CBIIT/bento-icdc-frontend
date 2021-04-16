import React from 'react';
import gql from 'graphql-tag';
import { FileDisableRowSelection, FileOnRowsSelect } from '../pages/study/utils';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

export const headerIcon = 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-StudiesDetail.svg';

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
  // viewColumns 'true' or 'false'
  viewColumns: true,
  // download csv
  download: true,
  // downloaded File Name
  downloadFileName: 'ICDC_ARMS_AND_COHORTS_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: false,
  // A maximum of 10 columns are allowed
  columns: [
    { name: 'arm', label: 'Arms' },
    {
      name: 'description',
      label: 'Description',
      options: {
        customBodyRender: (value) => (
          value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
        ),
      },
    },
    {
      name: 'does',
      label: 'Cohorts',
      options: {
        customBodyRender: (value) => (
          value.split('#').map((desc) => (desc === '' ? '' : <li style={{ listStyleType: 'none' }}>{desc}</li>))
        ),
      },
    },
  ],
  noArmMessage: 'This study is not divided into arms',
  noCohortMessage: 'This study is not divided into cohorts',
};

// --------------- Table 2 configuration --------------//
export const table2 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'ASSOCIATED STUDY FILES',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Text to appear on Add to cart button
  buttonText: 'Add Selected Files',
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
  downloadFileName: 'ICDC_Study_File_download',
  // Set 'selectableRows' to true to show the row selection
  selectableRows: true,
  // A maximum of 10 columns are allowed
  primaryKeyIndex: 7,

  columns: [
    {
      dataField: 'studyDesignation',
      header: 'Study Designation',
      display: false,
    },
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
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      formatBytes: true,
    },
    {
      dataField: 'uuid',
      header: 'UUID',
      display: false,
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
      // set formatBytes to true to display file size (in bytes) in a more human readable format
    },
  ],
  customOnRowsSelect: FileOnRowsSelect,
  disableRowSelection: FileDisableRowSelection,
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
export const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query Study($csd: String!) {
   sampleCountOfStudy(study_code:$csd)
   fileCountOfStudy(study_code: $csd)
   aliguotCountOfStudy(study_code: $csd)
   caseCountOfStudy(study_code: $csd)
   
   filesOfStudy(study_code: $csd){
    file_type
   }
   studyFiles(study_codes: [$csd]){
         file_description
          file_format
          file_location
          file_name
          file_size
          file_status
          file_type
          md5sum
          uuid
   }
  study(clinical_study_designation: $csd){
    program{
      program_acronym
    }
    clinical_study_id
    clinical_study_name
    clinical_study_designation
    clinical_study_description
    clinical_study_type
    date_of_iacuc_approval
    dates_of_conduct
    cohorts{
        cohort_dose
        cohort_description
    }
    study_arms{
      arm
      ctep_treatment_assignment_code
      cohorts{
        cohort_dose
        cohort_description
      }
    }
    principal_investigators{
      pi_first_name
      pi_last_name
      pi_middle_initial
    }
    cases{
      case_id
      diagnoses{
        disease_term
      }
    }
  }
  
 }`;

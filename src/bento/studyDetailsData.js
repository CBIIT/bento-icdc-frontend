import React from 'react';
import gql from 'graphql-tag';
import { FileDisableRowSelection, FileOnRowsSelect } from '../pages/study/utils';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
};

export const title = {
  studyFile: 'This study currently has the following Study Files directly associated with it:',
  armsAndCohort: 'This study is organized as follows:',
};

export const embargoFileIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-Embargo-File.svg';
export const embargoHeaderIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-embargo-study-header.svg';
export const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-StudiesDetail.svg';
export const externalIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/cart_ExternalLink.svg';
export const sampleProfile = {
  tabs: [
    {
      index: 0,
      label: 'SITE',
      value: 'studySampleSiteCount',
    },
    {
      index: 1,
      label: 'TYPE',
      value: 'studySampleTypeCount',
    },
    {
      index: 2,
      label: 'PATHOLOGY',
      value: 'studySamplePathologyCount',
    },
  ],
};

export const palette = ['#62beeb', '#1651ea', '#a1df71', '#72d1d5', '#d98548'];

export const tab = {
  items: [
    {
      index: 0,
      label: 'OVERVIEW',
      value: 'overview',
    },
    {
      index: 1,
      label: 'ARMS & COHORTS',
      value: 'arms_cohorts',
    },
    {
      index: 2,
      label: 'STUDY FILES',
      value: 'study_files',
    },
    {
      index: 3,
      label: 'PUBLICATIONS',
      value: 'publications',
    },
  ],
  publication: {
    numbOfPublishPerView: 2,
    views: [
      {
        label: 'AUTHORSHIP',
        key: 'authorship',
        type: 'text',
      },
      {
        label: 'YEAR OF PUBLICATION',
        key: 'year_of_publication',
        type: 'text',
      },
      {
        label: 'JOURNAL',
        key: 'journal_citation',
        type: 'text',
      },
      {
        label: 'DOI',
        key: 'digital_object_id',
        type: 'link',
        url: 'https://doi.org/',
      },
      {
        label: 'PUBMED ID',
        key: 'pubmed_id',
        type: 'link',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
      },
    ],
  },
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
    {
      name: 'arm',
      label: 'Arms',
      options: {
        viewColumns: false,
      },
    },
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
  noArmsCohort: 'This study is not divided into Arms or Cohorts',
  noArmsCohort2: 'This study is not currently divided into Arms or Cohorts',
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
  downloadFileName: 'ICDC_Study_Files_download',
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
      viewColumns: false,
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
        fileLocationColumn: 'uuid',
        iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
      },
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
  noAssociatedFiles: 'This study currently has no Files directly associated with it',
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
  query Study($csd: String!, $accessionId: String!) {
   sampleCountOfStudy(study_code:$csd)
   fileCountOfStudy(study_code: $csd)
   fileCountOfStudyFiles(study_code: $csd)
   aliquotCountOfStudy(study_code: $csd)
   caseCountOfStudy(study_code: $csd)
   studySampleSiteCount(study_codes: [$csd]){
    group,
    count
   }
   studySampleTypeCount(study_codes: [$csd]){
    group,
    count
  }
  studySamplePathologyCount(study_codes: [$csd]){
    group,
    count
  }
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

  study(filter:{OR : [{clinical_study_designation: $csd }, {accession_id: $accessionId}]}){
    program{
      program_acronym
    }
    clinical_study_id
    clinical_study_name
    clinical_study_designation
    clinical_study_description
    clinical_study_type
    date_of_iacuc_approval
    accession_id
    study_disposition
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
    publications{
      publication_title
      authorship
      year_of_publication
      journal_citation
      digital_object_id
      pubmed_id
    }
    image_collections {
      image_collection_name
      image_collection_url
      repository_name
      image_type_included
      collection_access
    }
    cases{
      case_id
      diagnoses{
        disease_term
      }
    }
  }
  
 }`;

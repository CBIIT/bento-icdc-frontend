import React from 'react';
import gql from 'graphql-tag';
import { FileDisableRowSelection, FileOnRowsSelect } from '../pages/study/utils';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
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

export const argumentConfiguration = {
  field: 'group',
  visible: false,
  position: 'inside',
  size: 12,
  title: {
    text: '',
  },
  label: {
    size: 20,
    position: 'inside',
    staggeringSpacing: 10,
  },
};
export const valueConfiguration = {
  field: 'count',
  size: 12,
  allowDecimals: false,
  title: {
    text: 'Sample count',
    size: 12,
  },
  chartGrid: {
    visible: false,
  },
  label: {
    size: 12,
    position: 'outside',
  },
};

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
    {
      index: 4,
      label: 'CLINICAL DATA',
      value: 'clinical_data',
    },
    {
      index: 5,
      label: 'SUPPORTING DATA',
      value: 'supporting_data',
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
        fileFormatColumn: 'file_format',
        fileLocationColumn: 'uuid',
        caseIdColumn: 'file_name',
        iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
        iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
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
    clinicalDataNodeNames
    clinicalDataNodeCounts(study_code: $csd) {
      agent
      cycle
      physical_exam
    }
    programCountOfStudy(study_code: $csd)
    clinicalDataNodeNames
    clinicalDataNodeCounts(study_code: $csd) {
      agent
      cycle
      visit
      follow_up
      adverse_event
      off_treatment
      off_study
      prior_therapy
      prior_surgery
      agent_administration
      physical_exam
      vital_signs
      disease_extent
      lab_exam
    }
    clinicalDataNodeCaseCounts(study_code: $csd) {
      agent
      cycle
      visit
      follow_up
      adverse_event
      off_treatment
      off_study
      prior_therapy
      prior_surgery
      agent_administration
      physical_exam
      vital_signs
      disease_extent
      lab_exam
    }
    aliquotCountOfStudy(study_code: $csd)
    caseCountOfStudy(study_code: $csd)
    volumeOfDataOfStudy(study_code: $csd)
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

export const agentNodeMetadata = {
  keysToInclude: [
    'medication',
    'document_number',
  ],
  header: [
    'medication',
    'document_number',
  ],
};

export const cycleNodeMetadata = {
  keysToInclude: [
    'cycle_number',
    'date_of_cycle_start',
    'date_of_cycle_end',
    'crf_id',
    'case_id',
  ],
  header: [
    'cycle_number',
    'date_of_cycle_start',
    'date_of_cycle_end',
    'crf_id',
    'case_id',
  ],
};

export const visitNodeMetadata = {
  keysToInclude: [
    'inferred',
    'visit_id',
    'visit_date',
  ],
  header: [
    'inferred',
    'visit_id',
    'visit_date',
  ],
};

export const priorTherapyNodeMetadata = {
  keysToInclude: [
    'date_of_first_dose',
    'date_of_last_dose',
    'agent_name',
    'dose_schedule',
    'total_dose',
    'agent_units_of_measure',
    'best_response_to_prior_therapy',
    'nonresponse_therapy_type',
    'prior_therapy_type',
    'prior_steroid_exposure',
    'number_of_prior_regimens_steroid',
    'total_number_of_doses_steroid',
    'date_of_last_dose_steroid',
    'prior_nsaid_exposure',
    'number_of_prior_regimens_nsaid',
    'total_number_of_doses_nsaid',
    'date_of_last_dose_nsaid',
    'tx_loc_geo_loc_ind_nsaid',
    'min_rsdl_dz_tx_ind_nsaids_treatment_pe',
    'therapy_type',
    'any_therapy',
    'number_of_prior_regimens_any_therapy',
    'total_number_of_doses_any_therapy',
    'date_of_last_dose_any_therapy',
    'treatment_performed_at_site',
    'treatment_performed_in_minimal_residual',
  ],
  header: [
    'date_of_first_dose',
    'date_of_last_dose',
    'agent_name',
    'dose_schedule',
    'total_dose',
    'agent_units_of_measure',
    'best_response_to_prior_therapy',
    'nonresponse_therapy_type',
    'prior_therapy_type',
    'prior_steroid_exposure',
    'number_of_prior_regimens_steroid',
    'total_number_of_doses_steroid',
    'date_of_last_dose_steroid',
    'prior_nsaid_exposure',
    'number_of_prior_regimens_nsaid',
    'total_number_of_doses_nsaid',
    'date_of_last_dose_nsaid',
    'tx_loc_geo_loc_ind_nsaid',
    'min_rsdl_dz_tx_ind_nsaids_treatment_pe',
    'therapy_type',
    'any_therapy',
    'number_of_prior_regimens_any_therapy',
    'total_number_of_doses_any_therapy',
    'date_of_last_dose_any_therapy',
    'treatment_performed_at_site',
    'treatment_performed_in_minimal_residual',
  ],
};

export const priorSurgeryNodeMetadata = {
  keysToInclude: [
    'date_of_surgery',
    'procedure',
    'anatomical_site_of_surgery',
    'surgical_finding',
    'residual_disease',
    'therapeutic_indicator',
  ],
  header: [
    'date_of_surgery',
    'procedure',
    'anatomical_site_of_surgery',
    'surgical_finding',
    'residual_disease',
    'therapeutic_indicator',
  ],
};

export const agentAdministrationNodeMetadata = {
  keysToInclude: [
    'document_number',
    'medication',
    'route_of_administration',
    'medication_lot_number',
    'medication_vial_id',
    'medication_actual_units_of_measure',
    'medication_duration',
    'medication_units_of_measure',
    'medication_actual_dose',
    'phase',
    'start_time',
    'stop_time',
    'dose_level',
    'dose_units_of_measure',
    'date_of_missed_dose',
    'medication_missed_dose',
    'missed_dose_amount',
    'missed_dose_units_of_measure',
    'medication_course_number',
    'comment',
  ],
  header: [
    'document_number',
    'medication',
    'route_of_administration',
    'medication_lot_number',
    'medication_vial_id',
    'medication_actual_units_of_measure',
    'medication_duration',
    'medication_units_of_measure',
    'medication_actual_dose',
    'phase',
    'start_time',
    'stop_time',
    'dose_level',
    'dose_units_of_measure',
    'date_of_missed_dose',
    'medication_missed_dose',
    'missed_dose_amount',
    'missed_dose_units_of_measure',
    'medication_course_number',
    'comment',
  ],
};

export const vitalSignsNodeMetadata = {
  keysToInclude: [
    'body_temperature_unit',
    'systolic_bp_unit',
    'respiration_pattern',
    'pulse_ox_original_unit',
    'body_surface_area',
    'patient_weight_original_unit',
    'body_surface_area_unit',
    'systolic_bp_original_unit',
    'body_surface_area_original_unit',
    'patient_weight',
    'patient_weight_unit',
    'case_id',
    'time_of_observation',
    'pulse_original_unit',
    'respiration_rate_original_unit',
    'body_temperature_original_unit',
    'body_surface_area_original',
    'pulse_original',
    'date_of_vital_signs',
    'pulse_ox_unit',
    'modified_ecog',
    'respiration_rate_unit',
    'patient_weight_original',
    'pulse_unit',
    'body_temperature',
    'pulse',
    'body_temperature_original',
  ],
  header: [
    'body_temperature_unit',
    'systolic_bp_unit',
    'respiration_pattern',
    'pulse_ox_original_unit',
    'body_surface_area',
    'patient_weight_original_unit',
    'body_surface_area_unit',
    'systolic_bp_original_unit',
    'body_surface_area_original_unit',
    'patient_weight',
    'patient_weight_unit',
    'case_id',
    'time_of_observation',
    'pulse_original_unit',
    'respiration_rate_original_unit',
    'body_temperature_original_unit',
    'body_surface_area_original',
    'pulse_original',
    'date_of_vital_signs',
    'pulse_ox_unit',
    'modified_ecog',
    'respiration_rate_unit',
    'patient_weight_original',
    'pulse_unit',
    'body_temperature',
    'pulse',
    'body_temperature_original',
  ],
};

export const physicalExamNodeMetadata = {
  keysToInclude: [
    'date_of_examination',
    'pe_comment',
    'body_system',
    'case_id',
    'pe_finding',
  ],
  header: [
    'date_of_examination',
    'pe_comment',
    'body_system',
    'case_id',
    'pe_finding',
  ],
};

export const labExamNodeMetadata = {
  keysToInclude: [],
  header: [],
};

export const adverseEventNodeMetadata = {
  keysToInclude: [
    'dose_limiting_toxicity',
    'unexpected_adverse_event',
    'date_of_onset',
    'adverse_event_grade_description',
    'existing_adverse_event',
    'ongoing_adverse_event',
    'date_of_resolution',
    'attribution_to_ind',
    'attribution_to_research',
    'adverse_event_term',
    'attribution_to_commercial',
    'adverse_event_agent_dose',
    'attribution_to_other',
    'adverse_event_agent_name',
    'attribution_to_disease',
    'adverse_event_description',
    'adverse_event_grade',
    'updated',
    'other_attribution_description',
  ],
  header: [
    'dose_limiting_toxicity',
    'unexpected_adverse_event',
    'date_of_onset',
    'adverse_event_grade_description',
    'existing_adverse_event',
    'ongoing_adverse_event',
    'date_of_resolution',
    'attribution_to_ind',
    'attribution_to_research',
    'adverse_event_term',
    'attribution_to_commercial',
    'adverse_event_agent_dose',
    'attribution_to_other',
    'adverse_event_agent_name',
    'attribution_to_disease',
    'adverse_event_description',
    'adverse_event_grade',
    'updated',
    'other_attribution_description',
  ],
};

export const diseaseExtentNodeMetadata = {
  keysToInclude: [
    'lesion_number',
    'lesion_site',
    'lesion_description',
    'previously_irradiated',
    'previously_treated',
    'measurable_lesion',
    'target_lesion',
    'date_of_evaluation',
    'measured_how',
    'longest_measurement',
    'evaluation_number',
    'evaluation_code',
  ],
  header: [
    'lesion_number',
    'lesion_site',
    'lesion_description',
    'previously_irradiated',
    'previously_treated',
    'measurable_lesion',
    'target_lesion',
    'date_of_evaluation',
    'measured_how',
    'longest_measurement',
    'evaluation_number',
    'evaluation_code',
  ],
};

export const followUpNodeMetadata = {
  keysToInclude: [
    'document_number',
    'date_of_last_contact',
    'patient_status',
    'explain_unknown_status',
    'contact_type',
    'treatment_since_last_contact',
    'physical_exam_performed',
    'physical_exam_changes',
  ],
  header: [
    'document_number',
    'date_of_last_contact',
    'patient_status',
    'explain_unknown_status',
    'contact_type',
    'treatment_since_last_contact',
    'physical_exam_performed',
    'physical_exam_changes',
  ],
};

export const offStudyNodeMetadata = {
  keysToInclude: [
    'document_number',
    'date_off_study',
    'reason_off_study',
    'date_of_disease_progression',
    'date_off_treatment',
    'best_resp_vet_tx_tp_secondary_response',
    'date_last_medication_administration',
    'best_resp_vet_tx_tp_best_response',
    'date_of_best_response',
  ],
  header: [
    'document_number',
    'date_off_study',
    'reason_off_study',
    'date_of_disease_progression',
    'date_off_treatment',
    'best_resp_vet_tx_tp_secondary_response',
    'date_last_medication_administration',
    'best_resp_vet_tx_tp_best_response',
    'date_of_best_response',
  ],
};

export const offTreatmentNodeMetadata = {
  keysToInclude: [
    'document_number',
    'date_off_treatment',
    'reason_off_treatment',
    'date_of_disease_progression',
    'best_resp_vet_tx_tp_secondary_response',
    'date_last_medication_administration',
    'best_resp_vet_tx_tp_best_response',
    'date_of_best_response',
  ],
  header: [
    'document_number',
    'date_off_treatment',
    'reason_off_treatment',
    'date_of_disease_progression',
    'best_resp_vet_tx_tp_secondary_response',
    'date_last_medication_administration',
    'best_resp_vet_tx_tp_best_response',
    'date_of_best_response',
  ],
};

export const GET_CYCLE_CLINICAL_DATA = gql`
  query cycleNodeData($study_code: String!){
    cycleNodeData(study_code: $study_code) {
      cycle_number
      date_of_cycle_start
      date_of_cycle_end
      crf_id
      case_id
    }
  }
`;

export const GET_AGENT_CLINICAL_DATA = gql`
  query agentNodeData($study_code: String!){
    agentNodeData(study_code: $study_code) {
      medication
      document_number
    }
  }
`;

export const GET_VISIT_CLINICAL_DATA = gql`
  query visitNodeData($study_code: String!){
    visitNodeData(study_code: $study_code) {
      inferred
      visit_id
      visit_date
    }
  }
`;

export const GET_PRIOR_THERAPY_CLINICAL_DATA = gql`
  query priorTherapyNodeData($study_code: String!){
    priorTherapyNodeData(study_code: $study_code) {
      date_of_first_dose
      date_of_last_dose
      agent_name
      dose_schedule
      total_dose
      agent_units_of_measure
      best_response_to_prior_therapy
      nonresponse_therapy_type
      prior_therapy_type
      prior_steroid_exposure
      number_of_prior_regimens_steroid
      total_number_of_doses_steroid
      date_of_last_dose_steroid
      prior_nsaid_exposure
      number_of_prior_regimens_nsaid
      total_number_of_doses_nsaid
      date_of_last_dose_nsaid
      tx_loc_geo_loc_ind_nsaid
      min_rsdl_dz_tx_ind_nsaids_treatment_pe
      therapy_type
      any_therapy
      number_of_prior_regimens_any_therapy
      total_number_of_doses_any_therapy
      date_of_last_dose_any_therapy
      treatment_performed_at_site
      treatment_performed_in_minimal_residual
    }
  }
`;

export const GET_PRIOR_SURGERY_CLINICAL_DATA = gql`
  query priorSurgeryNodeData($study_code: String!){
    priorSurgeryNodeData(study_code: $study_code) {
      date_of_surgery
      procedure
      anatomical_site_of_surgery
      surgical_finding
      residual_disease
      therapeutic_indicator
    }
  }
`;

export const GET_AGENT_ADMINISTRATION_CLINICAL_DATA = gql`
  query agentAdministrationNodeData($study_code: String!){
    agentAdministrationNodeData(study_code: $study_code) {
      document_number
      medication
      route_of_administration
      medication_lot_number
      medication_vial_id
      medication_actual_units_of_measure
      medication_duration
      medication_units_of_measure
      medication_actual_dose
      phase
      start_time
      stop_time
      dose_level
      dose_units_of_measure
      date_of_missed_dose
      medication_missed_dose
      missed_dose_amount
      missed_dose_units_of_measure
      medication_course_number
      comment
    }
  }
`;

export const GET_PHYSICAL_EXAM_CLINICAL_DATA = gql`
  query physicalExamNodeData($study_code: String!){
    physicalExamNodeData(study_code: $study_code) {
      date_of_examination
      pe_comment
      body_system
      case_id
      pe_finding
    }
  }
`;

export const GET_VITAL_SIGNS_CLINICAL_DATA = gql`
  query vitalSignsNodeData($study_code: String!){
    vitalSignsNodeData(study_code: $study_code) {
      body_temperature_unit
      systolic_bp_unit
      respiration_pattern
      pulse_ox_original_unit
      body_surface_area
      patient_weight_original_unit
      body_surface_area_unit
      systolic_bp_original_unit
      body_surface_area_original_unit
      patient_weight
      patient_weight_unit
      case_id
      time_of_observation
      pulse_original_unit
      respiration_rate_original_unit
      body_temperature_original_unit
      body_surface_area_original
      pulse_original
      date_of_vital_signs
      pulse_ox_unit
      modified_ecog
      respiration_rate_unit
      patient_weight_original
      pulse_unit
      body_temperature
      pulse
      body_temperature_original
    }
  }
`;

export const GET_LAB_EXAM_CLINICAL_DATA = gql`
  query labExamNodeData($study_code: String!){
    labExamNodeData(study_code: $study_code)
  }
`;

export const GET_ADVERSE_EVENT_CLINICAL_DATA = gql`
  query adverseEventNodeData($study_code: String!){
    adverseEventNodeData(study_code: $study_code) {
      dose_limiting_toxicity
      unexpected_adverse_event
      date_of_onset
      adverse_event_grade_description
      existing_adverse_event
      ongoing_adverse_event
      date_of_resolution
      attribution_to_ind
      attribution_to_research
      adverse_event_term
      attribution_to_commercial
      adverse_event_agent_dose
      attribution_to_other
      adverse_event_agent_name
      attribution_to_disease
      adverse_event_description
      adverse_event_grade
      updated
      other_attribution_description
    }
  }
`;

export const GET_DISEASE_EXTENT_CLINICAL_DATA = gql`
  query diseaseExtentNodeData($study_code: String!){
    diseaseExtentNodeData(study_code: $study_code) {
      lesion_number
      lesion_site
      lesion_description
      previously_irradiated
      previously_treated
      measurable_lesion
      target_lesion
      date_of_evaluation
      measured_how
      longest_measurement
      evaluation_number
      evaluation_code
    }
  }
`;

export const GET_FOLLOW_UP_CLINICAL_DATA = gql`
  query followUpNodeData($study_code: String!){
    followUpNodeData(study_code: $study_code) {
      document_number
      date_of_last_contact
      patient_status
      explain_unknown_status
      contact_type
      treatment_since_last_contact
      physical_exam_performed
      physical_exam_changes
    }
  }
`;

export const GET_OFF_STUDY_CLINICAL_DATA = gql`
  query offStudyNodeData($study_code: String!){
    offStudyNodeData(study_code: $study_code) {
      document_number
      date_off_study
      reason_off_study
      date_of_disease_progression
      date_off_treatment
      best_resp_vet_tx_tp_secondary_response
      date_last_medication_administration
      best_resp_vet_tx_tp_best_response
      date_of_best_response
    }
  }
`;

export const GET_OFF_TREATMENT_CLINICAL_DATA = gql`
  query offTreatmentNodeData($study_code: String!){
    offTreatmentNodeData(study_code: $study_code) {
      document_number
      date_off_treatment
      reason_off_treatment
      date_of_disease_progression
      best_resp_vet_tx_tp_secondary_response
      date_last_medication_administration
      best_resp_vet_tx_tp_best_response
      date_of_best_response
    }
  }
`;

import gql from 'graphql-tag';
import React from 'react';
import {
  cellTypes, dataFormatTypes, types, btnTypes,
} from '../bento-core';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
  file: 'Add selected file(s) to My Files',
  arrow: true,
};

export const title = {
  studyFile:
    'This study currently has the following Study Files directly associated with it:',
  armsAndCohort: 'This study is organized as follows:',
};

export const embargoFileIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-Embargo-File.svg';
export const embargoHeaderIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-embargo-study-header.svg';
export const headerIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-StudiesDetail.svg';
export const externalIcon = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/cart_ExternalLink.svg';
const sampleProfileTabTextStyle = {
  fontFamily: 'Roboto',
  fontWeight: '500',
  fontSize: '14px',
  color: '#000000',
};
export const sampleProfile = {
  tabs: [
    {
      index: 0,
      label: <div style={sampleProfileTabTextStyle}>SITE</div>,
      value: 'studySampleSiteCount',
    },
    {
      index: 1,
      label: <div style={sampleProfileTabTextStyle}>TYPE</div>,
      value: 'studySampleTypeCount',
    },
    {
      index: 2,
      label: <div style={sampleProfileTabTextStyle}>PATHOLOGY</div>,
      value: 'studySamplePathologyCount',
    },
  ],
};

export const palette = [
  '#294b83',
  '#9f2b23',
  '#a8c4df',
  '#cc703e',
  '#dfc798',
  '#c2c1c0',
  '#517d98',
  '#0b3556',
  '#1d79a8',
  '#ff7f15',
  '#39c0f0',
  '#8e9cef',
  '#667b86',
  '#4bc41e',
  '#ca8312',
  '#00b6d4',
  '#00785a',
  '#1c75bc',
  '#b532a9',
  '#02ad0f',
];

export const argumentConfiguration = {
  field: 'group',
  visible: false,
  position: 'inside',
  size: 12,
  title: {
    text: 'Sample site',
    size: 14,
    family: 'Inter',
    weight: '500',
    color: '#000000',
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
    size: 14,
    family: 'Inter',
    weight: '500',
    color: '#000000',
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

export const addAssociatedFilesBtn = {
  title: 'Add Selected Files',
  clsName: 'add_selected_button',
  type: types.BUTTON,
  role: btnTypes.ADD_SELECTED_FILES,
  btnType: btnTypes.ADD_SELECTED_FILES,
  tooltipCofig: tooltipContent,
  conditional: true,
};

export const fileWrapperConfig = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [addAssociatedFilesBtn],
  },
];

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
  query fileOverview(
    $file_level: [String] = []
    $case_ids: [String] = []
    $program: [String] = []
    $study: [String]
    $study_type: [String]
    $breed: [String]
    $diagnosis: [String]
    $disease_site: [String]
    $stage_of_disease: [String]
    $response_to_treatment: [String]
    $sex: [String]
    $neutered_status: [String]
    $sample_type: [String]
    $sample_pathology: [String]
    $sample_site: [String]
    $file_association: [String]
    $file_type: [String]
    $file_format: [String]
    $biobank: [String]
    $study_participation: [String]
    $order_by: String = "file_name"
    $sort_direction: String = "ASC"
    $first: Int = 10
    $offset: Int = 0
  ) {
    fileOverview(
      file_level: $file_level
      case_ids: $case_ids
      program: $program
      study: $study
      study_type: $study_type
      breed: $breed
      diagnosis: $diagnosis
      disease_site: $disease_site
      stage_of_disease: $stage_of_disease
      response_to_treatment: $response_to_treatment
      sex: $sex
      neutered_status: $neutered_status
      sample_type: $sample_type
      sample_pathology: $sample_pathology
      sample_site: $sample_site
      file_association: $file_association
      file_type: $file_type
      file_format: $file_format
      biobank: $biobank
      study_participation: $study_participation
      order_by: $order_by
      sort_direction: $sort_direction
      first: $first
      offset: $offset
    ) {
      file_uuid
    }
  }
`;

export const GET_ALL_FILEIDS_ON_FILESTAB_FOR_SELECT_ALL = gql`
  query fileOverview($file_name: [String]) {
    fileIdsFromFileName(file_name: $file_name) {
      file_uuid
    }
  }
`;

// ---------------- File table configuration -----------
export const fileTable = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle:
    'This study currently has the following Study Files directly associated with it:',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'files',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'display' to false to hide the table entirely
  name: 'file',
  dataKey: 'file_name',
  helpMessage: 'Here help message',
  // A maximum of 10 columns are allowed
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_Study_Files_download',
      downloadCsv: 'Download Table Contents As CSV',
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
      dataField: 'studyDesignation',
      header: 'Study Designation',
      display: false,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_name',
      header: 'File Name',
      sort: 'asc',
      primary: true,
      display: true,
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
      dataField: 'uuid',
      header: 'UUID',
      display: false,
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
        toolTipTextFilePreview:
          'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
        fileSizeColumn: 'file_size',
        fileFormatColumn: 'file_format',
        fileLocation: 'uuid',
        caseIdColumn: 'file_name',
        iconFilePreview:
          'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload:
          'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
        iconFileViewer:
          'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
      },
      cellType: cellTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
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
  noAssociatedFiles:
    'This study currently has no Files directly associated with it',
};
// --------------- Table 1 configuration --------------
export const table1 = {
  // Set 'display' to false to hide the table entirely
  display: true,
  // Table title
  tableTitle: 'This study is organized as follows:',
  // Field name for files data, need to be updated only when using a different GraphQL query
  subjectDetailField: 'samples',
  // Value must be one of the 'dataField's in fileTableColumns
  defaultSortField: 'sample_id',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  // Set 'selectableRows' to true to show the row selection
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_ARMS_AND_COHORTS_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  columns: [
    {
      dataField: 'arm',
      header: 'Arms',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'description',
      header: 'Description',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
    },
    {
      dataField: 'does',
      header: 'Cohorts',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
    },
  ],
  noArmMessage: 'This study is not divided into arms',
  noCohortMessage: 'This study is not divided into cohorts',
  noArmsCohort: 'This study is not divided into Arms or Cohorts',
  noArmsCohort2: 'This study is not currently divided into Arms or Cohorts',
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
    sampleCountOfStudy(study_code: $csd)
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
    studySampleSiteCount(study_codes: [$csd]) {
      group
      count
    }
    studySampleTypeCount(study_codes: [$csd]) {
      group
      count
    }
    studySamplePathologyCount(study_codes: [$csd]) {
      group
      count
    }
    filesOfStudy(study_code: $csd) {
      file_type
    }
    studyFiles(study_codes: [$csd]) {
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

    study(
      filter: {
        OR: [
          { clinical_study_designation: $csd }
          { accession_id: $accessionId }
        ]
      }
    ) {
      program {
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
      cohorts {
        cohort_dose
        cohort_description
      }
      study_arms {
        arm
        ctep_treatment_assignment_code
        cohorts {
          cohort_dose
          cohort_description
        }
      }
      principal_investigators {
        pi_first_name
        pi_last_name
        pi_middle_initial
      }
      publications {
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
      cases {
        case_id
        diagnoses {
          disease_term
        }
      }
    }
  }
`;

export const agentNodeMetadata = {
  keysToInclude: ['medication', 'document_number'],
  header: ['medication', 'document_number'],
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
  keysToInclude: ['inferred', 'visit_id', 'visit_date'],
  header: ['inferred', 'visit_id', 'visit_date'],
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
    'case_id',
    'day_in_cycle',
    'date_of_onset',
    'existing_adverse_event',
    'date_of_resolution',
    'ongoing_adverse_event',
    'adverse_event_term',
    'adverse_event_description',
    'adverse_event_grade',
    'adverse_event_grade_description',
    'adverse_event_agent_name',
    'adverse_event_agent_dose',
    'attribution_to_research',
    'attribution_to_ind',
    'attribution_to_disease',
    'attribution_to_commercial',
    'attribution_to_other',
    'other_attribution_description',
    'dose_limiting_toxicity',
    'unexpected_adverse_event',
  ],
  header: [
    'case_id',
    'day_in_cycle',
    'date_of_onset',
    'existing_adverse_event',
    'date_of_resolution',
    'ongoing_adverse_event',
    'adverse_event_term',
    'adverse_event_description',
    'adverse_event_grade',
    'adverse_event_grade_description',
    'adverse_event_agent_name',
    'adverse_event_agent_dose',
    'attribution_to_research',
    'attribution_to_ind',
    'attribution_to_disease',
    'attribution_to_commercial',
    'attribution_to_other',
    'other_attribution_description',
    'dose_limiting_toxicity',
    'unexpected_adverse_event',
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
  query cycleNodeData($study_code: String!) {
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
  query agentNodeData($study_code: String!) {
    agentNodeData(study_code: $study_code) {
      medication
      document_number
    }
  }
`;

export const GET_VISIT_CLINICAL_DATA = gql`
  query visitNodeData($study_code: String!) {
    visitNodeData(study_code: $study_code) {
      inferred
      visit_id
      visit_date
    }
  }
`;

export const studiesByProgram = gql`
  query studiesByProgram {
    studiesByProgram {
      clinical_study_designation
      CRDCLinks {
        url
        repository
        metadata {
          ... on IDCMetadata {
            collection_id
            cancer_type
            date_updated
            description
            doi
            image_types
            location
            species
            subject_count
            supporting_data
          }
          ... on TCIAMetadata {
            Collection
            total_patient_IDs
            unique_modalities
            unique_bodyparts_examined
            total_image_counts
          }
        }
      }
      numberOfCRDCNodes
      numberOfImageCollections
    }
  }
`;

export const GET_PRIOR_THERAPY_CLINICAL_DATA = gql`
  query priorTherapyNodeData($study_code: String!) {
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
  query priorSurgeryNodeData($study_code: String!) {
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
  query agentAdministrationNodeData($study_code: String!) {
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
  query physicalExamNodeData($study_code: String!) {
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
  query vitalSignsNodeData($study_code: String!) {
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
  query labExamNodeData($study_code: String!) {
    labExamNodeData(study_code: $study_code)
  }
`;

export const GET_ADVERSE_EVENT_CLINICAL_DATA = gql`
  query adverseEventNodeData($study_code: String!) {
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
      other_attribution_description
    }
  }
`;

export const GET_DISEASE_EXTENT_CLINICAL_DATA = gql`
  query diseaseExtentNodeData($study_code: String!) {
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
  query followUpNodeData($study_code: String!) {
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
  query offStudyNodeData($study_code: String!) {
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
  query offTreatmentNodeData($study_code: String!) {
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

export const GET_CILICAL_DATA_OF_STUDY = gql`
  query studyClinicalData($study_code: String!) {
    agentNodeData(study_code: $study_code) {
      medication
    }
    cycleNodeData(study_code: $study_code) {
      cycle_number
      date_of_cycle_start
      date_of_cycle_end
      crf_id
      case_id
    }
    visitNodeData(study_code: $study_code) {
      inferred
      visit_id
      visit_date
    }
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
    priorSurgeryNodeData(study_code: $study_code) {
      date_of_surgery
      procedure
      anatomical_site_of_surgery
      surgical_finding
      residual_disease
      therapeutic_indicator
    }
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
    physicalExamNodeData(study_code: $study_code) {
      date_of_examination
      pe_comment
      body_system
      case_id
      pe_finding
    }
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
    adverseEventNodeData(study_code: $study_code) {
      case_id
      day_in_cycle
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
      other_attribution_description
    }
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

export const table = {
  title: 'Imaging Data Commons (IDC)',
  defaultSortField: 'dataNode',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  columns: [
    {
      dataField: 'dataNode',
      header: 'Clinical Data Nodes',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'description',
      header: 'Definition',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'caseCount',
      header: 'Cases',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
      columnDefaultValues: {
        0: ' ',
      },
    },
    {
      dataField: 'recordCount',
      header: 'Records',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
      columnDefaultValues: {
        0: ' ',
      },
    },
    {
      dataField: 'csvDownload',
      header: 'CSV',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
    },
  ],
  rows: [
    {
      title: 'adverse event',
      countKey: 'adverse_event',
      csvDownload: 'adverseEventNodeData',
      manifest: adverseEventNodeMetadata,
    },
    {
      title: 'agent',
      countKey: 'agent',
      csvDownload: 'agentNodeData',
      manifest: agentNodeMetadata,
    },
    {
      title: 'agent administration',
      countKey: 'agent_administration',
      csvDownload: 'agentAdministrationNodeData',
      manifest: agentAdministrationNodeMetadata,
    },
    {
      title: 'cycle',
      countKey: 'cycle',
      csvDownload: 'cycleNodeData',
      manifest: cycleNodeMetadata,
    },
    {
      title: 'disease extent',
      countKey: 'disease_extent',
      csvDownload: 'diseaseExtentNodeData',
      manifest: diseaseExtentNodeMetadata,
    },
    {
      title: 'follow up',
      countKey: 'follow_up',
      csvDownload: 'followUpNodeData',
      manifest: followUpNodeMetadata,
    },
    {
      title: 'lab exam',
      countKey: 'lab_exam',
      csvDownload: 'labExamNodeData',
      manifest: labExamNodeMetadata,
    },
    {
      title: 'off study',
      countKey: 'off_study',
      csvDownload: 'offStudyNodeData',
      manifest: offStudyNodeMetadata,
    },
    {
      title: 'off_treatment',
      countKey: 'off_treatment',
      csvDownload: 'offTreatmentNodeData',
      manifest: offTreatmentNodeMetadata,
    },
    {
      title: 'physical exam',
      countKey: 'physical_exam',
      csvDownload: 'physicalExamNodeData',
      manifest: physicalExamNodeMetadata,
    },
    {
      title: 'prior surgery',
      countKey: 'prior_surgery',
      csvDownload: 'priorSurgeryNodeData',
      manifest: priorSurgeryNodeMetadata,
    },
    {
      title: 'prior therapy',
      countKey: 'prior_therapy',
      csvDownload: 'priorTherapyNodeData',
      manifest: priorTherapyNodeMetadata,
    },
    {
      title: 'visit',
      countKey: 'visit',
      csvDownload: 'visitNodeData',
      manifest: visitNodeMetadata,
    },
    {
      title: 'vital signs',
      countKey: 'vital_signs',
      csvDownload: 'vitalSignsNodeData',
      manifest: vitalSignsNodeMetadata,
    },
  ],
  tableMsg: {
    noMatch: 'Data unavailable at this time',
  },
};

export const tableLayOut = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

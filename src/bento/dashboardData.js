import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [
  {
    label: 'Study', field: 'study', api: 'caseCountByStudyCode', filterAPI: 'filterCaseCountByStudyCode', datafield: 'study', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Study Type', field: 'study_type', api: 'caseCountByStudyType', filterAPI: 'filterCaseCountByStudyType', datafield: 'study_type', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Breed', field: 'breed', api: 'caseCountByBreed', filterAPI: 'filterCaseCountByBreed', datafield: 'breed', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Diagnosis', field: 'diagnosis', api: 'caseCountByDiagnosis', filterAPI: 'filterCaseCountByDiagnosis', datafield: 'diagnosis', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Disease Stage', field: 'disease_site', api: 'caseCountByStageOfDisease', filterAPI: 'filterCaseCountByStageOfDisease', datafield: 'disease_site', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Disease Site', field: 'stage_of_disease', api: 'caseCountByDiseaseSite', filterAPI: 'filterCaseCountByDiseaseSite', datafield: 'stage_of_disease', section: 'Filter By Cases', show: true,
  },
  // {
  //   label: 'Tumor Grade',
  //   field: 'cases',
  //   api: 'caseCountByStudyCode',
  //   filterAPI: 'filterCaseCountByResponseToTreatment',
  //   datafield: 'response_to_treatment',
  //   section: 'Filter By Cases',
  //   show: true,
  // },
  {
    label: 'Response to treatment Test', field: 'sex', api: 'caseCountByGender', filterAPI: 'filterCaseCountBySex', datafield: 'response_to_treatment', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Gender', field: 'sex', api: 'caseCountByGender', filterAPI: 'filterCaseCountBySex', datafield: 'sex', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Neutered Status', field: 'neutered_status', api: 'caseCountByNeuteredStatus', filterAPI: 'filterCaseCountByNeuteredStatus', datafield: 'neutered_status', section: 'Filter By Cases', show: true,
  },
  // {
  //   label: 'Tissue Type',
  //   field: 'cases',
  //   api: 'caseCountByStudyCode',
  //   filterAPI: 'filterCaseCountBySampleType',
  //   datafield: 'sample_type',
  //   section: 'Filter By Samples',
  //   show: true,
  // },
  // {
  //   label: 'Tissue Composition',
  //   field: 'cases',
  //   api: 'caseCountByStudyCode',
  //   filterAPI: 'filterCaseCountBySamplePathology',
  //   datafield: 'sample_pathology',
  //   section: 'Filter By Samples',
  //   show: true,
  // },
  // {
  //   label: 'File Association',
  //   field: 'cases',
  //   api: 'caseCountByStudyCode',
  //   filterAPI: 'filterCaseCountByFileAssociation',
  //   datafield: 'file_association',
  //   section: 'Filter By Files',
  //   show: true,
  // },
  // {
  //   label: 'File Type',
  //   field: 'cases',
  //   api: 'caseCountByStudyCode',
  //   filterAPI: 'filterCaseCountByFileType',
  //   datafield: 'file_type',
  //   section: 'Filter By Files',
  //   show: true,
  // },
  {
    label: 'Tissue Type Test', field: 'file_format', api: 'caseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'sample_type', section: 'Filter By Samples', show: true,
  },
  {
    label: 'Tissue Composition Test', field: 'file_format', api: 'caseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'sample_pathology', section: 'Filter By Samples', show: true,
  },
  {
    label: 'File Association Test', field: 'file_format', api: 'caseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'file_association', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Type Test', field: 'file_format', api: 'caseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'file_type', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Format', field: 'file_format', api: 'caseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'file_format', section: 'Filter By Files', show: true,
  },
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionStyling = {
  'Filter By Cases': {
    color: '#10A075',
    height: '5px',
  },
  'Filter By Samples': {
    color: '#10BEFF',
    height: '5px',
  },
  'Filter By Files': {
    color: '#E636E4',
    height: '5px',
  },
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
  // {
  //   type: 'sunburst',
  //   label: 'Programs and Arms',
  //   dataName: 'armsByPrograms',
  //   datatable_level1_field: 'program',
  //   datatable_level2_field: 'study_acronym',
  //   show: true,
  // },
  {
    type: 'donut',
    label: 'Breed',
    dataName: 'caseCountByBreed',
    datatable_field: 'breed',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    dataName: 'caseCountByDiagnosis',
    datatable_field: 'diagnosis',
    show: true,
  },
  {
    type: 'donut',
    label: 'Disease Site',
    dataName: 'caseCountByDiseaseSite',
    datatable_field: 'disease_site',
    show: true,
  },
  {
    type: 'donut',
    label: 'Sex',
    dataName: 'caseCountByGender',
    datatable_field: 'gender',
    show: true,
  },
  {
    type: 'donut',
    label: 'Stage of Disease',
    dataName: 'caseCountByStageOfDisease',
    datatable_field: 'stage_of_disease',
    show: true,
  },
];

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Dashboard Table configuration --------------
export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    // A maximum of 10 columns (tableData) are allowed
    {
      dataField: 'case_id',
      header: 'Case ID',
      sort: 'asc',
      link: '/case/{subject_id}',
      primary: true,
      display: true,
    },
    {
      dataField: 'program',
      header: 'Program Code',
      sort: 'asc',
      link: '/program/{program_id}',
      display: true,
    },
    {
      dataField: 'program_id',
      header: 'Program ID',
      sort: 'asc',
      display: false,
    },
    {
      dataField: 'study_acronym',
      header: 'Arm',
      sort: 'asc',
      link: '/arm/{study_acronym}',
      display: true,
    },
    {
      dataField: 'diagnosis',
      header: 'Diagnosis',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'recurrence_score',
      header: 'Recurrence Score',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'tumor_size',
      header: 'Tumor Size (cm)',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'er_status',
      header: 'ER Status',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'pr_status',
      header: 'PR Status',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'age_at_index',
      header: 'Age (years)',
      sort: 'asc',
      display: true,
    },
    {
      dataField: 'survival_time',
      header: 'Survival (days)',
      sort: 'asc',
      display: true,
    },
  ],
};

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfLabProcedures
  numberOfFiles
  subjectCountByProgram{
        group
        subjects
      }
    subjectCountByStudy{
        group
        subjects
      }
    subjectCountByDiagnoses{
        group
        subjects
      }
    subjectCountByRecurrenceScore{
        group
        subjects
      }
    subjectCountByTumorSize{
        group
        subjects
      }
    subjectCountByChemotherapyRegimen{
        group
        subjects
      }
    subjectCountByTumorGrade{
        group
        subjects
      }
  subjectCountByErStatus{
        group
        subjects
      }
  subjectCountByPrStatus{
        group
        subjects
      }
  subjectCountByMenopauseStatus{
        group
        subjects
      }
  subjectCountByChemotherapyRegimen{
        group
        subjects
      }
      subjectCountByEndocrineTherapy{
    group
    subjects
  }
  subjectCountByFileType{
    group
    subjects
}
subjectCountByFileAssociation {
    group
    subjects
}
subjectCountByTissueComposition{
    group
    subjects
}
subjectCountByTissueType{
    group
    subjects
}
    armsByPrograms {
        program
        caseSize
        children {
            arm
            caseSize
            size
        }
    }
    subjectOverViewPaged(first: 100) {
      subject_id
      program_id
      study_info
      samples
      program
      study_acronym
      diagnosis
      recurrence_score
      tumor_size
      tumor_grade
      er_status
      pr_status
      chemotherapy
      endocrine_therapy
      menopause_status
      age_at_index
      survival_time
      lab_procedures
      files{
        file_id
      }
  }
  }`;

// --------------- Dashboard Query configuration --------------
export const GET_DASHBOARD_TABLE_DATA_QUERY = gql`{

  caseOverviewPaged (first: 10000) {
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

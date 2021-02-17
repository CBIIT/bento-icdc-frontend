/* eslint-disable */
import gql from 'graphql-tag';

// --------------- Dashboard Sidebar Filters configuration --------------
// A maximum of 12 facetSearchData are allowed
export const facetSearchData = [
  {
    label: 'Study', field: 'group', api: 'filterCaseCountByStudyCode', filterAPI: 'filterCaseCountByStudyCode', datafield: 'study', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Study Type', field: 'group', api: 'filterCaseCountByStudyType', filterAPI: 'filterCaseCountByStudyType', datafield: 'study_type', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Breed', field: 'group', api: 'filterCaseCountByBreed', filterAPI: 'filterCaseCountByBreed', datafield: 'breed', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Diagnosis', field: 'group', api: 'filterCaseCountByDiagnosis', filterAPI: 'filterCaseCountByDiagnosis', datafield: 'diagnosis', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Primary Disease Site', field: 'group', api: 'filterCaseCountByDiseaseSite', filterAPI: 'filterCaseCountByDiseaseSite', datafield: 'disease_site', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Stage of Disease', field: 'group', api: 'filterCaseCountByStageOfDisease', filterAPI: 'filterCaseCountByStageOfDisease', datafield: 'stage_of_disease', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Response to Treatment', field: 'group', api: 'filterCaseCountByResponseToTreatment', filterAPI: 'filterCaseCountByResponseToTreatment', datafield: 'response_to_treatment', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Sex', field: 'group', api: 'filterCaseCountBySex', filterAPI: 'filterCaseCountBySex', datafield: 'sex', section: 'Filter By Cases', show: true,
  },
  {
    label: 'Neutered Status', field: 'group', api: 'filterCaseCountByNeuteredStatus', filterAPI: 'filterCaseCountByNeuteredStatus', datafield: 'neutered_status', section: 'Filter By Cases', show: true,
  },

  {
    label: 'Sample Type', field: 'group', api: 'filterCaseCountBySampleType', filterAPI: 'filterCaseCountBySampleType', datafield: 'sample_type', section: 'Filter By Samples', show: true,
  },
  {
    label: 'Sample Pathology', field: 'group', api: 'filterCaseCountBySamplePathology', filterAPI: 'filterCaseCountBySamplePathology', datafield: 'sample_pathology', section: 'Filter By Samples', show: true,
  },
  {
    label: 'File Association', field: 'group', api: 'filterCaseCountByFileAssociation', filterAPI: 'filterCaseCountByFileAssociation', datafield: 'file_association', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Type', field: 'group', api: 'filterCaseCountByFileType', filterAPI: 'filterCaseCountByFileType', datafield: 'file_type', section: 'Filter By Files', show: true,
  },
  {
    label: 'File Format', field: 'group', api: 'filterCaseCountByFileFormat', filterAPI: 'filterCaseCountByFileFormat', datafield: 'file_format', section: 'Filter By Files', show: true,
  },
];

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter By Cases': {
    color: '#C7621E',
    height: '4px',
  },
  'Filter By Samples': {
    color: '#3FA604',
    height: '4px',
  },
  'Filter By Files': {
    color: '#1693C0',
    height: '4px',
  },
};

// --------------- Dashboard Widgets configuration --------------
// A maximum of 6 widgets are allowed
export const widgetsData = [
  {
    type: 'sunburst',
    label: 'Programs and Studies',
    dataName: 'programsAndStudies',
    datatable_level1_field: 'program',
    datatable_level2_field: 'study',
    show: true,
  },
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
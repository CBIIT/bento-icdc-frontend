import gql from 'graphql-tag';

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_ALL_IDS = gql`{
  idsLists{
    caseIds
    sampleIds
    fileIds
    fileNames
}
  }
  `;

export const GET_SUBJECT_IDS = gql`
query caseOverview(
  $case_ids: [String] = [],
  $first: Int = 1000,
  $offset: Int = 0,
){
  caseOverview
  (
    first: $first,
    offset: $offset,
    case_ids: $case_ids
  )
  {
    case_id
    study_code
  }  
}
`;

export const GET_IDS_BY_TYPE = (type) => gql`{
    caseOverview(case_ids: [], first: 1000) {
    ${type}
  }
}
`;

export const GET_SEARCH_NODES_BY_FACET = gql`
query search (          
  $subject_ids: [String],
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float]
){
  searchSubjects (          
      subject_ids: $subject_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index
  ) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfSamples
      numberOfLabProcedures
      numberOfFiles
      armsByPrograms {
          program
          caseSize
          children {
              arm
              caseSize
              size
          }
      }
  subjectCountByProgram {
          group
          subjects
      }
      subjectCountByStudy {
          group
          subjects
      }
      subjectCountByDiagnoses {
          group
          subjects
      }
      subjectCountByRecurrenceScore {
          group
          subjects
      }
      subjectCountByTumorSize {
          group
          subjects
      }
      subjectCountByChemotherapyRegimen {
          group
          subjects
      }
      subjectCountByEndocrineTherapy {
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
      subjectCountByFileType {
          group
          subjects
      }
      subjectCountByFileAssociation {
          group
          subjects
      }
      subjectCountByTissueComposition {
          group
          subjects
      }
      subjectCountByTissueType {
          group
          subjects
      }
      filterSubjectCountByProgram {
          group
          subjects
      }
      filterSubjectCountByStudy{
          group
          subjects
      }
      filterSubjectCountByDiagnoses{
          group
          subjects
      }
      filterSubjectCountByRecurrenceScore{
          group
          subjects
      }
      filterSubjectCountByTumorSize{
          group
          subjects
      }
      filterSubjectCountByTumorGrade{
          group
          subjects
      }
      filterSubjectCountByErStatus{
          group
          subjects
      }
      filterSubjectCountByPrStatus{
          group
          subjects
      }
      filterSubjectCountByChemotherapyRegimen{
          group
          subjects
      }
      filterSubjectCountByEndocrineTherapy{
          group
          subjects
      }
      filterSubjectCountByMenopauseStatus{
          group
          subjects
      }
      filterSubjectCountByTissueType{
          group
          subjects
      }
      filterSubjectCountByTissueComposition{
          group
          subjects
      }
      filterSubjectCountByFileAssociation{
          group
          subjects
      }
      filterSubjectCountByFileType{
          group
          subjects
      }
      filterSubjectCountByAge{
          lowerBound
          upperBound
          subjects
      }
  }
}
`;

export const GET_SEARCH_NODECOUNTS = gql`
  query nodeCounts($subject_ids: [String]=[], $sample_ids: [String] = [], $file_ids: [String]=[], $file_names: [String]=[]){
    nodeCountsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfLabProcedures
      numberOfSamples
      numberOfFiles
  }



subjectCountByDiagnosesFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}
subjectCountByRecurrenceScoreFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}
subjectCountByTumorSizeFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}
subjectCountByChemotherapyRegimenFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}
subjectCountByEndocrineTherapyFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  group
  subjects
}

subjectCountByFileTypeFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names) {
  group
  subjects
}

armsByProgramsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  program
  caseSize
  children{
      arm
      caseSize
      size
  }
}  

findIdsFromLists(subject_ids: $subject_ids, sample_ids: $sample_ids, file_ids: $file_ids, file_names: $file_names){
  subjectIds
  sampleIds
  fileIds
  fileNames
}
}
  `;

export const CASES_FILE_QUERY = gql`
query fileOverview(
    $subject_ids: [String],
    $file_ids: [String],
    $programs: [String],
    $studies: [String],
    $diagnoses: [String],
    $rc_scores: [String],
    $tumor_sizes: [String],
    $chemo_regimen: [String],
    $tumor_grades: [String],
    $er_status: [String],
    $pr_status: [String],
    $endo_therapies: [String],
    $meno_status: [String],
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    fileOverview(
        subject_ids: $subject_ids,
        file_ids: $file_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        file_id,
        file_name,
        association,
        file_description,
        file_format,
        file_size,
        program,
        arm,
        subject_id,
        sample_id,
        diagnosis,
    }
}
`;

export const CASES_SAMPLE_QUERY = gql`
query sampleOverview(
    $subject_ids: [String],
    $sample_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    sampleOverview(
        subject_ids: $subject_ids,
        sample_ids: $sample_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        sample_id,
        subject_id,
        program,
        arm,
        diagnosis,
        tissue_type,
        tissue_composition,
        sample_anatomic_site,
        sample_procurement_method,
        platform,
        files 
    }
}`;

export const SUBJECT_OVERVIEW_QUERY = gql`
query subjectOverview(
    $subject_ids: [String],
    $programs: [String],
    $studies: [String],
    $diagnoses: [String],
    $rc_scores: [String],
    $tumor_sizes: [String],
    $chemo_regimen: [String],
    $tumor_grades: [String],
    $er_status: [String],
    $pr_status: [String],
    $endo_therapies: [String],
    $meno_status: [String],
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int,
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
    subjectOverview(
        subject_ids: $subject_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
        ) {
        subject_id
        program
        program_id
        study_acronym
        study_short_description
        study_info
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
        survival_time_unit
        files
        lab_procedures
        samples
    }
}
`;

// type: 'sunburst' | 'donut'
// title: string
// dataName: string
// datatable_level1_field: string
// datatable_level2_field: string
// datatable_field: string
// sliceTitle: string (optional)
export const widgetsSearchData = [
  {
    type: 'sunburst',
    title: 'Programs and Arms',
    dataName: 'armsByPrograms',
    mapWithDashboardWidget: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'arm',
  },
  {
    type: 'donut',
    title: 'Diagnosis',
    dataName: 'subjectCountByDiagnosesFromLists',
    mapWithDashboardWidget: 'subjectCountByDiagnoses',
  },
  {
    type: 'donut',
    title: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScoreFromLists',
    mapWithDashboardWidget: 'subjectCountByRecurrenceScore',
  },
  {
    type: 'donut',
    title: 'Tumor Size',
    dataName: 'subjectCountByTumorSizeFromLists',
    mapWithDashboardWidget: 'subjectCountByTumorSize',
  },
  {
    type: 'donut',
    title: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimenFromLists',
    mapWithDashboardWidget: 'subjectCountByChemotherapyRegimen',
  },
  {
    type: 'donut',
    title: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapyFromLists',
    mapWithDashboardWidget: 'subjectCountByEndocrineTherapy',
  },
];

export const ageAtIndex = 10;

export const localFindConfig = {
  title: 'Upload Case Set',
  inputPlaceholder: 'eg. ICDC-CASE-06, ICDC-CASE-22',
  inputTooltip: 'Enter valid Case IDs',
  uploadTooltip: 'Select a file from your computer',
  accept: '.csv,.txt',
  maxSearchTerms: 1000,
  matchedId: 'case_id',
  matchedLabel: 'Submitted Case ID',
  associateId: 'study_code',
  associateLabel: 'Associated Study',
  projectName: 'ICDC',
  uploadTooltipIcon: 'SPEECH_BUBBLE',
};

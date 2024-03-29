import gql from 'graphql-tag';

export const GET_CASES_TAB = gql`
query subjectOverViewPaged(
  $case_ids: [String],
  $biobank: [String],
  $breed: [String],
  $diagnosis: [String],
  $disease_site: [String],
  $file_association: [String],
  $file_format: [String],
  $file_type: [String],
  $neutered_status: [String],
  $program: [String],
  $response_to_treatment: [String],
  $sample_pathology: [String],
  $sample_site: [String],
  $sample_type: [String],
  $sex: [String],
  $stage_of_disease: [String],
  $study: [String],
  $study_participation: [String],
  $study_type: [String],
  $first: Int = 10000000){
  caseOverview(
    case_ids: $case_ids,
    biobank: $biobank,
    breed: $breed,
    diagnosis: $diagnosis,
    disease_site: $disease_site,
    file_association: $file_association,
    file_format: $file_format,
    file_type: $file_type,
    neutered_status: $neutered_status,
    program: $program,
    response_to_treatment: $response_to_treatment,
    sample_pathology: $sample_pathology,
    sample_site: $sample_site,
    sample_type: $sample_type,
    sex: $sex,
    stage_of_disease: $stage_of_disease,
    study: $study,
    study_participation: $study_participation,
    study_type: $study_type,
    first: $first) {
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
    other_cases
    individual_id
    primary_disease_site
    date_of_diagnosis
    histology_cytopathology
    histological_grade
    pathology_report
    treatment_data
    follow_up_data
    concurrent_disease
    concurrent_disease_type
    arm
  }
}
`;
const customCasesOptionalDataFields = {
  keysToInclude: [
    'individual_id',
    'other_cases',
    'primary_disease_site',
    'date_of_diagnosis',
    'histology_cytopathology',
    'histological_grade',
    'pathology_report',
    'treatment_data',
    'follow_up_data',
    'concurrent_disease',
    'concurrent_disease_type',
    'arm'],
  header: [
    'Canine ID',
    'Matching Cases',
    'Disease Site',
    'Date of Diagnosis',
    'Histology/Cytopathology',
    'Histological Grade',
    'Detailed Pathology Evaluation Available',
    'Treatment Data Available',
    'Follow Up Data Available',
    'Concurrent Disease(s)',
    'Concurrent Disease Specifics',
    'Arm',
  ],
};

const customCasesTabCoreDataFields = {
  keysToInclude: ['case_id', 'study_code', 'study_type', 'breed', 'diagnosis', 'stage_of_disease', 'age', 'sex', 'neutered_status', 'weight', 'response_to_treatment', 'cohort'],
  header: ['Case ID', 'Study Code', 'Study Type', 'Breed', 'Diagnosis', 'Stage Of Disease', 'Age', 'Sex', 'Neutered Status', 'Weight (kg)', 'Response to Treatment', 'Cohort'],
};

export const customCasesTabDownloadCSV = {
  keysToInclude: [
    ...customCasesTabCoreDataFields.keysToInclude,
    ...customCasesOptionalDataFields.keysToInclude,
  ],
  header: [
    ...customCasesTabCoreDataFields.header,
    ...customCasesOptionalDataFields.header,
  ],
  query: GET_CASES_TAB,
  apiVariable: 'caseOverview',
  fileName: 'ICDC_Cases_download',
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview(
  $case_ids: [String],
  $sample_ids: [String],
  $biobank: [String],
  $breed: [String],
  $diagnosis: [String],
  $disease_site: [String],
  $file_association: [String],
  $file_format: [String],
  $file_type: [String],
  $neutered_status: [String],
  $program: [String],
  $response_to_treatment: [String],
  $sample_pathology: [String],
  $sample_site: [String],
  $sample_type: [String],
  $sex: [String],
  $stage_of_disease: [String],
  $study: [String],
  $study_participation: [String],
  $study_type: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by:String =""){
    sampleOverview(
      case_ids: $case_ids,
      sample_ids: $sample_ids,
      biobank: $biobank,
      breed: $breed,
      diagnosis: $diagnosis,
      disease_site: $disease_site,
      file_association: $file_association,
      file_format: $file_format,
      file_type: $file_type,
      neutered_status: $neutered_status,
      program: $program,
      response_to_treatment: $response_to_treatment,
      sample_pathology: $sample_pathology,
      sample_site: $sample_site,
      sample_type: $sample_type,
      sex: $sex,
      stage_of_disease: $stage_of_disease,
      study: $study,
      study_participation: $study_participation,
      study_type: $study_type,
      offset: $offset,
      first: $first,
      order_by: $order_by) {
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
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      comment
      individual_id
      other_cases
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      patient_age_at_enrollment
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
  }
  }
`;

const customSamplesOptionalDataFields = {
  keysToInclude: [
    'physical_sample_type',
    'general_sample_pathology',
    'tumor_sample_origin',
    'comment',
    'individual_id',
    'other_cases',
    'patient_age_at_enrollment',
    'sex',
    'neutered_indicator',
    'weight',
    'primary_disease_site',
    'stage_of_disease',
    'date_of_diagnosis',
    'histology_cytopathology',
    'histological_grade',
    'best_response',
    'pathology_report',
    'treatment_data',
    'follow_up_data',
    'concurrent_disease',
    'concurrent_disease_type',
    'cohort_description',
    'arm',
  ],
  header: [
    'Physical Sample Type',
    'General Sample Pathology',
    'Tumor Sample Origin',
    'Sample Comments',
    'Canine ID',
    'Matching Cases',
    'Age',
    'Sex',
    'Neutered Status',
    'Weight (kg)',
    'Disease Site',
    'Stage of Disease',
    'Date of Diagnosis',
    'Histology/Cytopathology',
    'Histological Grade',
    'Response to Treatment',
    'Detailed Pathology Evaluation Available',
    'Treatment Data Available',
    'Follow Up Data Available',
    'Concurrent Disease(s)',
    'Concurrent Disease Specifics',
    'Cohort',
    'Arm',
  ],
};

const customSampleTabCoreDataFields = {
  keysToInclude: ['sample_id', 'case_id', 'breed', 'diagnosis', 'sample_site', 'sample_type', 'sample_pathology', 'tumor_grade', 'sample_chronology', 'percentage_tumor', 'necropsy_sample', 'sample_preservation'],
  header: ['Sample ID', 'Case ID', 'Breed', 'Diagnosis', 'Sample Site', 'Sample Type', 'Pathology/Morphology', 'Tumor Grade', 'Sample Chronology', 'Percentage Tumor', 'Necropsy Sample', 'Sample Preservation'],
};

export const customSamplesTabDownloadCSV = {
  keysToInclude: [
    ...customSampleTabCoreDataFields.keysToInclude,
    ...customSamplesOptionalDataFields.keysToInclude,
  ],
  header: [
    ...customSampleTabCoreDataFields.header,
    ...customSamplesOptionalDataFields.header,
  ],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'ICDC_Samples_download',
};

export const GET_FILES_TAB = gql`
query fileOverview(
  $case_ids: [String],
  $file_level: [String] = ["case"],
  $biobank: [String],
  $breed: [String],
  $diagnosis: [String],
  $disease_site: [String],
  $file_association: [String],
  $file_format: [String],
  $file_type: [String],
  $neutered_status: [String],
  $program: [String],
  $response_to_treatment: [String],
  $sample_pathology: [String],
  $sample_site: [String],
  $sample_type: [String],
  $sex: [String],
  $stage_of_disease: [String],
  $study: [String],
  $study_participation: [String],
  $study_type: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by:String ="file_name"){
    fileOverview(
      case_ids: $case_ids,
      biobank: $biobank,
      breed: $breed,
      diagnosis: $diagnosis,
      disease_site: $disease_site,
      file_association: $file_association,
      file_format: $file_format,
      file_type: $file_type,
      neutered_status: $neutered_status,
      program: $program,
      response_to_treatment: $response_to_treatment,
      sample_pathology: $sample_pathology,
      sample_site: $sample_site,
      sample_type: $sample_type,
      sex: $sex,
      stage_of_disease: $stage_of_disease,
      study: $study,
      study_participation: $study_participation,
      study_type: $study_type,
      file_level: $file_level,
      offset: $offset,
      first: $first,
      order_by: $order_by) {
      file_name
      file_type
      sample_id
      association
      file_description
      file_format
      file_size
      case_id
      breed
      diagnosis
      study_code
      file_uuid
      sample_site
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      summarized_sample_type
      specific_sample_pathology
      date_of_sample_collection
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      comment
      individual_id
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
      other_cases
    }
  }
`;

export const GET_FILES_TAB_STUDY_FILES = gql`
query fileOverview(
  $case_ids: [String],
  $file_level: [String] = ["study"],
  $biobank: [String],
  $breed: [String],
  $diagnosis: [String],
  $disease_site: [String],
  $file_association: [String],
  $file_format: [String],
  $file_type: [String],
  $neutered_status: [String],
  $program: [String],
  $response_to_treatment: [String],
  $sample_pathology: [String],
  $sample_site: [String],
  $sample_type: [String],
  $sex: [String],
  $stage_of_disease: [String],
  $study: [String],
  $study_participation: [String],
  $study_type: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by:String ="file_name"){
    fileOverview(
      case_ids: $case_ids,
      biobank: $biobank,
      breed: $breed,
      diagnosis: $diagnosis,
      disease_site: $disease_site,
      file_association: $file_association,
      file_format: $file_format,
      file_type: $file_type,
      neutered_status: $neutered_status,
      program: $program,
      response_to_treatment: $response_to_treatment,
      sample_pathology: $sample_pathology,
      sample_site: $sample_site,
      sample_type: $sample_type,
      sex: $sex,
      stage_of_disease: $stage_of_disease,
      study: $study,
      study_participation: $study_participation,
      study_type: $study_type,
      file_level: $file_level,
      offset: $offset,
      first: $first,
      order_by: $order_by) {
      file_name
      file_type
      sample_id
      association
      file_description
      file_format
      file_size
      case_id
      breed
      diagnosis
      study_code
      file_uuid
      sample_site
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      summarized_sample_type
      specific_sample_pathology
      date_of_sample_collection
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      comment
      individual_id
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
      other_cases
    }
  }
`;

// extended metadata attributes for file download
const customFilesTabOptionalDataFields = {
  keysToInclude: [
    'sample_site',
    'physical_sample_type',
    'general_sample_pathology',
    'tumor_sample_origin',
    'summarized_sample_type',
    'specific_sample_pathology',
    'date_of_sample_collection',
    'tumor_grade',
    'sample_chronology',
    'percentage_tumor',
    'necropsy_sample',
    'sample_preservation',
    'comment',
    'individual_id',
    'patient_age_at_enrollment',
    'sex',
    'neutered_indicator',
    'weight',
    'primary_disease_site',
    'stage_of_disease',
    'date_of_diagnosis',
    'histology_cytopathology',
    'histological_grade',
    'best_response',
    'pathology_report',
    'treatment_data',
    'follow_up_data',
    'concurrent_disease',
    'concurrent_disease_type',
    'cohort_description',
    'arm',
    'other_cases',
  ],
  header: [
    'Sample Site',
    'Physical Sample Type',
    'General Sample Pathology',
    'Tumor Sample Origin',
    'Sample Type',
    'Pathology/Morphology',
    'Sample Collection Date',
    'Tumor Grade',
    'Sample Chronology',
    'Percentage Tumor',
    'Necropsy Sample',
    'Sample Preservation',
    'Sample Comments',
    'Canine ID',
    'Age',
    'Sex',
    'Neutered Status',
    'Weight (kg)',
    'Disease Site',
    'Stage of Disease',
    'Date of Diagnosis',
    'Histology/Cytopathology',
    'Histological Grade',
    'Response to Treatment',
    'Detailed Pathology Evaluation Available',
    'Treatment Data Available',
    'Follow Up Data Available',
    'Concurrent Disease(s)',
    'Concurrent Disease Specifics',
    'Cohort',
    'Arm',
    'Matching Cases',
  ],
};

const customFilesTabCoreDataFields = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'sample_id', 'case_id', 'file_uuid', 'breed', 'diagnosis', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'Format', 'Size', 'Sample ID', 'Case ID', 'File UUID', 'Breed', 'Diagnosis', 'Study Code'],
};

export const customFilesTabDownloadCSV = {
  keysToInclude: [
    ...customFilesTabCoreDataFields.keysToInclude,
    ...customFilesTabOptionalDataFields.keysToInclude,
  ],
  header: [
    ...customFilesTabCoreDataFields.header,
    ...customFilesTabOptionalDataFields.header,
  ],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'ICDC_Files_download',
};

const customStudyFilesTabCoreDataFields = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'Format', 'Size', 'Study Code'],
};

export const customStudyFilesTabDownloadCSV = {
  keysToInclude: [
    ...customStudyFilesTabCoreDataFields.keysToInclude,
  ],
  header: [
    ...customStudyFilesTabCoreDataFields.header,
  ],
  query: GET_FILES_TAB_STUDY_FILES,
  apiVariable: 'fileOverview',
  fileName: 'ICDC_Study_Files_download',
};

export const MY_CART = gql`
query filesInList($uuids: [String], $first: Int = 2000){
  filesInList(uuids: $uuids, first: $first){
      file_type
      file_name
      association
      file_description
      file_format
      file_size
      case_id
      individual_id
      breed
      diagnosis
      study_code
      file_uuid
      md5sum
      sample_site
      physical_sample_type
      general_sample_pathology
      tumor_sample_origin
      summarized_sample_type
      specific_sample_pathology
      date_of_sample_collection
      tumor_grade
      sample_chronology
      percentage_tumor
      necropsy_sample
      sample_preservation
      comment
      patient_age_at_enrollment
      sex
      neutered_indicator
      weight
      disease_term
      primary_disease_site
      stage_of_disease
      date_of_diagnosis
      histology_cytopathology
      histological_grade
      best_response
      pathology_report
      treatment_data
      follow_up_data
      concurrent_disease
      concurrent_disease_type
      cohort_description
      arm
      sample_id
      other_cases
 }
}`;

const customMyFilesOptionalDataFields = {
  keysToInclude: [
    'sample_site',
    'physical_sample_type',
    'general_sample_pathology',
    'tumor_sample_origin',
    'summarized_sample_type',
    'specific_sample_pathology',
    'date_of_sample_collection',
    'tumor_grade',
    'sample_chronology',
    'percentage_tumor',
    'necropsy_sample',
    'sample_preservation',
    'comment',
    'patient_age_at_enrollment',
    'sex',
    'neutered_indicator',
    'weight',
    'primary_disease_site',
    'stage_of_disease',
    'date_of_diagnosis',
    'histology_cytopathology',
    'histological_grade',
    'best_response',
    'pathology_report',
    'treatment_data',
    'follow_up_data',
    'concurrent_disease',
    'concurrent_disease_type',
    'cohort_description',
    'arm',
    'other_cases',
  ],
  header: [
    'Sample Site',
    'Physical Sample Type',
    'General Sample Pathology',
    'Tumor Sample Origin',
    'Sample Type',
    'Pathology/Morphology',
    'Sample Collection Date',
    'Tumor Grade',
    'Sample Chronology',
    'Percentage Tumor',
    'Necropsy Sample',
    'Sample Preservation',
    'Sample Comments',
    'Age',
    'Sex',
    'Neutered Status',
    'Weight (kg)',
    'Disease Site',
    'Stage of Disease',
    'Date of Diagnosis',
    'Histology/Cytopathology',
    'Histological Grade',
    'Response to Treatment',
    'Detailed Pathology Evaluation Available',
    'Treatment Data Available',
    'Follow Up Data Available',
    'Concurrent Disease(s)',
    'Concurrent Disease Specifics',
    'Cohort',
    'Arm',
    'Matching Cases',
  ],
};

const customMyFilesCoreDataFields = {
  keysToInclude: [
    'file_name',
    'file_type',
    'association',
    'file_description',
    'file_format',
    'file_size',
    'case_id',
    'file_uuid',
    'individual_id',
    'breed',
    'diagnosis',
    'study_code',
    'sample_id',
  ],
  header: [
    'File Name',
    'File Type',
    'Association',
    'Description',
    'Format',
    'Size',
    'Case ID',
    'File UUID',
    'Canine ID',
    'Breed',
    'Diagnosis',
    'Study Code',
    'Sample ID',
  ],
};

export const customMyFilesTabDownloadCSV = {
  keysToInclude: [
    ...customMyFilesCoreDataFields.keysToInclude,
    ...customMyFilesOptionalDataFields.keysToInclude,
  ],
  header: [
    ...customMyFilesCoreDataFields.header,
    ...customMyFilesOptionalDataFields.header,
  ],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'ICDC_My_Files_download',
};

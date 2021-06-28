import gql from 'graphql-tag';

export const GET_CASES_TAB = gql`
query subjectOverViewPaged($case_ids: [String], $first: Int = 10000000){
  caseOverviewPaged(case_ids: $case_ids, first: $first) {
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
  }
}
`;

export const customCasesTabDownloadCSV = {
  keysToInclude: ['case_id', 'study_code', 'study_type', 'breed', 'diagnosis', 'stage_of_disease', 'age', 'sex', 'neutered_status', 'weight', 'response_to_treatment', 'cohort'],
  header: ['Case ID', 'Study Code', 'Study Type', 'Breed', 'Diagnosis', 'Stage Of Disease', 'Age', 'Sex', 'Neutered Status', 'Weight (kg)', 'Response to Treatment', 'Cohort'],
  query: GET_CASES_TAB,
  apiVariable: 'caseOverviewPaged',
  fileName: 'ICDC_Cases_download',
};

export const GET_SAMPLES_TAB = gql`
query sampleOverview($sample_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
    sampleOverview(sample_ids: $sample_ids, offset: $offset,first: $first, order_by: $order_by) {
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
  }
  }
`;

export const customSamplesTabDownloadCSV = {
  keysToInclude: ['sample_id', 'case_id', 'breed', 'diagnosis', 'sample_site', 'sample_type', 'sample_pathology', 'tumor_grade', 'sample_chronology', 'percentage_tumor', 'necropsy_sample', 'sample_preservation'],
  header: ['Sample ID', 'Case ID', 'Breed', 'Diagnosis', 'Sample Site', 'Sample Type', 'Pathology/Morphology', 'Tumor Grade', 'Sample Chronology', 'Percentage Tumor', 'Necropsy Sample', 'Sample Preservation'],
  query: GET_SAMPLES_TAB,
  apiVariable: 'sampleOverview',
  fileName: 'ICDC_Samples_download',
};

export const GET_FILES_TAB = gql`
query fileOverview($file_uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="file_name"){
    fileOverview(file_uuids: $file_uuids, offset: $offset,first: $first, order_by: $order_by) {
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
    }
  }
`;

export const customFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'sample_id', 'case_id', 'breed', 'diagnosis', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Sample ID', 'Case ID', 'Breed', 'Diagnosis', 'Study Code'],
  query: GET_FILES_TAB,
  apiVariable: 'fileOverview',
  fileName: 'ICDC_Files_download',
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
      breed
      diagnosis
      study_code
      file_uuid
      md5sum
 }
}`;

export const customMyFilesTabDownloadCSV = {
  keysToInclude: ['file_name', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'case_id', 'breed', 'diagnosis', 'study_code'],
  header: ['File Name', 'File Type', 'Association', 'Description', 'File Format', 'Size', 'Case ID', 'Breed', 'Diagnosis', 'Study Code'],
  query: MY_CART,
  apiVariable: 'filesInList',
  fileName: 'ICDC_My_Files_download',
};

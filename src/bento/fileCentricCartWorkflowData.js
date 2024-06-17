import gql from 'graphql-tag';
import {
  cellTypes,
  dataFormatTypes,
  types,
} from '../bento-core';
import { customMyFilesTabDownloadCSV } from './tableDownloadCSV';

export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};

// --------------- Icons configuration --------------
// Ideal size for externalLinkIcon is 16x16 px

export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/ExternalLink.svg',
  alt: 'External link icon',
};

export const myFilesPageData = {
  mainTitle: 'My Files',
  subTitle: '',
  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-MyCases.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  manifestFileName: 'ICDC File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  tooltipAlt: 'tooltip icon',
  downloadBtnTooltipMessage: 'To access and analyze files: select and remove unwanted files,  click the “Download File Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  userCommentsTooltipMessage: 'If you wish to annotate the file manifest with comments regarding the files included, enter them here. Comments will be saved as part of the file manifest.',
  textareaPlaceholder: 'User Comments',
  errorMessage: 'An error has occurred in loading CART',
  popUpWindow: {
    showNumberOfFileBeRemoved: true,
    messagePart1: 'Remove ',
    messagePart2: 'All files (',
    messagePart3: ') ',
    messagePart4: 'From Cart',
    okButtonText: 'Ok',
    cancelButtonText: 'Cancel',
  },
};

export const manifestData = [
  { field: 'file_name', title: 'name' },
  { field: 'drs_uri', title: 'drs_uri' },
  { field: 'study_code', title: 'study_code' },
  { field: 'case_id', title: 'case_id' },
  { field: 'file_type', title: 'File Type' },
  { field: 'association', title: 'Association' },
  { field: 'file_description', title: 'Description' },
  { field: 'file_format', title: 'Format' },
  { field: 'file_size', title: 'Size' },
  { field: 'file_uuid', title: 'File ID' },
  { field: 'individual_id', title: 'Canine ID' },
  { field: 'breed', title: 'Breed' },
  { field: 'diagnosis', title: 'Diagnosis' },
  { field: 'sample_id', title: 'Sample ID' },
  { field: 'sample_site', title: 'Sample Site' },
  { field: 'physical_sample_type', title: 'Physical Sample Type' },
  { field: 'general_sample_pathology', title: 'General Sample Pathology' },
  { field: 'tumor_sample_origin', title: 'Tumor Sample Origin' },
  { field: 'summarized_sample_type', title: 'Sample Type' },
  { field: 'specific_sample_pathology', title: 'Pathology/Morphology' },
  { field: 'date_of_sample_collection', title: 'Sample Collection Date' },
  { field: 'tumor_grade', title: 'Tumor Grade' },
  { field: 'sample_chronology', title: 'Sample Chronology' },
  { field: 'percentage_tumor', title: 'Percentage Tumor' },
  { field: 'necropsy_sample', title: 'Necropsy Sample' },
  { field: 'sample_preservation', title: 'Sample Preservation' },
  { field: 'comment', title: 'Sample Comments' },
  { field: 'patient_age_at_enrollment', title: 'Age' },
  { field: 'sex', title: 'Sex' },
  { field: 'neutered_indicator', title: 'Neutered Status' },
  { field: 'weight', title: 'Weight(Kg)' },
  { field: 'primary_disease_site', title: 'Disease Site' },
  { field: 'stage_of_disease ', title: 'Stage of Disease' },
  { field: 'date_of_diagnosis', title: 'Date of Diagnosis' },
  { field: 'histology_cytopathology', title: 'Histology/Cytopathology' },
  { field: 'histological_grade', title: 'Histological Grade' },
  { field: 'best_response', title: 'Response to Treatment' },
  { field: 'pathology_report', title: 'Detailed Pathology Evaluation Available' },
  { field: 'treatment_data', title: 'Treatment Data Available' },
  { field: 'follow_up_data', title: 'Follow Data Available' },
  { field: 'concurrent_disease', title: 'Concurrent Disease(s)' },
  { field: 'concurrent_disease_type', title: 'Concurrent Disease Specific(s)' },
  { field: 'cohort_description', title: 'Cohort' },
  { field: 'arm', title: 'Arm' },
  { field: 'other_cases', title: 'Matching Cases' },
  { field: 'user_comments', title: 'User Comments' },

];

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  filesInList(uuids: $uuids, offset: $offset,first: $first, order_by: $order_by){
    file_name
    drs_uri
    study_code
    case_id
    file_type
    association
    file_description
    file_format
    file_size
    case_id
    file_uuid
    individual_id
    breed
    diagnosis
    study_code
    sample_id
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
    weight_unit
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
    arm
    other_cases
    cohort_description
 }
}`;

// --------------- GraphQL query - Retrieve selected files info Desc --------------
export const GET_MY_CART_DATA_QUERY_DESC = gql`
query filesInListDesc($uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  filesInListDesc(uuids: $uuids, offset: $offset,first: $first, order_by: $order_by){
    file_name
    drs_uri
    study_code
    case_id
    file_type
    association
    file_description
    file_format
    file_size
    case_id
    file_uuid
    individual_id
    breed
    diagnosis
    study_code
    sample_id
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
    weight_unit
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
    arm
    other_cases
    cohort_description
 }
}`;

export const GET_STORE_MANIFEST_DATA_QUERY = gql`
  query filesInList($uuids: [String]){
    filesInList(uuids: $uuids){
      file_name
      file_type
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
      sample_id
      individual_id
      name
      drs_uri
    }
  }`;

export const myFileViewFlag = true;
// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  selectableRows: true,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  paginationAPIFieldDesc: 'filesInListDesc',
  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
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
        toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
        fileSizeColumn: 'file_size',
        fileFormatColumn: 'file_format',
        fileLocationColumn: 'file_uuid',
        caseIdColumn: 'file_name',
        iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
        iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
      },
    },
    {
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
    },
    {
      dataField: 'association',
      header: 'Association',
    },
    {
      dataField: 'file_description',
      header: 'Description',
    },
    {
      dataField: 'sample_id',
      header: 'Sample ID',
    },
    {
      dataField: 'case_id',
      header: 'Case ID',
      viewColumns: false,
    },
    {
      dataField: 'individual_id',
      header: 'Canine ID',
    },
    {
      dataField: 'study_code',
      header: 'Study Code',
    },
    {
      dataField: 'file_uuid',
      header: 'UUID',
      display: false,
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
    },
  ],
};

export const cartTable = {
  dataField: 'filesInList',
  title: 'myFiles',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  dataKey: 'file_name',
  selectableRows: true,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  paginationAPIFieldDesc: 'filesInListDesc',
  Jbrowse: true,
  api: GET_MY_CART_DATA_QUERY,
  extendedViewConfig: {
    pagination: true,
    download: {
      customDownload: true,
      fileName: 'ICDC_My_Files_download',
      downloadCsv: 'Download table contents as CSV',
      ...customMyFilesTabDownloadCSV,
    },
    manageViewColumns: {
      title: 'View columns',
    },
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
      header: 'Checkbox',
    },
    {
      dataField: 'file_name',
      header: 'File Name',
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      display: true,
    },
    {
      dataField: 'access_file',
      header: 'Access',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
      documentDownloadProps: {
        maxFileSize: 12000000,
        toolTipTextFileDownload: 'Download a copy of this file',
        toolTipTextFilePreview: 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
        fileSizeColumn: 'file_size',
        fileFormatColumn: 'file_format',
        fileLocationColumn: 'file_uuid',
        caseIdColumn: 'file_name',
        iconFilePreview: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadCloud.svg',
        iconFileDownload: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/DocumentDownloadPDF.svg',
        iconFileViewer: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DocumentDownloadBAM.svg',
      },
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },

    {
      dataField: 'file_type',
      header: 'File Type',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_format',
      header: 'Format',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      display: true,
      dataFormatType: dataFormatTypes.FORMAT_BYTES,
      cellType: cellTypes.FORMAT_DATA,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'association',
      header: 'Association',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'file_description',
      header: 'Description',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'sample_id',
      header: 'Sample ID',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'case_id',
      header: 'Case ID',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'individual_id',
      header: 'Canine ID',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'study_code',
      header: 'Study Code',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'file_uuid',
      header: 'UUID',
      display: false,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'md5sum',
      header: 'Md5Sum',
      display: false,
      tooltipText: 'sort',
    },
    {
      cellType: cellTypes.DELETE,
      header: 'Remove',
      headerType: cellTypes.DELETE,
      display: true,
      role: cellTypes.DISPLAY,
    },
  ],
  tableMsg: {
    noMatch: 'No files have been added to the cart',
  },
};

const jBrowseBtn = {
  type: types.CUSTOM_ELEM,
  Jbrowse: true,
};

export const tableLayOut = [
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_button',
    items: [
      jBrowseBtn,
    ],
  },
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

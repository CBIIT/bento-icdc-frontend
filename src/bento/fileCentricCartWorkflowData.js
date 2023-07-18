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

export const manifestData = {
  keysToInclude: ['file_name', 'drs_uri', 'study_code', 'case_id', 'file_type', 'association', 'file_description', 'file_format', 'file_size', 'case_id', 'file_uuid', 'individual_id', 'breed', 'diagnosis', 'study_code', 'sample-id', 'sample_site', 'physical_sample_type', 'general_sample_pathology', 'tumor_sample_origin', 'summarized_sample_type', 'specific_sample_pathology', 'date_of_sample_collection', 'tumor_grade', 'sample_chronology', 'percentage_tumor', 'necropsy_sample', 'sample_preservation', 'comment', 'patient_age_at_enrollment', 'sex', 'neutered_indicator', 'weight', 'primary_disease_site', 'stage_of_disease', 'date_of_diagnosis', 'histology_cytopathology', 'histological_grade', 'best_response', 'pathology_report', 'treatment_data', 'follow_up_data', 'concurrent_disease', 'concurrent_disease_type', 'cohort_description', 'arm', 'other_cases'],
  header: ['name', 'drs_uri', 'study_code', 'case_id', 'File Type', 'Association', 'Description', 'Format', 'Size', 'Case ID', 'File UUID', 'Canine ID', 'Breed', 'Diagnosis', 'Study Code', 'Sample ID', 'Sample Site', 'Physical Sample Type', 'General Sample Pathology', 'Tumor Sample Origin', 'Sample Type', 'Pathology/Morphology', ' Sample Collection Date', 'Tumor Grade', 'Sample Chronology', 'Percentage Tumor', 'Necropsy Sample', 'Sample Preservation', 'Sample Comments', 'Age', 'Sex', 'Neutered Status', 'Weight(kg)', 'Disease Site', 'Stage of Disease', 'Date of Diagnosis', 'Histology/Cytopathology', 'Histological Grade', 'Response to Treatment', 'Detailed Pathology Evaluation Available', 'Treatment Data Available', 'Follow up Data Available', 'Concurrent Disease(s)', 'Concurrent Disease Specifics', 'Cohort', 'Arm', 'Matching Cases', 'User Comments'],
};

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
    download: {
      customDownload: true,
      downloadCsv: 'Download Table Contents As CSV',
      ...customMyFilesTabDownloadCSV,
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
      header: 'Checkbox',
      dataField: 'checkbox',
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
      dataField: 'file_format',
      header: 'Format',
      display: true,
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
      dataField: 'Remove',
      header: 'Remove',
      headerType: cellTypes.DELETE,
      display: true,
      role: cellTypes.DISPLAY,
    },
  ],
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },
};

const jBrowseBtn = {
  type: types.CUSTOM_ELEM,
  Jbrowse: true,
};

export const tableLayOut = [
  {
    container: 'outer_layout',
    size: 'xl',
    clsName: 'container_outer_layout',
    items: [
      {
        clsName: 'cart_icon',
        type: types.ICON,
        src: myFilesPageData.headerIconSrc,
        alt: myFilesPageData.headerIconAlt,
      },
      {
        clsName: 'cart_header_text',
        text: 'My Files',
        type: types.TEXT,
      },
    ],
  },
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
  {
    container: 'buttons',
    size: 'xl',
    clsName: 'container_footer',
    items: [
      jBrowseBtn,
    ],
  },
];

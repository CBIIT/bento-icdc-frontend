import gql from 'graphql-tag';
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
  keysToInclude: ['study_code', 'case_id', 'file_name', 'file_uuid', 'md5sum'],
  header: ['Study Code', 'Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments'],
};

// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  selectableRows: true,
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  paginationAPIFieldDesc: 'filesInListDesc',
  tableDownloadCSV: customMyFilesTabDownloadCSV,
  viewColumns: true,

  columns: [
    {
      dataField: 'file_name',
      header: 'File Name',
    },
    {
      dataField: 'file_type',
      header: 'File Type',
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
      dataField: 'file_format',
      header: 'Format',
    },
    {
      dataField: 'file_size',
      header: 'Size',
      // set formatBytes to true to display file size (in bytes) in a more human readable format
      formatBytes: true,
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

// --------------- GraphQL query - Retrieve selected cases info --------------
export const GET_MY_CART_DATA_QUERY = gql`
query filesInList($uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  filesInList(uuids: $uuids, offset: $offset,first: $first, order_by: $order_by){
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
      md5sum
      individual_id
 }
}`;

// --------------- GraphQL query - Retrieve selected files info Desc --------------
export const GET_MY_CART_DATA_QUERY_DESC = gql`
query filesInListDesc($uuids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String =""){
  filesInListDesc(uuids: $uuids, offset: $offset,first: $first, order_by: $order_by){
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
      md5sum
      individual_id
 }
}`;

import gql from 'graphql-tag';

export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};

// --------------- Icons configuration --------------
// Ideal size for externalLinkIcon is 16x16 px

export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/cart/ExternalLink.svg',
  alt: 'External link icon',
};

export const myFilesPageData = {
  mainTitle: 'My Files',
  subTitle: '',
  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-MyCases.svg',
  headerIconAlt: 'Bento MyFiles header logo',
  manifestFileName: 'BENTO File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  tooltipAlt: 'tooltip icon',
  tooltipMessage: 'To access and analyze files: select and remove unwanted files,  click the “Download Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  textareaPlaceholder: 'Please add a description for the XML file you are about to download.',
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
  keysToInclude: ['study_code', 'subject_id', 'file_name', 'file_id', 'md5sum'],
  header: ['Study Code', 'Case ID', 'File Name', 'File ID', 'Md5sum', 'User Comments'],
};

// --------------- File table configuration --------------

export const table = {
  dataField: 'filesInList',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'file_name',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',

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
      dataField: 'case_id',
      header: 'Case ID',
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
query filesInList($uuids: [String]){
  filesInList(uuids: $uuids){
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
 }
}`;

// --------------- GraphQL query - Retrieve selected files info Desc --------------
export const GET_MY_CART_DATA_QUERY_DESC = gql`
query filesInListDesc($file_ids: [String], $offset: Int = 0, $first: Int = 10, $order_by:String ="") {
  filesInListDesc(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
        study_code
        subject_id
        file_name
        file_type
        association
        file_description
        file_format
        file_size
        file_id
        md5sum
    }
}`;

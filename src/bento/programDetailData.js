import gql from 'graphql-tag';
import {
  cellTypes,
  headerTypes,
} from '../bento-core';

// --------------- Left Pannel configuration --------------
// A maximum of 6 leftPanelattributes are allowed
const pageData = {
  headerIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-Programs.svg',
  embargoFileIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-Embargo-File.svg',
  pendingFileIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/PendingRelease-icons.Studies-Listing.svg',
};

// --------------- Table configuration --------------
const table = {
  display: true,
  name: 'ICDC_Program_Studies',
  download: true,
  viewColumns: true,
  title: 'STUDIES IN THIS PROGRAM',
  selectableRows: false,
  legendTooltip: true,
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_Program_Studies_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  defaultSortField: 'clinical_study_designation',
  defaultSortDirection: 'asc',
  columns: [
    {
      dataField: 'program_id',
      header: 'Program',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'clinical_study_designation',
      header: 'Study Code',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
      linkAttr: {
        rootPath: '/study',
        pathParams: ['clinical_study_designation'],
      },
      tooltipText: 'sort',
    },
    {
      dataField: 'clinical_study_name',
      header: 'Study Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'numberOfCaseFiles',
      header: 'Case File(s)',
      display: true,
      columnDefaultValues: {
        0: 'Not Applicable',
      },
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      headerType: headerTypes.CUSTOM_ELEM,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
      tooltipText: 'sort',
    },
    {
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      columnDefaultValues: {
        0: 'Not Applicable',
      },
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      headerType: headerTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    },
    {
      dataField: 'numberOfImageCollections',
      header: 'Image Collection(s)',
      display: true,
      columnDefaultValues: {
        0: 'Not Applicable',
      },
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      headerType: headerTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
    },
    {
      dataField: 'numberOfPublications',
      header: 'Publication(s)',
      display: true,
      columnDefaultValues: {
        0: 'Not Applicable',
      },
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      headerType: headerTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-Publications.svg',
    },
    {
      dataField: 'CRDCLinks',
      header: 'Additional CRDC Nodes',
      display: true,
      columnDefaultValues: {
        0: 'Not Applicable',
      },
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      headerType: headerTypes.CUSTOM_ELEM,
      tooltipText: 'sort',
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-CRDCnodes.svg',
    },
    {
      dataField: 'clinical_study_type',
      header: 'Study Type',
      role: cellTypes.DISPLAY,
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'accession_id',
      header: 'Accession ID',
      display: true,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'study_disposition',
      header: 'Study Disposition',
      display: false,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
    {
      dataField: 'numberOfCases',
      header: 'Cases',
      link: '/explore',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
      role: cellTypes.DISPLAY,
      tooltipText: 'sort',
    },
  ],
  columnGroups: [
    {
      clsName: 'other_columns',
      columnIndexes: [0, 2],
    },
    {
      clsName: 'data_availability',
      custom: true,
      columnIndexes: [3, 7],
    },
    {
      clsName: 'other_columns',
      columnIndexes: [8, 10],
    },
  ],
  tableMsg: {
    noMatch: 'Sorry, no matching records found',
  },
};

export const tableLayOut = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

const textLabels = {
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

// --------------- GraphQL query - Retrieve program details --------------
const GET_PROGRAM_DETAIL_DATA_QUERY = gql`
query program($programTitle: String!) {
  sampleCountOfProgram(program_id: $programTitle)
  fileCountOfProgram(program_id: $programTitle)
  studyFileCountOfProgram(program_id: $programTitle)
  aliquotCountOfProgram(program_id: $programTitle)
  studyCountOfProgram(program_id: $programTitle)
  caseCountOfProgram(program_id: $programTitle)
  volumeOfDataOfProgram(program_id: $programTitle)
  
  
  program(program_acronym: $programTitle)
  { 
    program_name
    program_acronym
    program_short_description
    program_full_description
    program_external_url
    program_sort_order
    }
    studiesByProgramId(program_id: $programTitle)
    { 
      program_id
      clinical_study_id
      clinical_study_designation
      clinical_study_name
      clinical_study_description
      clinical_study_type
      numberOfCases
      numberOfCaseFiles
      numberOfStudyFiles
      numberOfImageCollections
      numberOfPublications
      accession_id
      study_disposition
      numberOfCRDCNodes
      CRDCLinks {
        text
        url
      }
    }
}`;

export {
  pageData,
  GET_PROGRAM_DETAIL_DATA_QUERY,
  table,
  textLabels,
};

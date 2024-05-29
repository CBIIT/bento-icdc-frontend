import gql from 'graphql-tag';
import {
  cellTypes,
  headerTypes,
} from '../bento-core';

export const tableLayOut = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

export const pageData = {
  embargoFileIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Icon-Embargo-File.svg',
  studyListingIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-StudiesDetail.svg',
    alt: 'ICDC Studies detail header logo',
  },
  externalLinkIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
    alt: 'External link icon',
  },
  table: {
    numbOfRowPerPage: 25,
    // Table title
    title: 'Studies',
    // Field name for table data, need to be updated only when using a different GraphQL query
    dataField: 'studiesByProgram',
    // toggle D.A.L unified tooltip above D.A.L icons on table toolbar
    legendTooltip: true,
    defaultSortField: 'clinical_study_designation',
    defaultSortDirection: 'asc',
    extendedViewConfig: {
      download: {
        customDownload: false,
        // downloaded File Name
        downloadFileName: 'ICDC_Studies_download',
        downloadCsv: 'Download Table Contents As CSV',
      },
      manageViewColumns: {
        title: 'View Columns',
      },
    },
    columns: [
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
        dataField: 'program_id',
        header: 'Program',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/program',
          pathParams: ['program_id'],
        },
        role: cellTypes.DISPLAY,
        display: true,
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
        iconLabel: 'Number of Case Files',
        header: 'Case File(s)',
        display: true,
        columnDefaultValues: {
          0: 'Not Applicable',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        cellType: cellTypes.CUSTOM_ELEM,
        headerType: headerTypes.CUSTOM_ELEM,
        icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
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
        header: 'icon',
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
        clsName: 'other_columns_left',
        columnIndexes: [0, 2],
      },
      {
        clsName: 'data_availability',
        custom: true,
        columnIndexes: [3, 7],
      },
      {
        clsName: 'other_columns_right',
        columnIndexes: [8, 11],
      },
    ],
  },
};

export const textLabels = {
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

// --------------- GraphQL query - Retrieve program info --------------
export const GET_STUDY_DATA_QUERY = gql`{
    studiesByProgram {
        program_id
        clinical_study_designation
        clinical_study_name
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
  }
  `;

import gql from 'graphql-tag';

export const pageData = {
  externalLinkIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
    alt: 'External link icon',
  },
  tabIndex: [
    {
      id: 'case_tab',
      title: 'Cases',
      dataField: 'dataCase',
      count: 'numberOfSubjects',
    },
    {
      id: 'sample_tab',
      title: 'Samples',
      dataField: 'dataSample',
      count: 'numberOfSamples',
    },
    {
      id: 'file_tab',
      title: 'Files',
      dataField: 'dataFile',
      count: 'numberOfFiles',
    }],
  tabIndexStyle: [
    {
      title: 'Cases',
      primaryColor: '#D6F2EA',
      secondaryColor: '#FFDFB8',
      selectedColor: '#10A075',
    },
    {
      title: 'Samples',
      primaryColor: '#CFEDF9',
      secondaryColor: '#C9F1F1',
      selectedColor: '#0DAFEC',
    },
    {
      title: 'Files',
      primaryColor: '#F7D7F7',
      secondaryColor: '#86D6F0',
      selectedColor: '#C92EC7',
    },
  ],
  tabContainers: [{
    name: 'Cases',
    dataField: 'dataCase',
    api: 'GET_CASES_OVERVIEW_QUERY',
    paginationAPIField: 'subjectOverViewPaged',
    paginationAPIFieldDesc: 'subjectOverViewPagedDesc',
    count: 'numberOfSubjects',
    dataKey: 'subject_id',
    defaultSortField: 'subject_id',
    defaultSortDirection: 'asc',
    buttonText: 'Add Selected Files',
    columns: [
      {
        dataField: 'subject_id',
        header: 'Case ID',
        sort: 'asc',
        link: '/case/{subject_id}',
        primary: true,
        display: true,
      }],
    tooltip: {
      icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
      alt: 'tooltipIcon',
      text: 'Click button to add selected files associated with the selected case(s).',
    },
    id: 'file_tab',
    onRowsSelect: 'type2',
    disableRowSelection: 'type3',
    tableID: 'file_tab_table',
    selectableRows: true,
    tabIndex: '2',
    downloadFileName: 'Bento_Dashboard_cases_download',
    headerPagination: true,
    footerPagination: true,
  }],
};

// GraphQL query to retrieve detailed info for a case
export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
  }
`;

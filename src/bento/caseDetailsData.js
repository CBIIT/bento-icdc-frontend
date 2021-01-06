import gql from 'graphql-tag';

export const pageData = {
  tooltipContent: {
    src: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
    alt: 'tooltipIcon',
  },
  externalLinkIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/program/externalLinkIcon.svg',
    alt: 'External link icon',
  },
  header: {
    label: 'Case ID',
    dataField: 'subject_id',
  },
  leftPanel: [
    {
      header: 'Program',
      // sectionDesc: 'Subsection description goes here',
      properties: [
      // A maximum of 10 properties are allowed
        {
          label: 'Assigned to Program',
          dataField: 'program_acronym',
          // link property specify URL value should link to
          // space holder "{program_id}" will be replaced by actual value in the property program_id
          link: '/program/{program_id}',
        // labelLink property specify URL label should link to
        // labelLink: '/programs',
        // external links must have URL scheme part such as "https://"
        },
      ],
    },
  ],
  rightPanel: [],
  sampleTable: {
  // Set 'selectableRows' to true to show the row selection
    selectableRows: true,
    // A maximum of 10 columns are allowed
    columns: [
      {
        dataField: 'sample_id',
        header: 'Sample ID',
        sort: 'asc',
        primary: true,
        display: true,
      },
    ],
  },
  fileTable: {},
};
// --------------- GraphQL query configuration --------------

export const queryName = {
  dataRoot: 'subjectDetail',
  filesOfSamples: 'samplesForSubjectId',
};

// GraphQL query to retrieve detailed info for a case
export const GET_CASE_DETAIL_DATA_QUERY = gql`
  query subjectDetail($subject_id: String!) {
  }
`;

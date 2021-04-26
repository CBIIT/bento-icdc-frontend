import gql from 'graphql-tag';

const pageData = {
  headerTitle: 'Programs',
  headerIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-Programs.svg',
  externalIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Program-ExternalLink.svg',
  COP: {
    prgramName: 'COP',
    primaryImage: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/programCards/cop/Program_Image.COP.png',
    primaryImageAlt: 'The Center for Cancer Research (CCR) is the largest division of the NCI intramural research program and comprises nearly 250 basic and clinical research groups located on two campuses outside of Washington, DC.',
    secondaryImage: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/programCards/cop/copSecondary.jpg',
  },
};

// --------------- GraphQL query - Retrieve program info --------------
const GET_PROGRAMS_DATA_QUERY = gql`{
  program(orderBy: program_sort_order_asc)
  {
    program_name
    program_acronym
    program_full_description
    program_short_description
    program_sort_order
    program_external_url
    studies
    {
      clinical_study_designation
    }
  }
}
 `;

export {
  pageData,
  GET_PROGRAMS_DATA_QUERY,
};

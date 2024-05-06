import gql from 'graphql-tag';
import client from '../utils/graphqlClient';

export const mapObjectKey = {
  program: 'program',
  study: 'study',
  case: 'case',
  sample: 'sample',
  file: 'file',
  about: 'about',
  model: 'model',
  node: 'model',
  property: 'model',
  value: 'model',
};

export const programs = [
  {
    type: 'program',
    program_id: 'COP',
    program_acronym: 'COP',
    program_external_url: 'https://ccr.cancer.gov/Comparative-Oncology-Program',
    program_name: 'Comparative Oncology Program',
    program_short_description: 'The COP is a core resource for CCR investigators.',
  },
  {
    type: 'program',
    program_id: 'PRECINCT',
    program_acronym: 'PRECINCT',
    program_external_url: 'https://www.precinctnetwork.org/',
    program_name: 'Pre­medical Cancer Immunotherapy Network for Canine Trials',
    program_short_description: 'The Pre-medical Cancer Immunotherapy Network for Canine Trials (PRECINCT) facilitates the performance',
  },
  {
    type: 'program',
    program_id: 'CMCP',
    program_acronym: 'CMCP',
    program_external_url: 'https://www.precinctnetwork.org/',
    program_name: 'Comparative Molecular Characterization Program',
    program_short_description: 'The Comparative Molecular Characterization Program serves as an umbrella program under which studies lacking any pre-designated',
  },
];

export const studies = [
  {
    type: 'study',
    clinical_study_designation: 'COTC007B',
    accession_id: '000001',
    clinical_study_name: 'Preclinical Comparison of Three Indenoisoquinoline Candidates in Tumor-Bearing Dogs',
    clinical_study_type: 'Clinical Trial',
    program_id: 'COP',
    program_name: 'Comparative Oncology Program',
  },
  {
    type: 'study',
    clinical_study_designation: 'COTC021',
    accession_id: '000017',
    clinical_study_name: 'Evaluation of Orally Administered mTOR inhibitor Rapamycin in Dogs in the Adjuvant Setting with Osteosarcoma',
    clinical_study_type: 'Clinical Trial',
    program_id: 'COP',
    program_name: 'Comparative Oncology Program',
  },
  {
    type: 'study',
    clinical_study_designation: 'GLIOMA01',
    accession_id: '000003',
    clinical_study_name: 'Comparative Molecular Life History of Spontaneous Canine and Human Gliomas',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
    program_name: 'Comparative Molecular Characterization Program',
  },
  {
    type: 'study',
    clinical_study_designation: 'MGT01',
    accession_id: '000007',
    clinical_study_name: 'Molecular Homology and Differences Between Spontaneous Canine Mammary Cancer and Human Breast Cancer',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
    program_name: 'Comparative Molecular Characterization Program',
  },
  {
    type: 'study',
    clinical_study_designation: 'OSA01',
    accession_id: '000006',
    clinical_study_name: 'A Multi-Platform Sequencing Analysis of Canine Appendicular Osteosarcoma.',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
    program_name: 'Comparative Molecular Characterization Program',
  },
  {
    type: 'study',
    clinical_study_designation: 'OSA03',
    accession_id: '000016',
    clinical_study_name: 'Comparative analysis using whole genome bisulfite sequencing of human and canine osteosarcoma',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
    program_name: 'Comparative Molecular Characterization Program',
  },
];

export const cases = [
  {
    type: 'case',
    case_id: 'MGT01-406434',
    program_name: 'Comparative Oncology Program',
    clinical_study_designation: 'MGT01',
    disease_term: 'Mammary Cancer',
    breed: 'Shih Tzu',
  },
  {
    type: 'case',
    case_id: 'MGT01-402421',
    program_name: 'Comparative Oncology Program',
    clinical_study_designation: 'MGT01',
    disease_term: 'Mammary Cancer',
    breed: 'Shih Tzu',
  },
  {
    type: 'case',
    case_id: 'COTC007B-0201',
    program_name: 'Comparative Oncology Program',
    clinical_study_designation: 'COTC007B',
    disease_term: 'Lymphoma',
    breed: 'Samoyed',
  },
];

export const samples = [
  {
    type: 'sample',
    sample_id: 'GLIOMA01-i_03A6-T1-A1-J02',
    program_name: 'Comparative Oncology Program',
    clinical_study_designation: 'GLIOMA01',
    case_id: 'GLIOMA01-i_03A6',
    sample_site: 'Hemispheric',
    physical_sample_type: 'Primary Malignant Tumor Tissue',
    general_sample_pathology: 'Oligodendroglioma',
  },
  {
    type: 'sample',
    sample_id: 'UC01-UD-113',
    program_name: 'CMCP',
    clinical_study_designation: 'UC01',
    case_id: 'UC01-UD-113',
    sample_site: 'Hemispheric',
    physical_sample_type: 'Primary Malignant Tumor Tissue',
    general_sample_pathology: 'Oligodendroglioma',
  },
];

export const files = [
  {
    type: 'file',
    file_name: '010015_0103_sorted.bam',
    file_type: 'RNA Sequence File',
    program_name: 'COP',
    clinical_study_designation: 'NCATS-COP01',
    case_id: 'NCATS-COP01-CCB010015',
    sample_id: 'NCATS-COP01-CCB010015 0103',
  },
];

const counts = {
  model_count: 2,
  about_count: 4,
  program_count: 6,
  study_count: 2,
  subject_count: 4,
  sample_count: 3,
  file_count: 6,
};

export const mockHeaderSuggestion = {
  programs,
  studies,
  cases: [],
  samples: [],
  files: [],
};

export const STUDIES_PROGRAM = gql`
  {
    studiesByProgram {
      program_id
      clinical_study_designation
    }
  }
`;

export const SEARCH_PUBLIC = gql`
    query globalSearch($input: String) {
        globalSearch(input: $input) {
          programs {
            program_acronym
          }
          studies {
            clinical_study_designation
          }
          cases {
            case_id
          }
          samples {
            sample_id
          }
          files {
            file_name
          }
          model {
            node_name
          }
        }
    }
`;

export const SEARCH_PAGE_RESULTS = gql`
    query globalSearch($input: String){
        globalSearch(
            input: $input
        ) {
            program_count
            study_count
            case_count
            sample_count
            file_count
            model_count
            about_count
        }
    }
`;

export const SEARCH_PAGE_RESULT_CASES = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
            cases {
                type
                case_id
                program_name
                clinical_study_designation
                disease_term
                breed
            }
        }
    }
`;

export const SEARCH_PAGE_RESULT_SAMPLES = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          samples {
            type
            case_id
            sample_id
            program_name
            clinical_study_designation
            sample_site
            general_sample_pathology
            physical_sample_type
          }
        }
    }
`;

export const SEARCH_PAGE_RESULT_FILES = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          files {
            type
            file_name
            file_type
            case_id
            sample_id
            program_name
            clinical_study_designation
          }
      }
    }
`;

export const SEARCH_PAGE_RESULT_PROGRAM = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          programs {
            type
            program_acronym
            program_external_url
            program_name
            program_short_description
        }
      }
    }
`;

export const SEARCH_PAGE_RESULT_STUDIES = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          studies {
            type
            clinical_study_designation
            clinical_study_name
            clinical_study_type
            accession_id
        }
      }
    }
`;

export const SEARCH_PAGE_RESULT_MODEL = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          model {
            type
            highlight
            node_name
            property_name
            property_description
            property_required
            property_type
        }
      }
    }
`;

export const SEARCH_PAGE_RESULT_ABOUT = gql`
    query globalSearch($input: String, $first: Int, $offset: Int){
        globalSearch(
            input: $input
            first: $first
            offset: $offset
        ) {
          about_page { 
            type
            page
            title
            text
        }
      }
    }
`;

/**
* Maps a datafield to the correct search query
*
* @param {string} field datatable field name
* @param {boolean} isPublic whether the search is public or not
*/
export function getResultQueryByField(field) {
  switch (field) {
    case 'all':
      return SEARCH_PAGE_RESULT_CASES;
    case 'cases':
      return SEARCH_PAGE_RESULT_CASES;
    case 'samples':
      return SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return SEARCH_PAGE_RESULT_FILES;
    case 'programs':
      return SEARCH_PAGE_RESULT_PROGRAM;
    case 'studies':
      return SEARCH_PAGE_RESULT_STUDIES;
    case 'model':
      return SEARCH_PAGE_RESULT_MODEL;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT;
    default:
      return SEARCH_PAGE_RESULT_CASES;
  }
}

/**
 * Query the backend API for the search result counts by search string
 *
 * @param {string} inputValue search text
 * @param {boolean} isPublic whether to use the public service or not
 */
export async function queryCountAPI(inputValue) {
  const data = await client.query({
    query: SEARCH_PAGE_RESULTS,
    variables: {
      input: inputValue,
    },
  })
    .then((result) => result.data.globalSearch)
    .catch(() => {});
  return data;
}

/**
 * Query the backend API for the search results by datafield
 *
 * @param {string} datafield
 * @param {object} input search query variable input
 * @param {boolean} isPublic is the search public or private
 */
export async function queryResultAPI(datafield, input) {
  const data = await client.query({
    query: getResultQueryByField(datafield),
    variables: input,
    context: {
      clientName: '',
    },
  })
    .then((result) => result.data.globalSearch)
    .catch(() => []);
  if (data[datafield]?.length > 0) {
    const updateDataType = data[datafield]
      .map((item) => ({ ...item, input, type: mapObjectKey[item.type] }));
    return updateDataType;
  }
  return data[datafield] || [];
}

/**
 * Query the backend API for autocomplete results
 *
 * @param {object} inputValue search text
 * @param {boolean} isPublic is the search public or private
 */
export async function queryAutocompleteAPI(inputValue) {
  const data = await client.query({
    query: SEARCH_PUBLIC,
    variables: {
      input: inputValue,
    },
  })
    .then((result) => result.data.globalSearch)
    .catch(() => []);
  return data;
}

export const aboutMock = [{
  type: 'about',
  title: 'Purpose',
  page: '/purpose',
  text: [
    'Bento\'s reference implementation contains a data $model$ that is compatible with the Cancer Research Data',
    'Commons Harmonized $model$ (CRDC-H) such that Bento instances can be connected into and inter-operate',
  ],
}];

export const modelModel = [{
  type: 'model',
  highlight: 'Number of passages (splits) between the original tissue and this model.',
  node_name: 'Program',
  property_name: 'passage_count',
  property_description: 'Number of passages (splits) between the original tissue and this model.',
  property_required: 'matching required, preferred or optional',
  property_type: 'matching properties or Enum',
}];

export const allResult = [
  ...studies,
  ...programs,
  ...cases,
  ...samples,
  ...files,
];

export const mockSearchData = {
  globalSearch: {
    programs,
    studies,
    cases,
    samples,
    files,
    counts,
  },
};

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
export const programListingIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/programIcon.svg',
  alt: 'Bento program logo',
};

export const searchKeys = ['programs', 'studies', 'cases', 'samples', 'files', 'model'];

export const searchFields = ['program_acronym', 'clinical_study_designation', 'case_id', 'sample_id', 'file_name', 'node_name'];

/** certain search data items */
/** used by the Global Search header autocomplete */
export const SEARCH_KEYS = {
  public: [],
  private: ['programs', 'studies', 'cases', 'samples', 'files'],
};

export const SEARCH_DATAFIELDS = {
  public: [],
  private: ['program_acronym', 'clinical_study_designation', 'case_id', 'sample_id', 'file_name'],
};

/** used by the Global Search page results */
export const SEARCH_PAGE_KEYS = {
  private: [...SEARCH_KEYS.private, 'model'],
  public: [],
};

export const SEARCH_PAGE_DATAFIELDS = {
  public: [],
  private: [...SEARCH_DATAFIELDS.private, 'node_name'],
};

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
  },
  {
    type: 'study',
    clinical_study_designation: 'COTC021',
    accession_id: '000017',
    clinical_study_name: 'Evaluation of Orally Administered mTOR inhibitor Rapamycin in Dogs in the Adjuvant Setting with Osteosarcoma',
    clinical_study_type: 'Clinical Trial',
    program_id: 'COP',
  },
  {
    type: 'study',
    clinical_study_designation: 'GLIOMA01',
    accession_id: '000003',
    clinical_study_name: 'Comparative Molecular Life History of Spontaneous Canine and Human Gliomas',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
  },
  {
    type: 'study',
    clinical_study_designation: 'MGT01',
    accession_id: '000007',
    clinical_study_name: 'Molecular Homology and Differences Between Spontaneous Canine Mammary Cancer and Human Breast Cancer',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
  },
  {
    type: 'study',
    clinical_study_designation: 'OSA01',
    accession_id: '000006',
    clinical_study_name: 'A Multi-Platform Sequencing Analysis of Canine Appendicular Osteosarcoma.',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
  },
  {
    type: 'study',
    clinical_study_designation: 'OSA03',
    accession_id: '000016',
    clinical_study_name: 'Comparative analysis using whole genome bisulfite sequencing of human and canine osteosarcoma',
    clinical_study_type: 'Genomics',
    program_id: 'CMCP',
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

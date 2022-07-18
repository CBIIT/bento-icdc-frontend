export const categories = ['Admistrative', 'Study', 'Clinical Trial', 'Case', 'Biospecimen', 'Clinical', 'Analysis', 'Data File'];

export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

export const DATA_MODEL_URL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model.yml';
export const DATA_MODEL_PROPS_URL = 'https://raw.githubusercontent.com/CBIIT/icdc-model-tool/master/model-desc/icdc-model-props.yml';

export const facetFilterSearchData = [
  {
    groupName: 'Category',
    datafield: 'category',
    section: 'Filter By Nodes',
    tooltip: 'category',
    show: true,
    checkboxItems: [
      { name: 'Administrative', isChecked: false, group: 'category' },
      { name: 'Analysis', isChecked: false, group: 'category' },
      { name: 'Biospecimen', isChecked: false, group: 'category' },
      { name: 'Case', isChecked: false, group: 'category' },
      { name: 'Clinical', isChecked: false, group: 'category' },
      { name: 'Clinical_Trial', isChecked: false, group: 'category' },
      { name: 'Data_File', isChecked: false, group: 'category' },
      { name: 'Study', isChecked: false, group: 'category' },
    ],
  },
  {
    groupName: 'Assignment',
    datafield: 'assignment',
    section: 'Filter By Nodes',
    tooltip: 'assignment',
    show: true,
    checkboxItems: [
      { name: 'Core', isChecked: false, group: 'assignment' },
      { name: 'Extended', isChecked: false, group: 'assignment' },
    ],
  },
  {
    groupName: 'Class',
    datafield: 'class',
    section: 'Filter By Nodes',
    tooltip: 'class',
    show: true,
    checkboxItems: [
      { name: 'Primary', isChecked: false, group: 'class' },
      { name: 'Secondary', isChecked: false, group: 'class' },
    ],
  },
  // {
  //   groupName: 'Multiplicity',
  //   datafield: 'multiplicity',
  //   section: 'Filter By Relationship',
  //   tooltip: 'multiplicity',
  //   show: true,
  //   checkboxItems: [
  //     { name: 'One_to_one', isChecked: false, group: 'multiplicity' },
  //     { name: 'One_to_many', isChecked: false, group: 'multiplicity' },
  //     { name: 'Many_to_one', isChecked: false, group: 'multiplicity' },
  //     { name: 'Many_to_many', isChecked: false, group: 'multiplicity' },
  //   ],
  // },
  {
    groupName: 'Inclusion',
    datafield: 'inclusion',
    section: 'Filter By Property',
    tooltip: 'inclusion',
    show: true,
    checkboxItems: [
      { name: 'Optional', isChecked: false, group: 'optional' },
      { name: 'Preferred', isChecked: false, group: 'preferred' },
      { name: 'Required', isChecked: false, group: 'required' },
    ],
  },
  {
    groupName: 'UI Display',
    datafield: 'uiDisplay',
    section: 'Filter By Property',
    tooltip: 'inclusion',
    show: true,
    checkboxItems: [
      { name: 'no', isChecked: false, group: 'uiDisplay' },
      { name: 'yes', isChecked: false, group: 'uiDisplay' },
    ],
  },
];

export const facetFilterSectionVariables = {
  'Filter By Nodes': {
    color: '#FF9742',
    checkBoxColorsOne: '#fdf1e8',
    checkBoxColorsTwo: '#fff9f5',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Relationship': {
    color: '#9DC1D9',
    checkBoxColorsOne: '#dafafb',
    checkBoxColorsTwo: '#eafafb',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Property': {
    color: '#667A87',
    checkBoxColorsOne: '#d4ddf7',
    checkBoxColorsTwo: '#e9eefb',
    height: '7px',
    isExpanded: true,
  },
};

export const filterResetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

export const baseFacetFilters = {
  category: [],
  assignment: [],
  class: [],
  multiplicity: [],
  inclusion: [],
  uiDisplay: [],
};

export const facetFilterSections = [
  'category',
  'assignment',
  'class',
  'inclusion',
  'uiDisplay',
];

export const facetFilterOptions = [
  // category
  'administrative',
  'case',
  'study',
  'clinical',
  'clinical_trial',
  'biospecimen',
  'analysis',
  'data_file',
  // Assignment
  'core',
  'extended',
  // Class
  'primary',
  'secondary',
  // Inclusion
  'required',
  'preferred',
  'optional',
  'yes',
  'no',
];

export const controlVocabConfig = {
  maxNoOfItems: 15,
  maxNoOfItemDlgBox: 30,
};

export const filterConfig = {
  facetSearchData: facetFilterSearchData,
  facetSectionVariables: facetFilterSectionVariables,
  resetIcon: filterResetIcon,
  baseFilters: baseFacetFilters,
  filterSections: facetFilterSections,
  filterOptions: facetFilterOptions,
};

export const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  landscape: 'true',
};

export const categories = ['Admistrative', 'Study', 'Clinical Trial', 'Case', 'Biospecimen', 'Clinical', 'Analysis', 'Data File'];

export const types = {
  CATEGORY: 'category',
  ASSIGNMENT: 'assignment',
  INCLUSION: 'inclusion',
  CLASS: 'class',
  MULTIPLICITY: 'multiplicity',
};

export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

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
      { name: 'no', isChecked: false, group: 'no' },
      { name: 'yes', isChecked: false, group: 'yes' },
    ],
  },
];

export const facetFilterSectionVariables = {
  'Filter By Nodes': {
    color: '#0D71A3',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#f0f8ff',
    checkBoxBorderColor: '#0D71A3',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Relationship': {
    color: '#FF9742',
    checkBoxColorsOne: '#FF9742',
    checkBoxColorsTwo: '#FF9742',
    height: '7px',
    isExpanded: true,
  },
  'Filter By Property': {
    color: '#94C0EC',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#f0f8ff',
    checkBoxBorderColor: '#0D71A3',
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
  maxNoOfItems: 10,
  maxNoOfItemDlgBox: 30,
};

export const showNoOfCheckbox = 6;

export const filterConfig = {
  facetSearchData: facetFilterSearchData,
  facetSectionVariables: facetFilterSectionVariables,
  resetIcon: filterResetIcon,
  baseFilters: baseFacetFilters,
  filterSections: facetFilterSections,
  filterOptions: facetFilterOptions,
  showCheckboxCount: showNoOfCheckbox,
};

export const pdfDownloadConfig = {
  fileType: 'pdf',
  prefix: 'ICDC_Data_Model_',
  landscape: 'true',
  catagoryIcon: {
    url: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/DMN/Pdf/',
    type: '.png',
  },
};

export const readMeConfig = {
  title: 'Understanding the ICDC Data Model',
};

export const graphViewConfig = {
  legend: {
  },
  canvas: {
    fit: {
      x: 0,
      y: 20,
      zoom: 0.7,
      minZoom: 0.7,
      maxZoom: 2,
    },
  },
};

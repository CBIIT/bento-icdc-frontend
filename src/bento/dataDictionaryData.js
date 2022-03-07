export const categories = ['Admistrative', 'Study', 'Clinical Trial', 'Case', 'Biospecimen', 'Clinical', 'Analysis', 'Data File'];

export const defaultFacetSectionVariables = {
  color: '#000000',
  checkBoxColorsOne: '#E8F7DC',
  checkBoxColorsTwo: '#F5FDEE',
  height: '5px',
  isExpanded: false,
};

export const facetSearchData = [
  {
    groupName: 'Category',
    datafield: 'category',
    section: 'Filter By Nodes',
    tooltip: 'category',
    show: true,
    checkboxItems: [
      { name: 'Administrative', isChecked: false },
      { name: 'Case', isChecked: false },
      { name: 'Study', isChecked: false },
      { name: 'Clinical', isChecked: false },
      { name: 'Clinical Trial', isChecked: false },
      { name: 'Biospecimen', isChecked: false },
      { name: 'Analysis', isChecked: false },
      { name: 'Data File', isChecked: false },
    ],
  },
  {
    groupName: 'Assignment',
    datafield: 'assignment',
    section: 'Filter By Nodes',
    tooltip: 'assignment',
    show: true,
    checkboxItems: [
      { name: 'Core', isChecked: false },
      { name: 'Extended', isChecked: false },
    ],
  },
  {
    groupName: 'Class',
    datafield: 'class',
    section: 'Filter By Nodes',
    tooltip: 'class',
    show: true,
    checkboxItems: [
      { name: 'Primary', isChecked: false },
      { name: 'Secondary', isChecked: false },
    ],
  },
  {
    groupName: 'Multiplicity',
    datafield: 'multiplicity',
    section: 'Filter By Relationship',
    tooltip: 'multiplicity',
    show: true,
    checkboxItems: [
      { name: 'One_to_one', isChecked: false },
      { name: 'One_to_many', isChecked: false },
      { name: 'Many_to_one', isChecked: false },
      { name: 'Many_to_many', isChecked: false },
    ],
  },
  {
    groupName: 'Inclusion',
    datafield: 'inclusion',
    section: 'Filter By Property',
    tooltip: 'inclusion',
    show: true,
    checkboxItems: [
      { name: 'Required', isChecked: false },
      { name: 'Preferred', isChecked: false },
      { name: 'Optional', isChecked: false },
    ],
  },
];

export const facetSectionVariables = {
  'Filter By Nodes': {
    color: '#FF9742',
    checkBoxColorsOne: '#fdf1e8',
    checkBoxColorsTwo: '#fff9f5',
    height: '7px',
    isExpanded: false,
  },
  'Filter By Relationship': {
    color: '#9DC1D9',
    checkBoxColorsOne: '#dafafb',
    checkBoxColorsTwo: '#eafafb',
    height: '7px',
    isExpanded: false,
  },
  'Filter By Property': {
    color: '#667A87',
    checkBoxColorsOne: '#d4ddf7',
    checkBoxColorsTwo: '#e9eefb',
    height: '7px',
    isExpanded: false,
  },
};

export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

export const baseFilters = {
  category: [],
  assignment: [],
  class: [],
  multiplicity: [],
  inclusion: [],
};

export const controlVocabConfig = {
  maxNoOfItems: 15,
  maxNoOfItemDlgBox: 30,
};

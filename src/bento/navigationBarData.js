// import env from '../utils/env';
export const headerData = {
  globalHeaderLogo:
    'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/icdc_nih_logo.svg',
  globalHeaderLogoSmall:
    'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/icdc_nih_logo.svg',
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'ICDC Logo',
};

export const HeaderLinks = [
  {
    name: 'Home',
    link: '/home',
    id: 'navbar-dropdown-home',
    className: 'navMobileItem',
  },
  {
    name: 'Explore',
    link: '/explore',
    id: 'navbar-dropdown-explore',
    className: 'navMobileItem',
  },
  {
    name: 'Programs',
    link: '/programs',
    id: 'navbar-dropdown-programs',
    className: 'navMobileItem',
  },
  {
    name: 'Studies',
    link: '/studies',
    id: 'navbar-dropdown-studies',
    className: 'navMobileItem',
  },
  {
    name: 'Data',
    link: '#',
    id: 'navbar-dropdown-data',
    className: 'navMobileItem clickable',
  },
  {
    name: 'CRDC',
    link: '#',
    id: 'navbar-dropdown-crdc',
    className: 'navMobileItem clickable',
  },
  {
    name: 'Resources',
    link: '#',
    id: 'navbar-dropdown-resources',
    className: 'navMobileItem clickable',
  },
  {
    name: 'About',
    link: '#',
    id: 'navbar-dropdown-about',
    className: 'navMobileItem clickable',
  },
];

export const HeaderSubLinks = {
  Data: [
    {
      name: 'Model Navigator',
      link: '/icdc-data-model',
      id: 'data-model-navigator',
    },
    {
      name: 'Data Use',
      link: '/guideline',
      id: 'data-use',
    },
    {
      name: 'Data Submission Guidelines',
      link: '/submit',
      id: 'data-submission-guidelines',
    },
  ],
  CRDC: [
    {
      name: 'Cancer Research Data Commons',
      link: 'https://datacommons.cancer.gov/',
      id: 'crdc-home-page',
    },
    {
      name: 'Genomic Data Commons',
      link: 'https://gdc.cancer.gov/',
      id: 'genomic-data-commons',
    },
    {
      name: 'Clinical and Translational Data Commons',
      link: 'https://clinical.datacommons.cancer.gov/#/',
      id: 'clinical-and-reanslatonal-data-commons',
    },
    {
      name: 'Proteomic Data Commons',
      link: 'https://proteomic.datacommons.cancer.gov/pdc/',
      id: 'proteomic-data-commons',
    },
    {
      name: 'Imaging Data Commons',
      link: 'https://portal.imaging.datacommons.cancer.gov/',
      id: 'genomic-data-commons',
    },
    {
      name: 'General Commons',
      link: 'https://general.datacommons.cancer.gov/#/',
      id: 'general-commons',
    },
  ],
  Resources: [
    {
      name: 'GraphQL',
      link: '/graphql',
      id: 'graphQL',
    },
    {
      name: 'Developers',
      link: '/developers',
      id: 'developers',
    },
    {
      name: 'Tutorials',
      link: 'https://cbiit.github.io/icdc-bioinformatics/',
      id: 'data-submission-guidelines',
    },
  ],
  About: [
    {
      name: 'Purpose',
      link: '/purpose',
      id: 'purpose',
      className: 'navMobileSubItem',
    },
    {
      name: 'Steering Committee',
      id: 'steering-committee',
      link: '/steeringCommittee',
      className: 'navMobileSubItem',
      items: [
        {
          name: 'Data Governance Advisory Board(DGAB)',
          link: '/DGAB',
          id: 'dgab',
          className: 'navMobileSubItem',
        },
        {
          name: 'Best Practices Subcommittee(BPSC)',
          link: '/BPSC',
          id: 'bpsc',
          className: 'navMobileSubItem',
        },
        {
          name: 'Working Groups',
          link: '/Working%20Groups',
          id: 'working-groups',
          className: 'navMobileSubItem',
        },
      ],
    },
    {
      name: 'CRDC & Analysis',
      link: '/crdc',
      id: 'crdc-and-analysis',
      className: 'navMobileSubItem',
    },
    {
      name: 'Support',
      link: '/support',
      id: 'support',
      className: 'navMobileSubItem',
    },
  ],
};

export const navBarCartData = {
  cartLabel: 'My Files',
  cartLink: '/fileCentricCart',
  cartIcon:
    'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};

export const navBarExclusions = [
  '#/jBrowse/singleFileView',
  '#/jBrowse/multiFilesView',
];

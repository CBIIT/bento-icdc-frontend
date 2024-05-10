// import env from '../utils/env';

export const navBarstyling = {
  cart: {},
  global: {
    backgroundColor: '#0B3557',
    height: '39px',
    padding: '9px 20px 0px 20px',
    marginTop: '0px',
    fontFamily: 'Raleway, sans-serif',
    activeLabel: '2px solid #35b9eb',
    paddingRight: '25px',
    fontWeight: '600',
    letterSpacing: '1px',
    position: 'relative',
  },
  myFiles: {
    right: '8px',
  },
  dropDownIcon: {
    displayIcon: true,
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
  },
  dropdownMenu: {
    paper: {
      background: '#309EC4',
      width: '200px',
      padding: '5px 18px 18px 18px',
      marginLeft: '15px',
      position: 'absolute',
      marginTop: '-1px',
      borderRadius: '0',
    },
    link: {
      overflowWrap: 'normal',
      textDecoration: 'none',
      color: 'black',
      fontSize: '14px',
      fontWeight: '600',
      lineSpacing: '1px',
      lineHeight: '18px',
      fontFamily: 'Raleway, sans-serif',
      display: 'block',
      marginTop: '10px',
      '&:hover': {
        cursor: 'pointer',
        color: 'white',
      },
    },
  },
};

export const navBarData = [
  {
    labelText: 'home',
    type: 'link',
    link: '/home',
  },
  {
    labelText: 'explore',
    type: 'link',
    link: '/explore',
  },
  {
    labelText: 'programs',
    type: 'link',
    link: '/programs',
  },
  {
    labelText: 'Studies',
    type: 'link',
    link: '/studies',
  },
  {
    labelText: 'data',
    type: 'dropdown',

    dropDownLinks: [
      {
        labelText: 'Model Navigator',
        link: '/icdc-data-model',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Data Use',
        link: '/guideline',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Data Submission Guidelines',
        link: '/submit',
        linkActiveStyle: 'white',
      },
    ],
  },
  {
    labelText: 'resources',
    type: 'dropdown',

    dropDownLinks: [
      {
        labelText: 'GraphQL',
        link: '/graphql',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Developers',
        link: '/developers',
        linkActiveStyle: 'white',
      },
    ],
  },
  {
    labelText: 'about',
    type: 'dropdown',

    dropDownLinks: [
      {
        labelText: 'Purpose',
        link: '/purpose',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Steering Committee',
        link: '/steeringCommittee',
        linkActiveStyle: 'white',
      },
      {
        labelText: '- Data Governance Advisory Board(DGAB)',
        link: '/DGAB',
        sublink: true,
        linkActiveStyle: 'white',
      },
      {
        labelText: '- Best Practices Sub-Committee(BPSC)',
        link: '/BPSC',
        sublink: true,
        linkActiveStyle: 'white',
      },
      {
        labelText: 'CRDC & Analysis',
        link: '/crdc',
        linkActiveStyle: 'white',
      },
      {
        labelText: 'Support',
        link: '/support',
        linkActiveStyle: 'white',
      },
    ],
  },
];

/* export const externalLinks = {
  resources: [
    {
      title: 'Wiki',
      link: 'https://wiki.nci.nih.gov/spaces/viewspace.action?key=ICDC',
    },
    {
      title: 'Github',
      link: 'https://github.com/CBIIT/bento-icdc-frontend',
    },
    {
      title: 'Cancer Genomics Cloud',
      link: 'https://www.cancergenomicscloud.org/',
    },
    {
      title: 'Software Release Notes',
      link: `https://github.com/CBIIT/bento-icdc-frontend/releases/tag/${env.REACT_APP_FE_VERSION}`,
    },
  ],
  data: [
    {
      title: 'Data Submission Request Template',
      link: 'https://github.com/CBIIT/icdc-codebase/raw/master/src/main/frontend/src/content/files/ICDC_Data_Submission_Request_Template.docx',
    },
  ],
}; */

export const externalLinks = {
  resources: [
    {
      title: 'Tutorials',
      link: 'https://cbiit.github.io/icdc-bioinformatics/',
    },
  ],
};

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon:
    'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};

export const navBarExclusions = ['#/jBrowse/singleFileView'];

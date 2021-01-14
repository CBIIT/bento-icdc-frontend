export const navBarstyling = {
  global: {
    backgroundColor: '#0B3557',
    height: '39px',
    padding: '9px 20px 0px 20px',
    marginTop: '120px',
    fontFamily: 'Raleway, sans-serif',
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
      textDecoration: 'none',
      color: 'black',
      fontSize: '14px',
      fontWeight: '600',
      lineSpacing: '1px',
      fontFamily: 'Raleway, sans-serif',
      display: 'block',
      marginTop: '12px',
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
    labelText: 'cases',
    type: 'link',
    link: '/cases',
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
    labelText: 'about',
    type: 'dropdown',
    dropDownLinks: [
      {
        labelText: 'Purpose',
        link: '/purpose',
      },
      {
        labelText: 'Steering Committee',
        link: '/steeringCommittee',
      },
      {
        labelText: '-Data Governance Advisory Board(DGAB)',
        link: '/DGAB',
        sublink: true,

      },
      {
        labelText: '-Best Practices Sub-Committee(BPSC)',
        link: '/BPSC',
        sublink: true,
      },
      {
        labelText: 'CRDC & Analysis',
        link: '/crdc',
      },
      {
        labelText: 'ICDC Data & Model',
        link: '/icdc-data-model',
      },
      {
        labelText: 'Developers',
        link: '/developers',
      },
      {
        labelText: 'Support',
        link: '/support',
      },
      {
        labelText: 'Submitting Data',
        link: '/submit',
      },
    ],
  },
];

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-MyCases.svg',
  cartIconAlt: 'cart_logo',
};

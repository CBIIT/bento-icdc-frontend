export const navBarstyling = {
  global: {
    backgroundColor: '#142D64',
    height: '39px',
    padding: '9px 20px 0px 20px',
    marginTop: '120px',
  },
  dropDownIcon: {
    displayIcon: false,
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
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
      },
      {
        labelText: '-Best Practices Sub-Committee(BPSC)',
        link: '/BPSC',
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

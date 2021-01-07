import env from '../utils/env';

export default {
  footerLogoImage: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/footer/FNL_logo.png',
  footerLogoAltText: 'Footer Logo',
  footerLogoHyperlink: 'https://frederick.cancer.gov/',
  footerStaticText: 'NIH … Turning Discovery Into Health®',
  version: env.REACT_APP_FE_VERSION,
  BEversion: env.REACT_APP_BE_VERSION,
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [
    {
      title: 'About ICDC',
      items: [
        {
          text: 'Purpose',
          link: '/purpose',
        },
        {
          text: 'Steering Committee',
          link: '/steeringCommittee',
        },
        {
          text: 'CRDC',
          link: '/crdc',
        },
        {
          text: 'Contact Us',
          link: 'icdchelpdesk@nih.gov',
        },
      ],
    },

    {
      title: 'About the Data',
      items: [
        {
          text: 'ICDC Data & Model',
          link: '/model',
        },
        {
          text: 'Analyzing Data',
          link: '/crdc',
        },
        {
          text: 'Developers (APIs)',
          link: '/developers',
        },
        {
          text: 'Submission Guide',
          link: '/submit',
        },
      ],
    },

    {
      title: 'More Information',
      items: [
        {
          text: 'Policies',
          link: 'https://www.cancer.gov/policies',
        },
        {
          text: 'Disclaimer',
          link: 'https://www.cancer.gov/policies/disclaimer',
        },
        {
          text: 'Accessibility',
          link: 'https://www.cancer.gov/policies/accessibility',
        },
        {
          text: 'FOIA',
          link: 'https://www.cancer.gov/policies/foia',
        },
      ],
    },
  ],
  global_footer_links: [
    {
      text: 'U.S. Department of Health and Human Services',
      link: 'https://www.hhs.gov',
    },
    {
      text: 'National Institutes of Health',
      link: 'https://www.nih.gov',
    },
    {
      text: 'National Cancer Institute',
      link: 'https://www.cancer.gov',
    },
    {
      text: 'USA.gov',
      link: 'https://www.usa.gov',
    },
  ],
};

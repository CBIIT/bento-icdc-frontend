import axios from 'axios';
import env from '../utils/env';

const getPrivacy = async () => {
  const data = await (await axios.get(env.REACT_APP_FOOTER_PRIVACY_POLICY)).data;
  return data;
};

export default {
  bg: '#325068',
  // footerLogoImage: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/footer/FNL_logo.png',
  footerLogoAltText: 'Footer Logo',
  footerLogoText: 'National Cancer Institute',
  footerLogoSubText: 'at the National Institutes of Health',
  footerLogoHyperlink: 'https://www.cancer.gov/',
  // footerStaticText: 'NIH … Turning Discovery Into Health®',
  version: env.REACT_APP_FE_VERSION,
  BEversion: env.REACT_APP_BE_VERSION || '14.5.1',
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [
    {
      title: 'Contact Information',
      items: [
        {
          text: 'ICDC Help Desk',
          link: '/support',
        },
      ],
    },
    {
      title: 'More Information',
      items: [
        {
          text: 'ICDC Home',
          link: '/home',
        },
        {
          text: 'Steering Committee',
          link: '/steeringCommittee',
        },
        {
          text: 'CRDC',
          link: '/crdc',
        },
      ],
    },
    {
      title: 'System Info',
      systemInfoInLinkSection: true,
      items: [
        {
          text: 'Release Notes',
          link: 'https://github.com/CBIIT/bento-icdc-frontend/releases',
        },
        {
          text: `FE Version: ${env.REACT_APP_FE_VERSION}`,
        },
        {
          text: `BE Version: ${env.REACT_APP_BE_VERSION}`,
        },
        {
          text: 'System Info Page',
          link: '/sysinfo',
        },
      ],
    },
    {
      title: 'Policies',
      items: [
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
        {
          text: 'HHS Vulnerability Disclosure',
          link: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html',
        },
        {
          text: 'Privacy',
          type: 'modal',
          content: getPrivacy(),
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

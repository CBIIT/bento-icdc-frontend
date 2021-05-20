export const pageData = {
  callToActionTitle: 'Integrated Canine Data Commons',
  callToActionDescription: 'A public resource for exploring, analyzing, and understanding the biological relationships between human and canine cancers.',
  callToActionButtonText: 'EXPLORE',
  callToActionLink: '/cases',
  landingPageStatsBar: [],
  tile1: {
    alt: 'ICDC about',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_About.png',
    titleText: 'About the Integrated Canine Data Commons (ICDC)',
    descriptionText: 'NC\'s Division of Cancer Treatment and Diagnosis (DCTD) charged the Frederick National Laboratory for Cancer Research (FNLCR) to build the Integrated Canine Data Commons (ICDC), a cloud-based repository of canine cancer data. ICDC was established to further research on human cancers by enabling comparative analysis with canine cancer. The data in the ICDC is sourced from multiple different programs and projects; all focused on canine subjects.',
    callToActionText: 'FULL ARTICLE',
    callToActionLink: '/purpose', // This links to the "About" static page.
  },
  tile2: {
    alt: 'ICDC program',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_Program.png',
    titleText: 'Programs',
    descriptionText: 'Discover the programs in ICDC',
    callToActionText: 'READ MORE',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'ICDC studies',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_Studies.png',
    titleText: 'Studies',
    descriptionText: 'Browse the studies within ICDC',
    callToActionText: 'READ MORE',
    callToActionLink: '/studies', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: 'ICDC submit',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_Submit.png',
    titleText: 'Submit Data',
    descriptionText: ' Interested in contributing data to ICDC ?',
    callToActionText: 'READ MORE',
    callToActionLink: '/submit', // This links to the cases dashboard.
  },
  tile5: {
    alt: 'ICDC cases',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/landing/LP_Cases.png',
    titleText: 'Cases',
    descriptionText: 'Search all the Cases and build cohorts from all the Programs/Studies within the ICDC. The data files from these cohorts can then be analyzed in the Cloud Resources.',
    callToActionText: 'READ MORE',
    callToActionLink: '/cases', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = false;

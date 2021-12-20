import submitData from '../assets/landing/SubmittingData.png';
import aboutICDC from '../assets/landing/About_ICDC.png';
import Programs from '../assets/landing/Programs.png';
import icdcNews from '../assets/landing/ICDC_News.png';
import studies from '../assets/landing/studies.png';
import spotlightStudy from '../assets/landing/Spotlight_Studies.png';
import datadictionary from '../assets/landing/Carousel.Dictionary.png';
import dogIcon from '../assets/landing/Button.Explore.Active.png';
import studyActive from '../assets/landing/Button.Studies.Active.png';
import spotLight from '../assets/landing/Button.Spotlight.Active.png';
import datadictionaryIcon from '../assets/landing/Button.DataDictionary.Open.png';

export const pageData = {
  callToActionTitle: 'Integrated Canine Data Commons',
  callToActionDescription: 'Exploring, analyzing, and understanding the biological relationships between human and canine cancers.',
  callToActionButtonText: 'EXPLORE',
  callToActionLink: '/explore',
  landingPageStatsBar: [],
  tile1: {
    alt: 'ICDC about',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/landingPage_About.png',
    titleText: 'About the Integrated Canine Data Commons (ICDC)',
    descriptionText: 'NCI\'s Division of Cancer Treatment and Diagnosis (DCTD) designated the Frederick National Laboratory for Cancer Research (FNLCR) to build the Integrated Canine Data Commons (ICDC), a cloud-based repository of canine cancer data. ICDC was established to further research on human cancers by enabling comparative analysis with canine cancer. The data in the ICDC is sourced from multiple different programs and projects; all focused on canine subjects.',
    callToActionText: 'READ MORE',
    callToActionLink: '/purpose', // This links to the "About" static page.
  },
  tile2: {
    alt: 'ICDC program',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/landingPage_Program.png',
    titleText: 'Programs',
    descriptionText: 'Discover the programs in ICDC',
    callToActionText: 'Learn more about various ICDC Program',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'ICDC studies',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/landingPage_Studies.png',
    titleText: 'Studies',
    descriptionText: 'Browse the studies in ICDC',
    callToActionText: 'EXPLORE',
    callToActionLink: '/studies', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: 'ICDC submit',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/landingPage_Submit.png',
    titleText: 'Submit Data',
    descriptionText: ' Interested in contributing data to ICDC?',
    callToActionText: 'READ MORE',
    callToActionLink: '/submit', // This links to the Submitting Data static page.
  },
  tile5: {
    alt: 'ICDC cases',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/landingPage_Cases.png',
    titleText: 'Cases',
    descriptionText: 'Search across cases and build cohorts from the programs and studies in ICDC. The data files from these cohorts can then be analyzed in the Cloud Resources.',
    callToActionText: 'EXPLORE',
    callToActionLink: '/explore', // This links to the cases dashboard.
  },
  tabs: [
    {
      index: 0,
      label: 'Explore ICDC',
      value: 'explore',
      icon: dogIcon,
      content: {
        callToActionTitle: 'Integrated\n Canine\n Data\n Commons',
        callToActionDescription: 'Exploring, analyzing, and\n understanding the biological\n relationships between human\n and canine cancers.',
        callToActionButtonText: 'EXPLORE ICDC',
        callToActionLink: '/explore',
        image: '',
      },
    },
    {
      index: 1,
      label: 'Data Dictionary',
      value: 'dictionary',
      icon: datadictionaryIcon,
      content: {
        callToActionTitle: 'Delve\ninto the\n Data\n Dictionary',
        callToActionDescription: 'The ICDC data model is a\n representation of how all the\n constituent data are arranged\n relative to each other.',
        callToActionButtonText: 'DATA DICTIONARY',
        callToActionLink: '/icdc-data-model',
        image: datadictionary,
      },
    },
    {
      index: 2,
      label: 'Studies',
      value: 'studies',
      icon: studyActive,
      content: {
        callToActionTitle: 'ICDC\n Studies',
        callToActionDescription: 'Browse the ICDC Studies with\n detailed overviews, sample profiles,\n associated publications and\n additional information.',
        callToActionButtonText: 'STUDIES LISTING',
        callToActionLink: '/studies',
        image: studies,
      },
    },
    {
      index: 3,
      label: 'ICDC Spotlight',
      value: 'icdc',
      icon: spotLight,
      content: {
        callToActionTitle: 'Spotlight:\n New Feature\n Studies\n Publications',
        callToActionDescription: 'Select studies now include multiple associated\n publications.',
        callToActionButtonText: 'STUDIES LISTING',
        callToActionLink: '/studies',
        image: spotlightStudy,
      },
    },
  ],
  widgets: [
    {
      alt: 'ICDC submit',
      img: submitData,
      titleText: 'Submit Data',
      descriptionText: ' Interested in contributing data to ICDC?',
      callToActionText: 'READ MORE',
      callToActionLink: '/submit', // This links to the Submitting Data static page.
    },
    {
      alt: 'ICDC program',
      img: Programs,
      titleText: 'Programs',
      descriptionText: 'Discover the programs in ICDC',
      callToActionText: 'Learn more about various ICDC Program',
      callToActionLink: '/programs', // This links to the Programs Listing Page.
    },
    {
      alt: 'ICDC about',
      img: aboutICDC,
      titleText: 'About ICDC',
      descriptionText: 'Comparative oncology research and more',
      callToActionText: 'READ MORE',
      callToActionLink: '/purpose', // This links to the "About" static page.
    },
    {
      alt: 'ICDC News',
      img: icdcNews,
      titleText: 'ICDC News',
      descriptionText: 'Updates and announcements',
      callToActionText: 'EXPLORE',
      callToActionLink: '/studies', // Link to the "Resources" Static Page
    },
  ],
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = false;

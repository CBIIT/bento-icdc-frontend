export const GITHUB_API_BASE_URL = 'https://api.github.com/repos';
export const GITHUB_RELEASES_PATH = 'releases';
export const NEWS_QUERY_STALE_TIME_MS = 5 * 60 * 1000;
export const NEWS_QUERY_RETRY_COUNT = 1;
export const RELEASE_DATE_LOCALE = 'en-US';
export const RELEASE_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
export const TWEET_LOAD_TIMEOUT_MS = 10_000;

export const NEWS_ASSET_URLS = {
  banner:
    'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-banner.svg',
} as const;

export const NEWS_EXTERNAL_URLS = {
  doi: 'https://doi.org',
  pubMed: 'https://pubmed.ncbi.nlm.nih.gov',
} as const;

export const NEWS_HTML_ATTRIBUTES = {
  buttonType: 'button',
  externalLinkRel: 'noopener noreferrer',
  externalLinkTarget: '_blank',
} as const;

export const NEWS_FONT_FAMILIES = {
  inter: "'Inter', sans-serif",
  nunito: "'Nunito', sans-serif",
  openSans: "'Open Sans', sans-serif",
  raleway: "'Raleway', sans-serif",
  roboto: "'Roboto', sans-serif",
} as const;

export const NEWS_COLORS = {
  announcementContent: 'hsla(209, 27%, 33%, 1)',
  announcementText: 'hsla(258, 65%, 18%, 1)',
  black: '#000',
  cardBorder: '#062952',
  cardHeader: '#062952',
  cardSurface: '#fff',
  closeControl: '#45637d',
  dialogTitle: '#111',
  imageSkeletonBorder: '#e0e6eb',
  interactiveHover: '#b3c2dd',
  linkHover: '#9e4700',
  listSurface: '#f5f5f5',
  pageBackground: '#5e8ca5',
  panelGradientLower: 'rgba(95, 131, 175, 0.05)',
  focusOutline: '#2f83b7',
  link: 'hsla(27, 100%, 36%, 1)',
  primaryText: '#242424',
  releaseRowLabel: '#3E556B',
  releaseRowValue: '#22104C',
  releaseDivider: '#a8acb4',
  releaseHeading: '#54788e',
  releaseSectionHeading: '#507b91',
  releaseLink: '#b85300',
  retryHover: '#eef4f8',
  retryText: '#1d587f',
  scrollbar: '#747f92',
  scrollbarDark: 'rgba(0, 0, 0, 0.35)',
  scrollbarLight: 'rgba(0, 0, 0, 0.2)',
  secondaryText: '#3e556b',
  sectionHeader: '#1d79a8',
  statusError: '#d32f2f',
  statusLoading: '#666',
  subduedSurface: '#f8f9f9',
  newsCardContent: '#d3d3d3',
} as const;

export const NEWS_MARKUP = {
  markdownLineBreak: '\n',
} as const;

export const NEWS_PANEL_TOKENS = {
  desktopPadding: '48px 64px 56px',
  mobilePadding: '24px 16px 16px',
  fallbackGradient: 'linear-gradient(180deg, #0b0517 30%, #5f83af 78.85%)',
  translucentGradient: `linear-gradient(180deg, rgba(11, 5, 23, 0.4) 30%, ${NEWS_COLORS.panelGradientLower} 78.85%)`,
} as const;

export const RELEASE_CARD_CONFIGS = {
  dataModel: {
    singularTitle: 'Data Model Release',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-data-model-release.svg',
    repository: 'CBIIT/icdc-model-tool',
    showsBuildVersions: false,
  },
  software: {
    singularTitle: 'Software Release',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-software-release.svg',
    repository: 'CBIIT/bento-icdc-frontend',
    showsBuildVersions: true,
  },
} as const;

export const PUBLICATIONS_ICON =
  'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-publications.svg';
export const NEWS_COPY = {
  announcement: 'Announcement:',
  announcementsReadMore: 'Read More',
  announcementsLink: 'Link',
  buildDetailsHeading: 'Build Details',
  closeAnnouncement: 'Close announcement',
  dateUnavailable: 'Date unavailable',
  doi: 'DOI:',
  externalLinkUnavailable: 'External link unavailable',
  failedToLoad: 'Failed to load data. Please try again later.',
  githubLink: 'Github Link',
  image: 'Image',
  imageDefaultLabel: 'ICDC Pack image',
  loadingSocialMediaPosts: 'Loading social media posts',
  loading: 'Loading...',
  newFeaturesHeading: 'New Features and Improvements:',
  officialReleaseNotesHeading: 'Official Release Notes:',
  publication: 'Publication:',
  pubMed: 'PubMed:',
  retrySocialMediaPost: 'Retrying social media post',
  newsPageTitle: 'ICDC News',
  announcementsHeading: 'ICDC Announcements',
  socialMediaPostLoadFailed: 'This social media post could not be loaded.',
  tryAgain: 'Try again',
  untitledRelease: 'Untitled release',
  video: 'Video',
  versionsHeading: 'Versions',
} as const;

export const NEWS_ERROR_MESSAGES = {
  githubReleaseLoad: (repository: string) =>
    `Unable to load releases for ${repository}`,
  unexpectedGithubReleasesResponse: (repository: string) =>
    `Unexpected releases response for ${repository}`,
} as const;

export const NEWS_LABEL_PREFIXES = {
  close: 'Close',
  expand: 'Expand',
} as const;

export const DIALOG_IDS = {
  announcement: 'static-announcement-title',
  image: 'image-dialog-image',
  publication: 'publication-dialog-title',
  video: 'news-video-dialog',
} as const;

export const DIALOG_ID_PREFIXES = {
  image: 'image-dialog',
} as const;

export const NEWS_TEST_IDS = {
  content: 'news-content',
} as const;

export const PUBLICATIONS_QUERY = `
  query getPublications {
    publication(
      orderBy: year_of_publication_desc
    ) {
      publication_title
      digital_object_id
      pubmed_id
    }
  }
`;

export const RELEASE_LABEL = 'VERSION';

export const RELEASE_VERSION_DEFINITIONS = {
  fe: { label: 'Front-End Version:', includePrefix: true },
  frontend: { label: 'Front-End Version:', includePrefix: true },
  be: { label: 'Back-End Version:', includePrefix: true },
  backend: { label: 'Back-End Version:', includePrefix: true },
  fs: { label: 'File Service Version', includePrefix: true },
  fileservice: { label: 'File Service Version', includePrefix: true },
  interop: { label: 'Interop Version', includePrefix: false },
  interopservice: { label: 'Interop Version', includePrefix: false },
  drs: { label: 'Data Retriever Version', includePrefix: true },
  dataretriever: { label: 'Data Retriever Version', includePrefix: true },
} as const;

export const RELEASE_VERSION_ORDER = [
  'Front-End Version:',
  'Back-End Version:',
  'File Service Version',
  'Interop Version',
  'Data Retriever Version',
] as const;

/**
 * Test data and constants for landing page tests
 */
export class TestData {
  /**
   * Landing page tab content expectations
   */
  static readonly TAB_CONTENT = {
    HUMAN: {
      title:
        'Why Canine Cancer data? ICDC studies highlight the impact of canine research on human cancer research',
      description:
        'Canine cancer research plays a pivotal role in advancing human cancer research. Explore how pet dogs with spontaneous tumors offer unique opportunities for the cancer research community to gain significant insights into understanding cancer biology, developing new treatments, mitigating toxicities, and improving outcomes for both canines and humans.',
      buttonText: 'Read More',
      expectedUrl: 'http://localhost:7000/#/human-relevance',
    },
    EXPLORE: {
      title: 'Using Canine Cancers to drive',
      buttonText: 'Explore ICDC Data',
      expectedUrl: 'http://localhost:7000/#/explore',
    },
    DATA_MODEL: {
      title: 'The Data Model Navigator',
      description:
        'The ICDC data model provides a visual representation of how all the constituent nodes and values are arranged relative to each other.',
      buttonText: 'Navigate the ICDC Data Model',
      expectedUrl: 'http://localhost:7000/#/icdc-data-model',
    },
    VIDEOS: {
      title:
        'Why Canine Cancer data? ICDC studies highlight the impact of canine research on human cancer research',
      description:
        'Canine cancer research plays a pivotal role in advancing human cancer research. Explore how pet dogs with spontaneous tumors offer unique opportunities for the cancer research community to gain significant insights into understanding cancer biology, developing new treatments, mitigating toxicities, and improving outcomes for both canines and humans.',
      buttonText: 'View ICDC Studies',
      expectedUrl: 'http://localhost:7000/#/studies',
      videoSpotlight: 'VIDEO SPOTLIGHTSNCI Cancer',
    },
  } as const;

  /**
   * Widget navigation expectations
   */
  static readonly WIDGETS = {
    SUBMIT_DATA: {
      linkText: 'Submit Data ICDC submit',
      expectedUrl: 'http://localhost:7000/#/submit',
    },
    PROGRAMS: {
      linkText: 'Programs ICDC Programs',
      expectedUrl: 'http://localhost:7000/#/programs',
    },
    ABOUT: {
      linkText: 'About the ICDC About ICDC',
      expectedUrl: 'http://localhost:7000/#/purpose',
    },
    SPOTLIGHT: {
      linkText: 'ICDC Spotlight ICDC Spotlight',
      expectedUrl: 'http://localhost:7000/#/news',
    },
  } as const;

  /**
   * Tab names and selectors
   */
  static readonly TABS = {
    HUMAN: {
      name: 'icdc_carousel_tabs Human',
      key: 'human' as const,
    },
    EXPLORE: {
      name: 'icdc_carousel_tabs Explore',
      key: 'explore' as const,
    },
    DATA_MODEL: {
      name: 'icdc_carousel_tabs Data Model',
      key: 'dataModel' as const,
    },
    VIDEOS: {
      name: 'icdc_carousel_tabs Videos',
      key: 'videos' as const,
    },
  } as const;

  /**
   * Image alt text expectations
   */
  static readonly IMAGES = {
    ICDC_STUDIES: 'icdc_studies',
    HUMAN: 'human',
    DOG: 'Dog',
  } as const;

  /**
   * Common selectors
   */
  static readonly SELECTORS = {
    SKELETON_LOADER: '[class*="MuiSkeleton"]',
    CONTAINER: '[class*="Container"]',
    TAB_PANEL: '[role="tabpanel"]',
    TAB: '[role="tab"]',
    DIALOG: '[role="dialog"]',
    BUTTON: 'button',
    LINK: 'a',
    IFRAME_YOUTUBE: 'iframe[src*="youtube"]',
    VIDEO_PLAYER: '.video-player, [class*="VideoPlayer"]',
    PLAYLIST: '[class*="Playlist"], .playlist',
    PLAYLIST_ITEM: '[class*="PlaylistItem"], .playlist-item',
    TWITTER_EMBED:
      '[class*="TwitterViewContainer"], .twitter-tweet, iframe[src*="twitter"]',
    STAR_ANIMATION: '[class*="Star"]',
    SLIDE_ANIMATION: '[class*="SlideUp"], [class*="SlideDown"]',
  } as const;

  /**
   * Viewport sizes for responsive testing
   */
  static readonly VIEWPORTS = {
    MOBILE: { width: 375, height: 667 },
    TABLET: { width: 768, height: 1024 },
    DESKTOP: { width: 1920, height: 1080 },
    SMALL_MOBILE: { width: 320, height: 568 },
    LARGE_DESKTOP: { width: 2560, height: 1440 },
  } as const;

  /**
   * Timeout values
   */
  static readonly TIMEOUTS = {
    CONTENT_LOAD: 30000,
    NAVIGATION: 5000,
    ANIMATION: 1000,
    SHORT_WAIT: 500,
    ELEMENT_VISIBLE: 10000,
  } as const;

  /**
   * Test patterns for URL validation
   */
  static readonly URL_PATTERNS = {
    LOCALHOST: /localhost:7000/,
    YOUTUBE_EMBED: /youtube\.com\/embed\//,
  } as const;

  /**
   * Error messages
   */
  static readonly ERROR_MESSAGES = {
    CONTENT_NOT_LOADED: 'Content failed to load within expected time',
    NAVIGATION_FAILED: 'Navigation to expected URL failed',
    ELEMENT_NOT_VISIBLE: 'Expected element is not visible',
    TAB_NOT_SELECTED: 'Expected tab is not selected',
    ANIMATION_ERROR: 'Animation caused page errors',
  } as const;

  /**
   * Get all tab keys as an array
   */
  static getAllTabKeys(): Array<'human' | 'explore' | 'dataModel' | 'videos'> {
    return Object.values(this.TABS).map(tab => tab.key);
  }

  /**
   * Get all widget keys as an array
   */
  static getAllWidgetKeys(): Array<
    'submitData' | 'programs' | 'about' | 'spotlight'
  > {
    return ['submitData', 'programs', 'about', 'spotlight'];
  }

  /**
   * Get tab content by key
   */
  static getTabContent(tabKey: 'human' | 'explore' | 'dataModel' | 'videos') {
    const contentMap = {
      human: this.TAB_CONTENT.HUMAN,
      explore: this.TAB_CONTENT.EXPLORE,
      dataModel: this.TAB_CONTENT.DATA_MODEL,
      videos: this.TAB_CONTENT.VIDEOS,
    };
    return contentMap[tabKey];
  }

  /**
   * Get widget data by key
   */
  static getWidgetData(
    widgetKey: 'submitData' | 'programs' | 'about' | 'spotlight'
  ) {
    const widgetMap = {
      submitData: this.WIDGETS.SUBMIT_DATA,
      programs: this.WIDGETS.PROGRAMS,
      about: this.WIDGETS.ABOUT,
      spotlight: this.WIDGETS.SPOTLIGHT,
    };
    return widgetMap[widgetKey];
  }
}

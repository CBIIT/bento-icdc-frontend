import { test as base, Page, Locator } from '@playwright/test';
import { BasePage, BasePageFixture } from './base-page.fixture';

export interface LandingPageFixture extends BasePageFixture {
  landingPage: LandingPage;
}

export class LandingPage extends BasePage {
  // URL constants
  readonly baseUrl = 'http://localhost:7000/#/';

  // Tab selectors
  readonly humanTab = this.page.getByRole('tab', {
    name: 'icdc_carousel_tabs Human',
  });
  readonly exploreTab = this.page.getByRole('tab', {
    name: 'icdc_carousel_tabs Explore',
  });
  readonly dataModelTab = this.page.getByRole('tab', {
    name: 'icdc_carousel_tabs Data Model',
  });
  readonly videosTab = this.page.getByRole('tab', {
    name: 'icdc_carousel_tabs Videos',
  });

  // Widget links
  readonly submitDataLink = this.page.getByRole('link', {
    name: 'Submit Data ICDC submit',
  });
  readonly programsLink = this.page.getByRole('link', {
    name: 'Programs ICDC Programs',
  });
  readonly aboutLink = this.page.getByRole('link', {
    name: 'About the ICDC About ICDC',
  });
  readonly spotlightLink = this.page.getByRole('link', {
    name: 'ICDC Spotlight ICDC Spotlight',
  });

  // Common elements
  readonly tabPanel = this.page.getByRole('tabpanel');
  readonly mainContainer = this.page.locator('[class*="Container"]').first();
  readonly body = this.page.locator('body');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the landing page and wait for it to be ready
   */
  async navigate(): Promise<void> {
    await this.navigateAndWaitForReady(this.baseUrl);
  }

  /**
   * Navigate to landing page with mobile viewport
   */
  async navigateOnMobile(): Promise<void> {
    await this.setMobileViewport();
    await this.page.reload();
    await this.waitForPageReady();
  }

  /**
   * Click on a specific tab and wait for content to load
   */
  async clickTab(
    tabName: 'human' | 'explore' | 'dataModel' | 'videos'
  ): Promise<void> {
    const tabMap = {
      human: this.humanTab,
      explore: this.exploreTab,
      dataModel: this.dataModelTab,
      videos: this.videosTab,
    };

    await tabMap[tabName].click();
    await this.waitForAnimations(500); // Wait for tab transition
  }

  /**
   * Get the currently selected tab
   */
  async getSelectedTab(): Promise<Locator | null> {
    const tabs = [
      this.humanTab,
      this.exploreTab,
      this.dataModelTab,
      this.videosTab,
    ];

    for (const tab of tabs) {
      const isSelected = await tab.getAttribute('aria-selected');
      if (isSelected === 'true') {
        return tab;
      }
    }
    return null;
  }

  /**
   * Check if all expected tabs are visible
   */
  async areAllTabsVisible(): Promise<boolean> {
    const tabs = [
      this.humanTab,
      this.exploreTab,
      this.dataModelTab,
      this.videosTab,
    ];

    for (const tab of tabs) {
      if (!(await tab.isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if all widget links are visible
   */
  async areAllWidgetLinksVisible(): Promise<boolean> {
    const widgets = [
      this.submitDataLink,
      this.programsLink,
      this.aboutLink,
      this.spotlightLink,
    ];

    for (const widget of widgets) {
      if (!(await widget.isVisible())) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get video elements on the page
   */
  getVideoElements(): Locator {
    return this.page.locator(
      'iframe[src*="youtube"], .video-player, [class*="VideoPlayer"]'
    );
  }

  /**
   * Get playlist elements
   */
  getPlaylistElements(): Locator {
    return this.page.locator('[class*="Playlist"], .playlist');
  }

  /**
   * Get playlist item elements
   */
  getPlaylistItemElements(): Locator {
    return this.page.locator('[class*="PlaylistItem"], .playlist-item');
  }

  /**
   * Get Twitter embed elements
   */
  getTwitterElements(): Locator {
    return this.page.locator(
      '[class*="TwitterViewContainer"], .twitter-tweet, iframe[src*="twitter"]'
    );
  }

  /**
   * Get animated star elements
   */
  getStarElements(): Locator {
    return this.page.locator('[class*="Star"]');
  }

  /**
   * Get slide animation elements
   */
  getSlideElements(): Locator {
    return this.page.locator('[class*="SlideUp"], [class*="SlideDown"]');
  }

  /**
   * Get call-to-action buttons
   */
  getCtaButtons(): Locator {
    return this.page
      .locator('button, a')
      .filter({ hasText: /explore|learn|discover|view|read more|navigate/i });
  }

  /**
   * Navigate to a specific page via widget link
   */
  async navigateViaWidget(
    widget: 'submitData' | 'programs' | 'about' | 'spotlight'
  ): Promise<void> {
    const widgetMap = {
      submitData: this.submitDataLink,
      programs: this.programsLink,
      about: this.aboutLink,
      spotlight: this.spotlightLink,
    };

    await widgetMap[widget].click();
  }

  /**
   * Verify page URL matches expected pattern
   */
  verifyUrl(expectedPattern: RegExp): boolean {
    return expectedPattern.test(this.page.url());
  }
}

export const test = base.extend<LandingPageFixture>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
});

export { expect } from '@playwright/test';

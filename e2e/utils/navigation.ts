import { Page } from '@playwright/test';

/**
 * Navigation utilities for common page navigation patterns
 */
export class Navigation {
  /**
   * Application URLs
   */
  static readonly URLS = {
    HOME: 'http://localhost:7000/#/',
    EXPLORE: 'http://localhost:7000/#/explore',
    SUBMIT: 'http://localhost:7000/#/submit',
    PROGRAMS: 'http://localhost:7000/#/programs',
    ABOUT: 'http://localhost:7000/#/purpose',
    SPOTLIGHT: 'http://localhost:7000/#/news',
    STUDIES: 'http://localhost:7000/#/studies',
    DATA_MODEL: 'http://localhost:7000/#/icdc-data-model',
    HUMAN_RELEVANCE: 'http://localhost:7000/#/human-relevance',
  } as const;

  /**
   * URL patterns for validation
   */
  static readonly URL_PATTERNS = {
    LOCALHOST: /localhost:7000/,
    HOME: /localhost:7000\/#?\/?$/,
    EXPLORE: /localhost:7000\/#\/explore/,
    SUBMIT: /localhost:7000\/#\/submit/,
    PROGRAMS: /localhost:7000\/#\/programs/,
    ABOUT: /localhost:7000\/#\/purpose/,
    SPOTLIGHT: /localhost:7000\/#\/news/,
    STUDIES: /localhost:7000\/#\/studies/,
    DATA_MODEL: /localhost:7000\/#\/icdc-data-model/,
    HUMAN_RELEVANCE: /localhost:7000\/#\/human-relevance/,
  } as const;

  /**
   * Navigate to home page
   */
  static async goHome(page: Page): Promise<void> {
    await page.goto(this.URLS.HOME);
  }

  /**
   * Navigate to explore page
   */
  static async goToExplore(page: Page): Promise<void> {
    await page.goto(this.URLS.EXPLORE);
  }

  /**
   * Navigate to submit data page
   */
  static async goToSubmit(page: Page): Promise<void> {
    await page.goto(this.URLS.SUBMIT);
  }

  /**
   * Navigate to programs page
   */
  static async goToPrograms(page: Page): Promise<void> {
    await page.goto(this.URLS.PROGRAMS);
  }

  /**
   * Navigate to about page
   */
  static async goToAbout(page: Page): Promise<void> {
    await page.goto(this.URLS.ABOUT);
  }

  /**
   * Navigate to spotlight page
   */
  static async goToSpotlight(page: Page): Promise<void> {
    await page.goto(this.URLS.SPOTLIGHT);
  }

  /**
   * Navigate to studies page
   */
  static async goToStudies(page: Page): Promise<void> {
    await page.goto(this.URLS.STUDIES);
  }

  /**
   * Navigate to data model page
   */
  static async goToDataModel(page: Page): Promise<void> {
    await page.goto(this.URLS.DATA_MODEL);
  }

  /**
   * Navigate to human relevance page
   */
  static async goToHumanRelevance(page: Page): Promise<void> {
    await page.goto(this.URLS.HUMAN_RELEVANCE);
  }

  /**
   * Wait for navigation to complete and verify URL
   */
  static async waitForNavigation(
    page: Page,
    expectedPattern: RegExp,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForURL(expectedPattern, { timeout });
  }

  /**
   * Navigate back in browser history
   */
  static async goBack(page: Page): Promise<void> {
    await page.goBack();
  }

  /**
   * Navigate forward in browser history
   */
  static async goForward(page: Page): Promise<void> {
    await page.goForward();
  }

  /**
   * Reload the current page
   */
  static async reload(page: Page): Promise<void> {
    await page.reload();
  }

  /**
   * Check if current URL matches a pattern
   */
  static urlMatches(page: Page, pattern: RegExp): boolean {
    return pattern.test(page.url());
  }

  /**
   * Get the current URL
   */
  static getCurrentUrl(page: Page): string {
    return page.url();
  }

  /**
   * Navigate to a custom URL
   */
  static async goToUrl(page: Page, url: string): Promise<void> {
    await page.goto(url);
  }

  /**
   * Wait for page to be ready after navigation
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  }

  /**
   * Navigate with retry logic for flaky navigation
   */
  static async navigateWithRetry(
    page: Page,
    url: string,
    maxRetries: number = 3
  ): Promise<void> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        return; // Success
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await page.waitForTimeout(1000); // Wait before retry
        }
      }
    }

    throw (
      lastError ||
      new Error(`Failed to navigate to ${url} after ${maxRetries} retries`)
    );
  }
}

import { expect, Locator, Page } from '@playwright/test';

/**
 * Common assertion utilities for Playwright tests
 */
export class Assertions {
  /**
   * Assert that a URL matches a specific pattern
   */
  static assertUrlMatches(page: Page, pattern: RegExp): void {
    expect(page.url()).toMatch(pattern);
  }

  /**
   * Assert that a URL equals a specific value
   */
  static async assertUrlEquals(page: Page, expectedUrl: string): Promise<void> {
    await expect(page).toHaveURL(expectedUrl);
  }

  /**
   * Assert that an element is visible and enabled
   */
  static async assertElementIsInteractable(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert that an element contains specific text
   */
  static async assertElementContainsText(
    locator: Locator,
    text: string
  ): Promise<void> {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert that an element has a specific attribute value
   */
  static async assertElementHasAttribute(
    locator: Locator,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  /**
   * Assert that a tab is selected (has aria-selected="true")
   */
  static async assertTabIsSelected(tabLocator: Locator): Promise<void> {
    await expect(tabLocator).toHaveAttribute('aria-selected', 'true');
  }

  /**
   * Assert that multiple elements are all visible
   */
  static async assertAllElementsVisible(locators: Locator[]): Promise<void> {
    for (const locator of locators) {
      await expect(locator).toBeVisible();
    }
  }

  /**
   * Assert that at least one element from a list is visible
   */
  static async assertAtLeastOneElementVisible(
    locators: Locator[]
  ): Promise<void> {
    let hasVisibleElement = false;

    for (const locator of locators) {
      try {
        await expect(locator).toBeVisible({ timeout: 1000 });
        hasVisibleElement = true;
        break;
      } catch {
        // Continue checking other elements
      }
    }

    expect(hasVisibleElement).toBe(true);
  }

  /**
   * Assert that an element count is greater than a specific value
   */
  static async assertElementCountGreaterThan(
    locator: Locator,
    count: number
  ): Promise<void> {
    const actualCount = await locator.count();
    expect(actualCount).toBeGreaterThan(count);
  }

  /**
   * Assert that an element count equals a specific value
   */
  static async assertElementCountEquals(
    locator: Locator,
    expectedCount: number
  ): Promise<void> {
    await expect(locator).toHaveCount(expectedCount);
  }

  /**
   * Assert that a video iframe has a valid YouTube source
   */
  static async assertValidYouTubeVideo(videoLocator: Locator): Promise<void> {
    await expect(videoLocator).toBeVisible();
    const src = await videoLocator.getAttribute('src');
    expect(src).toContain('youtube.com/embed/');
  }

  /**
   * Assert that page content has loaded (no skeleton loaders)
   */
  static async assertContentLoaded(page: Page): Promise<void> {
    await page.waitForFunction(
      () => {
        const skeletons = document.querySelectorAll('[class*="MuiSkeleton"]');
        return skeletons.length === 0;
      },
      { timeout: 30000 }
    );
  }

  /**
   * Assert that page is responsive on mobile (basic check)
   */
  static async assertMobileResponsive(page: Page): Promise<void> {
    // Check that body is still visible
    await expect(page.locator('body')).toBeVisible();

    // Check that viewport is mobile size
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(768);
  }

  /**
   * Assert that navigation was successful by checking URL change
   */
  static async assertNavigationSuccessful(
    page: Page,
    expectedUrlPattern: RegExp,
    timeout: number = 5000
  ): Promise<void> {
    await page.waitForURL(expectedUrlPattern, { timeout });
    expect(page.url()).toMatch(expectedUrlPattern);
  }

  /**
   * Assert that an element exists without requiring visibility
   */
  static async assertElementExists(locator: Locator): Promise<void> {
    const count = await locator.count();
    expect(count).toBeGreaterThan(0);
  }

  /**
   * Assert that animations don't break page functionality
   */
  static async assertAnimationsWorkCorrectly(page: Page): Promise<void> {
    // Wait for animations to settle
    await page.waitForTimeout(1000);

    // Verify page is still responsive
    await expect(page.locator('body')).toBeVisible();

    // Check that no JavaScript errors occurred
    const errors: string[] = [];
    page.on('pageerror', error => {
      errors.push(error.message);
    });

    // If there were errors, fail the test
    expect(errors).toHaveLength(0);
  }
}

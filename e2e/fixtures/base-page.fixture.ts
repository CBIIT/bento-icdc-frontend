import { test as base, Page } from '@playwright/test';

export interface BasePageFixture {
  basePage: BasePage;
}

export class BasePage {
  // eslint-disable-next-line
  constructor(public readonly page: Page) {}

  /**
   * Handle the government warning overlay dialog that appears on first visit
   */
  async handleWarningDialog(): Promise<void> {
    try {
      const warningDialog = this.page.getByRole('dialog', { name: 'Warning' });
      if (await warningDialog.isVisible()) {
        await this.page.getByRole('button', { name: 'Continue' }).click();
      }
    } catch (error) {
      // Dialog might not appear or might have already been dismissed
      console.error('Warning dialog not found or already dismissed', error);
    }
  }

  /**
   * Wait for content to load by checking that skeleton loaders are gone
   */
  async waitForContentLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const skeletons = document.querySelectorAll('[class*="MuiSkeleton"]');
        return skeletons.length === 0;
      },
      { timeout }
    );
  }

  /**
   * Wait for page to be fully loaded and ready for interaction
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.handleWarningDialog();
    await this.waitForContentLoad();
  }

  /**
   * Navigate to a specific URL and wait for page to be ready
   */
  async navigateAndWaitForReady(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageReady();
  }

  /**
   * Set viewport size for responsive testing
   */
  async setMobileViewport(): Promise<void> {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  /**
   * Set viewport size for tablet testing
   */
  async setTabletViewport(): Promise<void> {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  /**
   * Set viewport size for desktop testing
   */
  async setDesktopViewport(): Promise<void> {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * Check if an element exists without throwing an error
   */
  async elementExists(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      return (await element.count()) > 0;
    } catch {
      return false;
    }
  }

  /**
   * Wait for animations to settle
   */
  async waitForAnimations(timeout: number = 1000): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }
}

export const test = base.extend<BasePageFixture>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});

export { expect } from '@playwright/test';

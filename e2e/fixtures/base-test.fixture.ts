import { test as base } from '@playwright/test';
import { BasePage, BasePageFixture } from './base-page.fixture';
import { LandingPage, LandingPageFixture } from './landing-page.fixture';

/**
 * Extended test fixture that includes all common page objects and utilities
 */
export interface BaseTestFixture extends BasePageFixture, LandingPageFixture {
  // Add other page objects here as they are created
}

/**
 * Base test configuration with all fixtures
 */
export const test = base.extend<BaseTestFixture>({
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

/**
 * Centralized exports for all test fixtures
 */

export { BasePage, test as basePageTest, expect } from './base-page.fixture';
export { LandingPage, test as landingPageTest } from './landing-page.fixture';
export { test, expect as baseExpect } from './base-test.fixture';

// Export types
export type { BasePageFixture } from './base-page.fixture';
export type { LandingPageFixture } from './landing-page.fixture';
export type { BaseTestFixture } from './base-test.fixture';

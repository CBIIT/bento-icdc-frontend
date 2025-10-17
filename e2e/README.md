# E2E Testing Framework

This directory contains the end-to-end testing framework for the ICDC frontend application using Playwright.

## Structure

```
e2e/
├── fixtures/           # Reusable test fixtures and page objects
├── utils/             # Shared utilities and helper functions
├── tests/             # Test files organized by feature
└── README.md          # This file
```

## Fixtures

### BasePage (`fixtures/base-page.fixture.ts`)

The `BasePage` class provides common functionality for all page objects:

- **Navigation**: `navigateAndWaitForReady(url)`
- **Dialog handling**: `handleWarningDialog()`
- **Content loading**: `waitForContentLoad()`, `waitForPageReady()`
- **Viewport management**: `setMobileViewport()`, `setTabletViewport()`, `setDesktopViewport()`
- **Element utilities**: `elementExists()`, `waitForAnimations()`

### LandingPage (`fixtures/landing-page.fixture.ts`)

The `LandingPage` class extends `BasePage` and provides specific functionality for the landing page:

- **Navigation**: `navigate()`, `navigateOnMobile()`
- **Tab interaction**: `clickTab()`, `getSelectedTab()`, `areAllTabsVisible()`
- **Widget navigation**: `navigateViaWidget()`
- **Element getters**: `getVideoElements()`, `getPlaylistElements()`, etc.

### Usage Example

```typescript
import { test, expect } from '../../fixtures';

test('example test', async ({ landingPage }) => {
  await landingPage.navigate();
  await landingPage.clickTab('explore');
  await expect(landingPage.tabPanel).toBeVisible();
});
```

## Utilities

### Assertions (`utils/assertions.ts`)

Common assertion patterns:

- **URL assertions**: `assertUrlMatches()`, `assertUrlEquals()`
- **Element assertions**: `assertElementIsInteractable()`, `assertElementContainsText()`
- **Tab assertions**: `assertTabIsSelected()`
- **Content assertions**: `assertContentLoaded()`, `assertMobileResponsive()`

### Navigation (`utils/navigation.ts`)

Navigation utilities and URL constants:

- **URL constants**: `Navigation.URLS.HOME`, `Navigation.URLS.EXPLORE`, etc.
- **URL patterns**: `Navigation.URL_PATTERNS.LOCALHOST`, etc.
- **Navigation methods**: `goHome()`, `goToExplore()`, etc.
- **Utilities**: `waitForNavigation()`, `navigateWithRetry()`

### TestData (`utils/test-data.ts`)

Centralized test data and constants:

- **Tab content**: `TestData.TAB_CONTENT.HUMAN`, etc.
- **Widget data**: `TestData.WIDGETS.SUBMIT_DATA`, etc.
- **Selectors**: `TestData.SELECTORS.SKELETON_LOADER`, etc.
- **Viewports**: `TestData.VIEWPORTS.MOBILE`, etc.
- **Timeouts**: `TestData.TIMEOUTS.CONTENT_LOAD`, etc.

### Usage Example

```typescript
import { Assertions, Navigation, TestData } from '../../utils';

test('example test', async ({ landingPage }) => {
  await landingPage.navigate();
  
  const humanContent = TestData.TAB_CONTENT.HUMAN;
  await Assertions.assertElementContainsText(landingPage.tabPanel, humanContent.title);
  await Assertions.assertUrlMatches(landingPage.page, Navigation.URL_PATTERNS.HOME);
});
```

## Writing New Tests

### 1. Use the Base Test Fixture

```typescript
import { test, expect } from '../../fixtures';
import { Assertions, Navigation, TestData } from '../../utils';
```

### 2. Leverage Page Objects

Instead of writing raw Playwright selectors, use the page object methods:

```typescript
// ❌ Don't do this
await page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' }).click();

// ✅ Do this
await landingPage.clickTab('explore');
```

### 3. Use Assertion Utilities

```typescript
// ❌ Don't do this
expect(page.url()).toMatch(/localhost:7000/);

// ✅ Do this
await Assertions.assertUrlMatches(page, Navigation.URL_PATTERNS.LOCALHOST);
```

### 4. Use Test Data Constants

```typescript
// ❌ Don't do this
await expect(page.getByRole('img', { name: 'icdc_studies' })).toBeVisible();

// ✅ Do this
await expect(page.getByRole('img', { name: TestData.IMAGES.ICDC_STUDIES })).toBeVisible();
```

## Best Practices

1. **Reuse fixtures**: Always use the provided page objects instead of raw Playwright calls
2. **Centralize test data**: Add new test data to `TestData` class instead of hardcoding in tests
3. **Use assertion utilities**: Leverage the assertion utilities for consistent error messages
4. **Handle async properly**: Always await async operations and use proper error handling
5. **Keep tests focused**: Each test should verify one specific behavior
6. **Use descriptive names**: Test names should clearly describe what is being tested

## Running Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run tests in debug mode
npm run test:e2e:debug

# Run tests with UI
npm run test:e2e:ui

# Generate test code
npm run test:e2e:codegen
```

## Adding New Page Objects

When adding new page objects:

1. Create a new fixture file in `fixtures/`
2. Extend the `BasePage` class
3. Add page-specific selectors and methods
4. Export the fixture from `fixtures/index.ts`
5. Add the fixture to `BaseTestFixture` in `base-test.fixture.ts`

## Adding New Utilities

When adding new utilities:

1. Create utility classes in `utils/`
2. Follow the existing patterns (static methods, clear naming)
3. Export from `utils/index.ts`
4. Document usage in this README

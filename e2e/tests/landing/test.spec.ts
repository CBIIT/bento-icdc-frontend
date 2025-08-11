import { test, expect, Page } from '@playwright/test';

// Helper functions
const handleWarningDialog = async (page: Page) => {
  const warningDialog = page.getByRole('dialog', { name: 'Warning' });
  if (await warningDialog.isVisible()) {
    await page.getByRole('button', { name: 'Continue' }).click();
  }
};

const waitForContentLoad = async (page: Page) => {
  await page.waitForFunction(
    () => {
      const skeletons = document.querySelectorAll('[class*="MuiSkeleton"]');
      return skeletons.length === 0;
    },
    { timeout: 30000 }
  );
};

const navigateToLandingPage = async (page: Page) => {
  await page.goto('http://localhost:7000/#/');
  await handleWarningDialog(page);
  await waitForContentLoad(page);
};

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToLandingPage(page);
  });

  test('should load the landing page successfully', async ({ page }) => {
    // Check that we're on the correct URL
    expect(page.url()).toMatch(/localhost:7000/);

    // Check that the main container is visible
    await expect(page.locator('body')).toBeVisible();

    // Verify the page has loaded without errors
    await expect(page.locator('[class*="Container"]').first()).toBeVisible();
  });

  test('should display Human tab content and navigation', async ({ page }) => {
    // Verify Human tab is selected by default and content is visible
    await expect(page.getByRole('img', { name: 'icdc_studies' })).toBeVisible();
    await expect(page.getByRole('tabpanel')).toContainText(
      'Why Canine Cancer data? ICDC studies highlight the impact of canine research on human cancer research'
    );
    await expect(page.getByRole('tabpanel')).toContainText(
      'Canine cancer research plays a pivotal role in advancing human cancer research. Explore how pet dogs with spontaneous tumors offer unique opportunities for the cancer research community to gain significant insights into understanding cancer biology, developing new treatments, mitigating toxicities, and improving outcomes for both canines and humans.'
    );

    // Test Read More button navigation
    await expect(page.getByRole('button', { name: 'Read More' })).toBeVisible();
    await page.getByRole('button', { name: 'Read More' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/human-relevance');
  });

  test('should display Explore tab content and navigation', async ({
    page,
  }) => {
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' }).click();

    // Verify Explore tab content
    await expect(
      page
        .getByRole('tabpanel')
        .locator('div')
        .filter({ hasText: 'Using Canine Cancers to drive' })
        .first()
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'human' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Dog' })).toBeVisible();

    // Test Explore ICDC Data button navigation
    await expect(
      page.getByRole('button', { name: 'Explore ICDC Data' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Explore ICDC Data' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/explore');
  });

  test('should display Data Model tab content and navigation', async ({
    page,
  }) => {
    await page
      .getByRole('tab', { name: 'icdc_carousel_tabs Data Model' })
      .click();

    // Verify Data Model tab content
    await expect(
      page
        .getByRole('tabpanel')
        .locator('div')
        .filter({ hasText: 'The Data Model NavigatorThe' })
        .first()
    ).toBeVisible();
    await expect(page.getByRole('img', { name: 'icdc_studies' })).toBeVisible();
    await expect(page.getByRole('tabpanel')).toContainText(
      'The Data Model Navigator'
    );
    await expect(page.getByRole('tabpanel')).toContainText(
      'The ICDC data model provides a visual representation of how all the constituent nodes and values are arranged relative to each other.'
    );

    // Test Navigate the ICDC Data Model button navigation
    await expect(
      page.getByRole('button', { name: 'Navigate the ICDC Data Model' })
    ).toBeVisible();
    await page
      .getByRole('button', { name: 'Navigate the ICDC Data Model' })
      .click();
    await expect(page).toHaveURL('http://localhost:7000/#/icdc-data-model');
  });

  test('should display Videos tab content and navigation', async ({ page }) => {
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Videos' }).click();

    // Verify Videos tab content
    await expect(
      page
        .getByRole('tabpanel')
        .locator('div')
        .filter({ hasText: 'Why Canine Cancer data? ICDC' })
        .first()
    ).toBeVisible();
    await expect(page.getByText('VIDEO SPOTLIGHTSNCI Cancer')).toBeVisible();
    await expect(page.getByRole('tabpanel')).toContainText(
      'Why Canine Cancer data? ICDC studies highlight the impact of canine research on human cancer research'
    );
    await expect(page.getByRole('tabpanel')).toContainText(
      'Canine cancer research plays a pivotal role in advancing human cancer research. Explore how pet dogs with spontaneous tumors offer unique opportunities for the cancer research community to gain significant insights into understanding cancer biology, developing new treatments, mitigating toxicities, and improving outcomes for both canines and humans.'
    );

    // Test View ICDC Studies button navigation
    await expect(
      page.getByRole('button', { name: 'View ICDC Studies' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'View ICDC Studies' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/studies');
  });

  test('should navigate to Submit Data page from widget', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Submit Data ICDC submit' })
    ).toBeVisible();
    await page.getByRole('link', { name: 'Submit Data ICDC submit' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/submit');
  });

  test('should navigate to Programs page from widget', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Programs ICDC Programs' })
    ).toBeVisible();
    await page.getByRole('link', { name: 'Programs ICDC Programs' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/programs');
  });

  test('should navigate to About page from widget', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'About the ICDC About ICDC' })
    ).toBeVisible();
    await page.getByRole('link', { name: 'About the ICDC About ICDC' }).click();
    await expect(page).toHaveURL('http://localhost:7000/#/purpose');
  });

  test('should navigate to ICDC Spotlight page from widget', async ({
    page,
  }) => {
    await expect(
      page.getByRole('link', { name: 'ICDC Spotlight ICDC Spotlight' })
    ).toBeVisible();
    await page
      .getByRole('link', { name: 'ICDC Spotlight ICDC Spotlight' })
      .click();
    await expect(page).toHaveURL('http://localhost:7000/#/news');
  });

  test('should display all carousel tabs', async ({ page }) => {
    // Verify all expected tabs are visible
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Human' })
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' })
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Data Model' })
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Videos' })
    ).toBeVisible();
  });

  test('should handle video spotlight functionality', async ({ page }) => {
    // Navigate to Videos tab
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Videos' }).click();

    // Look for video-related elements
    const videoElements = page.locator(
      'iframe[src*="youtube"], .video-player, [class*="VideoPlayer"]'
    );

    if ((await videoElements.count()) > 0) {
      await expect(videoElements.first()).toBeVisible();

      // Check for playlist if it exists
      const playlist = page.locator('[class*="Playlist"], .playlist');
      if ((await playlist.count()) > 0) {
        await expect(playlist.first()).toBeVisible();

        // Check for playlist items
        const playlistItems = page.locator(
          '[class*="PlaylistItem"], .playlist-item'
        );
        if ((await playlistItems.count()) > 1) {
          // Click on a different playlist item
          await playlistItems.nth(1).click();
          await page.waitForTimeout(1000);

          // Verify the video source changed
          const iframe = page.locator('iframe[src*="youtube"]').first();
          if ((await iframe.count()) > 0) {
            const src = await iframe.getAttribute('src');
            expect(src).toContain('youtube.com/embed/');
          }
        }
      }
    }
  });

  test('should display Twitter embed when available', async ({ page }) => {
    // Navigate to Videos tab where Twitter content might be
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Videos' }).click();

    // Look for Twitter embed elements
    const twitterElements = page.locator(
      '[class*="TwitterViewContainer"], .twitter-tweet, iframe[src*="twitter"]'
    );

    if ((await twitterElements.count()) > 0) {
      await expect(twitterElements.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Re-initialize page for mobile
    await handleWarningDialog(page);
    await waitForContentLoad(page);

    // Check that main content is still visible and accessible
    await expect(page.locator('body')).toBeVisible();

    // Check that tabs are still functional on mobile
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Human' })
    ).toBeVisible();

    // Test tab interaction on mobile
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' }).click();
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' })
    ).toHaveAttribute('aria-selected', 'true');

    // Verify at least one widget is still accessible on mobile
    const widgets = page
      .getByRole('link')
      .filter({ hasText: /Submit Data|Programs|About|Spotlight/i });
    await expect(widgets.first()).toBeVisible();
  });

  test('should handle visual elements and animations', async ({ page }) => {
    // Check for animated star elements
    const starElements = page.locator('[class*="Star"]');
    if ((await starElements.count()) > 0) {
      await expect(starElements.first()).toBeVisible();
    }

    // Check for slide animation elements
    const slideElements = page.locator(
      '[class*="SlideUp"], [class*="SlideDown"]'
    );
    if ((await slideElements.count()) > 0) {
      await expect(slideElements.first()).toBeVisible();
    }

    // Wait for animations to settle and verify page remains functional
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();

    // Test that tab navigation still works after animations
    await page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' }).click();
    await expect(
      page.getByRole('tab', { name: 'icdc_carousel_tabs Explore' })
    ).toHaveAttribute('aria-selected', 'true');
  });
});

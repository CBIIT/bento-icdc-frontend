import { test, expect } from '../../fixtures';
import { Assertions, Navigation, TestData } from '../../utils';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.navigate();
  });

  test('should load the landing page successfully', async ({ landingPage }) => {
    // Check that we're on the correct URL
    Assertions.assertUrlMatches(
      landingPage.page,
      Navigation.URL_PATTERNS.LOCALHOST
    );

    // Check that the main container is visible
    await expect(landingPage.body).toBeVisible();

    // Verify the page has loaded without errors
    await expect(landingPage.mainContainer).toBeVisible();
  });

  test('should display Human tab content and navigation', async ({
    landingPage,
  }) => {
    const humanContent = TestData.TAB_CONTENT.HUMAN;

    // Verify Human tab is selected by default and content is visible
    await expect(
      landingPage.page.getByRole('img', { name: TestData.IMAGES.ICDC_STUDIES })
    ).toBeVisible();
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      humanContent.title
    );
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      humanContent.description
    );

    // Test Read More button navigation
    const readMoreButton = landingPage.page.getByRole('button', {
      name: humanContent.buttonText,
    });
    await Assertions.assertElementIsInteractable(readMoreButton);
    await readMoreButton.click();
    await Assertions.assertUrlEquals(
      landingPage.page,
      humanContent.expectedUrl
    );
  });

  test('should display Explore tab content and navigation', async ({
    landingPage,
  }) => {
    const exploreContent = TestData.TAB_CONTENT.EXPLORE;

    await landingPage.clickTab('explore');

    // Verify Explore tab content
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      exploreContent.title
    );
    await expect(
      landingPage.page.getByRole('img', { name: TestData.IMAGES.HUMAN })
    ).toBeVisible();
    await expect(
      landingPage.page.getByRole('img', { name: TestData.IMAGES.DOG })
    ).toBeVisible();

    // Test Explore ICDC Data button navigation
    const exploreButton = landingPage.page.getByRole('button', {
      name: exploreContent.buttonText,
    });
    await Assertions.assertElementIsInteractable(exploreButton);
    await exploreButton.click();
    await Assertions.assertUrlEquals(
      landingPage.page,
      exploreContent.expectedUrl
    );
  });

  test('should display Data Model tab content and navigation', async ({
    landingPage,
  }) => {
    const dataModelContent = TestData.TAB_CONTENT.DATA_MODEL;

    await landingPage.clickTab('dataModel');

    // Verify Data Model tab content
    await expect(
      landingPage.page.getByRole('img', { name: TestData.IMAGES.ICDC_STUDIES })
    ).toBeVisible();
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      dataModelContent.title
    );
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      dataModelContent.description
    );

    // Test Navigate the ICDC Data Model button navigation
    const dataModelButton = landingPage.page.getByRole('button', {
      name: dataModelContent.buttonText,
    });
    await Assertions.assertElementIsInteractable(dataModelButton);
    await dataModelButton.click();
    await Assertions.assertUrlEquals(
      landingPage.page,
      dataModelContent.expectedUrl
    );
  });

  test('should display Videos tab content and navigation', async ({
    landingPage,
  }) => {
    const videosContent = TestData.TAB_CONTENT.VIDEOS;

    await landingPage.clickTab('videos');

    // Verify Videos tab content
    await expect(
      landingPage.page.getByText(videosContent.videoSpotlight)
    ).toBeVisible();
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      videosContent.title
    );
    await Assertions.assertElementContainsText(
      landingPage.tabPanel,
      videosContent.description
    );

    // Test View ICDC Studies button navigation
    const studiesButton = landingPage.page.getByRole('button', {
      name: videosContent.buttonText,
    });
    await Assertions.assertElementIsInteractable(studiesButton);
    await studiesButton.click();
    await Assertions.assertUrlEquals(
      landingPage.page,
      videosContent.expectedUrl
    );
  });

  test('should navigate to Submit Data page from widget', async ({
    landingPage,
  }) => {
    const submitData = TestData.WIDGETS.SUBMIT_DATA;
    await Assertions.assertElementIsInteractable(landingPage.submitDataLink);
    await landingPage.navigateViaWidget('submitData');
    await Assertions.assertUrlEquals(landingPage.page, submitData.expectedUrl);
  });

  test('should navigate to Programs page from widget', async ({
    landingPage,
  }) => {
    const programs = TestData.WIDGETS.PROGRAMS;
    await Assertions.assertElementIsInteractable(landingPage.programsLink);
    await landingPage.navigateViaWidget('programs');
    await Assertions.assertUrlEquals(landingPage.page, programs.expectedUrl);
  });

  test('should navigate to About page from widget', async ({ landingPage }) => {
    const about = TestData.WIDGETS.ABOUT;
    await Assertions.assertElementIsInteractable(landingPage.aboutLink);
    await landingPage.navigateViaWidget('about');
    await Assertions.assertUrlEquals(landingPage.page, about.expectedUrl);
  });

  test('should navigate to ICDC Spotlight page from widget', async ({
    landingPage,
  }) => {
    const spotlight = TestData.WIDGETS.SPOTLIGHT;
    await Assertions.assertElementIsInteractable(landingPage.spotlightLink);
    await landingPage.navigateViaWidget('spotlight');
    await Assertions.assertUrlEquals(landingPage.page, spotlight.expectedUrl);
  });

  test('should display all carousel tabs', async ({ landingPage }) => {
    // Verify all expected tabs are visible
    const allTabsVisible = await landingPage.areAllTabsVisible();
    expect(allTabsVisible).toBe(true);

    // Verify individual tabs
    await expect(landingPage.humanTab).toBeVisible();
    await expect(landingPage.exploreTab).toBeVisible();
    await expect(landingPage.dataModelTab).toBeVisible();
    await expect(landingPage.videosTab).toBeVisible();
  });

  test('should handle video spotlight functionality', async ({
    landingPage,
  }) => {
    // Navigate to Videos tab
    await landingPage.clickTab('videos');

    // Look for video-related elements
    const videoElements = landingPage.getVideoElements();

    if ((await videoElements.count()) > 0) {
      await expect(videoElements.first()).toBeVisible();

      // Check for playlist if it exists
      const playlist = landingPage.getPlaylistElements();
      if ((await playlist.count()) > 0) {
        await expect(playlist.first()).toBeVisible();

        // Check for playlist items
        const playlistItems = landingPage.getPlaylistItemElements();
        if ((await playlistItems.count()) > 1) {
          // Click on a different playlist item
          await playlistItems.nth(1).click();
          await landingPage.waitForAnimations();

          // Verify the video source changed
          const iframe = landingPage.page
            .locator('iframe[src*="youtube"]')
            .first();
          if ((await iframe.count()) > 0) {
            await Assertions.assertValidYouTubeVideo(iframe);
          }
        }
      }
    }
  });

  test('should display Twitter embed when available', async ({
    landingPage,
  }) => {
    // Navigate to Videos tab where Twitter content might be
    await landingPage.clickTab('videos');

    // Look for Twitter embed elements
    const twitterElements = landingPage.getTwitterElements();

    if ((await twitterElements.count()) > 0) {
      await expect(twitterElements.first()).toBeVisible();
    }
  });

  test('should be responsive on mobile devices', async ({ landingPage }) => {
    // Set mobile viewport and reload
    await landingPage.navigateOnMobile();

    // Check that main content is still visible and accessible
    await Assertions.assertMobileResponsive(landingPage.page);

    // Check that tabs are still functional on mobile
    await expect(landingPage.humanTab).toBeVisible();

    // Test tab interaction on mobile
    await landingPage.clickTab('explore');
    await Assertions.assertTabIsSelected(landingPage.exploreTab);

    // Verify at least one widget is still accessible on mobile
    const widgets = landingPage.page
      .getByRole('link')
      .filter({ hasText: /Submit Data|Programs|About|Spotlight/i });
    await expect(widgets.first()).toBeVisible();
  });

  test('should handle visual elements and animations', async ({
    landingPage,
  }) => {
    // Check for animated star elements
    const starElements = landingPage.getStarElements();
    if ((await starElements.count()) > 0) {
      await expect(starElements.first()).toBeVisible();
    }

    // Check for slide animation elements
    const slideElements = landingPage.getSlideElements();
    if ((await slideElements.count()) > 0) {
      await expect(slideElements.first()).toBeVisible();
    }

    // Wait for animations to settle and verify page remains functional
    await Assertions.assertAnimationsWorkCorrectly(landingPage.page);

    // Test that tab navigation still works after animations
    await landingPage.clickTab('explore');
    await Assertions.assertTabIsSelected(landingPage.exploreTab);
  });
});

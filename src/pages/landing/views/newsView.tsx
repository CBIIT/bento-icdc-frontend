/* eslint-disable */
import React from 'react';
import styled from '@emotion/styled';
import { ErrorOutline } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import lbg from '../../../assets/landing/Background.png';
import NewsViewImage from './NewsViewImage';
import NewsViewVideo from './NewsViewVideo';
import newsIcon from '../../../assets/icons/ICDC_News.png';
import { AnnouncementCard } from './news/AnnouncementCard';
import { PublicationCard } from './news/PublicationCard';
import { ReleaseCard } from './news/ReleaseCard';
import {
  NEWS_ASSET_URLS,
  NEWS_COLORS,
  NEWS_COPY,
  NEWS_FONT_FAMILIES,
  NEWS_HTML_ATTRIBUTES,
  NEWS_PANEL_TOKENS,
  NEWS_TEST_IDS,
  RELEASE_CARD_CONFIGS,
  TWEET_LOAD_TIMEOUT_MS,
} from './news/constants';
import type { NewsPageData, NewsSection } from './news/types';

// Styled Components
const Page = styled.div`
  min-height: 100%;
  padding: 3em 0 5em;
  background: ${NEWS_COLORS.pageBackground};
  background-image: url(${lbg});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const NewsPanel = styled.main`
  box-sizing: border-box;
  display: flex;
  width: min(1200px, calc(100% - 32px));
  flex-direction: column;
  margin: 0 auto;
  padding: ${NEWS_PANEL_TOKENS.desktopPadding};
  border-radius: 15px;
  background: ${NEWS_PANEL_TOKENS.fallbackGradient};
  background-blend-mode: darken;

  @supports (
    (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))
  ) {
    background: ${NEWS_PANEL_TOKENS.translucentGradient};
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }

  @media (max-width: 900px) {
    padding: ${NEWS_PANEL_TOKENS.mobilePadding};
  }
`;

const PageBannerText = styled.h1`
  margin: 0 0 28px;
  color: ${NEWS_COLORS.cardSurface};
  font-family: ${NEWS_FONT_FAMILIES.raleway};
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 35px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: middle;
`;

const OutterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
`;

const ListSection = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.38fr) minmax(0, 0.62fr);
  gap: 28px;
  width: 100%;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3em;
  }
`;

const NewsListTitleBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 946px;

  @media (max-width: 900px) {
    width: min(30em, calc(100vw - 2em));
  }
`;

const SectionHeader = styled.h2`
  min-height: 37px;
  height: 37px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 12px;
  background: ${NEWS_COLORS.sectionHeader};
  border-radius: 8px 8px 0 0;
  color: ${NEWS_COLORS.cardSurface};
  font-family: ${NEWS_FONT_FAMILIES.roboto};
  font-size: 17px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0;
`;

const NewsListBanner = styled.div`
  background-image: url(${NEWS_ASSET_URLS.banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 7em;
`;

const NewsList = styled.div`
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  background-color: ${NEWS_COLORS.listSurface};
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-right-radius: 0.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${NEWS_COLORS.scrollbarDark} transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${NEWS_COLORS.scrollbarDark};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const TwitterAndImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`;

const SectionCard = styled.section`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  align-self: center;
  background: ${NEWS_COLORS.cardSurface};
  border-radius: 8px;
  overflow: hidden;
`;

const TwitterSectionContainer = styled(SectionCard)`
  display: flex;
  flex-direction: column;
  height: 653px;
`;

const TwitterSectionWrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  justify-content: center;
  padding: 12px 10px 14px;
  box-sizing: border-box;
`;

const TwitterSection = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  overflow-y: auto;
  background: ${NEWS_COLORS.cardSurface};
  box-sizing: border-box;

  & .twitter-tweet,
  & iframe {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${NEWS_COLORS.scrollbarLight};
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }

  scrollbar-width: thin;
  scrollbar-color: ${NEWS_COLORS.scrollbarLight} transparent;
`;

const TweetSkeletonCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 220px;
  flex-direction: column;
  gap: 14px;
  height: 220px;
  padding: 16px;
  border: 1px solid ${NEWS_COLORS.imageSkeletonBorder};
  border-radius: 12px;
  background: ${NEWS_COLORS.cardSurface};
`;

const TweetSkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TweetSkeletonLines = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 9px;
`;

const TweetErrorCard = styled(TweetSkeletonCard)`
  align-items: center;
  justify-content: center;
  color: ${NEWS_COLORS.secondaryText};
  text-align: center;
`;

const TweetErrorIcon = styled(ErrorOutline)`
  color: ${NEWS_COLORS.closeControl};
  font-size: 30px;
`;

const TweetErrorMessage = styled.p`
  max-width: 260px;
  margin: 0;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 15px;
  line-height: 22px;
`;

const RetryButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${NEWS_COLORS.closeControl};
  border-radius: 4px;
  background: ${NEWS_COLORS.cardSurface};
  color: ${NEWS_COLORS.retryText};
  cursor: pointer;
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: ${NEWS_COLORS.retryHover};
  }

  &:focus-visible {
    outline: 2px solid ${NEWS_COLORS.focusOutline};
    outline-offset: 2px;
  }
`;

const AnimatedSkeleton = styled(Skeleton)`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ScreenReaderStatus = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const ImageSectionContainer = styled(SectionCard)`
  height: 275px;
`;

const ImagePackBody = styled.div`
  height: calc(100% - 37px);
  box-sizing: border-box;
  padding: 11px 10px 17px;
  overflow: hidden;
`;

const ImageStrip = styled.div`
  display: flex;
  width: 100%;
  height: 210px;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const VideoSectionContainer = styled(SectionCard)`
  width: 100%;
`;

const VideoSectionHeader = styled(SectionHeader)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 0;

  span {
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
`;

const FeaturedVideo = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
  padding: 1em;
  background-color: ${NEWS_COLORS.cardSurface};
`;

const OtherVideos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const TweetSkeleton = () => (
  <TweetSkeletonCard aria-hidden="true">
    <TweetSkeletonHeader>
      <AnimatedSkeleton
        variant="circular"
        width={40}
        height={40}
        animation="wave"
      />
      <div>
        <AnimatedSkeleton width={120} height={16} animation="wave" />
        <AnimatedSkeleton width={84} height={14} animation="wave" />
      </div>
    </TweetSkeletonHeader>
    <TweetSkeletonLines>
      <AnimatedSkeleton width="100%" height={15} animation="wave" />
      <AnimatedSkeleton width="92%" height={15} animation="wave" />
      <AnimatedSkeleton width="76%" height={15} animation="wave" />
    </TweetSkeletonLines>
  </TweetSkeletonCard>
);

type TweetProps = {
  tweetId: string;
  onSettled: (tweetId: string) => void;
  onPending: (tweetId: string) => void;
};

const Tweet = ({ tweetId, onSettled, onPending }: TweetProps) => {
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [hasTimedOut, setHasTimedOut] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    if (hasLoaded || hasTimedOut) return undefined;

    const timeoutId = window.setTimeout(() => {
      setHasTimedOut(true);
      setIsRetrying(false);
      onSettled(tweetId);
    }, TWEET_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [attempt, hasLoaded, hasTimedOut, onSettled, tweetId]);

  const handleRetry = () => {
    setHasLoaded(false);
    setHasTimedOut(false);
    setIsRetrying(true);
    setAttempt(currentAttempt => currentAttempt + 1);
    onPending(tweetId);
  };

  if (hasTimedOut) {
    return (
      <TweetErrorCard>
        <TweetErrorIcon aria-hidden="true" />
        <TweetErrorMessage>
          {NEWS_COPY.socialMediaPostLoadFailed}
        </TweetErrorMessage>
        <RetryButton
          type={NEWS_HTML_ATTRIBUTES.buttonType}
          onClick={handleRetry}
        >
          {NEWS_COPY.tryAgain}
        </RetryButton>
      </TweetErrorCard>
    );
  }

  return (
    <>
      {isRetrying && (
        <ScreenReaderStatus role="status">
          {NEWS_COPY.retrySocialMediaPost}
        </ScreenReaderStatus>
      )}
      {!hasLoaded && <TweetSkeleton />}
      <div hidden={!hasLoaded}>
        <TwitterTweetEmbed
          key={attempt}
          tweetId={tweetId}
          onLoad={() => {
            setHasLoaded(true);
            setIsRetrying(false);
            onSettled(tweetId);
          }}
        />
      </div>
    </>
  );
};

// Twitter Section Component
function TwitterSectionComponent({
  title,
  posts,
  ...props
}: {
  title: string;
  posts: string[];
}) {
  const [settledTweetIds, setSettledTweetIds] = React.useState<string[]>([]);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] =
    React.useState(false);
  const isLoading = settledTweetIds.length < posts.length;

  const markTweetAsSettled = React.useCallback((tweetId: string) => {
    setSettledTweetIds(currentTweetIds =>
      currentTweetIds.includes(tweetId)
        ? currentTweetIds
        : [...currentTweetIds, tweetId]
    );
  }, []);

  const markTweetAsPending = React.useCallback((tweetId: string) => {
    setSettledTweetIds(currentTweetIds =>
      currentTweetIds.filter(currentTweetId => currentTweetId !== tweetId)
    );
  }, []);

  React.useEffect(() => {
    if (!isLoading) setHasCompletedInitialLoad(true);
  }, [isLoading]);

  return (
    <TwitterSectionContainer {...props}>
      <SectionHeader>{title}</SectionHeader>

      <TwitterSectionWrapper>
        <TwitterSection aria-busy={isLoading}>
          {isLoading && !hasCompletedInitialLoad && (
            <ScreenReaderStatus role="status">
              {NEWS_COPY.loadingSocialMediaPosts}
            </ScreenReaderStatus>
          )}
          {posts.map(tweetId => (
            <Tweet
              key={tweetId}
              tweetId={tweetId}
              onSettled={markTweetAsSettled}
              onPending={markTweetAsPending}
            />
          ))}
        </TwitterSection>
      </TwitterSectionWrapper>
    </TwitterSectionContainer>
  );
}

const findSection = <T extends NewsSection['type']>(
  sections: NewsSection[],
  type: T
) =>
  sections.find(
    (section): section is Extract<NewsSection, { type: T }> =>
      section.type === type
  );

const NewsView = ({ news }: { news: NewsPageData }) => {
  const announcements = findSection(news.sections, 'announcements');

  return (
    <Page>
      <NewsPanel>
        <PageBannerText>{news.pageTitle}</PageBannerText>

        <OutterContainer data-testid={NEWS_TEST_IDS.content}>
          <ListSection>
            <div>
              <NewsListTitleBar>
                <SectionHeader>{announcements?.title}</SectionHeader>
                <NewsListBanner />
                <NewsList>
                  {news.sections.map(section => {
                    switch (section.type) {
                      case 'dataModelReleases':
                        return (
                          <ReleaseCard
                            key={section.type}
                            title={section.title}
                            config={RELEASE_CARD_CONFIGS.dataModel}
                          />
                        );
                      case 'softwareReleases':
                        return (
                          <ReleaseCard
                            key={section.type}
                            title={section.title}
                            config={RELEASE_CARD_CONFIGS.software}
                          />
                        );
                      case 'publications':
                        return (
                          <PublicationCard
                            key={section.type}
                            title={section.title}
                          />
                        );
                      case 'announcements':
                        if (!section.enabled) return null;

                        return (
                          <AnnouncementCard
                            key={section.type}
                            title={section.cardTitle}
                            icon={newsIcon}
                            announcements={section.items}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </NewsList>
              </NewsListTitleBar>
            </div>

            <TwitterAndImageSection>
              {news.sections.map(section => {
                if (section.type === 'social') {
                  return (
                    <TwitterSectionComponent
                      key={section.type}
                      title={section.title}
                      posts={section.posts}
                    />
                  );
                }

                if (section.type === 'images') {
                  return (
                    <ImageSectionContainer key={section.type}>
                      <SectionHeader>{section.title}</SectionHeader>
                      <ImagePackBody>
                        <ImageStrip aria-label={section.title}>
                          {section.items.map(item => (
                            <NewsViewImage
                              key={item.img}
                              img={item.img}
                              label={item.label}
                              alt={item.alt}
                              caption={item.caption}
                            />
                          ))}
                        </ImageStrip>
                      </ImagePackBody>
                    </ImageSectionContainer>
                  );
                }

                return null;
              })}
            </TwitterAndImageSection>
          </ListSection>

          {news.sections.map(section => {
            if (section.type !== 'videos') return null;

            return (
              <VideoSectionContainer key={section.type}>
                <VideoSectionHeader>
                  <span>{section.featuredHeading}</span>
                  <span>{section.otherHeading}</span>
                </VideoSectionHeader>

                <FeaturedVideo>
                  <div>
                    <NewsViewVideo
                      url={section.featured.vid}
                      label={section.featured.label}
                      description={section.featured.description}
                    />
                  </div>
                  <OtherVideos>
                    {section.others.map(video => (
                      <span key={video.id || video.vid}>
                        <NewsViewVideo
                          url={video.vid}
                          label={video.label}
                          description={video.description}
                        />
                      </span>
                    ))}
                  </OtherVideos>
                </FeaturedVideo>
              </VideoSectionContainer>
            );
          })}
        </OutterContainer>
      </NewsPanel>
    </Page>
  );
};

export default NewsView;

/* eslint-disable */
import React from 'react';
import styled from '@emotion/styled';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import axios from 'axios';
import lbg from '../../../assets/landing/Background.png';
import NewsItem from './NewsListItem';
import NewsViewImage from './NewsViewImage';
import NewsViewVideo from './NewsViewVideo';
import env from '../../../utils/env';
import { newsViewTweetIds } from '../../../bento/landingPageData';

const newsBanner =
  'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/png/icdc-news-page-update-banner.png';

// Styled Components
const Page = styled.div`
  min-height: 100%;
  background-color: #173d4d;
  background-image: linear-gradient(
      90deg,
      rgba(3, 19, 32, 0.26),
      rgba(3, 19, 32, 0.08)
    ),
    url(${lbg});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
  padding: clamp(42px, 6vw, 76px) 16px 72px;
  box-sizing: border-box;
`;

const OutterContainer = styled.div`
  width: min(1088px, 100%);
  margin: 0 auto;
  background: linear-gradient(
    180deg,
    rgba(11, 5, 23, 0.5) 30%,
    rgba(95, 131, 175, 0.36) 56%,
    rgba(95, 131, 175, 0) 76%
  );
  background-blend-mode: darken;
  border-radius: 8px;
  box-shadow: 0 22px 56px rgba(4, 13, 24, 0.35);
  box-sizing: border-box;
  padding: 40px clamp(18px, 5vw, 62px) 44px;

  @supports (backdrop-filter: blur(20px)) {
    backdrop-filter: blur(20px);
  }
`;

const PageTitle = styled.h1`
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-size: 35px;
  font-weight: 700;
  leading-trim: none;
  line-height: 35px;
  letter-spacing: 0;
  margin: 0 0 30px;
  text-align: center;
  vertical-align: middle;
`;

const ListSection = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(420px, 1.38fr);
  gap: 24px 30px;
  align-items: stretch;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const SectionBlock = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const SectionHeading = styled.h2`
  min-height: 31px;
  display: flex;
  align-items: center;
  background: #2f83b7;
  border-radius: 6px 6px 0 0;
  box-sizing: border-box;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 17px;
  font-weight: 600;
  leading-trim: none;
  line-height: 25px;
  letter-spacing: 0;
  margin: 0;
  padding: 0 12px;
`;

const SectionBody = styled.div`
  background: #fff;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
`;

const AnnouncementBody = styled(SectionBody)`
  background: #f2f3f5;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AnnouncementHero = styled.div`
  background-image: url(${newsBanner});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 4px;
`;

const AnnouncementHeroText = styled.div`
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-shadow: 0 1px 6px rgba(22, 32, 52, 0.45);
`;

const NewsList = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  overflow-x: hidden;
  padding: 12px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const TwitterAndImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
`;

const TwitterSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 10px 14px;
`;

const TwitterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 520px;
  width: 100%;
  max-width: 500px;
  overflow-y: auto;
  background: #fff;
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
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;

const ImagePackBody = styled(SectionBody)`
  padding: 8px;
  box-sizing: border-box;
`;

const ImageStrip = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const VideoSectionContainer = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
`;

const VideoSectionSubHeadingContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(235px, 1fr);
  background: #2f83b7;
  color: #fff;
  border-radius: 6px 6px 0 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const VideoSectionSubHeading = styled.h6`
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 800;
  line-height: 31px;
  margin: 0;
  padding: 0 12px;
`;

const FeaturedVideo = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(235px, 1fr);
  gap: 10px;
  align-items: stretch;
  padding: 10px;
  background-color: #fff;
  border-radius: 0 0 6px 6px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedVideoFrame = styled.div`
  height: 100%;
  min-height: 220px;
  background: #111;
  overflow: hidden;

  @media (max-width: 760px) {
    min-height: 0;
  }
`;

const OtherVideos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

const OtherVideoFrame = styled.div`
  aspect-ratio: 16 / 9;
  min-height: 105px;
  background: #111;
  overflow: hidden;
`;

// Twitter Section Component
function TwitterSectionComponent() {
  return (
    <SectionBody>
      <TwitterSectionWrapper>
        <TwitterSection>
          {newsViewTweetIds.map(tweetId => (
            <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />
          ))}
        </TwitterSection>
      </TwitterSectionWrapper>
    </SectionBody>
  );
}

const PUBLICATIONS_QUERY = `
  query getPublications {
    publication(
      orderBy: year_of_publication_desc
    ) {
      publication_title
      pubmed_id
      year_of_publication
    }
  }
`;

const NewsView = ({
  news,
}: {
  news: Record<string, any> | undefined;
}) => {
  const [dataModelReleases, setDataModelReleases] = React.useState<any[]>([]);
  const [softwareReleases, setSoftwareReleases] = React.useState<any[]>([]);
  const [publications, setPublications] = React.useState<any[]>([]);
  const [dataModelError, setDataModelError] = React.useState<boolean>(false);
  const [softwareError, setSoftwareError] = React.useState<boolean>(false);
  const [publicationsError, setPublicationsError] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    // Fetch GitHub releases for Data Model
    fetch('https://api.github.com/repos/CBIIT/icdc-model-tool/releases')
      .then(response => response.json())
      .then(releases => {
        const formattedReleases = releases.map((release: any) => ({
          label: 'VERSION',
          value: release.name || release.tag_name,
          date: new Date(release.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setDataModelReleases(formattedReleases);
        setDataModelError(false);
      })
      .catch(() => {
        setDataModelError(true);
      });

    // Fetch GitHub releases for Software
    fetch('https://api.github.com/repos/CBIIT/bento-icdc-frontend/releases')
      .then(response => response.json())
      .then(releases => {
        const formattedReleases = releases.map((release: any) => ({
          label: 'VERSION',
          value: release.name || release.tag_name,
          date: new Date(release.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setSoftwareReleases(formattedReleases);
        setSoftwareError(false);
      })
      .catch(() => {
        setSoftwareError(true);
      });

    // Fetch Publications from GraphQL API
    const backendAPI = (env as Record<string, string>).REACT_APP_BACKEND_API;
    if (backendAPI) {
      axios
        .post(backendAPI, {
          query: PUBLICATIONS_QUERY,
        })
        .then(response => {
          const pubs = response.data?.data?.publication || [];
          const formattedPubs = pubs.map((pub: any) => ({
            title: pub.publication_title,
            url: pub.pubmed_id
              ? `https://pubmed.ncbi.nlm.nih.gov/${pub.pubmed_id}/`
              : '#',
          }));
          setPublications(formattedPubs);
          setPublicationsError(false);
        })
        .catch(() => {
          setPublicationsError(true);
        });
    }
  }, []);

  // News content items - combines fetched data from various sources
  const newsContent = React.useMemo(
    () => [
      {
        title: 'Data Model Releases',
        icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-data-model-release.svg',
        type: 'table',
        items: dataModelReleases,
        error: dataModelError,
      },
      {
        title: 'Software Releases',
        icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-software-release.svg',
        type: 'table',
        items: softwareReleases,
        error: softwareError,
      },
      {
        title: 'Publications',
        icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/icdc-news-page-update-publications.svg',
        type: 'publications',
        items: publications,
        error: publicationsError,
      },
    ],
    [
      dataModelReleases,
      softwareReleases,
      publications,
      dataModelError,
      softwareError,
      publicationsError,
    ]
  );

  return (
    <Page>
      <OutterContainer>
        <PageTitle>ICDC News</PageTitle>

        <ListSection>
          <SectionBlock>
            <SectionHeading>
              {news?.tile1?.heading || 'ICDC Announcements'}
            </SectionHeading>

            <AnnouncementBody>
              <AnnouncementHero>
                <AnnouncementHeroText>Update</AnnouncementHeroText>
              </AnnouncementHero>

              <NewsList>
                {newsContent.map((item: any, index: number) => (
                  <NewsItem
                    key={`news-item-news-view-${index}`}
                    title={item.title}
                    icon={item.icon}
                    items={item.items}
                    type={item.type || 'table'}
                    error={item.error}
                  />
                ))}
              </NewsList>
            </AnnouncementBody>
          </SectionBlock>

          <TwitterAndImageSection>
            {news?.tile2 && (
              <SectionBlock>
                <SectionHeading>{news.tile2.heading}</SectionHeading>
                <TwitterSectionComponent />
              </SectionBlock>
            )}

            {news?.tile3 && news?.images && (
              <SectionBlock>
                <SectionHeading>{news.tile3.heading}</SectionHeading>

                <ImagePackBody>
                  <ImageStrip>
                    {news.images.map(
                      (item: Record<string, any>, index: number) => (
                        <NewsViewImage
                          key={`image-list-news-view-${index}`}
                          img={item.img}
                          label={item.label}
                          caption={item.caption}
                        />
                      )
                    )}
                  </ImageStrip>
                </ImagePackBody>
              </SectionBlock>
            )}
          </TwitterAndImageSection>

          {news?.tile4 && news?.youtube && (
            <VideoSectionContainer>
              <VideoSectionSubHeadingContainer>
                <VideoSectionSubHeading>
                  {news.tile4.subHeading1 || 'Featured Video'}
                </VideoSectionSubHeading>
                <VideoSectionSubHeading>
                  {news.tile4.subHeading2 || 'Other Videos'}
                </VideoSectionSubHeading>
              </VideoSectionSubHeadingContainer>

              <FeaturedVideo>
                <FeaturedVideoFrame>
                  <NewsViewVideo
                    url={news.youtube.main.vid}
                    label={news.youtube.main.label}
                    description={news.youtube.main.description}
                  />
                </FeaturedVideoFrame>
                <OtherVideos>
                  {news.youtube.others.map(
                    (vid: Record<string, any>, index: number) => (
                      <OtherVideoFrame
                        key={`news-view-video-news-view-${index}`}
                      >
                        <NewsViewVideo
                          url={vid.vid}
                          label={vid.label}
                          description={news.youtube.main.description}
                        />
                      </OtherVideoFrame>
                    )
                  )}
                </OtherVideos>
              </FeaturedVideo>
            </VideoSectionContainer>
          )}
        </ListSection>
      </OutterContainer>
    </Page>
  );
};

export default NewsView;

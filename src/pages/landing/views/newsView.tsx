/* eslint-disable */
import React from 'react';
import { ImageList } from '@mui/material';
import styled from '@emotion/styled';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useQuery } from '@tanstack/react-query';
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
  background: #5e8ca5;
  background-image: url(${lbg});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

const PageBanner = styled.div`
  background-color: rgba(25, 119, 204, 0.61);
  height: 12.8em;
  margin-top: -3.3em;
  display: flex;
  align-items: center;
  padding-left: 35em;
  position: relative;
  font-family: 'Raleway';
`;

const PageBannerText = styled.h1`
  color: white;
  font-weight: bold;
  font-family: 'Raleway';
  font-size: 3.7em;
`;

const OutterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5em;
  padding-bottom: 5em;
  gap: 2em;
  height: 100%;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3em;
`;

const NewsListHeading = styled.h4`
  color: #fff;
  font-size: 2em;
  font-family: 'Raleway';
  margin: 0;
`;

const NewsListTitleBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsListTitle = styled.div`
  border-top-right-radius: 0.5em;
  border-top-left-radius: 0.5em;
  -webkit-border-top-left-radius: 0.5em;
  -webkit-border-top-right-radius: 0.5em;
  background-image: url(${newsBanner});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  font-size: 1.2em;
  margin: 0;
  min-height: 74px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const NewsList = styled.div`
  width: 30em;
  height: 65.8em;
  background-color: #f5f5f5;
  overflow: auto;
  overflow-x: hidden;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-right-radius: 0.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;

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
`;

const TwitterSectionHeading = styled.h4`
  color: #fff;
  font-size: 2em;
  font-family: 'Raleway';
  margin: 0;
`;

const TwitterSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  background: #fff;
  flex-direction: column;
  border-radius: 0.5em;
`;

const TwitterSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TwitterSectionSubHeadingContainer = styled.div`
  display: flex;
  background: #1977cc;
  justify-content: space-between;
  padding: 0.5em 12.2em 0.5em 1em;
  color: #fff;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  -webkit-border-top-left-radius: 0.5em;
  -webkit-border-top-right-radius: 0.5em;
`;

const TwitterSectionSubHeading = styled.h6`
  font-size: 1.2em;
  margin: 0;
`;

const TwitterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 44em;
  width: 100%;
  max-width: 550px;
  overflow-y: auto;
  border-radius: 0.5em;
  background: #fff;

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

const ImageSectionContainer = styled.div`
  position: relative;
  top: 1.1em;
`;

const ImageSectionHeading = styled.h4`
  color: #fff;
  font-size: 2em;
  font-family: 'Raleway';
  margin: 0;
`;

const VideoSectionContainer = styled.div`
  width: 81em;
`;

const VideoSectionHeading = styled.h4`
  color: #fff;
  font-size: 2em;
  font-family: 'Raleway';
  margin: 0;
`;

const VideoSectionSubHeadingContainer = styled.div`
  display: flex;
  background: #1977cc;
  justify-content: space-between;
  padding: 0.5em 19.5em 0.5em 1em;
  color: #fff;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  -webkit-border-top-left-radius: 0.5em;
  -webkit-border-top-right-radius: 0.5em;
`;

const VideoSectionSubHeading = styled.h6`
  font-size: 1.2em;
  margin: 0;
`;

const FeaturedVideo = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
  padding: 1em;
  background-color: #fff;
`;

const OtherVideos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  width: 48em;
  background-color: #fff;
  border-radius: 0.5em;
  padding: 1em;
`;

const StyledImageList = styled(ImageList)`
  flex-wrap: nowrap;
  transform: translateZ(0);
  height: 15em;
  gap: 0.5em;

  & li {
    width: 13.1em;
  }
`;

// Twitter Section Component
function TwitterSectionComponent({
  news,
  ...props
}: {
  news: Record<string, any>;
}) {
  return (
    <TwitterSectionContainer {...props}>
      <TwitterSectionSubHeadingContainer>
        <div>
          <TwitterSectionSubHeading>
            {news.tile2.subHeading1}
          </TwitterSectionSubHeading>
        </div>
        <div>
          <TwitterSectionSubHeading>
            {news.tile2.subHeading2}
          </TwitterSectionSubHeading>
        </div>
      </TwitterSectionSubHeadingContainer>

      <TwitterSectionWrapper>
        <TwitterSection>
          {newsViewTweetIds.map(tweetId => (
            <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />
          ))}
        </TwitterSection>
      </TwitterSectionWrapper>
    </TwitterSectionContainer>
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
  availableSoonImage: string;
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
      <PageBanner>
        <PageBannerText>ICDC News</PageBannerText>
      </PageBanner>

      <OutterContainer>
        <ListSection>
          <div>
            <NewsListHeading>
              {news?.tile1?.heading || 'News Updates'}
            </NewsListHeading>

            <NewsListTitleBar>
              <NewsListTitle>
                <h6
                  style={{
                    color: 'white',
                    fontSize: '1.8em',
                    fontWeight: '900',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'Raleway',
                  }}
                >
                  Updates
                </h6>
              </NewsListTitle>
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
            </NewsListTitleBar>
          </div>

          <TwitterAndImageSection>
            {news?.tile2 && (
              <div>
                <TwitterSectionHeading>
                  {news.tile2.heading}
                </TwitterSectionHeading>
                <TwitterSectionComponent news={news} />
              </div>
            )}

            {news?.tile3 && news?.images && (
              <ImageSectionContainer>
                <ImageSectionHeading>{news.tile3.heading}</ImageSectionHeading>

                <Root>
                  <StyledImageList cols={20}>
                    {news.images.map(
                      (item: Record<string, any>, index: number) => (
                        <span key={`image-list-news-view-${index}`}>
                          <NewsViewImage
                            img={item.img}
                            label={item.label}
                            caption={item.caption}
                          />
                        </span>
                      )
                    )}
                  </StyledImageList>
                </Root>
              </ImageSectionContainer>
            )}
          </TwitterAndImageSection>
        </ListSection>

        {news?.tile4 && news?.youtube && (
          <VideoSectionContainer>
            <VideoSectionHeading>{news.tile4.heading}</VideoSectionHeading>
            <div>
              <VideoSectionSubHeadingContainer>
                <div>
                  <VideoSectionSubHeading>
                    {news.tile4.subHeading1}
                  </VideoSectionSubHeading>
                </div>
                <div>
                  <VideoSectionSubHeading>
                    {news.tile4.subHeading2}
                  </VideoSectionSubHeading>
                </div>
              </VideoSectionSubHeadingContainer>

              <FeaturedVideo>
                <div>
                  <NewsViewVideo
                    url={news.youtube.main.vid}
                    label={news.youtube.main.label}
                    description={news.youtube.main.description}
                  />
                </div>
                <OtherVideos>
                  {news.youtube.others.map(
                    (vid: Record<string, any>, index: number) => (
                      <span key={`news-view-video-news-view-${index}`}>
                        <NewsViewVideo
                          url={vid.vid}
                          label={vid.label}
                          description={news.youtube.main.description}
                        />
                      </span>
                    )
                  )}
                </OtherVideos>
              </FeaturedVideo>
            </div>
          </VideoSectionContainer>
        )}
      </OutterContainer>
    </Page>
  );
};

export default NewsView;

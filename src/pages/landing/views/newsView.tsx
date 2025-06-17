/* eslint-disable */
import React from 'react';
import { List, ImageList } from '@mui/material';
import styled from '@emotion/styled';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import lbg from '../../../assets/landing/Background.png';
import NewsItem from './NewsListItem';
import NewsViewImage from './NewsViewImage';
import NewsViewVideo from './NewsViewVideo';

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
  background-color: #1977cc;
  font-size: 1.2em;
  margin: 0;
  height: 2.28em;
  display: flex;
  align-items: center;
  padding-left: 0.5em;
`;

const NewsList = styled(List)`
  width: 30em;
  height: 65.8em;
  background-color: #fff;
  overflow: auto;
  overflow-x: hidden;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-left-radius: 0.5em;
  -webkit-border-bottom-right-radius: 0.5em;
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
  const tweetIds = [
    '1878806460668285313',
    '1837431704799105198',
    '1593639418149093376',
  ];

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
          {tweetIds.map(tweetId => (
            <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />
          ))}
        </TwitterSection>
      </TwitterSectionWrapper>
    </TwitterSectionContainer>
  );
}

const NewsView = ({
  news,
}: {
  news: Record<string, any> | undefined;
  availableSoonImage: string;
}) => {
  return (
    <Page>
      <PageBanner>
        <PageBannerText>ICDC News</PageBannerText>
      </PageBanner>

      <OutterContainer>
        <ListSection>
          <div>
            <NewsListHeading>{news.tile1.heading}</NewsListHeading>

            <NewsListTitleBar>
              <NewsListTitle>
                <h6 style={{ color: 'white', fontSize: '1em' }}>
                  {news.tile1.subHeading}
                </h6>
              </NewsListTitle>
              <NewsList>
                {news.content.map(
                  (
                    {
                      paragraph,
                      label,
                      blurb,
                    }: { paragraph: string; label: string; blurb: string },
                    index: number
                  ) => (
                    <span key={`news-item-news-view-${index}`}>
                      <NewsItem
                        paragraph={paragraph}
                        index={index + 1}
                        total={news.content.length}
                        label={label}
                        blurb={blurb}
                      />
                    </span>
                  )
                )}
              </NewsList>
            </NewsListTitleBar>
          </div>

          <TwitterAndImageSection>
            <div>
              <TwitterSectionHeading>
                {news.tile2.heading}
              </TwitterSectionHeading>
              <TwitterSectionComponent news={news} />
            </div>

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
          </TwitterAndImageSection>
        </ListSection>

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
      </OutterContainer>
    </Page>
  );
};

export default NewsView;

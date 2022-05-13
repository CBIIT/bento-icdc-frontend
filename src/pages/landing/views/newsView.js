import React from 'react';
import {
  withStyles,
  List,
  ImageList,
} from '@material-ui/core';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import lbg from '../../../assets/landing/Background.png';
import { newsViewImageData, newsViewVideoData } from '../../../bento/landingPageData';
import NewsItem from './NewsListItem';
import NewsViewImage from './NewsViewImage';
import NewsViewVideo from './NewsViewVideo';

const NewsView = ({ classes, news }) => (
  <div className={classes.page}>
    <div className={classes.pageBanner}>
      <h1 className={classes.pageBannerText}>
        ICDC News
      </h1>
    </div>

    <div className={classes.outterContainer}>
      <div className={classes.listSection}>
        <div>
          <h4 className={classes.newsListHeading}>
            Updates
          </h4>

          <div className={classes.newsListTitleBar}>
            <div className={classes.newsListTitle}>
              <h6 style={{ color: 'white', fontSize: '1em' }}>
                Announcments
              </h6>
            </div>
            <List className={classes.newsList}>
              {
                // eslint-disable-next-line max-len
                news.map(({ paragraph, label }, index) => <NewsItem paragraph={paragraph} index={index + 1} total={news.length} label={label} />)
              }
            </List>
          </div>
        </div>

        <div className={classes.twitterAndImageSection}>
          <div>
            <h4 className={classes.twitterSectionHeading}>
              Twitter
            </h4>

            <div className={classes.twitterSectionContainer}>
              <div className={classes.twitterSectionSubHeadingContainer}>
                <div>
                  <h6 className={classes.twitterSectionSubHeading}>Featured tweet</h6>
                </div>

                <div>
                  <h6 className={classes.twitterSectionSubHeading}>Follow us on Twitter</h6>
                </div>
              </div>

              <div className={classes.twitterSection}>
                <TwitterTweetEmbed
                  tweetId="1493638757001711620"
                  className={classes.test}
                />

                <div className={classes.twitterTimelineSection}>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="ncidatasci"
                    options={{ height: 524 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.imageSectionContainer}>
            <h4 className={classes.imageSectionHeading}>
              Images
            </h4>

            <div className={classes.root}>
              <ImageList classes={{ root: classes.imageList }} cols={2.5}>
                {newsViewImageData.map((item) => (
                  <NewsViewImage img={item.img} label={item.label} />
                ))}
              </ImageList>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.videoSectionContainer}>
        <h4 className={classes.videoSectionHeading}>
          Videos
        </h4>
        <div className={classes.videoSection}>
          <div className={classes.videoSectionSubHeadingContainer}>
            <div><h6 className={classes.videoSectionSubHeading}>Featured video</h6></div>
            <div><h6 className={classes.videoSectionSubHeading}>Other videos</h6></div>
          </div>

          <div className={classes.featuredVideo}>
            <div>
              <NewsViewVideo url={newsViewVideoData[0].vid} label={newsViewVideoData[0].label} />
            </div>
            <div className={classes.otherVideos}>
              {
                newsViewVideoData.slice(1)
                  .map((vid) => <NewsViewVideo url={vid.vid} label={vid.label} />)
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

const styles = (theme) => ({
  page: {
    background: '#5E8CA5',
    backgroundImage: `url(${lbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },
  imageListItem: {
    height: '100%',
    width: '13.6em',
  },
  pageBanner: {
    backgroundColor: 'rgba(25, 119, 204, 0.61)',
    height: '12.8em',
    marginTop: '-3.3em',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '35em',
    position: 'relative',
    fontFamily: 'Raleway',
  },
  newsListTitleBar: {
    display: 'flex',
    flexDirection: 'column',
  },
  newsListTitle: {
    borderTopRightRadius: '0.5em',
    borderTopLeftRadius: '0.5em',
    WebkitBorderTopLeftRadius: '0.5em',
    WebkitBorderTopRightRadius: '0.5em',
    backgroundColor: '#1977CC',
    fontSize: '1.2em',
    margin: '0',
    height: '2.28em',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '0.5em',
  },
  pageBannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
    fontSize: '3.7em',
  },
  listSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '3em',
  },
  newsListHeading: {
    color: '#fff',
    fontSize: '2em',
    fontFamily: 'Raleway',
    margin: '0',
  },
  newsList: {
    width: '30em',
    height: '65.8em',
    backgroundColor: '#fff',
    overflow: 'auto',
    overflowX: 'hidden',
    borderBottomRightRadius: '0.5em',
    borderBottomLeftRadius: '0.5em',
    WebkitBorderBottoLeftRadius: '0.5em',
    WebkitBorderBottomRightRadius: '0.5em',
  },
  twitterAndImageSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  twitterSectionHeading: {
    color: '#fff',
    fontSize: '2em',
    fontFamily: 'Raleway',
    margin: '0',
  },
  twitterSectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    background: '#fff',
    flexDirection: 'column',
    borderRadius: '0.5em',
    width: 'fit-content',
  },
  twitterSectionSubHeadingContainer: {
    display: 'flex',
    background: '#1977CC',
    justifyContent: 'space-between',
    padding: '0.5em 12.2em 0.5em 1em',
    color: '#fff',
    borderTopLeftRadius: '0.5em',
    borderTopRightRadius: '0.5em',
    WebkitBorderTopLeftRadius: '0.5em',
    WebkitBorderTopRightRadius: '0.5em',
  },
  twitterSectionSubHeading: {
    fontSize: '1.2em',
    margin: '0',
  },
  twitterSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1em',
    gap: '2em',
    height: '44em',
  },
  twitterTimelineSection: {
    marginTop: '1em',
    height: '26.5em',
  },
  imageSectionContainer: {
    position: 'relative',
    top: '1.1em',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'end',
  },
  imageSectionHeading: {
    color: '#fff',
    fontSize: '2em',
    fontFamily: 'Raleway',
    margin: '0',
  },
  videoSectionContainer: {
    width: '81em',
  },
  videoSectionHeading: {
    color: '#fff',
    fontSize: '2em',
    fontFamily: 'Raleway',
    margin: '0',
  },
  vidoeSection: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '0.5em',
    justifyContent: 'center',
    marginBottom: '5em',
    flexDirection: 'column',
  },
  videoSectionSubHeadingContainer: {
    display: 'flex',
    background: '#1977CC',
    justifyContent: 'space-between',
    padding: '0.5em 19.5em 0.5em 1em',
    color: '#fff',
    borderTopLeftRadius: '0.5em',
    borderTopRightRadius: '0.5em',
    WebkitBorderTopLeftRadius: '0.5em',
    WebkitBorderTopRightRadius: '0.5em',
  },
  videoSectionSubHeading: {
    fontSize: '1.2em',
    margin: '0',
  },
  featuredVideo: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '2fr 1fr',
    gap: '1em',
    padding: '1em',
    backgroundColor: '#fff',
  },
  otherVideos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  outterContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '5em',
    paddingBottom: '5em',
    gap: '2em',
    height: '100%',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '48em',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.5em',
    padding: '1em',
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '15em',
    '& li': {
      width: '13.1em',
    },
    gap: '0.5em',
  },
  titlee: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  content: {
    boxSizing: 'border-box',
    background: '#23AEE2',
    width: '690px',
    height: '464px',
    margin: 'auto',
    '& img': {
      width: '689px',
      height: '459px',
      marginTop: '-20px',
      marginRight: '-40px',
    },
  },
  text: {
    height: '31px',
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
  },
  title: {
    color: '#1EA8E1',
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '22px',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    display: 'block',
    marginTop: '18px',
    marginBottom: '8px',
  },
  desc: {
    color: '#4a4a4a',
    fontSize: '17px',
    letterSpacing: '0',
    lineHeight: '20px',
  },
});
export default withStyles(styles)(NewsView);

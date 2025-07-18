import React from 'react';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { Link } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import starImg from '../../assets/landing/Spark.png';
import flare from '../../assets/landing/flare_bkgd.png';
import dogImg from '../../assets/landing/canine_bubble.png';
import humanImg from '../../assets/landing/human_bubble.png';
import Widgets from './views/widgets';
import Tab from '../../components/Tab/Tab';
import TabPanel from '../../components/Tab/TabPanel';
import {
  Container,
  TabsWidgetContainer,
  Star,
  SlideUp,
  SlideDown,
  CallToActionButton,
  WidgetsContainer,
  TwitterViewContainer,
  ImageWithCaptionView,
  ImageWithNoCaptionView,
  SmallIconView,
  LargeIconView,
} from './landingView.styled';
import VideoSpotlight from './views/VideoSpotlight';

const custumTheme = createTheme(
  adaptV4Theme({
    overrides: {
      MuiTabs: {
        root: {
          borderRight: '1px solid #ffffff',
        },
      },
    },
  })
);

const generateSpotlightContent = (template, item) => {
  switch (template) {
    case 'twitter':
      return (
        <TwitterViewContainer>
          <TwitterTweetEmbed tweetId="1493638757001711620" />
        </TwitterViewContainer>
      );
    case 'youtube':
      return <VideoSpotlight />;
    case 'imageWithCaption':
      return (
        <ImageWithCaptionView>
          <div className="image-container">
            <img src={item.img} alt={item.alt} className="image-with-caption" />
          </div>
          <div className="image-caption-wrapper">
            <p className="image-caption">{item.caption}</p>
          </div>
        </ImageWithCaptionView>
      );
    case 'noCaptionImage':
      return (
        <ImageWithNoCaptionView>
          <img src={item.img} alt={item.alt} className="image-with-caption" />
        </ImageWithNoCaptionView>
      );
    case 'smallIcon':
      return (
        <SmallIconView>
          <img src={item.img} alt={item.alt} />
        </SmallIconView>
      );
    case 'largeIcon':
      return (
        <LargeIconView>
          <img src={item.img} alt={item.alt} />
        </LargeIconView>
      );
    default:
      return '';
  }
};

const LandingView = ({ pageData }) => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={custumTheme}>
        <Container>
          <TabsWidgetContainer>
            <div className="left-panel">
              <Tab
                styleClasses={{
                  tabPrimaryColor: {
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '14px',
                    height: '140px',
                    '& img': {
                      width: '90px',
                      display: 'block',
                      margin: 'auto',
                    },
                  },
                  tabHighlightColor: {
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '14px',
                    height: '175px',
                    '& img': {
                      margin: 'auto',
                      width: '113px',
                      display: 'block',
                    },
                  },
                  hrLine: {
                    display: 'none',
                  },
                }}
                disableRipple
                tabItems={pageData.tabs}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                orientation="vertical"
              />
            </div>
            <div className="right-panel">
              {pageData.tabs.map((item, index) => (
                <TabPanel
                  key={`tab-panel-landing-view-${index}`}
                  value={currentTab}
                  index={index}
                  innerDivStyle={{
                    flex: 1,
                    display: 'flex',
                    gap: '32px',
                    width: '100%',
                    minWidth: '1127px',
                    minHeight: '616px',
                    borderRadius: '20px',
                    padding: '48px',
                    background:
                      'linear-gradient(to right, rgba(25, 28, 32, 0.6), rgba(25, 28, 32, 0.1))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                  }}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="left-section">
                    <div className="title-and-divider">
                      <div className="title">
                        {item.content.callToActionTitle}
                      </div>
                      <hr className="divider" />
                    </div>
                    <div className="description">
                      {item.content.callToActionDescription}
                    </div>
                    <div>
                      {item.content.externalLink ? (
                        <a
                          href={item.content.callToActionLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <CallToActionButton variant="contained">
                            {item.content.callToActionButtonText}
                          </CallToActionButton>
                        </a>
                      ) : (
                        <Link to={item.content.callToActionLink}>
                          <CallToActionButton variant="contained">
                            {item.content.callToActionButtonText}
                          </CallToActionButton>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="right-section">
                    {index === 1 && (
                      <div className="dog-and-human-icon-animation-container">
                        <div className="dog-and-human-icon-wrapper">
                          <SlideDown>
                            <img src={dogImg} alt="Dog" />
                          </SlideDown>
                          <SlideUp>
                            <img src={humanImg} alt="human" />
                          </SlideUp>
                          <Star>
                            <div className="star-and-flare">
                              <img
                                src={starImg}
                                alt="star"
                                className="star-image"
                              />
                              <img src={flare} alt="flare" className="flare" />
                            </div>
                          </Star>
                        </div>
                      </div>
                    )}
                    {index === 0 && (
                      <div className="tab-1-image-wrappper">
                        <img
                          src={item.content.image}
                          alt="icdc_studies"
                          className="tab-1-image"
                        />
                      </div>
                    )}
                    {index === 2 && (
                      <div>
                        <img
                          src={item.content.image}
                          alt="icdc_studies"
                          className="tab-2-image"
                        />
                        <img
                          src={item.content.image}
                          alt="icdc_studies"
                          className="tab-2-second-image"
                        />
                      </div>
                    )}
                    {index === 3 &&
                      generateSpotlightContent(
                        item.content.template,
                        item.content[item.content.template]
                      )}
                  </div>
                </TabPanel>
              ))}
            </div>
          </TabsWidgetContainer>
          <WidgetsContainer>
            <Widgets pageData={pageData} />
          </WidgetsContainer>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withStyles({}, { withTheme: true })(LandingView);

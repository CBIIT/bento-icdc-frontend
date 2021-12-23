import React from 'react';
import {
  Grid,
  withStyles,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { cn } from 'bento-components';
import lbg from '../../assets/landing/Background.png';
import { Button } from '../../components/Wrappers/Wrappers';
import starImg from '../../assets/landing/Spark.png';
import flare from '../../assets/landing/flare_bkgd.png';
import dogImg from '../../assets/landing/canine_bubble.png';
import humanImg from '../../assets/landing/human_bubble.png';
import { pageData } from '../../bento/landingPageData';
import Widgets from './views/widgets';
import Tab from '../../components/Tab/Tab';
import TabPanel from '../../components/Tab/TabPanel';
// import themes from '../../themes';

const slideDown = keyframes`
from {
  transform: translateY(0px);
}
33.3% {
  transform: translateY(350px);
}
66.6% {
  transform: translateY(0px);
}
to {
    transform: translateY(175px);
}
`;

const slideUp = keyframes`
from {
  transform: translateY(-800px);
}
33.3% {
  transform: translateY(-1200px);
}
66.6% {
  transform: translateY(-800px);
}
to {
  transform: translateY(-1030px);
}
`;

const star = keyframes`
  0% {
    opacity: 0;
  }

  8%{
    opacity: 0;
  }

  13%{
    opacity: 1;
  }

  25%{
    opacity: 0;
  }
  
  40%{
    opacity: 0;
  } 

  46% {
    opacity: 1;
  }

  55% {
    opacity: 0;
  }

  80% {
    opacity: 0;
  }

`;

const SlideDown = styled.div`
  animation: ${slideDown} 20s  0s 1;
`;

const SlideUp = styled.div`
  animation: ${slideUp} 20s 0s;
`;

const Star = styled.div`
  animation: ${star} 20s  0s 1;
`;

const custumTheme = createTheme({
  overrides: {
    MuiTabs: {
      root: {
        paddingTop: '20px',
        paddingBottom: '20px',
        borderRight: '1px solid #ffffff',
        marginLeft: '-60px',
      },
    },
    MuiTypography: {
      root: {
        paddingRight: '50px',
      },
    },
  },
});

const LineText = (props) => {
  const { text } = props;
  return text.split('\n').map((str) => <div>{str}</div>);
}

const LandingView = function ({ classes }) {
  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <MuiThemeProvider theme={custumTheme}>
      <div className={classes.page}>
        <div className={classes.container}>
          <Grid container spacing={16} direction="row" className={cn(classes.paddingTop30)}>
            <Grid item lg={2} md={2} sm={12} xs={12} className={classes.carouselTabs}>
              <Tab
                styleClasses={classes}
                disableRipple
                tabItems={pageData.tabs}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
                orientation="vertical"
              />
            </Grid>
            <Grid item lg={10} md={10} sm={12} xs={12} className={classes.carouselContent}>
              {
                pageData.tabs.map((item, index) => (
                  <TabPanel value={currentTab} index={index}>
                    <Grid container className={classes.tabContainer} spacing={1}>
                      <Grid item lg={3} md={3} sm={12} xs={12} className={classes.carouselType}>
                        <div className={classes.carouselTitle}>
                          <LineText text={item.content.callToActionTitle} />
                        </div>
                        <div className={classes.divider}>
                          <hr className={classes.hrDivider} />
                        </div>
                        <div className={classes.carouselDescription}>
                          <LineText text={item.content.callToActionDescription} />
                        </div>
                        <div className={classes.headerButtonSection}>
                          <Link to={item.content.callToActionLink} className={classes.headerLink}>
                            <Button className={classes.headerButton}>
                              {item.content.callToActionButtonText}
                            </Button>
                          </Link>
                        </div>
                      </Grid>
                      <Grid item lg={9} md={9} sm={12} xs={12}>
                        { (index === 0) && (
                        <div>
                          <div className={classes.animationContainer}>
                            <SlideDown className={classes.dog}>
                              <img className={classes.dogImg} src={dogImg} width="320px" alt="Dog" />
                            </SlideDown>
                            <SlideUp className={classes.human}>
                              <img className={classes.humanImg} src={humanImg} width="320px" alt="human" />
                            </SlideUp>
                            <Star className={classes.star}>
                              <img className={classes.starImg} src={starImg} alt="star" />
                              <img className={classes.starImg} src={flare} alt="flare" />
                            </Star>
                          </div>
                        </div>
                        )}
                        { (index === 1) && (
                          <div className={classes.datadictionaryContainer}>
                            <img src={item.content.image} alt="icdc_studies" />
                          </div>
                        )}
                        { (index === 2) && (
                          <div className={classes.carouselImgContainer}>
                            <img src={item.content.image} alt="icdc_studies" />
                          </div>
                        )}
                        { (index === 3) && (
                          <div className={classes.carouselImgContainerSpotlight}>
                            <img src={item.content.image} alt="icdc_studies" />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </TabPanel>
                ))
              }
            </Grid>
          </Grid>
          <Widgets />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

const styles = (theme) => ({
  page: {
    background: '#5E8CA5',
    backgroundImage: `url(${lbg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    marginTop: '-47px',
  },
  container: {
    paddingTop: '10px',
    fontFamily: 'Raleway, sans-serif',
    paddingRight: '32px',
    margin: '0 auto',
    paddingLeft: '32px',
    paddingBottom: '90px',
    '@media (min-width: 1200px)': {
      width: '1200px',
    },
  },
  tabContainer: {
    padding: '0px 0px 20px 65px',
  },
  carouselContent: {
    maxHeight: '700px',
    minHeight: '700px',
  },
  carouselType: {
    zIndex: '10',
  },
  carouselTabs: {
    zIndex: '10',
  },
  carouselTitle: {
    paddingTop: '40px',
    paddingBottom: '12px',
    width: '180px',
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '35px',
    marginTop: '40px',
    fontWeight: 'bold',
    lineHeight: '40px',
  },
  carouselDescription: {
    width: '300px',
    color: '#F5A313',
    fontFamily: 'Raleway',
    fontSize: '17px',
    fontWeight: '600',
    lineHeight: '22px',
    marginTop: '10px',
    marginBottom: '35px',
  },
  carouselImgContainer: {
    position: 'relative',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
    '& img': {
      width: '660px',
    },
  },
  carouselImgContainerSpotlight: {
    position: 'relative',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
    '& img': {
      width: '860px',
      marginLeft: '-100px',
      marginTop: '-120px',
    },
  },
  headerButtonSection: {
  },
  headerButton: {
    borderRadius: '17px',
    width: '178px',
    height: '37px',
    lineHeight: '18px',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#CB8311',
    fontFamily: theme.custom.fontFamilySans,
    textDecoration: 'none',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: '#CB8311',
      color: '#ffffff',
    },
  },
  headerLink: {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#CB8311',
      textDecoration: 'none',
    },
  },
  imgDogHuman: {
    width: '627px',
  },
  image: {
    width: '197px',
    height: '236px',
  },
  content: {
    width: '197px',
    background: '#fff',
    height: '134px',
    paddingLeft: '30px',
    paddingTop: '6px',
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '40px',
  },
  animationContainer: {
    position: 'relative',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
  },
  datadictionaryContainer: {
    position: 'relative',
    height: '900px',
    maxHeight: '800px',
    overflow: 'hidden',
    marginLeft: '-50px',
    marginRight: '-100px',
    // backgroundImage: `url(${pageData.tabs[1].content.image})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '1200px',
    '& img': {
      // width: '90%',
      width: '990px',
      heigh: '700px',
      marginLeft: '-80px',
      marginRight: '-90px',
      marginTop: '-20px',
    },
  },
  dogImg: {
    position: 'absolute',
    left: '60px',
  },
  humanImg: {
    position: 'absolute',
    left: '340px',
  },
  starImg: {
    width: '295px',
    position: 'absolute',
    top: '-2150px',
    left: '220px',
  },

  dog: {
    position: 'relative',
    height: '1200px',
    animationFillMode: 'forwards',
  },
  human: {
    // position: 'relative',
    // height: '1200px',
    animationFillMode: 'forwards',
  },
  star: {
    position: 'relative',
    height: '1200px',
    opacity: '0',
    marginTop: '1200px',
  },
  paddingLeft2: {
    paddingLeft: '2px',
  },
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
    fontSize: '18px',
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
  divider: {
    marginTop: '30px',
    height: '30px',
  },
  hrDivider: {
    width: '40px',
    float: 'left',
    border: '#F5A313 2px solid',
    background: '#F5A313',
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);

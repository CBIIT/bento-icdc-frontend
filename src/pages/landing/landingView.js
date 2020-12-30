import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { cn } from 'bento-components';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';
import lbg from '../../assets/landing/LP-Background.1400x1600.jpg';
import { Button } from '../../components/Wrappers/Wrappers';
import starImg from '../../assets/LP_FLARE.2.png';
import dogImg from '../../assets/landing/dog-bubble.png';
import humanImg from '../../assets/landing/human-bubble.png';
import { landingPageData } from '../../bento/landingPageData';

const slideDown = keyframes`
  0% {
    top: 0;
    left:0;
  }
  50% {
    top: 350px;
    left: 30px;
  }

  100% {
    top: 0;
    left:0;
  }
`;

const slideUp = keyframes`
  0% {

    top: 0;
    left:0;
  }

  50% {
    top:-390px;
    left:0px;
  }

  
  100% {
    top: 0;
    left:0;
  }
`;

const star = keyframes`
  0% {
    opacity: 0;
  }

  8%{
    opacity: 0;
  }

  25%{
    opacity: 1;
  }

  32%{
    opacity: 0;
  }

  58%{
    opacity: 0;
  }

  65% {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

`;

const SlideDown = styled.div`
  animation: ${slideDown} 20s  0s 1;
`;

const SlideUp = styled.div`
  animation: ${slideUp} 20s  0s 1;
`;

const Star = styled.div`
  animation: ${star} 20s  0s 1;
`;

const LandingController = ({ classes }) => (
  <div className={classes.page}>
    <div className={classes.container}>
      <Grid container spacing={16} direction="row" className={cn(classes.paddingTop30, classes.paddingLeft85)}>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <div className={classes.headerTitle}>
            { landingPageData.callToActionTitle }
          </div>
          <div className={classes.headerContent}>
            { landingPageData.callToActionDescription}
          </div>
          <div className={classes.headerButtonSection}>

            <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
              <Button className={classes.headerButton}>
                {landingPageData.callToActionButtonText}
              </Button>
            </Link>

          </div>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <div>
            <div className={classes.animationContainer}>
              <SlideDown className={classes.dog}>
                <img className={classes.dogImg} src={dogImg} alt="Dog" />
              </SlideDown>
              <SlideUp className={classes.human}>
                <img className={classes.humanImg} src={humanImg} alt="human" />
              </SlideUp>
              <Star className={classes.star}>
                <img className={classes.starImg} src={starImg} alt="star" />
              </Star>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={16} direction="row" className={classes.landingContainer}>
        <div className={classes.contentLeft}>
          <div className={classes.about}>
            <div className={classes.aboutImageSection}>
              <img
                src={landingPageData.tile1.img}
                className={classes.aboutImage}
                alt={landingPageData.tile1.alt}
              />
            </div>
            <div className={classes.icdcWords}>
              {landingPageData.tile1.titleText}
            </div>
            <div className={classes.aboutContent}>
              {landingPageData.tile1.descriptionText}
            </div>
            <div className={classes.aboutButtonSection}>
              <div className={classes.aboutButtonLeft}>
                <img src={iconAbout} className={classes.iconAbout} alt="ICDC about icon" />
              </div>
              <div className={classes.aboutButtonRight}>
                <Link
                  to={landingPageData.tile1.callToActionLink}
                  className={classes.aboutButton}
                >
                  FULL ARTICLE
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.contentRight}>
          <div className={classes.contentRightTop}>
            <div className={classes.program}>
              <div>
                <img
                  className={classes.image}
                  src={landingPageData.tile2.img}
                  alt={landingPageData.tile2.alt}
                />
              </div>
              <div className={classes.content}>
                <div className={classes.contentHeader}>
                  {' '}
                  {landingPageData.tile2.titleText}
                  {' '}
                </div>
                <div className={classes.contentMessage}>
                  {landingPageData.tile2.descriptionText}
                </div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to={landingPageData.tile2.callToActionLink} className={classes.blueButton}>
                    {landingPageData.tile2.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.studies}>
              <div>
                <img
                  className={classes.image}
                  src={landingPageData.tile3.img}
                  alt={landingPageData.tile3.src}
                />
              </div>
              <div className={classes.content}>
                <div className={classes.contentHeader}>
                  {' '}
                  {landingPageData.tile3.titleText}
                  {' '}
                </div>
                <div className={classes.contentMessage}>
                  {landingPageData.tile3.descriptionText}
                </div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to={landingPageData.tile3.callToActionLink} className={classes.blueButton}>
                    {landingPageData.tile3.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.submit}>
              <div>
                <img
                  className={classes.image}
                  src={landingPageData.tile4.img}
                  alt={landingPageData.tile4.src}
                />
              </div>
              <div className={classes.content}>

                <div className={classes.contentHeader}>
                  {landingPageData.tile4.titleText}
                  {' '}
                </div>
                <div className={classes.contentMessage}>
                  {landingPageData.tile4.descriptionText}
                </div>

              </div>
              <div className={classes.blueButton}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.icon} src={icon} alt="ICDC about " />
                  {' '}
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to={landingPageData.tile4.callToActionLink} className={classes.blueButton}>
                    {landingPageData.tile4.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRightBottom}>
            <div className={classes.cases}>
              <div className={classes.greyContentHeader}>
                {' '}
                {landingPageData.tile5.titleText}
                {' '}
              </div>
              <div className={classes.greyContent}>
                {landingPageData.tile5.descriptionText}
              </div>
              <div className={classes.greybuttonSection}>
                <div className={classes.blueButtonLeft}>
                  <img className={classes.greyIcon} src={icon} alt="ICDC about " />
                </div>
                <div className={classes.blueButtonRight}>
                  <Link to={landingPageData.tile5.callToActionLink} className={classes.greybutton}>
                    {landingPageData.tile5.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
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
  headerTitle: {
    paddingTop: '180px',
    paddingBottom: '12px',
    width: '208px',
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '40px',
    fontWeight: 'bold',
    lineHeight: '40px',

  },
  paddingLeft85: {
    paddingLeft: '85px',
  },
  headerContent: {
    height: '98px',
    width: '194px',
    color: '#CB8311',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    marginBottom: '40px',
  },
  headerButtonSection: {

  },
  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '22px',
  },
  headerButton: {
    borderRadius: '10px',
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

  aboutImage: {
    width: '300px',
    height: '240px',
  },
  aboutImageSection: {
    height: '240px',
  },
  icdcWords: {
    height: '193px',
    background: 'rgb(57,192,240,0.3)',
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '35px',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '15px',
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
  },
  image: {
    width: '197px',
    height: '236px',
  },
  aboutContent: {
    background: '#fff',
    width: '300px',
    padding: '30px 30px 30px 30px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  content: {
    width: '197px',
    background: '#fff',
    height: '134px',
    paddingLeft: '30px',
    paddingTop: '6px',
  },
  contentHeader: {
    width: '144px',
    color: '#000000',
    fontFamily: 'Raleway',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '18px',
    padding: '15px 0',
  },
  contentMessage: {
    height: '33px',
    width: '125px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '20px',
  },
  aboutButtonSection: {
    background: '#fff',
    height: '67px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#CB8311',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#A97212',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
  },
  contentRight: {

  },
  contentRightTop: {

  },
  program: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  button: {

  },
  studies: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  submit: {
    float: 'left',
    padding: '0 10px 10px 0px',
  },
  contentRightBottom: {
    float: 'left',
    width: '610px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile5.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '435px',
    paddingLeft: '400px',
    paddingTop: '40px',
  },
  greybuttonSection: {
    height: '46px',
    width: '176px',
    opacity: '0.51',
    backgroundColor: '#4D4D4D',
    marginTop: '41px',

  },
  blueButton: {
    height: '45px',
    background: '#39C0F0',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '47px',
    color: '#fff',
  },
  greyContentHeader: {
    color: '#000000',
    fontFamily: 'Raleway',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '18px',
    padding: '15px 0',
  },
  greyContent: {
    height: '143px',
    width: '166px',
    color: '#010101',
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    lineHeight: '22px',
  },
  greyIcon: {
    width: '20px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  greybutton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
    textDecoration: 'none',
    marginLeft: '8px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    position: 'relative',
    height: '800px',
    maxHeight: '800px',
    overflow: 'hidden',
  },

  dogImg: {
  },
  humanImg: {
    position: 'absolute',
    top: '-800px',
    left: '350px',
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
  },
  human: {
    position: 'relative',
    height: '1200px',

  },
  star: {
    position: 'relative',
    height: '1200px',
    opacity: '0',
  },
  paddingLeft2: {
    paddingLeft: '2px',
  },

});
export default withStyles(styles, { withTheme: true })(LandingController);

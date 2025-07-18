import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import lbg from '../../assets/landing/Background.png';
import { Button } from '@mui/material';

export const slideDown = keyframes`
  from {
    transform: translateY(-180px);
  }
  33.3% {
    transform: translateY(200px);
  }
  66.6% {
    transform: translateY(-180px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  33.3% {
    transform: translateY(-180px);
  }
  66.6% {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const star = keyframes`
  0% {
    opacity: 0;
  }
  8% {
    opacity: 0;
  }
  13% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  40% {
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

export const SlideDown = styled.div`
  animation: ${slideDown} 20s 0s 1;
`;

export const SlideUp = styled.div`
  animation: ${slideUp} 20s 0s;
  // position: absolute;
  position: relative;
  right: 35px;
`;

export const Star = styled.div`
  animation: ${star} 20s 0s 1;
  position: absolute;
  left: 250px;
  top: 82px;
`;

export const Container = styled.div({
  background: '#5E8CA5',
  backgroundImage: `url(${lbg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  flex: '1',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const TabsWidgetContainer = styled.div({
  flex: '1',
  display: 'flex',
  width: '40%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '64px',

  '& .left-panel': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    marginRight: '150px',
  },

  '& .right-panel': {
    '& .left-section': {
      maxWidth: '550px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',

      '& .title-and-divider': {
        marginBottom: '40px',

        '& .title': {
          fontSize: '35px',
          color: '#fff',
          fontFamily: 'Raleway',
          fontWeight: 'bold',
          lineHeight: '35px',
          marginBottom: '24px',
        },

        '& .divider': {
          border: 'none',
          borderTop: '3px solid #FFFFFF',
          width: '60px',
          margin: 0,
        },
      },

      '& .description': {
        marginBottom: '40px',
        zIndex: '1',
        color: '#fff',
        fontSize: '18px',
        fontFamily: 'Raleway',
        fontWeight: 500,
        fontStyle: 'medium',
        lineHeight: '25px',
        maxWidth: '480px',
      },
    },

    '& .right-section': {
      flex: 1,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      '& .dog-and-human-icon-animation-container': {
        flex: '1',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .dog-and-human-icon-wrapper': {
          position: 'relative',
          display: 'flex',

          '& .star-image': {
            width: '150px',
            position: 'absolute',
          },
          '& .flare': {
            width: '150px',
          },

          '& .star-and-flare': {
            position: 'relative',
          },
        },
      },

      '& .tab-1-image-wrappper': {
        '& .tab-1-image': {
          maxHeight: '415px',
          maxWidth: '560px',
        },
      },

      '& .tab-2-image': {
        maxHeight: '415px',
        maxWidth: '560px',
        visibility: 'hidden',
      },

      '& .tab-2-second-image': {
        position: 'absolute',
        left: '180px',
        top: '0px',
      },
    },
  },
});

export const WidgetsContainer = styled.div({
  margin: '64px',
});

export const CallToActionButton = styled(Button)(() => {
  return {
    borderRadius: '10px',
    padding: '12px 28px',
    lineHeight: '18px',
    fontSize: '16px',
    fontWeight: '400',
    zIndex: '1',
    fontStyle: 'regular',
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#B57D2C',
    fontFamily: 'Lato',
    textDecoration: 'none',
    border: '1px solid #D49A3F',
    boxShadow: 'none !important',
    '&:hover': {
      backgroundColor: '#D49A3F',
      color: '#ffffff',
    },
  };
});

export const TwitterViewContainer = styled.div({
  marginTop: '6.5em',
  width: '31.8em',
  boxShadow: '0 25px 51px 10px #000',
});

export const YoutubeViewContainer = styled.div({
  background: '#fff',
  marginTop: '6.5em',
  borderRadius: '0.5em',
  width: '49em',
  height: '27.8em',
  boxSizing: 'border-box',
  border: '5px solid #fff',
});

export const ImageWithCaptionView = styled.div({
  padding: '0.4em',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '6em',
  marginLeft: '3em',

  '& .image-container': {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.4em',
    boxSizing: 'border-box',
    border: '1px solid #000',
    height: '27.5em',

    '& .image-with-caption': {
      height: '100%',
      width: '100%',
    },
  },

  '& .image-caption-wrapper': {
    color: 'white',
    width: '36em',

    '& .image-caption': {
      textAlign: 'justify',
      fontFamily: 'Inter',
      fontSize: '1em',
      fontWeight: '300',
      letterSpacing: '0',
      lineHeight: '13px',
      position: 'relative',
      bottom: '0.6em',
    },
  },
});

export const ImageWithNoCaptionView = styled.div({
  transform: 'rotate(10deg)',
  marginTop: '6.5em',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.4em',
  width: '30.5em',
  height: '38em',
  marginLeft: '3em',
  border: '0.8em solid #fff',
});

export const SmallIconView = styled.div({
  width: '300px',
  marginLeft: '9em',
  marginTop: '6.5em',
});

export const LargeIconView = styled.div({
  width: '31.5em',
  marginLeft: '5em',
  marginTop: '6.5em',
});

import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AboutHeader from './aboutHeader';
import Stats from '../../components/Stats/AllStatsController';
import { AboutBody } from '../../bento-core';
import {
  Container as StyledContainer,
  Image as StyledImage,
} from './about.styled';
import externalLinkLogo from '../../assets/icons/externalLink.svg';
import PageContent from '../../components/Layout/PageContent';

const AboutView = ({ data }) => {
  const getImage = (imgPath, alt) => (
    <StyledImage src={imgPath != null ? imgPath : ''} alt={alt} />
  );

  const theme = {
    overrides: {
      MuiGrid: {
        root: {
          '& a': {
            color: '#B85300',
            cursor: 'pointer',
            fontFamily: 'Open Sans',
            fontWeight: '600',
            textDecoration: 'underline',
            '&:hover': {
              color: '#9E4700',
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Stats />
      <StyledContainer>
        <AboutHeader title={data.title} />
        <PageContent>
          <AboutBody
            linkColor="#027DA7"
            externalIconImage={externalLinkLogo}
            data={{
              fontFamily: '"Open Sans", sans-serif',
              lineHeight: '25px',
              image: getImage(data.primaryContentImage, data.title),
              imageLocation: 'left',
              title: data.title ? data.title : '',
              content: data.content ? data.content : '',
              table: data.table ? data.table : '',
              secondaryImage: data.secondaryZoomImage
                ? data.secondaryZoomImage
                : null,
              secondaryImageData: getImage(
                data.secondaryZoomImage,
                'secondary zoominout'
              ),
              secondaryZoomImageTitle: data.secondaryZoomImageTitle
                ? data.secondaryZoomImageTitle
                : null,
            }}
          />
        </PageContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default AboutView;

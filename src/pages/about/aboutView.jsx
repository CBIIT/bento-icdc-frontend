import React from 'react';
import {
  Container,
  createTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core';
import AboutHeader from './aboutHeader';
import Stats from '../../components/Stats/AllStatsController';
import { AboutBody } from '../../bento-core';

const AboutView = ({ classes, data }) => {
  const getImage = (imgPath, alt) => (
    <img
      className={classes.img}
      src={imgPath != null ? imgPath : ''}
      alt={alt}
    />
  );
  const theme = {
    overrides: {
      MuiGrid: {
        root: {
          '@media (min-width: 1920px)': {
            maxWidth: '100%',
          },
          '@media (min-width: 1280px)': {
            maxWidth: '100%',
          },
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
      <div className={classes.container}>
        <AboutHeader title={data.title} />
        <Container>
          <AboutBody
            linkColor="#027DA7"
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
        </Container>
      </div>
    </ThemeProvider>
  );
};
const styles = () => ({
  img: {
    width: '100%',
  },
  container: {
    paddingTop: '43px',
  },
});

export default withStyles(styles)(AboutView);

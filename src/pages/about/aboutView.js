import React from 'react';
import { withStyles } from '@material-ui/core';
import AboutHeader from './aboutHeader';
import Stats from '../../components/Stats/AllStatsController';
import { AboutBody } from '../../bento-core';

const AboutView = ({ classes, data }) => {
  const getImage = (imgPath, alt) => <img className={classes.img} src={imgPath != null ? imgPath : ''} alt={alt} />;
  return (
    <>
      <Stats />
      <div className={classes.container}>
        <AboutHeader title={data.title} />
        <AboutBody data={{
          fontFamily: '"Open Sans", sans-serif',
          lineHeight: '25px',
          image: getImage(data.primaryContentImage, data.title),
          imageLocation: 'left',
          title: data.title ? data.title : '',
          content: data.content ? data.content : '',
          table: data.table ? data.table : '',
          secondaryImage: data.secondaryZoomImage ? data.secondaryZoomImage : null,
          secondaryImageData: getImage(data.secondaryZoomImage, 'secondary zoominout'),
          secondaryZoomImageTitle:
           data.secondaryZoomImageTitle ? data.secondaryZoomImageTitle : null,
        }}
        />
      </div>
    </>

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

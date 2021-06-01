import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';

const Publication = ({
  classes,
  publications,
}) => {
  const publicationList = (
    <>
      <h3> pulications </h3>
    </>
  );
  return (
    <>
      <div className={classes.container}>
        <div className={classes.detailContainer}>
          <Grid container className={classes.gridContainer}>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              {
              publications
                ? (
                  { publicationList }
                ) : (
                  <h3>There are no available publications for this study.</h3>
                )
              }
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  container: {
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
    paddingBottom: '25px',
    height: '100%',
  },
  detailContainer: {
    margin: 'auto',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '100%',

  },
  gridContainer: {
    height: '100%',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
    height: '100%',
  },

});

export default withStyles(styles, { withTheme: true })(Publication);

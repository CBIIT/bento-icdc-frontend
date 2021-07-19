import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import {
  externalIcon,
} from '../../../bento/studyDetailsData';

const Publication = ({
  classes,
  publications,
  display,
}) => {
  const sortPublicationList = ([...publications])
    .sort((a, b) => b.year_of_publication - a.year_of_publication
    || a.publication_title.localeCompare(b.publication_title));
  const getURL = (id, url) => url.concat(id);
  const publicationList = (startIndex, endIndex) => {
    const finalIndex = (publications.length - startIndex > display.numbOfPublishPerView)
      ? endIndex : publications.length;
    const publist = sortPublicationList.slice(startIndex, finalIndex);
    return publist.map((publication, index) => (
      <>
        {(index > 0) && <div><hr className={classes.hrLine} /></div>}
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.title}>
          {publication.publication_title}
        </Grid>
        <Grid container className={classes.detailContainerItems}>
          <Grid item xs={12} className={classes.detailContainerItem}>
            <Grid item container direction="row">
              {
                display.views.map((attr) => (
                  (attr.type === 'link') ? (
                    <>
                      <Grid item xs={12} sm={4} className={classes.label}>
                        {attr.label}
                        :
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        <a href={getURL(publication[attr.key], attr.url)} target="icdc" className={classes.outLink}>
                          {publication[attr.key]}
                          <span className={classes.paddingLeft5}>
                            <img
                              src={externalIcon}
                              alt="imageLink"
                              className={classes.linkIcon}
                            />
                          </span>
                        </a>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12} sm={4} className={classes.label}>
                        {attr.label}
                        :
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {publication[attr.key]}
                      </Grid>
                    </>
                  )
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </>
    ));
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.detailContainer}>
          <Grid container className={classes.gridContainer}>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12}>
                  {
                    (publications && publications.length > 1)
                      ? publicationList(0, display.numbOfPublishPerView)
                      : (
                        <div className={classes.noAssociatedPublication}>
                          This study currently has no associated Publications
                        </div>
                      )
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Grid
                container
                spacing={16}
                direction="row"
                className={classes.detailContainerRight}
              >
                <Grid item xs={12}>
                  {
                    (publications && publications.length > display.numbOfPublishPerView)
                      && publicationList(display.numbOfPublishPerView,
                        (2 * display.numbOfPublishPerView))
                  }
                </Grid>
              </Grid>
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
  detailContainerLeft: {
    display: 'block',
    padding: '5px 0px 5px 10px !important',
    minHeight: '500px',
    maxHeight: '500px',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',
  },
  detailContainerRight: {
    padding: '0px 0 5px 20px !important',
    maxHeight: '500px',
    overflowY: 'auto',
    width: 'calc(100% + 8px)',
  },
  gridContainer: {
    height: '100%',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
    height: '100%',
  },
  title: {
    letterSpacing: '0.014em',
    color: '#000000',
    fontSize: '12px',
    fontWeight: '900',
    margin: ' 20px 0px 10px 0px',
  },
  hrLine: {
    borderTop: '1px solid #81a6b9',
    margin: '20px 0px 20px 0px',
  },
  detailContainerItems: {
    paddingTop: '7px',
  },
  detailContainerItem: {
    paddingTop: '5px !important',
  },
  label: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: '12px',
  },
  outLink: {
    color: '#DD752F',
    textDecoration: 'none',
    fontSize: '12px',
  },
  linkIcon: {
    width: '20px',
  },
  paddingLeft5: {
    paddingLeft: '5px',
  },
  noAssociatedPublication: {
    marginTop: '20px',
    fontSize: '12px',
  },
});

export default withStyles(styles, { withTheme: true })(Publication);

import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModelCardStyle';

const NodeCard = ({ data, classes, index }) => {
  const {
    highlight,
    node_name: nodeName,
    property_name: propertyName,
    property_description: description,
    property_required: required,
    property_type: propertyType,
  } = data;

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Data Model</span>
          <span className={classes.cardTitle}>
            {highlight}
          </span>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Node Name:
          </span>
          <span className={classes.content}>
            {nodeName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Property Name:
          </span>
          <span className={classes.content}>
            {propertyName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Property Description:
          </span>
          <span className={classes.content}>
            {description}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Property Required:
          </span>
          <span className={classes.content}>
            {required}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Property Type:
          </span>
          <span className={classes.content}>
            {propertyType}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Page Link:
          </span>
          <Link to="/icdc-data-model" className={classes.cardTitle}>
            https://caninecommons.cancer.gov/#/icdc-data-model
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(NodeCard);

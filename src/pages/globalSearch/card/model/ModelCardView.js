import { Grid2 as Grid } from '@mui/material';
import { withStyles } from "@mui/styles";
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModelCardStyle';

const NodeCard = ({ data, classes, index }) => {
  const {
    // highlight = '',
    node_name: nodeName = '',
    property_name: propertyName = '',
    property_description: description = '',
    property_required: required = '',
    property_type: propertyType = '',
    input: text,
  } = data;

  const highlightKey = () => {
    const inputSerach = `${text?.input}`.toLowerCase();
    if (!inputSerach) {
      return '';
    }
    if (`${nodeName}`.toLowerCase().includes(inputSerach)) {
      return nodeName;
    }
    if (`${propertyName}`.toLowerCase().includes(inputSerach)) {
      return propertyName;
    }
    if (`${description}`.toLowerCase().includes(inputSerach)) {
      return description;
    }
    if (`${required}`.toLowerCase().includes(inputSerach)) {
      return required;
    }
    if (`${propertyType}`.toLowerCase().includes(inputSerach)) {
      return propertyType;
    }
    return inputSerach;
  };

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Data Model</span>
          <span className={classes.cardTitle}>
            {highlightKey()}
          </span>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Data Model Node:
          </span>
          <span className={classes.content}>
            {nodeName}
          </span>
        </Grid>
        {
          (propertyName) && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Property Name:
              </span>
              <span className={classes.content}>
                {propertyName}
              </span>
            </Grid>
          )
        }
        {
          (description) && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Property Description:
              </span>
              <span className={classes.content}>
                {description}
              </span>
            </Grid>
          )
        }
        {
          (required) && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Property Required:
              </span>
              <span className={classes.content}>
                {required}
              </span>
            </Grid>
          )
        }
        {
          (propertyType) && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Property Type:
              </span>
              <span className={classes.content}>
                {propertyType}
              </span>
            </Grid>
          )
        }
        <Grid item xs={12}>
          <span className={classes.title}>
            Page Link:
          </span>
          <Link to="/icdc-data-model">
            <span className={classes.contentLink}>Data Model Navigator page</span>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(NodeCard);

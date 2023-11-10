import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './StudyCardStyle';

const StudyCardView = ({
  data = {},
  classes,
  index,
}) => {
  const {
    clinical_study_designation: studyDesignation,
    clinical_study_name: studyName,
    accession_id: accessionID,
    clinical_study_type: studyType,
    programName,
  } = data;
  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Study</span>
          <Link to={`/study/${studyDesignation}`} className={classes.cardTitle}>
            {studyDesignation}
          </Link>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program:
          </span>
          <Link to={`/program/${programName}`}>
            <span className={classes.contentLink}>{programName}</span>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Accession ID:
          </span>
          <span className={classes.content}>
            {accessionID}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Study Name:
          </span>
          <span className={classes.content}>
            {studyName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Study Type:
          </span>
          <span className={classes.content}>
            {studyType}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(StudyCardView);

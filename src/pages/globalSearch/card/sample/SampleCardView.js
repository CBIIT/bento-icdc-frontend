import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './SampleCardStyle';

const SampleCardView = ({
  data = {},
  classes,
  index,
}) => {
  const {
    sample_id: sampleID,
    program_name: programName,
    case_id: caseID,
    clinical_study_designation: studyDesignation,
    sample_site: sampleSite,
    physical_sample_type: sampleType,
    general_sample_pathology: pathology,
  } = data;
  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Sample</span>
          <span className={classes.cardTitle}>
            {sampleID}
          </span>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program:
          </span>
          <Link to={`/program/${programName}`} className={classes.content}>
            {programName}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Study:
          </span>
          <Link
            to={`/study/${studyDesignation}`}
            className={classes.content}
          >
            {studyDesignation}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Case:
          </span>
          <Link to={`/case/${caseID}`} className={classes.content}>
            {caseID}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Sample Anatomic Site:
          </span>
          <span className={classes.content}>
            {sampleSite}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Sample Type:
          </span>
          <span className={classes.content}>
            {sampleType}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Sample Pathology:
          </span>
          <span className={classes.content}>
            {pathology}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SampleCardView);

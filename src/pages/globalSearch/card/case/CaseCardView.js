import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './CaseCardStyle';

const CaseCardView = ({
  data = {},
  classes,
  index,
}) => {
  const {
    case_id: caseId = '',
    program_name: programName = '',
    clinical_study_designation: studyDesignation = '',
    disease_term: term = '',
    breed = '',
  } = data;

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Case</span>
          <Link to={`/case/${caseId}`} className={classes.cardTitle}>
            {caseId}
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
            Study:
          </span>
          <Link to={`/study/${studyDesignation}`}>
            <span className={classes.contentLink}>{studyDesignation}</span>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Diagnosis:
          </span>
          <span className={classes.content}>
            {term}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Breed:
          </span>
          <span className={classes.content}>
            {breed}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CaseCardView);

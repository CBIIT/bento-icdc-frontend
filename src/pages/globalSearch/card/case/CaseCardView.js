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
    case_id: caseId,
    program_name: programName,
    clinical_study_designation: studyDesignation,
    disease_term: term,
    breed,
  } = data;

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Case</span>
          <Link to={`/program/${caseId}`} className={classes.cardTitle}>
            {caseId}
          </Link>
        </div>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Program Name:
          </span>
          <span className={classes.content} id={`section_fullName_${index + 1}`}>
            {programName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Clinical Study Designation:
          </span>
          <span className={classes.content} id={`section_description_${index + 1}`}>
            {studyDesignation}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Disease Term:
          </span>
          <span className={classes.content} id={`section_term_${index + 1}`}>
            {term}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Breed:
          </span>
          <span className={classes.content} id={`section_term_${index + 1}`}>
            {breed}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CaseCardView);

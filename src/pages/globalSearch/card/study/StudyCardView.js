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
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Study Name:
          </span>
          <span className={classes.content} id={`section_fullName_${index + 1}`}>
            {studyName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Accession ID:
          </span>
          <span className={classes.content} id={`section_accesionID_${index + 1}`}>
            {accessionID}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            Study Type:
          </span>
          <span className={classes.content} id={`section_studyType_${index + 1}`}>
            {studyType}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(StudyCardView);

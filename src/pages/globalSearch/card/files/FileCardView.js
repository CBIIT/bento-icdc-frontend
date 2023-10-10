import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './FileCardStyle';

const FileCardView = ({
  data = {},
  classes,
  index,
}) => {
  const {
    file_name: fileName,
    file_type: fileType,
    case_id: caseID,
    program_name: programName,
    clinical_study_designation: studyDesignation,
    sample_id: sampleID,
  } = data;
  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>File</span>
          <span className={classes.cardTitle}>
            {fileName}
          </span>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            File Type:
          </span>
          <span className={classes.content}>
            {fileType}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program ID:
          </span>
          <Link
            to={`/program/${programName}`}
            className={classes.content}
          >
            {programName}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Study:
          </span>
          <Link to={`/study/${studyDesignation}`} className={classes.content}>
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
            Sample:
          </span>
          <span className={classes.content}>
            {sampleID}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FileCardView);

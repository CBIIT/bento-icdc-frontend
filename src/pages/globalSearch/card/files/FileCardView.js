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
    file_name: fileName = '',
    file_type: fileType = '',
    file_association: fileAssociation = '',
    case_id: caseID = '',
    program_name: programName = '',
    clinical_study_designation: studyDesignation = '',
    sample_id: sampleID = '',
    programId,
  } = data;

  const caseIds = `${caseID}`.split(',');
  const studyPath = fileAssociation === 'study'
    ? `/study/file/${studyDesignation}` : `/study/${studyDesignation}`;
  const filePathParam = (caseIds.length === 1) ? `/case/${caseID}` : studyPath;
  
  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>File</span>
          <Link
            to={filePathParam}
            className={classes.cardTitle}
          >
            {fileName}
          </Link>
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
            Program:
          </span>
          <Link
            to={`/program/${programId}`}
          >
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
        {
          (caseIds.length === 1) && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Case:
              </span>
              {
                caseIds.map((item) => (
                  <Link to={`/case/${item}`.replace(' ', '')}>
                    <span className={classes.contentLink}>{item}</span>
                  </Link>
                ))
              }
            </Grid>
          )
        }
        {
          sampleID && (
            <Grid item xs={12}>
              <span className={classes.title}>
                Sample:
              </span>
              <Link to={`/case/${caseID}`}>
                <span className={classes.contentLink}>{sampleID}</span>
              </Link>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FileCardView);

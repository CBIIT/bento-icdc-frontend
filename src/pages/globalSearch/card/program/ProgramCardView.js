import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './ProgramCardStyle';

const ProgramCard = ({
  data = {},
  classes,
  index,
}) => {
  const {
    program_id: programId,
    program_external_url: externalURL,
    program_name: fullName,
    program_short_description: description,
  } = data;

  return (
    <Grid item container className={classes.card} id={`global_search_card_${index}`}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Program</span>
          <Link to={`/program/${programId}`} className={classes.cardTitle}>
            {programId}
          </Link>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program Name:
          </span>
          <span className={classes.content}>
            {fullName}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Description:
          </span>
          <span className={classes.content}>
            {description}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            External Url:
          </span>
          <span className={classes.contentLink}>
            <a target="_blank" rel="noreferrer" href={externalURL}>
              {externalURL}
            </a>
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProgramCard);

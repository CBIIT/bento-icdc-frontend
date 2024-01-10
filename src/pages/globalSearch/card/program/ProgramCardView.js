import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './ProgramCardStyle';
import hyperlinkIcon from '../../../../assets/hyperlink.svg';

const ProgramCard = ({
  data = {},
  classes,
  index,
}) => {
  const {
    program_acronym: programId = '',
    program_external_url: externalURL = '',
    program_name: fullName = '',
    program_short_description: description = '',
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
            {fullName}
          </Link>
        </div>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program Acronym:
          </span>
          <span className={classes.content}>
            {programId}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program Description:
          </span>
          <span className={classes.content}>
            {description}
          </span>
        </Grid>
        <Grid item xs={12}>
          <span className={classes.title}>
            Program URL:
          </span>
          <span className={classes.contentLink}>
            <a target="_blank" rel="noreferrer" href={externalURL}>
              <span className={classes.contentLink}>{externalURL}</span>
              {(`${externalURL}`.length > 0) && (
                <img src={hyperlinkIcon} className={classes.hyperLink} alt="link-icon" />
              )}
            </a>
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ProgramCard);

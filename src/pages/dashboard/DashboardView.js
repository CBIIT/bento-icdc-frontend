import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashboardStyle';

const Dashboard = ({
  classes,
  dashData,
}) => {
  const { biospecimen_source: biospecimenSource, program, searchCases } = dashData;
  console.log(biospecimenSource);
  console.log(program);
  console.log(searchCases);
  return (
    <div className={classes.dashboardContainer}>
      <div>
        new dash
      </div>
    </div>
  );
};

export default withStyles(styles)(Dashboard);

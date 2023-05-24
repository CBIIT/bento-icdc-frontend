import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashboardStyle';
import StatsView from '../../components/Stats/StatsView';
import BentoFacetFilter from './sideBar/BentoFacetFilter';

const Dashboard = ({
  classes,
  searchCases,
  program,
  biospecimenSource,
  activeFilters,
}) => (
  <div className={classes.dashboardContainer}>
    <StatsView data={searchCases} />
    <div>
      <div className={classes.content}>
        <div className={classes.sideBar}>
          <BentoFacetFilter
            tooltipItems={[...program, ...biospecimenSource]}
            searchData={searchCases}
            activeFilters={activeFilters}
          />
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Dashboard);

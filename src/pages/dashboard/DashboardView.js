import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashboardStyle';
import StatsView from '../../components/Stats/StatsView';
import BentoFacetFilter from '../../components/sideBarFilter/BentoFacetFilter';
import {
  facetSectionVariables,
  facetsConfig,
  tooltipConfig,
} from '../../bento/dashboardData';
import QueryBarView from './filterQueryBar/QueryBarView';

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
            facetSectionVariables={facetSectionVariables}
            facetsConfig={facetsConfig}
            tooltipConfig={tooltipConfig}
          />
        </div>
        <div className={classes.rightContent}>
          <div className={classes.widgetsContainer}>
            <QueryBarView data={searchCases} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Dashboard);

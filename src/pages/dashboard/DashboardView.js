import React from 'react';
import { withStyles } from "@mui/styles";
import styles from './DashboardStyle';
import {
  facetSectionVariables,
  facetsConfig,
  tooltipConfig,
} from '../../bento/dashboardData';
import StatsView from '../../components/Stats/StatsView';
import BentoFacetFilter from '../../components/sideBarFilter/BentoFacetFilter';
import WidgetView from './widget/WidgetView';
import QueryBarView from './filterQueryBar/QueryBarView';
import DashboardTabs from './components/DashboardTabs';
import { updateStat } from '../../components/Stats/utils';

const Dashboard = ({
  classes,
  searchCases,
  program,
  biospecimenSource,
  activeFilters,
  localFindAutocomplete,
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
            localFindAutocomplete={localFindAutocomplete}
          />
        </div>
        <div className={classes.rightContent}>
          <div className={classes.widgetsContainer}>
            <QueryBarView data={searchCases} classes={classes} />
            <WidgetView
              data={searchCases}
              activeFilters={activeFilters}
            />
          </div>
          <DashboardTabs
            dashboardStats={updateStat(searchCases)}
            activeFilters={activeFilters}
          />
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Dashboard);

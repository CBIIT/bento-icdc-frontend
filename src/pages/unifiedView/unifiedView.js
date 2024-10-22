import React from 'react';
import {
  Chip,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import styles from './unifiedStyle';
import StatsView from '../../components/Stats/StatsView';
import BentoFacetFilter from '../../components/sideBarFilter/BentoFacetFilter';
import {
  facetSectionVariables,
} from '../../bento/unifiedViewData';
import {
  facetsConfig,
} from '../../bento/dashboardData';
import unifiedViewIcon from '../../assets/unifiedViewIcon.svg';
import { multiStudyData as custodianMultiStudyData } from '../../bento/dashboardTabData';
import { updateStat } from '../../components/Stats/utils';
import DashboardTabsView from '../dashboard/components/DashboardTabs';

const Dashboard = ({
  classes,
  unifiedViewData,
  isUnifiedView = true,
}) => (
  <div className={classes.dashboardContainer}>
    <StatsView data={unifiedViewData} />
    <div>
      <div className={classes.content}>
        <div className={classes.sideBar}>
          <BentoFacetFilter
            facetSectionVariables={facetSectionVariables}
            facetsConfig={facetsConfig}
            searchData={{}}
            isUnifiedView={isUnifiedView}
          />
        </div>
        <div className={classes.rightContent}>
          <div>
            <div className={classes.multiStudyHeader}>
              <img
                src={unifiedViewIcon}
                className={classes.multiStudyIcon}
                alt={custodianMultiStudyData.alt}
              />
              <div className={classes.multiStudyHeaderText}>
                Multi-study Participant
              </div>
              <Chip className={classes.chip} size="small" label={`Canine ID: ${unifiedViewData.individualId}`} />
            </div>
            <hr className={classes.divider} />
            <DashboardTabsView
              dashboardStats={updateStat(unifiedViewData)}
              activeFilters={[]}
              unifiedQueryParam={{
                case_ids: unifiedViewData.caseIds,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Dashboard);

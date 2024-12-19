import React from 'react';
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
import * as Styled from './Dashboard.styled';

const Dashboard = ({
  searchCases,
  program,
  biospecimenSource,
  activeFilters,
  localFindAutocomplete,
  searchText,
}) => (
  <Styled.DashboardContainer>
    <StatsView data={searchCases} />
    <div>
      <Styled.Content>
        <Styled.SideBar>
          <BentoFacetFilter
            tooltipItems={[...program, ...biospecimenSource]}
            searchData={searchCases}
            activeFilters={activeFilters}
            facetSectionVariables={facetSectionVariables}
            facetsConfig={facetsConfig}
            tooltipConfig={tooltipConfig}
            localFindAutocomplete={localFindAutocomplete}
          />
        </Styled.SideBar>
        <Styled.WidgetTableContent>
          <div>
            <QueryBarView data={searchCases} />
            <WidgetView data={searchCases} activeFilters={activeFilters} />
          </div>
          <DashboardTabs
            dashboardStats={updateStat(searchCases)}
            activeFilters={activeFilters}
            searchText={searchText}
          />
        </Styled.WidgetTableContent>
      </Styled.Content>
    </div>
  </Styled.DashboardContainer>
);

export default Dashboard;

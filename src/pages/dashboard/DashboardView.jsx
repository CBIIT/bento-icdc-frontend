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
import PageContent from '../../components/Layout/PageContent';

const Dashboard = ({
  searchCases,
  program,
  biospecimenSource,
  activeFilters,
  localFindAutocomplete,
  searchText,
  searchResultIds,
}) => (
  <Styled.DashboardContainer>
    <StatsView data={searchCases} />
    <PageContent>
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
            searchResultIds={searchResultIds}
          />
        </Styled.WidgetTableContent>
      </Styled.Content>
    </PageContent>
  </Styled.DashboardContainer>
);

export default Dashboard;

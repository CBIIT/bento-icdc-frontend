import React from 'react';
import _ from 'lodash';
import {
  TableContextProvider,
} from '../../../bento-core';
import TabsView from '../../../components/Tabs/TabsView';
import { tableContainers, tableLayOut, tabIndex } from '../../../bento/dashboardTabData';
import PaginatedTableView from '../../../components/PaginatedTable/TableView';
import useDashboardTabs from './dashboard-tabs-store';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
  unifiedQueryParam = {},
}) => {
  const [state, actions] = useDashboardTabs();
  console.log('state-->', state);
  const handleTabChange = (_event, value) => {
    actions.changeCurrentTab(value);
  };

  return (
    <>
      <TabsView
        dashboardStats={dashboardStats}
        currentTab={state.currentTab}
        setCurrentTab={handleTabChange}
      />
      {
        tableContainers.map((tab, index) => (
          <TableContextProvider>
            <div hidden={state.currentTab !== index}>
              <PaginatedTableView
                config={{
                  ...tab,
                  unifiedView: !_.isEmpty(unifiedQueryParam),
                }}
                tableLayOut={tableLayOut}
                totalRowCount={dashboardStats[tab.count]}
                activeTab={index === state.currentTab}
                tabStyles={tabIndex[index]}
                activeFilters={{
                  ...activeFilters,
                  ...tab?.queryParam,
                  ...unifiedQueryParam,
                }}
              />
            </div>
          </TableContextProvider>
        ))
      }
    </>
  );
};

export default DashboardTabsView;

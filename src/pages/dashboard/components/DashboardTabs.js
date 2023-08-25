import React, { useState } from 'react';
import _ from 'lodash';
import {
  TableContextProvider,
} from '../../../bento-core';
import TabsView from '../../../components/Tabs/TabsView';
import { tableContainers, tableLayOut, tabIndex } from '../../../bento/dashboardTabData';
import PaginatedTableView from '../../../components/PaginatedTable/TableView';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
  unifiedQueryParam = {},
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <TabsView
        dashboardStats={dashboardStats}
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
      />
      {
        tableContainers.map((tab, index) => (
          <TableContextProvider>
            <div hidden={currentTab !== index}>
              <PaginatedTableView
                config={{
                  ...tab,
                  unifiedView: !_.isEmpty(unifiedQueryParam),
                }}
                tableLayOut={tableLayOut}
                totalRowCount={dashboardStats[tab.count]}
                activeTab={index === currentTab}
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

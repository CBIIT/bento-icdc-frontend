import React, { useState } from 'react';
import TabsView from '../../../components/Tabs/TabsView';
import { tableContainers, tableLayOut } from '../../../bento/dashboardTabData';
import PaginatedTableView from '../../../components/PaginatedTable/TableView';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
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
          <>
            <div hidden={currentTab !== index}>
              <PaginatedTableView
                config={tab}
                tableLayOut={tableLayOut}
                totalRowCount={dashboardStats[tab.count]}
                activeTab={index === currentTab}
                activeFilters={{
                  ...activeFilters,
                  ...tab?.queryParam,
                }}
              />
            </div>
          </>
        ))
      }
    </>
  );
};

export default DashboardTabsView;

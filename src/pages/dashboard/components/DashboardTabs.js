import React, { useEffect, useState } from 'react';
import {
  TableContextProvider,
} from '@bento-core/paginated-table';
import TabsView from '../../../components/Tabs/TabsView';
import { tableContainers, tableLayOut, tabIndex } from '../../../bento/dashboardTabData';
import PaginatedTableView from '../../../components/PaginatedTable/TableView';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  /**
  * 1. update active Filter query for table only after
  * dashboard state change
  * To prevent table from making additional call
  */
  const [queryVeriables, setQueryVariables] = useState({});
  useEffect(() => {
    setQueryVariables(activeFilters);
  }, [dashboardStats]);

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
                config={tab}
                tableLayOut={tableLayOut}
                totalRowCount={dashboardStats[tab.count]}
                activeTab={index === currentTab}
                tabStyles={tabIndex[index]}
                activeFilters={{
                  ...queryVeriables,
                  ...tab?.queryParam,
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

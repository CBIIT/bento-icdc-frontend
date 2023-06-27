import React, { useEffect, useState } from 'react';
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
  /**
  * 1. update active Filter query for table only after
  * dashboard state change
  * prevents table from making additional call
  */
  const getQueryVariables = (tab) => {
    const [queryVeriables, setQueryVariables] = useState({});
    useEffect(() => {
      setQueryVariables({
        ...activeFilters,
        ...tab?.queryParam,
      });
    }, [dashboardStats[tab.count]]);
    return {
      ...queryVeriables,
    };
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
                  ...getQueryVariables(tab),
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

import React, { useEffect, useState } from 'react';
import {
  TableContextProvider,
} from '../../../bento-core';
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

  const TableView = ({
    tab,
    index,
  }) => {
    /**
    * 1. update active Filter query for table only after
    * dashboard state change
    * prevents table from making additional call
    */
    const [queryVeriables, setQueryVariables] = useState({});
    useEffect(() => {
      setQueryVariables({ ...activeFilters, ...tab?.queryParam });
    }, [dashboardStats[tab.count]]);

    return (
      <TableContextProvider>
        <div hidden={currentTab !== index}>
          <PaginatedTableView
            config={tab}
            tableLayOut={tableLayOut}
            totalRowCount={dashboardStats[tab.count]}
            activeTab={index === currentTab}
            tabStyles={tabIndex[index]}
            activeFilters={queryVeriables}
          />
        </div>
      </TableContextProvider>
    );
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
          <TableView tab={tab} index={index} />
        ))
      }
    </>
  );
};

export default DashboardTabsView;

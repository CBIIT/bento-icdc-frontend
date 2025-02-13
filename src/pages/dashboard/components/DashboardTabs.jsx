import React from 'react';
import _ from 'lodash';
import {
  customPaginationAction,
  TableContextProvider,
} from '../../../bento-core';
import TabsView from '../../../components/Tabs/TabsView';
import {
  tableContainers,
  tableLayOut,
  tabIndex,
} from '../../../bento/dashboardTabData';
import PaginatedTableView from '../../../components/PaginatedTable/TableView';
import useDashboardTabs from './dashboard-tabs-store';
import DashboardThemeProvider from './DashboardThemeProvider';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
  unifiedQueryParam = {},
  searchResultIds,
  searchText,
}) => {
  const [state, actions] = useDashboardTabs();
  const handleTabChange = (_event, value) => {
    actions.changeCurrentTab(value);
  };

  // page specific state initialization
  // override any table state at page label
  // set input serch for all the tables
  const dashboardTableInitActions = context => {
    if (searchText !== undefined) {
      const { dispatch, searchQuery: tableSearch } = context;
      if (dispatch && tableSearch != searchText) {
        // override the search query foreach of the tables
        dispatch(
          customPaginationAction({
            searchQuery: searchText,
          })
        );
      }
    }
  };
  const getTextFilterRequestParam = ({
    searchTextRequestKey,
    searchTextResultKey,
  }) => ({
    [searchTextRequestKey]: searchResultIds[searchTextResultKey],
  });

  return (
    <DashboardThemeProvider>
      <TabsView
        dashboardStats={dashboardStats}
        currentTab={state.currentTab}
        setCurrentTab={handleTabChange}
      />
      {tableContainers.map((tab, index) => (
        <TableContextProvider key={`tableCont-${index}`}>
          <div hidden={state.currentTab !== index}>
            <PaginatedTableView
              config={{
                ...tab,
                unifiedView: !_.isEmpty(unifiedQueryParam),
              }}
              tableLayOut={tableLayOut}
              searchText={searchText}
              totalRowCount={dashboardStats[tab.count]}
              activeTab={index === state.currentTab}
              tabStyles={tabIndex[index]}
              activeFilters={{
                ...activeFilters,
                ...tab?.queryParam,
                ...unifiedQueryParam,
                ...getTextFilterRequestParam(tab),
              }}
              overriedTableState={dashboardTableInitActions}
            />
          </div>
        </TableContextProvider>
      ))}
    </DashboardThemeProvider>
  );
};

export default DashboardTabsView;

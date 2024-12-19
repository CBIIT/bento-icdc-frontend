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
import { TableLayout } from './TableLayout';

const DashboardTabsView = ({
  dashboardStats,
  activeFilters,
  unifiedQueryParam = {},
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
            <TableLayout
              queryParam={tab?.queryParam}
              addFilesRequestVariableKey={tab.addFilesRequestVariableKey}
              addSelectedFilesResponseKeys={tab.addFilesResponseKeys}
              addAllFilesResponseKeys={tab.addAllFilesResponseKeys}
              addAllFileQuery={tab.addAllFileQuery}
              addSelectedFilesQuery={tab.addSelectedFilesQuery}
              addFileTooltipCofig={tab.addFilesTooltopConfig}
              addAllFilesButtonText={tab.selectAllButtonText}
              addSelectedFilesButtonText={tab.selectedButtonText}
              activeFilters={{
                ...activeFilters,
                ...tab?.queryParam,
                ...unifiedQueryParam,
              }}
              overriedTableState={dashboardTableInitActions}
            >
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
            </TableLayout>
          </div>
        </TableContextProvider>
      ))}
    </DashboardThemeProvider>
  );
};

export default DashboardTabsView;

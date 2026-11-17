import React from 'react';
import LoadingSection from './LoadingSection';
import _ from 'lodash';
import { TableContextProvider } from '../../../bento-core';
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
  searchResultIds,
  searchText,
  loading = false,
}) => {
  const [state, actions] = useDashboardTabs();
  const handleTabChange = (_event, value) => {
    actions.changeCurrentTab(value);
  };

  const resultsKey = JSON.stringify({ ...activeFilters, ...unifiedQueryParam });

  const getTextFilterRequestParam = ({
    searchTextRequestKey,
    searchTextResultKey,
  }) => {
    if (
      !searchResultIds ||
      (typeof searchResultIds === 'object' &&
        !(searchTextResultKey in searchResultIds))
    ) {
      return;
    }

    return {
      [searchTextRequestKey]: searchResultIds[searchTextResultKey],
    };
  };

  return (
    <DashboardThemeProvider>
      <TabsView
        loading={loading}
        dashboardStats={dashboardStats}
        currentTab={state.currentTab}
        setCurrentTab={handleTabChange}
      />
      <div style={{ minHeight: 400 }}>
        {tableContainers.map((tab, index) => (
          <TableContextProvider key={`tableCont-${index}`}>
            <div hidden={state.currentTab !== index}>
              <LoadingSection loading={loading}>
                <TableLayout
                  key={resultsKey}
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
                    ...getTextFilterRequestParam(tab),
                  }}
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
                      ...getTextFilterRequestParam(tab),
                    }}
                    preservePreferences
                    searchText={searchText}
                  />
                </TableLayout>
              </LoadingSection>
            </div>
          </TableContextProvider>
        ))}
      </div>
    </DashboardThemeProvider>
  );
};

export default DashboardTabsView;

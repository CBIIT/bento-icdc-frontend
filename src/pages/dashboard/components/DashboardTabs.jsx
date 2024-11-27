import React from 'react';
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
}) => {
  const [state, actions] = useDashboardTabs();
  const handleTabChange = (_event, value) => {
    actions.changeCurrentTab(value);
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

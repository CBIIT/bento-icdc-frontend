import React, { useEffect, useState, useContext } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import {
  TableView,
  Wrapper,
  TableContext,
} from '../../bento-core';
import styles from './TableStyle';
import { themeConfig, customTheme } from './TableTheme';
import { CustomizeCellView } from './Customize/CellView';
import { updateWrapperConfig } from './Customize/TableView';
import { ExtendedViewConfig } from './Customize/ExtendedView';
import { ColumnGrouping } from './Customize/ColumnGrouping';
import { paginationOptions } from './Customize/PaginationOptions';

const PaginatedTableView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    config,
    totalRowCount,
    activeFilters,
    classes,
    activeTab,
    tableLayOut = [],
    tabStyles,
    rowsPerPage = 10,
    tblRows = [],
    isServer = true,
    customthemeConfig,
    tableReduxActions,
  } = props;
  // access table state
  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  /*
  * useReducer table state
  * paginated table update data when state change
  */
  /**
  * Server Pagination Table Configuration
  * 1. title - (Required) table name (Case, Sample, Files), required for class name
  * 2. query/api - (Required) GraphQL Query for paginated Table (e.g. GET_CASES_OVERVIEW_QUERY)
  * 3. dataKey - (Required) Tracking selected rows (case - dataKey: 'subject_id')
  * 4. sortBy - (Required) default sort column
  * 5. columns - (Required) columns defined by dashboardTabData (tabContainers)
  * (see configColumn method for customRedering)
  * 6. tableMsg - (Required) Display noMatch Msg
  * 7. theme - (Optional) override style with themeprovider use ClassName provided by
  * bento-core table to apply style (refer to class name table)
  * 8. paginationAPIField - (Required) Access http response data - defined by
  * dashboardTabData (tabContainers)
  * eg. case tab paginationAPIField: 'subjectOverview' - {subjectOverview: [data]}
  * 9. extendedViewConfig - (Optional) table view config, set hide/diaply
  * pagination above table header
  * 10. extendedViewConfig: (Optional) config to add (pagination on top of the table,
  * manage Column view)
  * 11. selectedRows: (Optional) provides ids of the selected row (id defined by dataKey)
  * 12. themeConfig - (optional) configure table style
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: config.name,
    query: config.api,
    paginationAPIField: config.paginationAPIField,
    dataKey: config.dataKey,
    columns: CustomizeCellView({ ...config, ...tableReduxActions }),
    count: totalRowCount,
    selectedRows: [],
    selectedFileIds: [],
    tableMsg: config.tableMsg,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    extendedViewConfig: ExtendedViewConfig(config),
    columnGroups: ColumnGrouping(config.columnGroups),
    rowsPerPage,
    page: 0,
  });

  /**
  * 1. update active Filter query for table only after
  * dashboard state change
  * prevents table from making additional call
  */
  const getQueryVariables = () => {
    const [queryVeriables, setQueryVariables] = useState(activeFilters);
    // searchCases query should be resolve first before updating the table row/data
    // only when total count of cases/samples/files (totalRowCount) changed
    // update the queryVeriables state to reload the table
    // (state update will rerender the component),
    // this will prevent backend call when table state is invalid
    // invalid table state will display empty table
    useEffect(() => {
      setQueryVariables({
        ...activeFilters,
      });
    }, [totalRowCount]);
    return {
      ...queryVeriables,
    };
  };

  return (
    <>
      <Wrapper
        wrapConfig={updateWrapperConfig(config, tableLayOut, context, totalRowCount)}
        customTheme={{
          ...customTheme,
          ...customthemeConfig?.customTheme,
        }}
        classes={classes}
        section={config.name}
        activeFilters={activeFilters}
      >
        <Grid container>
          <Grid item xs={12} id={config.tableID}>
            <TableView
              initState={initTblState}
              themeConfig={{
                ...themeConfig(tabStyles, context),
                ...customthemeConfig,
              }}
              queryVariables={getQueryVariables()}
              totalRowCount={totalRowCount}
              activeTab={activeTab}
              tblRows={tblRows}
              server={isServer}
              paginationOptions={paginationOptions(context, config)}
            />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default withStyles(styles)(PaginatedTableView);

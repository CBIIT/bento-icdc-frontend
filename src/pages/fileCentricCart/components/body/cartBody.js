import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import {
  getColumns,
  getOptions,
  getDefaultCustomFooter,
  ToolTip as Tooltip,
} from 'bento-components';
import _ from 'lodash';
import CustomDataTable from '../../../../components/serverPaginatedTable/serverPaginatedTable';
import Styles from './cartBody.style';
import {
  table, GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC,
} from '../../../../bento/fileCentricCartWorkflowData';
import TableThemeProvider from './cartTableThemeConfig';
import updateColumns from '../../../../utils/columnsUtil';
import DocumentDownload from '../../../../components/DocumentDownload';

const CartHeader = ({
  classes,
  data,
  externalLinkIcon,
  deleteColumn,
  fileIDs,
  defaultSortCoulmn,
  defaultSortDirection,
  tableDownloadCSV,
  updateSortOrder,
  paginationAPIField,
  paginationAPIFieldDesc,
  localPage,
  localRowsPerPage,
  isLoading,
}) => {
  function onRowSelectionChange(curr, allRowsSelected) {
    return (curr, allRowsSelected);
  }

  const columns = updateColumns(getColumns(table, classes, data, externalLinkIcon, '', () => {}, DocumentDownload).concat(deleteColumn), table.columns);
  const options = getOptions(table, classes, getDefaultCustomFooter, onRowSelectionChange);

  return (
    <TableThemeProvider>
      <CustomDataTable
        data={_.cloneDeep(data)}
        columns={columns}
        options={options}
        className={classes.tableStyle}
        count={fileIDs.length || 0}
        overview={GET_MY_CART_DATA_QUERY}
        overviewDesc={GET_MY_CART_DATA_QUERY_DESC}
        paginationAPIField={paginationAPIField}
        paginationAPIFieldDesc={paginationAPIFieldDesc}
        queryCustomVaribles={{ uuids: fileIDs }}
        defaultSortCoulmn={defaultSortCoulmn}
        defaultSortDirection={defaultSortDirection}
        tableDownloadCSV={tableDownloadCSV}
        components={{
          Tooltip,
        }}
        updateSortOrder={updateSortOrder}
        localPage={localPage}
        localRowsPerPage={localRowsPerPage}
        isLoading={isLoading}
      />
    </TableThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(CartHeader);

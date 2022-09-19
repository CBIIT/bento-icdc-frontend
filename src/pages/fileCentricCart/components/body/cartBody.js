import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { selectFiles } from '../../store/cart';

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
  dataKey = 'file_name',
  primaryKeyIndex = 0,
}) => {
  function onRowSelectionChange(curr, allRowsSelected) {
    return (curr, allRowsSelected);
  }
  const selectedRowData = useSelector((state) => (state.cart.selectedFiles));

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState([]);
  const [cartData, setCartData] = useState(_.cloneDeep(data));

  useEffect(() => {
    setCartData(_.cloneDeep(data));
  }, [data]);

  const columns = updateColumns(getColumns(table, classes, data, externalLinkIcon, '', () => {}, DocumentDownload).concat(deleteColumn), table.columns);
  const options = getOptions(table, classes, getDefaultCustomFooter, onRowSelectionChange);

  const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  /*
    Presist user selection
  */
  function onSortingTriggerFunc(displayedData) {
    const dispData = displayedData.map((d) => d.file_name);
    const selectedFilesIndex = dispData.reduce((acc, v, i) => acc
      .concat(selectedFileName.includes(v) ? i : []), []);
    if (selectedFileName.length > 0
      && !isEqual(selectedRows, selectedFilesIndex)) {
      setSelectedRows(selectedFilesIndex);
      setCartData(displayedData);
      selectFiles({
        selectedRowInfo: selectedFileName,
        selectedRowIndex: selectedFilesIndex,
      });
    }
    if (selectedFileName.length === 0
      && !isEqual(selectedRowData.selectedRowInfo, selectedFileName)) {
      selectFiles({
        selectedRowInfo: selectedFileName,
        selectedRowIndex: selectedFilesIndex,
      });
    }
  }

  function rowSelectionFunc(curr, allRowsSelected, rowsSelected, displayData) {
    const selectedFiles = displayData.reduce((acc, d, i) => acc
      .concat(rowsSelected.includes(i) ? d.data[primaryKeyIndex] : []), []);
    const files = displayData.map((d) => d.data[primaryKeyIndex]);
    if (allRowsSelected.length === 0) {
      const filterItem = selectedFileName.filter((file) => !files.includes(file));
      setSelectedFileName(filterItem);
      setSelectedRows([]);
    } else {
      const filterItem = selectedFileName.filter((file) => !files.includes(file));
      if (filterItem) {
        setSelectedFileName([...selectedFiles, ...filterItem]);
      } else {
        setSelectedFileName(selectedFiles);
      }
    }
  }

  const defaultOptions = () => ({
    dataKey,
    rowsSelected: selectedRows,
    onRowSelectionChange: rowSelectionFunc,
    onSortingTrigger: onSortingTriggerFunc,
  });
  const finalOptions = {
    ...options,
    ...defaultOptions(),
  };

  return (
    <TableThemeProvider>
      <CustomDataTable
        data={cartData}
        columns={columns}
        options={finalOptions}
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

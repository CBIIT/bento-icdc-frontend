import { customPaginationAction } from '../../../bento-core';
import {
  GET_MY_CART_DATA_QUERY,
  GET_MY_CART_DATA_QUERY_DESC,
  cartTable,
} from '../../../bento/fileCentricCartWorkflowData';

// pagination table behavior
// customizeOnRowSelect,
// customizeToggleSelectAll,
// customizeSortByColumn,
// customizeChangePage,
// customizeChangeRowsPerPage,
// customizeColumnViewChange,

export const myFileTablePaginationOptions = (context) => ({
  customizeSortByColumn: (column, order) => {
    const { dispatch, sortBy } = context;
    const sort = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    const value = {
      sortOrder: sort,
      sortBy: column,
      query: sort === 'asc' ? GET_MY_CART_DATA_QUERY : GET_MY_CART_DATA_QUERY_DESC,
      paginationAPIField: sort === 'asc' ? cartTable.paginationAPIField
        : cartTable.paginationAPIFieldDesc,
    };
    dispatch(customPaginationAction(value));
  },
  customizeToggleSelectAll: (event, Ids, includeIds, rows) => {
    event.stopPropagation();
    const {
      dispatch,
      selectedRows = [], 
      selectedFileIds = [],
    } = context;
    let updateFilesId = [...selectedFileIds];
    const fileIds = rows.map(({file_uuid: fileId}) => fileId);
    if (event.target.checked && !includeIds) {
      // select all
      const selecedFilesName = Ids.concat(selectedRows);
      updateFilesId = updateFilesId.concat(fileIds);
      dispatch(customPaginationAction({
        selectedRows: selecedFilesName,
        selectedFileIds: updateFilesId,
      }));
    } else {
      // unchecked all
      const excludeFilesName = selectedRows.filter((flName) => !Ids.includes(flName));
      const excludeFilesId = selectedFileIds.filter((uuid) => !fileIds.includes(uuid));
      dispatch(customPaginationAction({
        selectedRows: excludeFilesName,
        selectedFileIds: excludeFilesId,
      }));
    }
  },
  customizeOnRowSelect: (event, row) => {
    // Override the select row pagination action for cart table,
    // file_name and file_uuid are required to view in JBrowse
    // and download files respectively.
    event.stopPropagation();
    const { dispatch, 
      selectedRows = [], 
      selectedFileIds = [],
    } = context;
    let selectedFilesName = [...selectedRows];
    let updateFilesId = [...selectedFileIds];
    const {
      file_name: fileName,
      file_uuid: fileId,
    } = row;

    if (!row.isChecked) {
      selectedFilesName.push(fileName);
      updateFilesId.push(fileId);
    } else {
      selectedFilesName = selectedFilesName.filter((file) => fileName !== file);
      updateFilesId = updateFilesId.filter((id) => fileId !== id);
    }
    dispatch(customPaginationAction({
      selectedRows: selectedFilesName,
      selectedFileIds: updateFilesId,
    }));
  }
});

export const paginationOptions = (context, config) => {
  switch (config?.title) {
    case 'myFiles':
      return {
        ...myFileTablePaginationOptions(context),
      };
    default:
      return {};
  }
};

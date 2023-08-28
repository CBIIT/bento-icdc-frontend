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
  customizeOnRowSelect: (event, row) => {
    const { dispatch } = context;
    // default behavior
    event.stopPropagation();
    let selectedIds = [...context.selectedRows];
    const selectedId = row[context.dataKey];
    if (!row.isChecked) {
      selectedIds.push(selectedId);
    } else {
      selectedIds = selectedIds.reduce((acc, id) => {
        if (selectedId !== id) {
          acc.push(id);
        }
        return acc;
      }, []);
    }
    // end of default behavior

    dispatch(customPaginationAction({
      selectedFileIds: [...context.selectedFileIds, row.file_uuid],
      selectedRows: selectedIds, // default behavior
    }));
  },
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

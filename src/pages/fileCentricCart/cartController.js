import React from 'react';
import { useQuery } from '@apollo/client';
import { getCart, updateSortOrder } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC, table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  const defaultSortDirection = table.defaultSortDirection || 'asc';
  const CART_QUERY = (defaultSortDirection === 'desc' || cart.sortDirection === 'desc')
    ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;
  const defaultSortColumnValue = cart.sortColumn === '' || !cart.sortColumn ? table.defaultSortField || '' : cart.sortColumn;
  // if the user open the webpage for the first time.
  console.log('cartController call');
  if (!localStorage.getItem('sortColumn') || !localStorage.getItem('page') || !localStorage.getItem('rowsPerPage')) {
    localStorage.setItem('sortColumn', defaultSortColumnValue);
    localStorage.setItem('page', '0');
    localStorage.setItem('rowsPerPage', '10');
  }
  const localPage = localStorage.getItem('page');
  const localRowsPerPage = localStorage.getItem('rowsPerPage');
  const page = parseInt(localPage, 10);
  const rowsPerPage = parseInt(localRowsPerPage, 10);
  const offset = page * rowsPerPage;
  const count = ids.length || 0;

  const { loading, error, data } = useQuery(CART_QUERY, {
    variables: {
      offset,
      first: count < rowsPerPage ? count : rowsPerPage,
      uuids: ids,
      order_by: cart.sortColumn === '' ? table.defaultSortField || '' : cart.sortColumn,
    },
  });

  if (loading) {
    // return (
    //   <CartView
    //     isLoading
    //     data="undefined"
    //     defaultSortCoulmn={defaultSortColumnValue}
    //     defaultSortDirection={defaultSortDirection}
    //   />
    // );
  }
  if (error || !data) {
    return (
      <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
    );
  }

  return (
    <CartView
      isLoading={false}
      fileIDs={ids}
      updateSortOrder={updateSortOrder}
      defaultSortCoulmn={defaultSortColumnValue}
      defaultSortDirection={defaultSortDirection}
      paginationAPIField={table.paginationAPIField}
      paginationAPIFieldDesc={table.paginationAPIFieldDesc}
      tableDownloadCSV={table.tableDownloadCSV || false}
      localPage={localPage}
      localRowsPerPage={localRowsPerPage}
      data={
        (defaultSortDirection === 'desc' || cart.sortDirection === 'desc')
          ? data.filesInListDesc === null || data.filesInListDesc === '' ? [] : data.filesInListDesc
          : data.filesInList === null || data.filesInList === '' ? [] : data.filesInList
        }
    />
  );
};

export default cartController;

import React from 'react';
import { useQuery } from '@apollo/client';
import { getCart, updateSortOrder } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_MY_CART_DATA_QUERY,
  GET_MY_CART_DATA_QUERY_DESC,
  GET_STORE_MANIFEST_DATA_QUERY,
  table,
} from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  const defaultSortDirection = table.defaultSortDirection || 'asc';
  const CART_QUERY = (defaultSortDirection === 'desc' || cart.sortDirection === 'desc')
    ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;
  const defaultSortColumnValue = cart.sortColumn === '' || !cart.sortColumn ? table.defaultSortField || '' : cart.sortColumn;

  // if the user open the webpage for the first time.
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

  const {
    loading: storeManifestLoading,
    error: storeManifestError,
    data: storeManifestPayload,
  } = useQuery(GET_STORE_MANIFEST_DATA_QUERY, {
    variables: {
      uuids: ids,
    },
  });

  if (loading || storeManifestLoading) {
    return (
      <CartView
        isLoading
        data="undefined"
        defaultSortCoulmn={defaultSortColumnValue}
        defaultSortDirection={defaultSortDirection}
      />
    );
  }
  if (error || !data || storeManifestError || !storeManifestPayload) {
    return (
      <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
    );
  }

  const processedStoreManifestPayload = storeManifestPayload.filesInList.map((el) => ({
    file_name: el.file_name,
    file_type: el.file_type,
    association: el.association,
    file_description: el.file_description,
    file_format: el.file_format,
    file_size: el.file_size,
    case_id: el.case_id,
    breed: el.breed,
    diagnosis: el.diagnosis,
    study_code: el.study_code,
    file_uuid: el.file_uuid,
    md5sum: el.md5sum,
    sample_id: el.sample_id,
    individual_id: el.individual_id,
    name: el.name,
    drs_uri: el.drs_uri,
  }));

  // console.log('log check', processedStoreManifestPayload);
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
      storeManifestPayload={processedStoreManifestPayload}
      data={
        (defaultSortDirection === 'desc' || cart.sortDirection === 'desc')
          ? data.filesInListDesc === null || data.filesInListDesc === '' ? [] : data.filesInListDesc
          : data.filesInList === null || data.filesInList === '' ? [] : data.filesInList
        }
    />
  );
};

export default cartController;

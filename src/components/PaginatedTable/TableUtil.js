import React from 'react';
import { Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';
import {
  btnTypes,
} from '@bento-core/paginated-table';

export const CustomCellView = (props) => {
  const {
    downloadDocument,
    displayEmpty, dataField,
  } = props;
  if (downloadDocument) {
    return (
      <></>
    );
  }
  if (typeof displayEmpty === 'boolean') {
    return (<Typography>{displayEmpty || props[dataField] ? props[dataField] : ''}</Typography>);
  }

  // other custom elem
  return (<></>);
};

export const CustomHeaderCellView = () => (<></>);

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const CustomizeView = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  // const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...columns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};

/**
* 1. addFileQuery - query to addAll files or add selected files on cart
* 2. responseKeys - provided respose key for addFileQuery
*/
export const updateWrapperConfig = (tab, configs) => {
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => ({
      ...item,
      addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
      dataKey: tab.addFilesRequestVariableKey,
      responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
        ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
    })) : [],
  }));
  return wrpConfig;
};

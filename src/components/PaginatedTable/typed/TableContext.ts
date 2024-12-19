import React, { useContext } from 'react';
import { TableContext as UntypedTableContext } from '../../../bento-core';

interface tableState {
  selectedRows: string[];
  title: string;
  query: string;
  paginationAPIField: string;
  dataKey: string;
  columns: unknown;
  count: number;
  selectedFileIds: string[];
  tableMsg: string;
  sortBy: string;
  sortOrder: string;
  extendedViewConfig: unknown;
  columnGroups: unknown;
  rowsPerPage: number;
  page: number;
}

interface TableContextType {
  context: tableState;
}

// Set table context and table state to Types
const PgInitTableContext =
  UntypedTableContext as React.Context<TableContextType>;

export const PaginatedTableContext = () => {
  const context = useContext(PgInitTableContext);
  if (!context) {
    throw new Error('Context must be used within a TableProvider');
  }
  return context;
};

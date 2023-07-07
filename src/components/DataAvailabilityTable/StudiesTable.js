import React, { useContext } from 'react';
import PaginatedTableView from '../PaginatedTable/TableView';
import {
  TableContext,
} from '../../bento-core';
import { themeConfig } from './tableThemeConfig';

const StudiesTable = ({
  table,
  tableLayOut,
  data,
  interOpData,
}) => {
  // access table state
  const { context } = useContext(TableContext);
  return (
    <PaginatedTableView
      isServer={false}
      tblRows={data}
      config={{
        ...table,
        interOpData,
      }}
      tableLayOut={tableLayOut}
      totalRowCount={data.length || 0}
      customthemeConfig={{ ...themeConfig(context) }}
    />
  );
};

export default StudiesTable;

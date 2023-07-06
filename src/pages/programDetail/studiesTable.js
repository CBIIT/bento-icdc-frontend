import React, { useContext } from 'react';
import PaginatedTableView from '../../components/PaginatedTable/TableView';
import {
  TableContext,
} from '../../bento-core';
import {
  table,
  tableLayOut,
} from '../../bento/programDetailData';
import { themeConfig } from './tableThemeConfig';

const StudiesTable = ({
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
      customhemeConfig={{ ...themeConfig(context) }}
    />
  );
};

export default StudiesTable;

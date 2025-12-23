import React, { useContext } from 'react';
import PaginatedTableView from '../PaginatedTable/TableView';
import { TableContext } from '../../bento-core';
import { themeConfig } from './tableThemeConfig';
import {
  TableConfig as TableConfigPD,
  TableLayoutItem,
} from '../../bento/programDetailData';
import {
  GetStudiesByProgramProgramDetailTwoQuery,
  StudyOfProgram,
} from '../../generated-types/types';
import { TableConfig as TableConfigDAL } from './types';

interface StudiesTableProps {
  table: TableConfigPD;
  tableLayOut: TableLayoutItem[];
  interOpData: GetStudiesByProgramProgramDetailTwoQuery;
  rowsPerPage?: number;
  data: StudyOfProgram[];
}
const StudiesTable: React.FC<StudiesTableProps> = ({
  table,
  tableLayOut,
  data,
  interOpData,
  rowsPerPage,
}) => {
  // access table state
  const { context } = useContext<{ context: TableConfigDAL }>(
    TableContext as React.Context<{ context: TableConfigDAL }>
  );
  return (
    <PaginatedTableView
      isServer={false}
      tblRows={data}
      config={{
        ...table,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        interOpData,
      }}
      tableLayOut={tableLayOut}
      totalRowCount={data.length || 0}
      customthemeConfig={{ ...themeConfig(context) }}
      rowsPerPage={rowsPerPage}
    />
  );
};

export default StudiesTable;

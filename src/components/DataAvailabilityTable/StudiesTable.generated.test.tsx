// src/components/DataAvailabilityTable/StudiesTable.generated.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import StudiesTable from './StudiesTable';
import PaginatedTableView from '../PaginatedTable/TableView';
import { TableContext } from '../../bento-core';
import { themeConfig } from './tableThemeConfig';
import type {
  TableConfig as TableConfigPD,
  TableLayoutItem,
} from '../../bento/programDetailData';
import type { StudyOfProgram } from '../../generated-types/types';

jest.mock('../PaginatedTable/TableView', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('./tableThemeConfig', () => ({
  __esModule: true,
  themeConfig: jest.fn(),
}));

jest.mock('../../bento-core', () => {
  const React = jest.requireActual<typeof import('react')>('react');

  type StudiesTableContextValue = {
    title: string;
    name: string;
    api: string;
    paginationAPIField: string;
    dataKey: string;
    columns: unknown[];
    tableMsg: {
      noMatch: string;
    };
    defaultSortField: string;
    defaultSortDirection: string;
    columnGroups: unknown[];
    count: number;
    dispatch: jest.Mock;
    filters: unknown[];
    sort: {
      field: string;
      direction: string;
    };
    searchText: string;
    selectedRows: unknown[];
    loading: boolean;
    page: number;
    pageSize: number;
    total: number;
    showPagination: boolean;
    showSearch: boolean;
  };

  type TableContextValue = {
    context: StudiesTableContextValue;
  };

  return {
    __esModule: true,
    TableContext: React.createContext<TableContextValue>({
      context: {
        title: '',
        name: '',
        api: '',
        paginationAPIField: '',
        dataKey: '',
        columns: [],
        tableMsg: { noMatch: '' },
        defaultSortField: '',
        defaultSortDirection: '',
        columnGroups: [],
        count: 0,
        dispatch: jest.fn(),
        filters: [],
        sort: {
          field: '',
          direction: '',
        },
        searchText: '',
        selectedRows: [],
        loading: false,
        page: 0,
        pageSize: 0,
        total: 0,
        showPagination: false,
        showSearch: false,
      },
    }),
  };
});

type ThemeConfigResult = Record<string, unknown>;

interface StudiesTableContextValue {
  title: string;
  name: string;
  api: string;
  paginationAPIField: string;
  dataKey: string;
  columns: unknown[];
  tableMsg: {
    noMatch: string;
  };
  defaultSortField: string;
  defaultSortDirection: string;
  columnGroups: unknown[];
  count: number;
  dispatch: jest.Mock;
  filters: unknown[];
  sort: {
    field: string;
    direction: string;
  };
  searchText: string;
  selectedRows: unknown[];
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  showPagination: boolean;
  showSearch: boolean;
}

interface PaginatedTableViewProps {
  isServer: boolean;
  tblRows: StudyOfProgram[];
  config: TableConfigPD;
  tableLayOut: TableLayoutItem[];
  totalRowCount: number;
  customthemeConfig: Record<string, unknown>;
  rowsPerPage?: number;
}

type TableContextValue = {
  context: StudiesTableContextValue;
};

const mockedPaginatedTableView = PaginatedTableView as unknown as jest.Mock;
const mockedThemeConfig = themeConfig as unknown as jest.Mock;
const TypedTableContext = TableContext as React.Context<TableContextValue>;

describe('StudiesTable', () => {
  const baseContext: StudiesTableContextValue = {
    title: 'Studies Table',
    name: 'Studies',
    api: 'QUERY_STUDIES',
    paginationAPIField: 'studies',
    dataKey: 'study_id',
    columns: [],
    tableMsg: { noMatch: 'No records found' },
    defaultSortField: 'study_name',
    defaultSortDirection: 'asc',
    columnGroups: [],
    count: 0,
    dispatch: jest.fn(),
    filters: [],
    sort: { field: 'study_name', direction: 'asc' },
    searchText: '',
    selectedRows: [],
    loading: false,
    page: 1,
    pageSize: 10,
    total: 0,
    showPagination: true,
    showSearch: true,
  };

  const baseTableConfig = {
    title: 'Studies Table',
    name: 'Studies',
    api: 'QUERY_STUDIES',
    paginationAPIField: 'studies',
    dataKey: 'study_id',
    columns: [],
    tableMsg: { noMatch: 'No records found' },
    defaultSortField: 'study_name',
    defaultSortDirection: 'asc',
    columnGroups: [],
    count: 0,
    dispatch: jest.fn(),
    filters: [],
    sort: { field: 'study_name', direction: 'asc' },
    searchText: '',
    selectedRows: [],
    loading: false,
    page: 1,
    pageSize: 10,
    total: 0,
    showPagination: true,
    showSearch: true,
  } as unknown as TableConfigPD;

  const tableLayout = [{ section: 'body' }] as unknown as TableLayoutItem[];

  const buildStudy = (id: string, name: string): StudyOfProgram =>
    ({
      study_id: id,
      study_name: name,
    }) as StudyOfProgram;

  const renderStudiesTable = (
    ctxValue: StudiesTableContextValue,
    ui: React.ReactElement
  ): ReturnType<typeof render> =>
    render(
      <TypedTableContext.Provider value={{ context: ctxValue }}>
        {ui}
      </TypedTableContext.Provider>
    );

  const getRenderedProps = (): PaginatedTableViewProps => {
    const firstCall = mockedPaginatedTableView.mock.calls[0] as
      | [PaginatedTableViewProps]
      | undefined;
    if (!firstCall) {
      throw new Error('PaginatedTableView was not called');
    }

    return firstCall[0];
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedPaginatedTableView.mockImplementation(() => null);

    mockedThemeConfig.mockImplementation(
      (context: StudiesTableContextValue): ThemeConfigResult => ({
        themeFromTitle: context.title,
        themeFromName: context.name,
        themeFromApi: context.api,
        themeFromPaginationField: context.paginationAPIField,
        themeFromDataKey: context.dataKey,
        themeFromSortField: context.defaultSortField,
        themeFromSortDirection: context.defaultSortDirection,
        themeFromPage: context.page,
        themeFromPageSize: context.pageSize,
        themeFromTotal: context.total,
      })
    );
  });

  it('renders PaginatedTableView with derived props from data and context', () => {
    const ctx: StudiesTableContextValue = {
      ...baseContext,
    };

    const data: StudyOfProgram[] = [
      buildStudy('S1', 'Study 1'),
      buildStudy('S2', 'Study 2'),
    ];

    renderStudiesTable(
      ctx,
      <StudiesTable
        table={baseTableConfig}
        tableLayOut={tableLayout}
        data={data}
        rowsPerPage={25}
      />
    );

    expect(mockedThemeConfig).toHaveBeenCalledTimes(1);
    expect(mockedThemeConfig).toHaveBeenCalledWith(ctx);

    expect(mockedPaginatedTableView).toHaveBeenCalledTimes(1);

    const props = getRenderedProps();

    expect(props.isServer).toBe(false);
    expect(props.tblRows).toEqual(data);
    expect(props.config).toEqual(baseTableConfig);
    expect(props.tableLayOut).toEqual(tableLayout);
    expect(props.totalRowCount).toBe(2);
    expect(props.rowsPerPage).toBe(25);
    expect(props.customthemeConfig).toEqual({
      themeFromTitle: 'Studies Table',
      themeFromName: 'Studies',
      themeFromApi: 'QUERY_STUDIES',
      themeFromPaginationField: 'studies',
      themeFromDataKey: 'study_id',
      themeFromSortField: 'study_name',
      themeFromSortDirection: 'asc',
      themeFromPage: 1,
      themeFromPageSize: 10,
      themeFromTotal: 0,
    });
  });

  it('sets totalRowCount to 0 and passes empty rows when data is empty', () => {
    const ctx: StudiesTableContextValue = {
      ...baseContext,
    };

    renderStudiesTable(
      ctx,
      <StudiesTable
        table={baseTableConfig}
        tableLayOut={tableLayout}
        data={[]}
      />
    );

    const props = getRenderedProps();

    expect(props.tblRows).toEqual([]);
    expect(props.totalRowCount).toBe(0);
    expect(props.rowsPerPage).toBeUndefined();
    expect(props.customthemeConfig).toEqual({
      themeFromTitle: 'Studies Table',
      themeFromName: 'Studies',
      themeFromApi: 'QUERY_STUDIES',
      themeFromPaginationField: 'studies',
      themeFromDataKey: 'study_id',
      themeFromSortField: 'study_name',
      themeFromSortDirection: 'asc',
      themeFromPage: 1,
      themeFromPageSize: 10,
      themeFromTotal: 0,
    });
  });

  it('passes updated context values into themeConfig', () => {
    const ctx: StudiesTableContextValue = {
      ...baseContext,
      title: 'Studies Table',
      name: 'Studies',
      api: 'QUERY_STUDIES',
      paginationAPIField: 'studies',
      dataKey: 'study_id',
      columns: [{ dataField: 'study_name' }],
      tableMsg: { noMatch: 'No records found' },
      defaultSortField: 'study_name',
      defaultSortDirection: 'desc',
      columnGroups: ['group-a'],
      count: 7,
      dispatch: jest.fn(),
      filters: ['filter-a'],
      sort: { field: 'study_name', direction: 'desc' },
      searchText: 'abc',
      selectedRows: ['S1'],
      loading: true,
      page: 3,
      pageSize: 20,
      total: 100,
      showPagination: true,
      showSearch: false,
    };

    mockedThemeConfig.mockImplementation(
      (context: StudiesTableContextValue): ThemeConfigResult => ({
        title: context.title,
        name: context.name,
        api: context.api,
        paginationAPIField: context.paginationAPIField,
        dataKey: context.dataKey,
        columns: context.columns,
        tableMsg: context.tableMsg,
        defaultSortField: context.defaultSortField,
        defaultSortDirection: context.defaultSortDirection,
        columnGroups: context.columnGroups,
        count: context.count,
        filters: context.filters,
        sort: context.sort,
        searchText: context.searchText,
        selectedRows: context.selectedRows,
        loading: context.loading,
        page: context.page,
        pageSize: context.pageSize,
        total: context.total,
        showPagination: context.showPagination,
        showSearch: context.showSearch,
      })
    );

    renderStudiesTable(
      ctx,
      <StudiesTable
        table={baseTableConfig}
        tableLayOut={tableLayout}
        data={[buildStudy('S1', 'Study 1')]}
        rowsPerPage={10}
      />
    );

    const props = getRenderedProps();

    expect(props.customthemeConfig).toEqual({
      title: 'Studies Table',
      name: 'Studies',
      api: 'QUERY_STUDIES',
      paginationAPIField: 'studies',
      dataKey: 'study_id',
      columns: [{ dataField: 'study_name' }],
      tableMsg: { noMatch: 'No records found' },
      defaultSortField: 'study_name',
      defaultSortDirection: 'desc',
      columnGroups: ['group-a'],
      count: 7,
      filters: ['filter-a'],
      sort: { field: 'study_name', direction: 'desc' },
      searchText: 'abc',
      selectedRows: ['S1'],
      loading: true,
      page: 3,
      pageSize: 20,
      total: 100,
      showPagination: true,
      showSearch: false,
    });
  });
});

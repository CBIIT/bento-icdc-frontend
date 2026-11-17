// src/components/PaginatedTable/TableView.generated.test.jsx

import React from 'react';
import { render } from '@testing-library/react';
import PaginatedTableView from './TableView';
import { TableContext } from '../../bento-core';

jest.mock('@material-ui/core', () => {
  const React = jest.requireActual('react');

  function GridMock({ children, ...props }) {
    return React.createElement(
      'div',
      { 'data-testid': 'grid', 'data-grid-props': JSON.stringify(props) },
      children
    );
  }

  function withStylesMock() {
    return Component =>
      function WithStylesMock(props) {
        return React.createElement(Component, {
          ...props,
          classes: { mockedClass: 'mockedClass' },
        });
      };
  }

  return {
    Grid: GridMock,
    withStyles: withStylesMock,
  };
});

jest.mock('../../bento-core', () => {
  const React = jest.requireActual('react');
  const TableContext = React.createContext({
    context: { mockedContext: true },
  });

  const TableView = jest.fn(props => {
    TableView.mock.calls.push([props]);
    return null;
  });
  TableView.mock = { calls: [] };

  const Wrapper = jest.fn(props => {
    Wrapper.mock.calls.push([props]);
    return React.createElement(
      'div',
      { 'data-testid': 'wrapper' },
      props.children
    );
  });
  Wrapper.mock = { calls: [] };

  return {
    __esModule: true,
    TableContext,
    TableView,
    Wrapper,
  };
});

jest.mock('./TableStyle', () => ({
  __esModule: true,
  default: { root: 'table-style' },
}));

jest.mock('./TableTheme', () => {
  const themeConfig = jest.fn((tabStyles, context) => {
    themeConfig.mock.calls.push([tabStyles, context]);
    return {
      tabStyles,
      context,
    };
  });
  themeConfig.mock = { calls: [] };

  return {
    __esModule: true,
    customTheme: { baseTheme: true },
    themeConfig,
  };
});

jest.mock('./Customize/CellView', () => {
  const CustomizeCellView = jest.fn(props => {
    CustomizeCellView.mock.calls.push([props]);
    return ['mock-column-1', 'mock-column-2'];
  });
  CustomizeCellView.mock = { calls: [] };

  return {
    __esModule: true,
    CustomizeCellView,
  };
});

jest.mock('./Customize/TableView', () => {
  const updateWrapperConfig = jest.fn(
    (config, tableLayOut, context, totalRowCount) => {
      updateWrapperConfig.mock.calls.push([
        config,
        tableLayOut,
        context,
        totalRowCount,
      ]);
      return {
        configName: config.name,
        tableLayOut,
        context,
        totalRowCount,
      };
    }
  );
  updateWrapperConfig.mock = { calls: [] };

  return {
    __esModule: true,
    updateWrapperConfig,
  };
});

jest.mock('./Customize/ExtendedView', () => {
  const ExtendedViewConfig = jest.fn(config => {
    ExtendedViewConfig.mock.calls.push([config]);
    return { extended: true };
  });
  ExtendedViewConfig.mock = { calls: [] };

  return {
    __esModule: true,
    ExtendedViewConfig,
  };
});

jest.mock('./Customize/ColumnGrouping', () => {
  const ColumnGrouping = jest.fn(columnGroups => {
    ColumnGrouping.mock.calls.push([columnGroups]);
    return ['group-1'];
  });
  ColumnGrouping.mock = { calls: [] };

  return {
    __esModule: true,
    ColumnGrouping,
  };
});

jest.mock('./Customize/PaginationOptions', () => {
  const paginationOptions = jest.fn((context, config) => {
    paginationOptions.mock.calls.push([context, config]);
    return ['page-10', 'page-20'];
  });
  paginationOptions.mock = { calls: [] };

  return {
    __esModule: true,
    paginationOptions,
  };
});

import { CustomizeCellView } from './Customize/CellView';
import { updateWrapperConfig } from './Customize/TableView';
import { ExtendedViewConfig } from './Customize/ExtendedView';
import { ColumnGrouping } from './Customize/ColumnGrouping';
import { paginationOptions } from './Customize/PaginationOptions';
import { themeConfig } from './TableTheme';
import {
  TableView as MockTableView,
  Wrapper as MockWrapper,
} from '../../bento-core';

describe('PaginatedTableView', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    MockTableView.mock.calls = [];
    MockWrapper.mock.calls = [];
    themeConfig.mock.calls = [];
    CustomizeCellView.mock.calls = [];
    updateWrapperConfig.mock.calls = [];
    ExtendedViewConfig.mock.calls = [];
    ColumnGrouping.mock.calls = [];
    paginationOptions.mock.calls = [];
  });

  const baseConfig = {
    name: 'Cases',
    api: 'GET_CASES',
    paginationAPIField: 'subjectOverview',
    dataKey: 'subject_id',
    tableMsg: 'No cases found',
    defaultSortField: 'submitter_id',
    defaultSortDirection: 'asc',
    columnGroups: ['group-a'],
    tableID: 'cases-table',
  };

  it('renders Wrapper and TableView with core props', () => {
    const activeFilters = { program: ['ICDC'] };
    const tableReduxActions = { someAction: jest.fn() };
    const tabStyles = { head: { color: 'red' } };
    const contextValue = { context: { mockedContext: 'ctx' } };

    render(
      <TableContext.Provider value={contextValue}>
        <PaginatedTableView
          config={baseConfig}
          totalRowCount={42}
          activeFilters={activeFilters}
          activeTab="cases"
          tabStyles={tabStyles}
          tblRows={[{ id: 1 }]}
          isServer={false}
          classes={{}}
          tableLayOut={['left', 'right']}
          rowsPerPage={25}
          tableReduxActions={tableReduxActions}
        />
      </TableContext.Provider>
    );

    expect(updateWrapperConfig.mock.calls[0]).toEqual([
      baseConfig,
      ['left', 'right'],
      contextValue.context,
      42,
    ]);

    const wrapperProps =
      MockWrapper.mock.calls[MockWrapper.mock.calls.length - 1][0];
    expect(wrapperProps.section).toBe('Cases');
    expect(wrapperProps.activeFilters).toEqual(activeFilters);

    expect(themeConfig.mock.calls[0]).toEqual([
      tabStyles,
      contextValue.context,
    ]);
    expect(paginationOptions.mock.calls[0]).toEqual([
      contextValue.context,
      baseConfig,
    ]);

    const tableViewCall =
      MockTableView.mock.calls[MockTableView.mock.calls.length - 1][0];
    expect(tableViewCall.totalRowCount).toBe(42);
    expect(tableViewCall.activeTab).toBe('cases');
    expect(tableViewCall.tblRows).toEqual([{ id: 1 }]);
    expect(tableViewCall.server).toBe(false);
    expect(tableViewCall.queryVariables).toEqual(activeFilters);
    expect(tableViewCall.paginationOptions).toEqual(['page-10', 'page-20']);
  });

  it('passes the initState function with expected derived values', () => {
    const tableReduxActions = { someAction: jest.fn() };

    render(
      <TableContext.Provider value={{ context: { mockedContext: true } }}>
        <PaginatedTableView
          config={baseConfig}
          totalRowCount={7}
          activeFilters={{}}
          activeTab="cases"
          tabStyles={{}}
          tblRows={[]}
          isServer
          classes={{}}
          tableReduxActions={tableReduxActions}
        />
      </TableContext.Provider>
    );

    const tableViewCall =
      MockTableView.mock.calls[MockTableView.mock.calls.length - 1][0];
    expect(typeof tableViewCall.initState).toBe('function');

    const initStateResult = tableViewCall.initState({
      customKey: 'customValue',
    });

    expect(initStateResult).toEqual(
      expect.objectContaining({
        customKey: 'customValue',
        title: baseConfig.name,
        query: baseConfig.api,
        paginationAPIField: baseConfig.paginationAPIField,
        dataKey: baseConfig.dataKey,
        columns: ['mock-column-1', 'mock-column-2'],
        count: 7,
        selectedRows: [],
        selectedFileIds: [],
        tableMsg: baseConfig.tableMsg,
        sortBy: baseConfig.defaultSortField,
        sortOrder: baseConfig.defaultSortDirection,
        extendedViewConfig: { extended: true },
        columnGroups: ['group-1'],
        rowsPerPage: 10,
        page: 0,
      })
    );
  });

  it('calls overriedTableState when provided', () => {
    const overriedTableState = jest.fn();

    render(
      <TableContext.Provider value={{ context: { mockedContext: 'ctx' } }}>
        <PaginatedTableView
          config={baseConfig}
          totalRowCount={1}
          activeFilters={{}}
          activeTab="cases"
          tabStyles={{}}
          tblRows={[]}
          isServer
          classes={{}}
          overriedTableState={overriedTableState}
        />
      </TableContext.Provider>
    );

    expect(overriedTableState).toHaveBeenCalled();
    expect(
      overriedTableState.mock.calls[overriedTableState.mock.calls.length - 1][0]
    ).toEqual({
      mockedContext: 'ctx',
    });
  });
});

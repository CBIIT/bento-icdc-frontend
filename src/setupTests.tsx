// src/setupTests.tsx
import React, { ReactElement, ReactNode } from 'react';
import '@testing-library/jest-dom';

// mock encoder
import { TextEncoder, TextDecoder } from 'util';

const g = globalThis as unknown as {
  TextEncoder?: typeof TextEncoder;
  TextDecoder?: typeof TextDecoder;
};

if (!g.TextEncoder) {
  g.TextEncoder = TextEncoder;
}
if (!g.TextDecoder) {
  g.TextDecoder = TextDecoder;
}

// mock all bento-core components
jest.mock('@bento-core/header', () => ({
  Header: () => <div data-testid="mock-header">Mock Header</div>,
}));

jest.mock('@bento-core/footer', () => ({
  Footer: () => <div data-testid="mock-footer">Mock Footer</div>,
}));

jest.mock('@bento-core/widgets', () => ({
  WidgetGenerator: () => <div data-testid="mock-widget-generator" />,
  DonutChartGenerator: () => <div data-testid="mock-donut-chart" />,
}));

jest.mock('@bento-core/data-table', () => ({
  CustomDataTable: () => <div data-testid="mock-data-table" />,
}));

jest.mock('@bento-core/paginated-table', () => ({
  PaginatedTable: () => <div data-testid="mock-paginated-table" />,
  ButtonView: () => <button data-testid="mock-button-view">Mock</button>,
}));

jest.mock('react-markdown', () => {
  // declare a typed props interface
  interface MockMarkdownProps {
    children?: React.ReactNode;
  }

  const MockReactMarkdown: React.FC<MockMarkdownProps> = ({ children }) => (
    <div data-testid="mock-react-markdown">{children}</div>
  );

  // give the component an explicit displayName for the linter
  MockReactMarkdown.displayName = 'MockReactMarkdown';

  return MockReactMarkdown;
});

jest.mock('./bento-core', () => {
  // basic dummy components
  // const DummyDiv =
  //   (testId: string) =>
  //   (props: Record<string, unknown>) =>
  //     React.createElement('div', { 'data-testid': testId, ...props });

  const DummyDiv = (testId: string) => {
    const DummyComponent: React.FC<Record<string, unknown>> = props =>
      React.createElement('div', { 'data-testid': testId, ...props });

    DummyComponent.displayName = `DummyDiv(${testId})`;
    return DummyComponent;
  };

  const WidgetGenerator = DummyDiv('mock-widget-generator');
  const DonutChartGenerator = DummyDiv('mock-donut-chart');
  const CustomDataTable = DummyDiv('mock-custom-data-table');
  const Header = DummyDiv('mock-header');
  const Footer = DummyDiv('mock-footer');
  const TableView = DummyDiv('mock-table-view');
  const Wrapper = DummyDiv('mock-wrapper');
  const ButtonView = DummyDiv('mock-button-view');
  const StatsBar = DummyDiv('mock-stats-bar');
  const BentoTabs = DummyDiv('mock-bento-tabs');
  const AboutBody = DummyDiv('mock-about-body');
  const ToolTip = DummyDiv('mock-tooltip');
  const SearchView = DummyDiv('mock-search-view');
  const QueryBarGenerator = DummyDiv('mock-query-bar');

  // reducers / generators
  const identityReducer = (state = {}, _action: any) => state;

  const sideBarReducerGenerator = jest.fn(() => ({
    statusReducer: identityReducer,
  }));

  const cartReducerGenerator = jest.fn(() => ({
    cartReducer: identityReducer,
  }));

  const LocalFindReducerGenerator = jest.fn(() => ({
    localFind: identityReducer,
  }));

  // action/utility mocks
  const clearAllAndSelectFacet = jest.fn();
  const ClearAllFiltersBtn = DummyDiv('mock-clear-all-filters-btn');
  const FacetFilter = DummyDiv('mock-facet-filter');
  const getFilters = jest.fn();
  const sortType = {};
  const InputTypes = {};
  const clearAllFilters = jest.fn();
  const clearFacetSection = jest.fn();
  const clearSliderSection = jest.fn();
  const toggleCheckBox = jest.fn();
  const sideBarActionTypes = {};

  const TableContext = React.createContext({});
  const TableContextProvider: React.FC<{ children?: ReactNode }> = ({
    children,
  }) =>
    React.createElement(
      'div',
      { 'data-testid': 'mock-table-context' },
      children
    );

  const onColumnViewChange = jest.fn();
  const onColumnSort = jest.fn();
  const onChangeSortDirection = jest.fn();
  const onRowsPerPageChange = jest.fn();
  const onPageAndTotalCountChange = jest.fn();
  const onPageChange = jest.fn();
  const onRowSeclect = jest.fn();
  const setTotalRowCount = jest.fn();
  const customPaginationAction = jest.fn();

  const dataFormatTypes = {};
  const cellTypes = {};
  const headerTypes = {};
  const btnTypes = {};
  const types = {};
  const formatBytes = jest.fn();

  const resetAllData = jest.fn();
  const resetUploadData = jest.fn();
  const updateAutocompleteData = jest.fn();
  const updateUploadData = jest.fn();
  const updateUploadMetadata = jest.fn();
  const chunkSplit = jest.fn(<T,>(arr: T[], _size: number): T[] => arr);

  const transformInitialDataForSunburst = jest.fn();
  const filterData = jest.fn();
  const getOptions = jest.fn();
  const customCheckBox = jest.fn();
  const getCheckBoxData = jest.fn();
  const getStatDataFromDashboardData = jest.fn();
  const getSunburstDataFromDashboardData = jest.fn();
  const getDonutDataFromDashboardData = jest.fn();
  const setSelectedFilterValues = jest.fn();
  const transformAPIDataIntoCheckBoxData = jest.fn();
  const getColumns = jest.fn();
  const getDefaultCustomFooter = jest.fn();

  return {
    __esModule: true,
    WidgetGenerator,
    DonutChartGenerator,
    CustomDataTable,
    Header,
    Footer,
    clearAllAndSelectFacet,
    ClearAllFiltersBtn,
    FacetFilter,
    getFilters,
    sideBarReducerGenerator,
    InputTypes,
    sortType,
    clearAllFilters,
    clearFacetSection,
    clearSliderSection,
    toggleCheckBox,
    sideBarActionTypes,
    TableView,
    Wrapper,
    TableContext,
    TableContextProvider,
    headerTypes,
    btnTypes,
    types,
    onColumnViewChange,
    onColumnSort,
    onChangeSortDirection,
    onRowsPerPageChange,
    onPageAndTotalCountChange,
    onPageChange,
    onRowSeclect,
    setTotalRowCount,
    customPaginationAction,
    ButtonView,
    dataFormatTypes,
    cellTypes,
    formatBytes,
    cartReducerGenerator,
    StatsBar,
    BentoTabs,
    QueryBarGenerator,
    transformInitialDataForSunburst,
    filterData,
    getOptions,
    customCheckBox,
    getCheckBoxData,
    getStatDataFromDashboardData,
    getSunburstDataFromDashboardData,
    getDonutDataFromDashboardData,
    setSelectedFilterValues,
    transformAPIDataIntoCheckBoxData,
    getColumns,
    getDefaultCustomFooter,
    ToolTip,
    AboutBody,
    // Local-find re-exports
    resetAllData,
    chunkSplit,
    SearchView,
    SearchBoxGenerator: jest.fn(() => DummyDiv('mock-search-box')),
    UploadModalGenerator: jest.fn(() => DummyDiv('mock-upload-modal')),
    LocalFindReducerGenerator,
    resetUploadData,
    updateAutocompleteData,
    updateUploadData,
    updateUploadMetadata,
  };
});

/**
 * 🔹 Mock redux-logger
 * It normally returns a middleware function; in tests we just return a no-op.
 */
jest.mock('redux-logger', () => {
  // Minimal, type-safe no-op middleware
  const mockLogger =
    () =>
    (next: (_action: unknown) => unknown) =>
    (_action: unknown): unknown =>
      next(_action);

  return {
    __esModule: true,
    default: mockLogger,
  };
});

/**
 * 🔹 Mock data-model-navigator
 * Provide simple reducer stubs for ddgraph, moduleReducers (submission), versionInfo.
 */
jest.mock('data-model-navigator', () => {
  // simple no-op reducer with safe types
  const dummyReducer = (
    state: Record<string, unknown> = {},
    _action: { type: string }
  ): Record<string, unknown> => state;

  return {
    __esModule: true,
    ddgraph: dummyReducer,
    moduleReducers: dummyReducer,
    versionInfo: dummyReducer,
  };
});

/**
 * 🔹 Mock Apollo Client
 * Provide a lightweight, no-op implementation so creating the client never throws.
 */
jest.mock('@apollo/client', () => {
  // Properly type the real module instead of `any`
  const actual =
    jest.requireActual<typeof import('@apollo/client')>('@apollo/client');

  class MockApolloClient {
    // config type is loose but not `any`
    constructor(_config: Record<string, unknown>) {
      // ignore config
    }

    query = jest.fn<Promise<unknown>, [Record<string, unknown>]>();
    mutate = jest.fn<Promise<unknown>, [Record<string, unknown>]>();
    subscribe = jest.fn<unknown, [Record<string, unknown>]>();
  }

  const MockInMemoryCache = function MockInMemoryCache(
    _this: Record<string, unknown>
  ): Record<string, unknown> {
    return {};
  };

  const MockHttpLink = function MockHttpLink(
    _this: Record<string, unknown>,
    _config: Record<string, unknown>
  ): Record<string, unknown> {
    return {};
  };

  const MockApolloLink = {
    split: jest.fn<unknown, [unknown, unknown, unknown]>(
      (_testFn, left, right) => right ?? left
    ),
    from: jest.fn<unknown[], [unknown[]]>(links => links),
  };

  return {
    __esModule: true,
    // keep all the real exports (hooks, types, etc.)
    ...actual,
    ApolloClient: MockApolloClient,
    InMemoryCache: MockInMemoryCache,
    HttpLink: MockHttpLink,
    ApolloLink: MockApolloLink,
  };
});

// mock local find
jest.mock('@bento-core/local-find', () => {
  // simple identity reducer
  const identityReducer = (
    state: Record<string, unknown> = {},
    _action: { type: string }
  ): Record<string, unknown> => state;

  // generator returns object with `localFind` reducer
  const LocalFindReducerGenerator = () => ({
    localFind: identityReducer,
  });

  // action creators just return plain actions
  const resetAllData = () => ({ type: 'LOCAL_FIND/RESET_ALL' }) as const;
  const resetUploadData = () => ({ type: 'LOCAL_FIND/RESET_UPLOAD' }) as const;

  const updateAutocompleteData = (payload: unknown) => ({
    type: 'LOCAL_FIND/UPDATE_AUTOCOMPLETE' as const,
    payload,
  });

  const updateUploadData = (payload: unknown) => ({
    type: 'LOCAL_FIND/UPDATE_UPLOAD' as const,
    payload,
  });

  const updateUploadMetadata = (payload: unknown) => ({
    type: 'LOCAL_FIND/UPDATE_UPLOAD_METADATA' as const,
    payload,
  });

  // chunkSplit helper – just passthrough; typed to satisfy eslint
  const chunkSplit = <T,>(arr: T[], _size: number): T[] => arr;

  // very lightweight React components for UI exports
  const SearchView = (props: Record<string, unknown>): ReactElement =>
    React.createElement('div', {
      'data-testid': 'mock-search-view',
      ...props,
    });

  const SearchBoxGenerator = (
    _config: Record<string, unknown>
  ): (() => ReactElement) =>
    function MockSearchBox(): ReactElement {
      return React.createElement('input', {
        'data-testid': 'mock-search-box',
        placeholder: 'Mock Search',
      });
    };

  const UploadModalGenerator = (
    _config: Record<string, unknown>
  ): (() => ReactElement) =>
    function MockUploadModal(): ReactElement {
      return React.createElement('div', {
        'data-testid': 'mock-upload-modal',
      });
    };

  return {
    __esModule: true,
    LocalFindReducerGenerator,
    resetAllData,
    resetUploadData,
    updateAutocompleteData,
    chunkSplit,
    SearchView,
    SearchBoxGenerator,
    UploadModalGenerator,
    updateUploadData,
    updateUploadMetadata,
  };
});

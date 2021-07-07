import _ from 'lodash';
import {
  customCheckBox,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  setSelectedFilterValues,
  transformInitialDataForSunburst,
  transformAPIDataIntoCheckBoxData,
} from 'bento-components';
import { globalStatsData as statsCount } from '../../../bento/globalStatsData';
import { widgetsData, facetSearchData } from '../../../bento/dashboardData';

import store from '../../../store';
import client from '../../../utils/graphqlClient';
import {
  tabContainers,
  DASHBOARD_QUERY,
  FILTER_QUERY,
  FILTER_GROUP_QUERY,
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
  GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
  GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
  GET_FILES_OVERVIEW_DESC_QUERY,
  GET_SAMPLES_OVERVIEW_DESC_QUERY,
  GET_CASES_OVERVIEW_DESC_QUERY,
  GET_FILE_IDS_FROM_FILE_NAME,
  tabIndex,
  GET_FILES_NAME_QUERY,
} from '../../../bento/dashboardTabData';

const storeKey = 'dashboardTab';

const initialState = {
  dashboardTab: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    isDashboardTableLoading: false,
    setSideBarLoading: false,
    error: '',
    hasError: false,
    stats: {},
    allActiveFilters: {},
    currentActiveTab: tabIndex[0].title,
    filteredSubjectIds: null,
    filteredSampleIds: null,
    filteredFileIds: null,
    checkboxForAll: {
      data: [],
    },
    subjectOverView: {
      data: [],
    },
    checkbox: {
      data: [],
      defaultPanel: false,
    },
    datatable: {
      dataCase: 'undefined',
      dataSample: 'undefined',
      dataFile: 'undefined',
    },
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataSampleSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataFileSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    widgets: {},
  },
};

// HELPERS
const getState = () => store.getState()[storeKey];

const SUNBURST_COLORS = [
  '#39C0F0',
  '#004CF3',
  '#FF7F15',
  '#4C3112',
  '#8DE260',
  '#437200',
];

function shouldFetchDataForDashboardTabDataTable(state) {
  return !(state.isFetched);
}

function setDataCaseSelected(result) {
  store.dispatch({ type: 'SET_CASES_SELECTION', payload: result });
}

function setDataFileSelected(result) {
  store.dispatch({ type: 'SET_FILE_SELECTION', payload: result });
}

function setDataSampleSelected(result) {
  store.dispatch({ type: 'SET_SAMPLE_SELECTION', payload: result });
}

export function getTableRowSelectionEvent() {
  const currentState = getState();
  const tableRowSelectionEvent = currentState.currentActiveTab === tabIndex[2].title
    ? setDataFileSelected
    : currentState.currentActiveTab === tabIndex[1].title
      ? setDataSampleSelected : setDataCaseSelected;
  return tableRowSelectionEvent;
}

export function clearTableSelections() {
  store.dispatch({ type: 'CLEAR_TABLE_SELECTION' });
}

/**
 * Returns the  stats from inputAPI data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
function getStatInit(input, statCountVariables) {
  const initStats = statCountVariables.reduce((acc, widget) => (
    { ...acc, [widget.statAPI]: input[widget.statAPI] }
  ), {});
  return initStats;
}

/**
 * Returns the filtered stats from inputAPT data.
 * @param {object} data
 *  @param {json} statCountVariables
 * @return {json}
 */
export function getFilteredStat(input, statCountVariables) {
  const filteredStats = statCountVariables.reduce((acc, stat) => (
    { ...acc, [stat.statAPI]: input[stat.statAPI] }
  ), {});
  return filteredStats;
}

/**
 * removes EmptySubjectsFromDonutDataa.
 * @param {object} data
 *  @param {object}
 */
const removeEmptySubjectsFromDonutData = (data) => {
  const convertCasesToSubjects = data.map((item) => ({
    subjects: item.count,
    group: item.group,
  }));
  convertCasesToSubjects.sort((a, b) => {
    if (a.group < b.group) return 1;
    if (a.group > b.group) return -1;
    return 0;
  });

  return convertCasesToSubjects.filter((item) => item.subjects !== 0);
};

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsInitData(data, widgetsInfoFromCustConfig) {
  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName], widget.datatable_level1_field, widget.datatable_level2_field, 'studies', SUNBURST_COLORS, SUNBURST_COLORS) : removeEmptySubjectsFromDonutData(data[widget.dataName]);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

function fetchDashboardTab() {
  return () => {
    store.dispatch({ type: 'REQUEST_DASHBOARDTAB' });
    return client
      .query({
        query: DASHBOARD_QUERY,
      })
      .then((result) => store.dispatch({ type: 'RECEIVE_DASHBOARDTAB', payload: _.cloneDeep(result) }))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      ));
  };
}

function fetchDashboardTabForClearAllFilters() {
  return () => client
    .query({
      query: DASHBOARD_QUERY,
    })
    .then((result) => store.dispatch({ type: 'CLEAR_ALL_FILTER_AND_TABLE_SELECTION', payload: _.cloneDeep(result) }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

/**
 * Generate a default varibles for filter query.
 *
 * Need to be updated with custodian of filter
 * @return json
 */

function allFilters() {
  const emptyFilters = facetSearchData.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  return emptyFilters;
}

function hasFilter() {
  const currentAllActiveFilters = getState().allActiveFilters;
  return Object.entries(currentAllActiveFilters).filter((item) => item[1].length > 0).length > 0;
}
/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */

function createFilterVariables(data) {
  const currentAllActiveFilters = getState().allActiveFilters;
  // eslint-disable-next-line  no-unused-vars
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
    if (data[0].datafield === key) {
      return data[0].isChecked
        ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data[0].name]] }
        : { ...acc, [key]: currentAllActiveFilters[key].filter((item) => item !== data[0].name) };
    }
    // return { ...acc , [key]: [...currentAllActiveFilters[key],...[data[0].name]] }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});

  return filter;
}

/**
 * Switch to get query sort dorection and sort field .
 *
 * @param {string} payload
 *  @param {json} tabContainer
 * @return {json} with three keys QUERY, sortfield, sortDirection
 */

const querySwitch = (payload, tabContainer) => {
  switch (payload) {
    case ('Samples'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : GET_SAMPLES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    case ('Files'):
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_FILES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
    default:
      return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_CASES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
  }
};

/**
 * Function to get getquery and default sort.
 *
 * @param {string} payload
 * @return {json} with three keys QUERY,GET_CASES_OVERVIEW_DESC_QUERY, sortfield
 */

const getQueryAndDefaultSort = (payload = tabIndex[0].title) => {
  const tabContainer = tabContainers.find((x) => x.name === payload);
  return querySwitch(payload, tabContainer);
};

/**
 * Updates the current active dashboard tab.
 *
 * @param {object} data
 * @param {Array} subjectIDsAfterFilter
 * @param {Array} sampleIDsAfterFilter
 * @param {Array} fileIDsAfterFilter
 * @return {json}
 */

export function fetchDataForDashboardTab(
  payload,
  subjectIDsAfterFilter = null,
  sampleIDsAfterFilter = null,
  fileIDsAfterFilter = null,
) {
  const { QUERY, sortfield, sortDirection } = getQueryAndDefaultSort(payload);

  return client
    .query({
      query: QUERY,
      variables: {
        case_ids: subjectIDsAfterFilter, sample_ids: sampleIDsAfterFilter, file_uuids: fileIDsAfterFilter, order_by: sortfield || '',
      },
    })
    .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, sortDirection, ..._.cloneDeep(result) } }))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}

export async function getFileNamesByFileIds(fileIds) {
  const data = await client
    .query({
      query: GET_FILES_NAME_QUERY,
      variables: {
        file_uuids: fileIds,
      },
    })
    .then((result) => result.data.fileOverview.map((item) => item.file_name));
  return data;
}

export async function tableHasSelections() {
  let selectedRowInfo = [];
  let filteredIds = [];
  const filteredNames = await getFileNamesByFileIds(getState().filteredFileIds);
  switch (getState().currentActiveTab) {
    case tabIndex[2].title:
      filteredIds = filteredNames;
      selectedRowInfo = getState().dataFileSelected.selectedRowInfo;

      break;
    case tabIndex[1].title:
      filteredIds = getState().filteredSampleIds;
      selectedRowInfo = getState().dataSampleSelected.selectedRowInfo;
      break;
    default:
      filteredIds = getState().filteredSubjectIds;
      selectedRowInfo = getState().dataCaseSelected.selectedRowInfo;
  }

  // without the filters, the filteredIds is null
  if (!hasFilter()) {
    return selectedRowInfo.length > 0;
  }

  return selectedRowInfo.filter(
    (value) => (filteredIds && filteredIds !== null ? filteredIds.includes(value) : false),
  ).length > 0;
}

/**
 * Gets all file ids for active subjectIds.
 * TODO this  functtion can use filtered file IDs except for initial load
 * @param obj fileCoubt
 * @return {json}
 */
export async function fetchAllFileIDsForSelectAll(fileCount = 100000) {
  const caseIds = getState().filteredSubjectIds;
  const sampleIds = getState().filteredSampleIds;
  const fileIds = getState().filteredFileIds;
  const SELECT_ALL_QUERY = getState().currentActiveTab === tabIndex[2].title
    ? GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL
    : getState().currentActiveTab === tabIndex[1].title
      ? GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL
      : GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL;

  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        case_ids: caseIds,
        sample_ids: sampleIds,
        file_uuids: fileIds,
        first: fileCount,
      },
    })
    .then((result) => {
      const RESULT_DATA = getState().currentActiveTab === tabIndex[2].title ? 'fileOverview' : getState().currentActiveTab === tabIndex[1].title ? 'sampleOverview' : 'caseOverviewPaged';
      const fileIdsFromQuery = RESULT_DATA === 'fileOverview' ? result.data[RESULT_DATA].map((item) => ({
        files: [item.file_uuid],
      })) : result.data[RESULT_DATA] || [];
      return fileIdsFromQuery;
    });
  // Restaruting the result Bringing {files} to files
  const filesArray = fetchResult.reduce((accumulator, currentValue) => {
    const { files } = currentValue;
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f));
    }
    return accumulator;
  }, []);

  // Removing fileIds that are not in our current list of filtered fileIds

  const filteredFilesArray = fileIds != null
    ? filesArray.filter((x) => fileIds.includes(x))
    : filesArray;
  return filteredFilesArray;
}

async function getFileIDsByFileName(file_name = [], offset = 0.0, first = 100000, order_by = 'file_name') {
  const data = await client
    .query({
      query: GET_FILE_IDS_FROM_FILE_NAME,
      variables: {
        file_name,
        offset,
        first,
        order_by,
      },
    })
    .then((result) => {
      if (result && result.data && result.data.fileIdsFromFileNameDesc.length > 0) {
        return result.data.fileIdsFromFileNameDesc.map((d) => d.file_uuid);
      }
      return [];
    });
  return data;
}

async function getFileIDs(
  fileCount = 100000,
  SELECT_ALL_QUERY,
  caseIds = [],
  sampleIds = [],
  cate,
) {
  const fetchResult = await client
    .query({
      query: SELECT_ALL_QUERY,
      variables: {
        case_ids: caseIds,
        sample_ids: sampleIds,
        file_uuids: [],
        first: fileCount,
      },
    })
    .then((result) => result.data[cate] || []);

  return fetchResult.reduce((accumulator, currentValue) => {
    const { files } = currentValue;
    // check if file
    if (files && files.length > 0) {
      return accumulator.concat(files.map((f) => f));
    }
    return accumulator;
  }, []);
}

function filterOutFileIds(fileIds) {
  // Removing fileIds that are not in our current list of filtered fileIds
  const { filteredFileIds } = getState();

  if (fileIds
      && fileIds.length > 0
       && filteredFileIds
        && filteredFileIds != null
        && filteredFileIds.length > 0) {
    return fileIds.filter((x) => filteredFileIds.includes(x));
  }
  return fileIds;
}
/*
 * Gets all file ids for active subjectIds.
 * TODO this  functtion can use filtered file IDs except for initial load
 * @param obj fileCoubt
 * @return {json}
 */
export async function fetchAllFileIDs(fileCount = 100000, selectedIds = [], offset = 0.0, first = 100000, order_by = 'file_name') {
  let filesIds = [];
  switch (getState().currentActiveTab) {
    case tabIndex[2].title:
      filesIds = await getFileIDsByFileName(selectedIds, offset, first, order_by);
      break;
    case tabIndex[1].title:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL, [], selectedIds, 'sampleOverview');
      break;
    default:
      filesIds = await getFileIDs(fileCount, GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL, selectedIds, [], 'caseOverviewPaged');
  }
  return filterOutFileIds(filesIds);
}

export const getFilesCount = () => getState().stats.numberOfFiles;

export function getCountForAddAllFilesModal() {
  const currentState = getState();
  const numberCount = currentState.currentActiveTab === tabIndex[0].title
    ? currentState.stats.numberOfCases
    : currentState.currentActiveTab === tabIndex[1].title
      ? currentState.stats.numberOfSamples : currentState.stats.numberOfFiles;
  return { activeTab: currentState.currentActiveTab || tabIndex[2].title, count: numberCount };
}

/**
 * Returns the widgets data.
 * @param {object} data
 * @param {json} widgetsInfoFromCustConfig
 * @return {json}r
 */
function getWidgetsData(input, widgetsInfoFromCustConfig) {
  const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
    const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field) : getDonutDataFromDashboardData(input, widget.datatable_field);
    const label = widget.dataName;
    return { ...acc, [label]: Data };
  }, {});

  return donut;
}

/**
 * Reducer for fetch dashboard data
 *
 * @return distpatcher
 */

export function fetchDataForDashboardTabDataTable() {
  if (shouldFetchDataForDashboardTabDataTable(getState())) {
    return store.dispatch(fetchDashboardTab());
  }
  return store.dispatch({ type: 'READY_DASHBOARDTAB' });
}

/**
 * Helper function to create only one filter that was from payload payload
 * @param {object} payload
 * @return distpatcher
 */

function createSingleFilterVariables(payload) {
  const currentAllActiveFilters = allFilters();
  // eslint-disable-next-line  no-unused-vars
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
    if (payload[0].datafield === key) {
      return { ...acc, [key]: [...currentAllActiveFilters[key], ...[payload[0].name]] };
    }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});
  return filter;
}

/**
 * Helper function to query and get filtered values for dashboard
 * @param {object} payload ingeneral its a single filter variable used to set the checkbox
 * @param {obj} currentAllFilterVariables gets the current active filters
 * @return distpatcher
 */
function toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables) {
  return client
    .query({ // request to get the filtered subjects
      query: FILTER_QUERY,
      variables: { ...currentAllFilterVariables, first: 100 },
    })
    .then((result) => client.query({ // request to get the filtered group counts
      query: FILTER_GROUP_QUERY,
      variables: { case_ids: result.data.searchCases.caseIds },
    })
      .then((result2) => store.dispatch({
        type: 'TOGGGLE_CHECKBOX_WITH_API',
        payload: {
          filter: payload,
          allFilters: currentAllFilterVariables,
          groups: _.cloneDeep(result2),
          ..._.cloneDeep(result),
        },
      }))
      .catch((error) => store.dispatch(
        { type: 'DASHBOARDTAB_QUERY_ERR', error },
      )))
    .catch((error) => store.dispatch(
      { type: 'DASHBOARDTAB_QUERY_ERR', error },
    ));
}
/**
 * function to set code to checkbox Item (accession id) for filterCountByStudyCode likewise
 *
 * @return checkboxItem
 */

function setCodeToCheckBoxItem(checkboxData, item) {
  const checkBoxitems = [];
  const updateCheckBoxData = checkboxData;
  item.data.filterCaseCountByStudyCode.forEach((filterItem) => {
    checkboxData[0].checkboxItems.forEach((checkboxItem) => {
      if (filterItem.group === checkboxItem.name) {
        const updatecheckBoxItem = checkboxItem;
        updatecheckBoxItem.code = (filterItem.code !== null) ? ` (${filterItem.code})` : filterItem.code;
        checkBoxitems.push(updatecheckBoxItem);
      }
    });
  });
  updateCheckBoxData[0].checkboxItems = checkBoxitems
    .sort((currentItem, previousItem) => currentItem.name.localeCompare(previousItem.name));
  return updateCheckBoxData;
}
/**
 * Reducer for clear all filters
 *
 * @return distpatcher
 */

export function clearAllFilters() {
  store.dispatch(fetchDashboardTabForClearAllFilters());
}

/**
 * Sets the given filter variable as the only filter for the dasboard
 * @param {object} data
 * @return distpatcher
 */
export async function setSingleFilter(payload) {
  // test weather there are active dashboard filters if so clear all filters
  // if (!_.isEqual(getState().allActiveFilters, allFilters())) {
  //   await clearAllFilters();
  // }
  const singlefiter = createSingleFilterVariables(payload);
  store.dispatch({ type: 'SET_SINGLE_FILTER', payload: singlefiter });
}

/**
 * Reducer for setting single checkbox filter
 * @param {object} payload
 * @return distpatcher
 */

export async function singleCheckBox(payload) {
  await setSingleFilter(payload);
  const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
  toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
}

/**
 * Trigger respective API queries when checkbox is checked.
 *
 * @param {object} payload
 * @return distpatcher
 */

export function toggleCheckBox(payload) {
  return () => {
    const currentAllFilterVariables = payload === {} ? allFilters : createFilterVariables(payload);
    // For performance issue we are using initial dasboardquery instead of fitered for empty filters
    // if (_.isEqual(currentAllFilterVariables, allFilters())) {
    //   clearAllFilters();
    // } else
    toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
  };
}

/**
 * Reducer for sidebar loading
 *
 * @return distpatcher
 */

export function setSideBarToLoading() {
  store.dispatch({ type: 'SET_SIDEBAR_LOADING' });
}

/**
 * Reducer for setting dashboardtable loading loading
 *
 * @return distpatcher
 */

export function setDashboardTableLoading() {
  store.dispatch({ type: 'SET_DASHBOARDTABLE_LOADING' });
}

const convertCasesToCount = (data) => data.map((item) => ({
  group: item.group,
  subjects: item.count,
}));

/**
 *  updateFilteredAPIDataIntoCheckBoxData works for first time init Checkbox,
that function transforms the data which returns from API into a another format
so it contains more information and easy for front-end to show it correctly.
 *  * @param {object} currentGroupCount
 *  * @param {object} willUpdateGroupCount
 * * @param {object} currentCheckboxSelection
 * @return {json}
 */
export function updateFilteredAPIDataIntoCheckBoxData(data, facetSearchDataFromConfig) {
  return (
    facetSearchDataFromConfig.map((mapping) => ({
      groupName: mapping.label,
      checkboxItems: transformAPIDataIntoCheckBoxData(
        convertCasesToCount(data[mapping.filterAPI]),
        mapping.field,
      ),
      datafield: mapping.datafield,
      show: mapping.show,
      section: mapping.section,
    }))
  );
}

export function getUnifiedViewStats(data) {
  store.dispatch({ type: 'SET_UNIFIED_VIEW_STATS', payload: { data } });
}

export const getDashboard = () => getState();

// reducers
const reducers = {
  DASHBOARDTAB_QUERY_ERR: (state, item) => ({
    ...state,
    hasError: true,
    error: item,
    isLoading: false,
    isFetched: false,
  }),
  SET_UNIFIED_VIEW_STATS: (state, item) => ({
    ...state,
    stats: {
      ...item.data,
    },
  }),
  READY_DASHBOARDTAB: (state) => ({
    ...state,
    isLoading: false,
    isFetched: true,
    setSideBarLoading: false,
    isDashboardTableLoading: false,
  }),
  TOGGGLE_CHECKBOX_WITH_API: (state, item) => {
    const updatedCheckboxData1 = updateFilteredAPIDataIntoCheckBoxData(
      item.data, facetSearchData,
    );
    const checkboxData1 = setCodeToCheckBoxItem(setSelectedFilterValues(updatedCheckboxData1,
      item.allFilters), item);
    fetchDataForDashboardTab(state.currentActiveTab,
      item.data.searchCases.caseIds, item.data.searchCases.sampleIds,
      item.data.searchCases.fileIds);
    return {
      ...state,
      setSideBarLoading: false,
      allActiveFilters: item.allFilters,
      filteredSubjectIds: item.data.searchCases.caseIds,
      filteredSampleIds: item.data.searchCases.sampleIds,
      filteredFileIds: item.data.searchCases.fileIds,
      checkbox: {
        data: checkboxData1,
      },
      stats: getFilteredStat(item.data.searchCases, statsCount),
      widgets: getWidgetsInitData(item.groups.data, widgetsData),
    };
  },
  UPDATE_CURRRENT_TAB_DATA: (state, item) => (
    {
      ...state,
      isDashboardTableLoading: false,
      currentActiveTab: item.currentTab,
      datatable: {
        ...state.datatable,
        dataCase: item.sortDirection === 'desc' ? item.data.caseOverviewPagedDesc : item.data.caseOverviewPaged,
        dataSample: item.sortDirection === 'desc' ? item.data.sampleOverviewDesc : item.data.sampleOverview,
        dataFile: item.sortDirection === 'desc' ? item.data.fileOverviewDesc : item.data.fileOverview,
      },
    }
  ),
  REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
  SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
  SET_SINGLE_FILTER: (state, item) => (
    {
      ...state,
      allActiveFilters: item,
    }
  ),
  SET_DASHBOARDTABLE_LOADING: (state) => ({ ...state, isDashboardTableLoading: true }),
  TOGGGLE_CHECKBOX: (state, item) => {
    const dataTableFilters = getFilters(state.datatable.filters, item);
    const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
    const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
      ? getCheckBoxData(
        state.subjectOverView.data,
        state.checkboxForAll.data,
        state.checkbox.data.filter((d) => item[0].groupName === d.groupName)[0],
        dataTableFilters,
      )
      : state.checkboxForAll.data;
    return {
      ...state,
      isCalulatingDashboard: false,
      stats: getStatDataFromDashboardData(tableData, statsCount),
      checkbox: {
        data: updatedCheckboxData,
      },
      datatable: {
        ...state.datatable,
        dataCase: tableData,
        filters: dataTableFilters,
      },
      filters: dataTableFilters,
      widgets: getWidgetsData(tableData, widgetsData),
    };
  },
  RECEIVE_DASHBOARDTAB: (state, item) => {
    const checkboxData = setCodeToCheckBoxItem(customCheckBox(item.data,
      facetSearchData, 'count'), item);
    fetchDataForDashboardTab(tabIndex[0].title, null, null, null);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        setSideBarLoading: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          filters: [],
        },
        widgets: getWidgetsInitData(item.data, widgetsData),
        dataCaseSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },
        dataSampleSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },
        dataFileSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },

      } : { ...state };
  },
  CLEAR_ALL_FILTER: (state, item) => {
    const checkboxData = customCheckBox(item.data, facetSearchData, 'count');
    fetchDataForDashboardTab(state.currentActiveTab, null, null, null);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        subjectOverView: {
          data: item.data.subjectOverViewPaged,
        },
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          dataCase: item.data.subjectOverViewPaged,
          dataSample: item.data.sampleOverview,
          dataFile: item.data.fileOverview,
          filters: [],
        },
        dataCaseSelected: {
          ...state.dataCaseSelected,
        },
        dataSampleSelected: {
          ...state.dataSampleSelected,
        },
        dataFileSelected: {
          ...state.dataFileSelected,
        },
        widgets: getWidgetsInitData(item.data, widgetsData),
      } : { ...state };
  },
  CLEAR_TABLE_SELECTION: (state) => ({
    ...state,
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataSampleSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataFileSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
  }),
  CLEAR_ALL_FILTER_AND_TABLE_SELECTION: (state, item) => {
    const checkboxData = setCodeToCheckBoxItem(customCheckBox(item.data, facetSearchData, 'count'), item);
    fetchDataForDashboardTab(state.currentActiveTab, null, null, null);
    return item.data
      ? {
        ...state.dashboard,
        isFetched: true,
        isLoading: false,
        hasError: false,
        error: '',
        stats: getStatInit(item.data, statsCount),
        allActiveFilters: allFilters(),
        filteredSubjectIds: null,
        filteredSampleIds: null,
        filteredFileIds: null,
        subjectOverView: {
          data: item.data.subjectOverViewPaged,
        },
        checkboxForAll: {
          data: checkboxData,
        },
        checkbox: {
          data: checkboxData,
        },
        datatable: {
          dataCase: item.data.subjectOverViewPaged,
          dataSample: item.data.sampleOverview,
          dataFile: item.data.fileOverview,
          filters: [],
        },
        dataCaseSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },
        dataSampleSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },
        dataFileSelected: {
          selectedRowInfo: [],
          selectedRowIndex: [],
        },
        widgets: getWidgetsInitData(item.data, widgetsData),

      } : { ...state };
  },
  SET_CASES_SELECTION: (state, item) => (
    {
      ...state,
      dataCaseSelected: item,
    }
  ),
  SET_SAMPLE_SELECTION: (state, item) => (
    {
      ...state,
      dataSampleSelected: item,
    }
  ),
  SET_FILE_SELECTION: (state, item) => (
    {
      ...state,
      dataFileSelected: item,
    }
  ),
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));

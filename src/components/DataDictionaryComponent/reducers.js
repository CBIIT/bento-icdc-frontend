import _ from 'lodash';
// import ddgraph from './DataDictionary/reducers';
import {
  setSelectedFilterValues,
} from 'bento-components';
import { facetSearchData, baseFilters } from '../../bento/dataDictionaryData';
import {
  getState,
  allFilters,
  createFilterVariables,
} from '../../utils/facetFilters';
import store from '../../store';

const storeKey = 'submission';

const initialState = {
  allActiveFilters: {},
  unfilteredDictionary: {},
  filteredDictionary: {},
};

export const getFileNodes = (dictionary) => Object.keys(dictionary).filter((node) => dictionary[node].category === 'data_file');
export const getNodeTypes = (dictionary) => Object.keys(dictionary).filter((node) => node.charAt(0) !== '_');

const excludeSystemProperties = (node) => {
  const properties = node.properties && Object.keys(node.properties)
    .filter((key) => (node.systemProperties ? !node.systemProperties.includes(key) : true))
    .reduce((acc, key) => {
      acc[key] = node.properties[key];
      return acc;
    }, {});
  return properties;
};

const getDictionaryWithExcludeSystemProperties = (dictionary) => {
  const ret = Object.keys(dictionary)
    .map((nodeID) => {
      const node = dictionary[nodeID];
      if (!node.properties) return node;
      return {
        ...node,
        properties: excludeSystemProperties(node),
      };
    })
    .reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
  return ret;
};

export const clearAllFilters = () => {
  store.dispatch({ type: 'CLEAR_ALL_FILTERS' });
};

const toggleCheckBoxAction = (payload, currentAllFilterVariables) => {
  store.dispatch({
    type: 'FILTER_DATA_EXPLORER',
    payload: {
      filter: {
        groupName: payload[0].groupName, name: [payload[0].name], isChecked: payload[0].isChecked,
      },
      allFilters: currentAllFilterVariables,
    },
  });
};

export function toggleCheckBox(payload) {
  return () => {
    const currentAllFilterVariables = payload === {} ? allFilters(facetSearchData)
      : createFilterVariables(payload, getState(storeKey, store).allActiveFilters);
    // For performance issue we are using initial dasboardquery instead of fitered for empty filters
    // if (_.isEqual(currentAllFilterVariables, allFilters())) {
    //   clearAllFilters();
    // } else
    toggleCheckBoxAction(payload, currentAllFilterVariables);
  };
}

const handleExplorerFilter = (filters, dictArray) => {
  const asArray = Object.entries(filters);
  const filtered = asArray.reduce((acc = {}, [key, value]) => {
    const filteredDict = Object.fromEntries(dictArray.filter(([, dictValue]) => {
      const flag = !!dictValue[key];

      if (flag) {
        if (key === 'inclusion' && Object.keys(dictValue[key]).length > 0) {
          return value.some((el) => {
            if (Object.prototype.hasOwnProperty.call(dictValue[key], el.toLowerCase())) {
              return dictValue[key][el.toLowerCase()].length > 0;
            }
            return false;
          });
        }
        if (key === 'multiplicity' && value.length > 0) {
          const multiplicityArray = dictValue.links
            .map((dValue) => _.capitalize(dValue.multiplicity));
          return value.some((el) => multiplicityArray.includes(el));
        }
      }
      return (value.includes(_.startCase(dictValue[key])));
    }));
    return {
      ...acc,
      ...filteredDict,
    };
  }, {});
  return filtered;
};

const reducers = {
  FILTER_DATA_EXPLORER: (state, action) => {
    const checkboxData = facetSearchData;
    const updatedCheckboxData = setSelectedFilterValues(checkboxData, action.allFilters);
    const dictArray = Object.entries(state.unfilteredDictionary);
    const filter = handleExplorerFilter(action.allFilters, dictArray);
    const groupName = action.filter.isChecked ? action.filter.groupName : 'Unchecked';
    return {
      ...state,
      dictionary: Object.keys(filter).length > 0 ? filter : state.unfilteredDictionary,
      allActiveFilters: action.allFilters,
      filteredDictionary: groupName === 'Unchecked' && Object.keys(filter).length > 0 ? filter : state.unfilteredDictionary,
      checkbox: {
        data: updatedCheckboxData,
      },
    };
  },
  CLEAR_ALL_FILTERS: (state) => ({
    ...state,
    dictionary: state.unfilteredDictionary,
    filteredDictionary: state.unfilteredDictionary,
    allActiveFilters: baseFilters,
    checkbox: {
      data: facetSearchData,
    },
  }),
  REQUEST_UPLOAD: (state, action) => ({
    ...state,
    file: action.file,
    file_type: action.file_type,
  }),
  UPDATE_FILE: (state, action) => ({
    ...state,
    file: action.file,
    file_type: action.file_type,
  }),
  UPDATE_FORM_SCHEMA: (state, action) => ({
    ...state,
    formSchema: { ...state.formSchema, ...action.formSchema },
  }),
  RECEIVE_PROJECTS: (state, action) => ({
    ...state,
    projects: action.data.reduce((map, p) => {
      const res = map;
      res[p.code] = p.project_id; return res;
    }, {}),
    projectAvail: action.data.reduce((map, p) => {
      const res = map;
      res[p.project_id] = p.availability_type; return res;
    }, {}),
  }),
  RECEIVE_NODE_TYPES: (state, action) => ({
    ...state,
    nodeTypes: action.data,
  }),
  RECEIVE_DICTIONARY: (state, action) => {
    const dict = getDictionaryWithExcludeSystemProperties(action.data);
    return ({
      ...state,
      dictionary: dict,
      nodeTypes: getNodeTypes(action.data),
      file_nodes: getFileNodes(action.data),
      allActiveFilters: allFilters(facetSearchData),
      unfilteredDictionary: dict,
      filteredDictionary: dict,
      checkbox: {
        data: facetSearchData,
      },
    });
  },
  RECEIVE_AUTHORIZATION_URL: (state, action) => ({
    ...state,
    oauth_url: action.url,
  }),
  RECEIVE_SUBMISSION_LOGIN: (state) => ({
    ...state,
    login: state.result,
    error: state.error,
  }),
  RECEIVE_SUBMISSION: (state, action) => {
    const prevCounts = ('submit_entity_counts' in state) ? state.submit_entity_counts : {};
    const newCounts = (action.data.entities || [])
      .map((ent) => ent.type || 'unknown')
      .reduce((db, type) => {
        const res = db; res[type] = (res[type] || 0) + 1;
        return res;
      }, prevCounts);
    const data = state.submit_result
      ? state.submit_result.concat(action.data.entities || [])
      : action.data.entities;
    const status = state.submit_status
      ? Math.max(state.submit_status, action.submit_status)
      : action.submit_status;
    return {
      ...state,
      submit_entity_counts: newCounts,
      submit_result: data,
      submit_result_string: state.submit_result_string.concat(JSON.stringify(action.data, null, '    ')).concat('\n\n'),
      submit_status: status,
      submit_counter: state.submit_counter + 1,
      submit_total: action.total,
    };
  },
  SUBMIT_SEARCH_FORM: (state, action) => ({
    ...state,
    search_form: action.data,
  }),
  RECEIVE_SEARCH_ENTITIES: (state, action) => ({
    ...state,
    search_result: action.data,
    search_status: action.search_status,
  }),
  RECEIVE_COUNTS: (state, action) => ({
    ...state,
    counts_search: action.data,
    links_search: Object.entries(action.data)
      .reduce((acc, entry) => { acc[entry[0]] = entry[1].length; return acc; }, {}),
  }),
  CLEAR_COUNTS: (state) => ({
    ...state,
    counts_search: null,
    links_search: null,
  }),
  RECEIVE_UNMAPPED_FILES: (state, action) => ({
    ...state,
    unmappedFiles: action.data,
  }),
  RECEIVE_UNMAPPED_FILE_STATISTICS: (state, action) => ({
    ...state,
    unmappedFileCount: action.data.count,
    unmappedFileSize: action.data.totalSize,
  }),
  RECEIVE_FILES_TO_MAP: (state, action) => ({
    ...state,
    filesToMap: action.data,
  }),
  RESET_SUBMISSION_STATUS: (state) => ({
    ...state,
    submit_entity_counts: [],
    submit_result: null,
    submit_result_string: '',
    submit_status: 0,
    submit_counter: 0,
    submit_total: 0,
  }),
};

export const versionInfo = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_VERSION_INFO':
      return {
        ...state,
        dictionaryVersion: action.data.dictionary.version || 'unknown',
        apiVersion: action.data.version || 'unknown',
      };
    default:
      return state;
  }
};

store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));

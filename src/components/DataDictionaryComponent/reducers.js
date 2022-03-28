import {
  setSelectedFilterValues,
} from 'bento-components';
import {
  facetSearchData,
  baseFilters,
  filterOptions,
  filterSections,
} from '../../bento/dataDictionaryData';
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
  activeFilter: false,
  filtersCleared: false,
  filterGroup: '',
  filterHashMap: new Map(),
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

const hashMapHelper = (groupName, [key, value], hashMap) => {
  switch (groupName) {
    case 'category':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'assignment':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'class':
      hashMap.set(value[groupName], [...hashMap.get(value[groupName]), ...[[key, value]]]);
      break;
    case 'inclusion': {
      const inclusionObj = value[groupName];
      if (inclusionObj) {
        Object.keys(inclusionObj)
          .forEach((element) => {
            if (inclusionObj[element].length > 0) {
              hashMap.set(
                element,
                [
                  ...hashMap.get(element),
                  ...[[key, value]],
                ],
              );
            }
          });
      }
      break;
    }
    default:
      break;
  }
};

const initializeFilterHashMap = (dictionary) => {
  const map = new Map();
  filterOptions.forEach((option) => map.set(option, []));
  Object.entries(dictionary)
    .forEach(([key, value]) => {
      let index = 0;
      while (index < filterSections.length) {
        hashMapHelper(filterSections[index], [key, value], map);
        index += 1;
      }
    });
  return map;
};

const generateCount = (filtered, searchGroup, searchTerm, flag, filterBy, filterTerms) => {
  let count = 0;
  if (flag) {
    Object.keys(filtered).forEach((elem) => {
      if (filterBy === 'inclusion') {
        const inclusionObj = filtered[elem][filterBy] ? filtered[elem][filterBy] : {};

        if (
          filtered[elem][searchGroup] === searchTerm
          && filterTerms.find((term) => (
            Object.prototype.hasOwnProperty.call(inclusionObj, term.toLowerCase())))
        ) {
          count += 1;
        }

        return;
      }

      if (
        filtered[elem][searchGroup] === searchTerm
        && filterTerms.find((term) => term.toLowerCase()
          === filtered[elem][filterBy].toLowerCase())) {
        count += 1;
      }
    });
  } else if (searchGroup === 'inclusion') {
    Object.keys(filtered).forEach((elem) => {
      if (filtered[elem][searchTerm]
        ? filtered[elem][searchTerm].length > 0
        : false) {
        count += filtered[elem][searchTerm].length;
      }
    });
  } else {
    Object.keys(filtered).forEach((elem) => {
      if (filtered[elem][searchGroup].toLowerCase() === searchTerm) {
        count += 1;
      }
    });
  }
  return count;
};

const generateSubjectCounts = (filtered) => ({
  administrative: generateCount(filtered, 'category', 'administrative'),
  case: generateCount(filtered, 'category', 'case'),
  study: generateCount(filtered, 'category', 'study'),
  clinical: generateCount(filtered, 'category', 'clinical'),
  clinical_trial: generateCount(filtered, 'category', 'clinical_trial'),
  biospecimen: generateCount(filtered, 'category', 'biospecimen'),
  analysis: generateCount(filtered, 'category', 'analysis'),
  data_file: generateCount(filtered, 'category', 'data_file'),
  core: generateCount(filtered, 'assignment', 'core'),
  extended: generateCount(filtered, 'assignment', 'extended'),
  primary: generateCount(filtered, 'class', 'primary'),
  secondary: generateCount(filtered, 'class', 'secondary'),
  required: generateCount(filtered, 'inclusion', 'required'),
  preferred: generateCount(filtered, 'inclusion', 'preferred'),
  optional: generateCount(filtered, 'inclusion', 'optional'),
});
const generateFilterBy = (filterObj) => {
  const returnObj = Object.keys(filterObj).pop();
  return returnObj && Object.keys(returnObj).length > 0
    ? returnObj : 'no_filters';
};
const categoryexemptSubjectCount = (
  unfiltered, filtered, groupName, filterObj, oldSubjectCountObject,
) => {
  switch (groupName) {
    case 'category':
      return {
        administrative: generateCount(unfiltered, 'category', 'administrative'),
        case: generateCount(unfiltered, 'category', 'case'),
        study: generateCount(unfiltered, 'category', 'study'),
        clinical: generateCount(unfiltered, 'category', 'clinical'),
        clinical_trial: generateCount(unfiltered, 'category', 'clinical_trial'),
        biospecimen: generateCount(unfiltered, 'category', 'biospecimen'),
        analysis: generateCount(unfiltered, 'category', 'analysis'),
        data_file: generateCount(unfiltered, 'category', 'data_file'),
        core: generateCount(filtered, 'assignment', 'core'),
        extended: generateCount(filtered, 'assignment', 'extended'),
        primary: generateCount(filtered, 'class', 'primary'),
        secondary: generateCount(filtered, 'class', 'secondary'),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case 'class':
      return {
        administrative: generateCount(filtered, 'category', 'administrative'),
        case: generateCount(filtered, 'category', 'case'),
        study: generateCount(filtered, 'category', 'study'),
        clinical: generateCount(filtered, 'category', 'clinical'),
        clinical_trial: generateCount(filtered, 'category', 'clinical_trial'),
        biospecimen: generateCount(filtered, 'category', 'biospecimen'),
        analysis: generateCount(filtered, 'category', 'analysis'),
        data_file: generateCount(filtered, 'category', 'data_file'),
        core: generateCount(filtered, 'assignment', 'core'),
        extended: generateCount(filtered, 'assignment', 'extended'),
        primary: generateCount(unfiltered, 'class', 'primary'),
        secondary: generateCount(unfiltered, 'class', 'secondary'),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case 'assignment':
      return {
        administrative: generateCount(filtered, 'category', 'administrative'),
        case: generateCount(filtered, 'category', 'case'),
        study: generateCount(filtered, 'category', 'study'),
        clinical: generateCount(filtered, 'category', 'clinical'),
        clinical_trial: generateCount(filtered, 'category', 'clinical_trial'),
        biospecimen: generateCount(filtered, 'category', 'biospecimen'),
        analysis: generateCount(filtered, 'category', 'analysis'),
        data_file: generateCount(filtered, 'category', 'data_file'),
        core: generateCount(unfiltered, 'assignment', 'core'),
        extended: generateCount(unfiltered, 'assignment', 'extended'),
        primary: generateCount(filtered, 'class', 'primary'),
        secondary: generateCount(filtered, 'class', 'secondary'),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case 'inclusion':
      return {
        administrative: generateCount(filtered, 'category', 'administrative'),
        case: generateCount(filtered, 'category', 'case'),
        study: generateCount(filtered, 'category', 'study'),
        clinical: generateCount(filtered, 'category', 'clinical'),
        clinical_trial: generateCount(filtered, 'category', 'clinical_trial'),
        biospecimen: generateCount(filtered, 'category', 'biospecimen'),
        analysis: generateCount(filtered, 'category', 'analysis'),
        data_file: generateCount(filtered, 'category', 'data_file'),
        core: generateCount(filtered, 'assignment', 'core'),
        extended: generateCount(filtered, 'assignment', 'extended'),
        primary: generateCount(filtered, 'class', 'primary'),
        secondary: generateCount(filtered, 'class', 'secondary'),
        required: generateCount(unfiltered, 'inclusion', 'required'),
        preferred: generateCount(unfiltered, 'inclusion', 'preferred'),
        optional: generateCount(unfiltered, 'inclusion', 'optional'),
      };
    case '$category':
      return {
        core: generateCount(
          unfiltered,
          'assignment',
          'core',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        extended: generateCount(
          unfiltered,
          'assignment',
          'extended',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        primary: generateCount(
          unfiltered,
          'class',
          'primary',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        secondary: generateCount(
          unfiltered,
          'class',
          'secondary',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case '$assignment':
      return {
        administrative: generateCount(
          unfiltered,
          'category',
          'administrative',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        case: generateCount(
          unfiltered,
          'category',
          'case',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        study: generateCount(
          unfiltered,
          'category',
          'study',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical: generateCount(
          unfiltered,
          'category',
          'clinical',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical_trial: generateCount(
          unfiltered,
          'category',
          'clinical_trial',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        biospecimen: generateCount(
          unfiltered,
          'category',
          'biospecimen',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        analysis: generateCount(
          unfiltered,
          'category',
          'analysis',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        data_file: generateCount(
          unfiltered,
          'category',
          'data_file',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        primary: generateCount(filtered, 'class', 'primary'),
        secondary: generateCount(filtered, 'class', 'secondary'),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case '$class':
      return {
        administrative: generateCount(
          unfiltered,
          'category',
          'administrative',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        case: generateCount(
          unfiltered,
          'category',
          'case',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        study: generateCount(
          unfiltered,
          'category',
          'study',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical: generateCount(
          unfiltered,
          'category',
          'clinical',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical_trial: generateCount(
          unfiltered,
          'category',
          'clinical_trial',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        biospecimen: generateCount(
          unfiltered,
          'category',
          'biospecimen',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        analysis: generateCount(
          unfiltered,
          'category',
          'analysis',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        data_file: generateCount(
          unfiltered,
          'category',
          'data_file',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        core: generateCount(filtered, 'assignment', 'core'),
        extended: generateCount(filtered, 'assignment', 'extended'),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    case '$inclusion': {
      return {
        administrative: generateCount(
          unfiltered,
          'category',
          'administrative',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        case: generateCount(
          unfiltered,
          'category',
          'case',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        study: generateCount(
          unfiltered,
          'category',
          'study',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical: generateCount(
          unfiltered,
          'category',
          'clinical',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        clinical_trial: generateCount(
          unfiltered,
          'category',
          'clinical_trial',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        biospecimen: generateCount(
          unfiltered,
          'category',
          'biospecimen',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        analysis: generateCount(
          unfiltered,
          'category',
          'analysis',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        data_file: generateCount(
          unfiltered,
          'category',
          'data_file',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        core: generateCount(
          filtered,
          'assignment',
          'core',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        extended: generateCount(
          filtered,
          'assignment',
          'extended',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        primary: generateCount(
          filtered,
          'class',
          'primary',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        secondary: generateCount(
          filtered,
          'class',
          'secondary',
          true,
          groupName.slice(1),
          filterObj[groupName.slice(1)],
        ),
        required: generateCount(filtered, 'inclusion', 'required'),
        preferred: generateCount(filtered, 'inclusion', 'preferred'),
        optional: generateCount(filtered, 'inclusion', 'optional'),
      };
    }
    case 'categoryunchecked':
    case '$categoryunchecked': {
      const processedGroupName = groupName.slice(0, groupName.indexOf('unchecked'));
      let filterBy = filterObj[processedGroupName]
        ? filterObj[processedGroupName] : generateFilterBy(filterObj, processedGroupName);

      filterBy = processedGroupName.includes('$') ? `$${filterBy}` : filterBy;

      if (Object.prototype.hasOwnProperty.call(filterObj, processedGroupName)) {
        return oldSubjectCountObject;
      }

      return categoryexemptSubjectCount(unfiltered, filtered, filterBy, filterObj);
    }
    case 'assignmentunchecked':
    case '$assignmentunchecked': {
      const processedGroupName = groupName.slice(0, groupName.indexOf('unchecked'));

      let filterBy = filterObj[processedGroupName]
        ? filterObj[processedGroupName] : generateFilterBy(filterObj, processedGroupName);

      filterBy = processedGroupName.includes('$') ? `$${filterBy}` : filterBy;

      if (Object.prototype.hasOwnProperty.call(filterObj, processedGroupName)) {
        return oldSubjectCountObject;
      }

      return categoryexemptSubjectCount(unfiltered, filtered, filterBy, filterObj);
    }
    case 'classunchecked':
    case '$classunchecked': {
      const processedGroupName = groupName.slice(0, groupName.indexOf('unchecked'));

      let filterBy = filterObj[processedGroupName]
        ? filterObj[processedGroupName] : generateFilterBy(filterObj, processedGroupName);
      filterBy = processedGroupName.includes('$') ? `$${filterBy}` : filterBy;

      if (Object.prototype.hasOwnProperty.call(filterObj, processedGroupName)) {
        return oldSubjectCountObject;
      }

      return categoryexemptSubjectCount(unfiltered, filtered, filterBy, filterObj);
    }
    case 'inclusionunchecked':
    case '$inclusionunchecked': {
      const processedGroupName = groupName.slice(0, groupName.indexOf('unchecked'));

      let filterBy = filterObj[processedGroupName]
        ? filterObj[processedGroupName] : generateFilterBy(filterObj, processedGroupName);
      filterBy = processedGroupName.includes('$') ? `$${filterBy}` : filterBy;

      if (Object.prototype.hasOwnProperty.call(filterObj, processedGroupName)) {
        return oldSubjectCountObject;
      }

      return categoryexemptSubjectCount(unfiltered, filtered, filterBy, filterObj);
    }
    default:
      return generateSubjectCounts(unfiltered);
  }
};

const newHandleExplorerFilter = (selectedFilters, filterHashMap) => {
  let filteredDict = [];
  let alternateFilteredDict = [];
  selectedFilters.forEach(([key, value], index) => {
    switch (index) {
      case 0: {
        value.forEach((filterValue) => {
          filteredDict = [
            ...filteredDict,
            ...filterHashMap.get(filterValue.toLowerCase()),
          ];
        });
        break;
      }
      case 1: {
        if (key === 'inclusion') {
          value.forEach((filterValue) => {
            alternateFilteredDict = [
              ...filteredDict.filter(([, thisValue]) => (thisValue[key]
                && thisValue[key][filterValue.toLowerCase()]
                ? thisValue[key][filterValue.toLowerCase()].length > 0
                : false)),
            ];
          });
          filteredDict = alternateFilteredDict;
          break;
        }
        value.forEach((filterValue) => {
          alternateFilteredDict = [
            ...alternateFilteredDict,
            ...filteredDict.filter(([, thisValue]) => thisValue[key] === filterValue.toLowerCase()),
          ];
        });
        filteredDict = alternateFilteredDict;
        break;
      }

      default: {
        if (key === 'inclusion') {
          value.forEach((filterValue) => {
            alternateFilteredDict = [
              ...filteredDict.filter(([, thisValue]) => (thisValue[key]
                && thisValue[key][filterValue.toLowerCase()]
                ? thisValue[key][filterValue.toLowerCase()].length > 0 : false)),
            ];
          });
          filteredDict = alternateFilteredDict;
          break;
        }
        value.forEach((filterValue, filterIndex) => {
          alternateFilteredDict = [
            ...filteredDict.filter(([, thisValue]) => thisValue[key] === filterValue.toLowerCase()),
          ];
          if (filterIndex > 0) {
            alternateFilteredDict = [
              ...filteredDict,
            ];
          }
        });
        filteredDict = alternateFilteredDict;
        break;
      }
    }
  });

  return Object.fromEntries(filteredDict);
};

const setCheckboxItems = (checkboxItems, subjectCountObj) => checkboxItems.map((elem) => ({
  ...elem,
  subjects: subjectCountObj[elem.name.toLowerCase()],
}));

const setSubjectCount = (checkboxData, subjectCountObj) => checkboxData.map((elem) => ({
  ...elem,
  checkboxItems: setCheckboxItems(elem.checkboxItems, subjectCountObj),
}));

const reducers = {
  FILTER_DATA_EXPLORER: (state, action) => {
    const checkboxData = facetSearchData;
    const updatedCheckboxData = setSelectedFilterValues(checkboxData, action.allFilters);
    let groupName = action.filter.isChecked ? action.filter.groupName : `${action.filter.groupName}Unchecked`;
    const processedFilters = Object.entries(action.allFilters)
      .filter(([, value]) => value.length > 0);
    groupName = processedFilters.length > 1 ? `$${groupName}` : groupName;

    const processedFiltersObj = Object.fromEntries(processedFilters);
    const filteredDict = newHandleExplorerFilter(processedFilters, state.filterHashMap);

    const subjectCountObj = {
      ...state.subjectCountObject,
      ...categoryexemptSubjectCount(
        state.unfilteredDictionary,
        filteredDict,
        groupName.toLowerCase(),
        processedFiltersObj,
        state.oldSubjectCountObject,
      ),
    };

    const finalCheckboxData = setSubjectCount(updatedCheckboxData, subjectCountObj || {});
    return {
      ...state,
      dictionary: Object.keys(filteredDict).length > 0 ? filteredDict : state.unfilteredDictionary,
      allActiveFilters: action.allFilters,
      subjectCountObject: subjectCountObj,
      oldSubjectCountObject: state.subjectCountObject,
      activeFilter: !state.activeFilter,
      filtersCleared: state.activeFilter,
      checkbox: {
        data: finalCheckboxData,
      },
    };
  },
  CLEAR_ALL_FILTERS: (state) => {
    const subjectCountObject = generateSubjectCounts(state.unfilteredDictionary);
    return {
      ...state,
      dictionary: state.unfilteredDictionary,
      filteredDictionary: state.unfilteredDictionary,
      subjectCountObject,
      allActiveFilters: baseFilters,
      activeFilter: false,
      filtersCleared: true,
      checkbox: {
        data: setSubjectCount(facetSearchData, subjectCountObject),
      },
    };
  },
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
    const subjectCountObj = generateSubjectCounts(dict);
    return ({
      ...state,
      dictionary: dict,
      nodeTypes: getNodeTypes(action.data),
      file_nodes: getFileNodes(action.data),
      allActiveFilters: allFilters(facetSearchData),
      unfilteredDictionary: dict,
      filteredDictionary: dict,
      filterHashMap: initializeFilterHashMap(dict),
      subjectCountObject: subjectCountObj,
      checkbox: {
        data: setSubjectCount(facetSearchData, subjectCountObj),
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

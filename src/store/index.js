import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { modelReducers, ddgraph, versionInfo } from 'model-explorer';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
// import submission from '../components/DataDictionaryComponent/reducers';
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
const reducers = {
  layout,
  stats,
  ddgraph,
  versionInfo,
};

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(ReduxThunk, loggerMiddleware),
);

store.injectReducer = (key, reducer) => {
  reducers[key] = reducer;
  store.replaceReducer(combineReducers(reducers));
};

store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  modelReducers[type] ? modelReducers[type](state, payload) : state));

export default store;

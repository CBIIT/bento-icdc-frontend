import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
import { ddgraph, versionInfo } from '../components/DataDictionaryComponent/DataDictionary/reducers';
// import submission from '../components/DataDictionaryComponent/reducers';

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

export default store;

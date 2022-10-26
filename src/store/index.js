import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';

const reducers = {
  ddgraph,
  versionInfo,
  submission,
  layout,
  stats,
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

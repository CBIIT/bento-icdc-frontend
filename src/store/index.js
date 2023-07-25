import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import {
  sideBarReducerGenerator,
  cartReducerGenerator,
  LocalFindReducerGenerator,
} from '../bento-core';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';

const { localFind } = LocalFindReducerGenerator();
const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();

const reducers = {
  localFind,
  ddgraph,
  versionInfo,
  submission,
  layout,
  stats,
  statusReducer,
  cartReducer,
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

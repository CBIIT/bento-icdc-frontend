import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { sideBarReducerGenerator } from '@bento-core/facet-filter';
import { cartReducerGenerator } from '@bento-core/cart';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';

const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();

const reducers = {
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

import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
import { submission, ddgraph, versionInfo } from '../components/DataDictionaryComponent/reducers';

const reducers = {
  layout,
  stats,
  submission,
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

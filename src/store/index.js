import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import {
  sideBarReducerGenerator,
  cartReducerGenerator,
  LocalFindReducerGenerator,
} from '../bento-core';
import { jbrowseView } from '../pages/JbrowseDetail/store/jborwse.reducer';
import stats from '../components/Stats/StatsState';

const { localFind } = LocalFindReducerGenerator();
const { statusReducer } = sideBarReducerGenerator();
const { cartReducer } = cartReducerGenerator();

const reducers = {
  localFind,
  ddgraph,
  versionInfo,
  submission,
  statusReducer,
  cartReducer,
  jbrowseView,
  stats
};

const store = configureStore({
  reducer: combineReducers(reducers),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;

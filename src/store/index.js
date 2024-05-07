import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { ddgraph, moduleReducers as submission, versionInfo } from 'data-model-navigator';
import {
  sideBarReducerGenerator,
  cartReducerGenerator,
  LocalFindReducerGenerator,
} from '../bento-core';

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
};

const store = configureStore({
  reducer: combineReducers(reducers),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;

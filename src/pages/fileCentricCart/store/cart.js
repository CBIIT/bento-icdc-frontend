import { useState, useLayoutEffect, useEffect } from 'react';
import store from '../../../store';

// defines the name of the Redux store slice where the list will live
const storeKey = 'cart';

const initialState = {
  fileIds: [],
  error: '',
  isError: false,
  selectedFiles: {
    selectedRowInfo: [],
    selectedRowIndex: [],
  },
};

// utils

// remove given ids from list of ids
// @inputtargetIds [id] , existingIds [id]
// @output ids [id]
const filterOutIDs = (targetIds, existingIds) => {
  if (!targetIds || targetIds.length === 0) return existingIds;
  return existingIds.filter((id) => !targetIds.includes(id));
};

const shouldInitCart = (state) => state.fileIds !== JSON.parse(localStorage.getItem('CartFileIds'));

// HELPERS
const getState = () => store.getState()[storeKey];

export const getFilesIdsInCart = () => getState().fileIds;

/* eslint-disable no-return-assign */
const subscribe = (f) => {
  let lastState = getState();
  return store.subscribe(
    () => lastState !== getState() && f((lastState = getState())),
  );
};

// actions
export const addToCart = (item) => store.dispatch({ type: 'addFiles', payload: item });

// Jbrowse select files
export const selectFiles = (item) => store.dispatch({ type: 'selectedFiles', payload: item });

export const deleteFromCart = (item) => store.dispatch({ type: 'deleteFiles', payload: item });

export const updateSortOrder = (newSortOrder) => {
  localStorage.setItem('sortColumn', newSortOrder.sortColumn);
  localStorage.setItem('sortDirection', newSortOrder.sortDirection);
};

export const initCart = () => {
// load dashboard data.
  if (shouldInitCart(getState())) {
    return store.dispatch({ type: 'initCart' });
  }
  return store.dispatch({ type: 'readyCart' });
};

export const readyCart = () => store.dispatch({ type: 'readyCart' });

export const maximumNumberOfFilesAllowedInTheCart = 2000;

export const cartWillFull = (numberOfFilesSelected) => numberOfFilesSelected
+ getState().fileIds.length
> maximumNumberOfFilesAllowedInTheCart;

export const getCart = () => {
  // make sure the redux store is sync with localstorage.
  useEffect(() => {
    initCart();
  }, []);
  // subscribe to the the store. listen for the changes.
  const [state, setState] = useState(getState());
  useLayoutEffect(() => subscribe(setState), [setState]);
  return state;
};

// reducers
const reducers = {
  addFiles: (state, item) => {
    // get previous subject's id
    const previousFileIds = Object.assign([], state.fileIds);

    // remove duplicated subject's id
    const uniqueFileIds = item.fileIds.length > 0
      ? Array.from(
        new Set(
          previousFileIds.concat(item.fileIds),
        ),
      ) : previousFileIds;

    // store ids in the localstorage.
    localStorage.setItem('data', []);
    localStorage.setItem('CartFileIds', JSON.stringify(uniqueFileIds) || []);

    return {
      ...state,
      fileIds: uniqueFileIds,
      sortColumn: localStorage.getItem('sortColumn'),
      sortDirection: localStorage.getItem('sortDirection'),
      displayData: undefined,
    };
  },
  selectedFiles: (state, item) => ({
    ...state,
    displayData: item.currentDisplayedData,
    selectedFiles: {
      selectedRowInfo: item.selectedRowInfo,
      selectedRowIndex: item.selectedRowIndex,
      currentDisplayedData: item.currentDisplayedData,
    },
  }),
  deleteFiles: (state, item) => {
    const fileIdsAfterDeletion = filterOutIDs(item.fileIds, state.fileIds);
    localStorage.setItem('CartFileIds', JSON.stringify(fileIdsAfterDeletion));
    let sortColumnValue = localStorage.getItem('sortColumn');
    let sortDirectionValue = localStorage.getItem('sortDirection');
    const dataLength = parseInt(localStorage.getItem('dataLength'), 10);
    const page = parseInt(localStorage.getItem('page'), 10);
    // if all ids get removed, reset the sortorder value back to default
    if (fileIdsAfterDeletion.length === 0) {
      sortColumnValue = '';
      sortDirectionValue = '';
      // clear all local storage if we remove all record
      localStorage.clear();
      return {
        ...state,
        fileIds: fileIdsAfterDeletion,
        sortColumn: sortColumnValue,
        sortDirection: sortDirectionValue,
        displayData: undefined,
      };
    }
    if (dataLength === 1 && page !== 0) {
      const newPage = page - 1;
      localStorage.setItem('page', newPage);
    }

    // remove matching selected files on row delete
    const rows = state.selectedFiles.selectedRowInfo;
    const filesName = rows.reduce((acc, d) => acc
      .concat(!item.fileNames.includes(d) ? d : []), []);

    return {
      ...state,
      fileIds: fileIdsAfterDeletion,
      sortColumn: sortColumnValue,
      sortDirection: sortDirectionValue,
      displayData: undefined,
      selectedFiles: {
        ...state.selectFiles,
        selectedRowInfo: filesName,
      },
    };
  },
  initCart: (state) => ({
    ...state,
    fileIds: JSON.parse(localStorage.getItem('CartFileIds')) || [],
    sortColumn: localStorage.getItem('sortColumn'),
    sortDirection: localStorage.getItem('sortDirection'),
    displayData: undefined,
  }),
  readyCart: (state) => state,
};

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));

import store from '../../../store';

const initialState = {};

export function setJborwseSelectedFiles(filesName) {
  store.dispatch({
    type: 'JBROWSE_SELECTED_FILES',
    payload: {
      filesName,
    },
  });
}

export function initMultiview() {
  store.dispatch({
    type: 'RECEIVE_FILES',
  });
}

export const reducers = {
  JBROWSE_SELECTED_FILES: (state, item) => {
    localStorage.setItem('jbrowseFiles', JSON.stringify(item.filesName) || []);
    return {
      ...state,
      jbrowseFiles: item,
    };
  },
  RECEIVE_FILES: (state) => ({
    ...state,
    jbrowseFiles: JSON.parse(localStorage.getItem('jbrowseFiles') || []),
  }),
};

export const jbrowseView = (state = initialState, { type, payload }) => {
  return reducers[type] ? reducers[type](state, payload) : state;
}


// const storeKey = 'jbrowseView';
// // INJECT-REDUCERS INTO REDUX STORE

// store.addReducer(storeKey, (state = initialState, { type, payload }) => (
//   reducers[type] ? reducers[type](state, payload) : state));

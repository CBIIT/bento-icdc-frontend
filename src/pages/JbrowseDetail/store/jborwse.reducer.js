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

export function getFiles() {

}

const reducers = {
  JBROWSE_SELECTED_FILES: (state, item) => ({
    ...state,
    jbrowseFiles: item,
  }),
  initMultiview: (state) => ({
    ...state,
    jbrowseFiles: localStorage.getItem('jbroseFiles'),
  }),
};

const storeKey = 'jbrowseView';
// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, { type, payload }) => (
  reducers[type] ? reducers[type](state, payload) : state));

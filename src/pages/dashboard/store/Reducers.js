import { actionTypes } from './Actions';

export const dashboardReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.ON_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchQuery: payload,
      };
    default:
      return state;
  }
};

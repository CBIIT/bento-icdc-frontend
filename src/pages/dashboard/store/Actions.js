export const actionTypes = {
  ON_SEARCH_INPUT_CHANGE: 'ON_SEARCH_INPUT_CHANGE',
};

export const onInputSearchQueryChange = value => ({
  type: actionTypes.ON_SEARCH_INPUT_CHANGE,
  payload: value,
});

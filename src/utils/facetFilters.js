/**
 * Helper function to query and get an object from the redux store
 * @param {string} storeKey name of store property to access
 * @param {obj} store the application redux store
 * @return {obj}
 */
export const getState = (storeKey, store) => store.getState()[storeKey];

/**
 * Helper function to return an object of all selectable filters
 * @param {object} data custodian data containing filter value information
 * @return {obj}
 */
export const allFilters = (data) => {
  const emptyFilters = data.reduce((acc, facet) => (
    { ...acc, [facet.datafield]: [] }
  ), {});
  // eslint-disable-next-line no-console
  console.log('Empty filters', emptyFilters);
  return emptyFilters;
};

/**
 * Returns filter variable for graphql query using the all filters.
 *
 * @param {object} data
 * @return {json}
 */
export const createFilterVariables = (data, currentAllActiveFilters) => {
  const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key]) => {
    if (data[0].datafield === key) {
      return data[0].isChecked
        ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data[0].name]] }
        : { ...acc, [key]: currentAllActiveFilters[key].filter((item) => item !== data[0].name) };
    }
    return { ...acc, [key]: currentAllActiveFilters[key] };
  }, {});
  return filter;
};

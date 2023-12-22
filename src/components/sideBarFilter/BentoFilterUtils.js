import { clearAllAndSelectFacet, updateAutocompleteData, updateUploadData } from '../../bento-core';
import store from '../../store';
import client from '../../utils/graphqlClient';
import {
  GET_IDS_BY_TYPE, GET_SUBJECT_IDS,
} from '../../bento/localSearchData';

export const getFacetValues = (facet, facetValue) => ({ [facet]: { [facetValue]: true } });

/**
* set active filter base on the path param
*/
export const onClearAllAndSelectFacetValue = (facet, facetValue) => {
  const filterValue = getFacetValues(facet, facetValue);
  store.dispatch(clearAllAndSelectFacet(filterValue));
};

export const setActiveFilterByPathQuery = (match) => {
  const query = decodeURI(match.params.filterQuery || '');
  const filterObject = JSON.parse(query);
  const { autocomplete = [], upload = [] } = filterObject;
  const activeFilterValues = Object.keys(filterObject).reduce((curr, key) => {
    const activeFilters = filterObject[key].reduce((value, item) => ({
      ...value,
      [item]: true,
    }), {});

    return {
      ...curr,
      [key]: activeFilters,
    };
  }, {});
  store.dispatch(clearAllAndSelectFacet(activeFilterValues));
  store.dispatch(updateAutocompleteData(autocomplete));
  store.dispatch(updateUploadData(upload));
};

/**
 * Get list of all available ids for a search field
 *
 * @async
 * @param {string} type search field
 * @returns {Promise<string[]>} all ids for the search field
 */
export async function getAllIds(type) {
  const allids = await client
    .query({
      query: GET_IDS_BY_TYPE(type),
      variables: {},
    })
    .then((result) => result.data.caseOverview.map((item) => item[type]))
    .catch(() => []);

  return allids;
}

/**
 * Get list of matching ids for a list of ids
 *
 * @param {string[]} subjectIdsArray
 * @returns {Promise<string[]>}
 */
export async function getAllSubjectIds(subjectIdsArray) {
  const allids = await client
    .query({
      query: GET_SUBJECT_IDS,
      variables: {
        case_ids: subjectIdsArray,
      },
    })
    .then((result) => result.data.caseOverview)
    .catch(() => []);
  return allids;
}

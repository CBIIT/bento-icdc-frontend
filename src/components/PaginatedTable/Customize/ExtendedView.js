import { useApolloClient } from '@apollo/client';
import { getFilters } from '@bento-core/facet-filter';
import store from '../../../store/index';
import { downloadJson } from '../utils';

export const extendedViewConfigtest = '';

export const ExtendedViewConfig = (config) => {
  const { extendedViewConfig } = config;
  const { download } = extendedViewConfig;
  /**
  * configure table download
  */
  if (download) {
    const getQueryVeriables = (filters) => {
      const variables = { ...filters };
      variables.offset = 0;
      variables.first = 10000;
      return variables;
    };

    const client = useApolloClient();
    download.downloadTable = () => {
      const { filterState = {} } = store.getState()?.statusReducer;
      const activeFilters = getFilters(filterState);
      client
        .query({
          query: download.query,
          variables: {
            ...getQueryVeriables(activeFilters),
          },
        })
        .then((result) => {
          if (result.data[config.paginationAPIField]) {
            downloadJson(
              result.data[config.paginationAPIField],
              download,
            );
          }
        });
    };
  }
  return extendedViewConfig;
};

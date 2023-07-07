import { useApolloClient } from '@apollo/client';
import { getFilters } from '../../../bento-core';
import store from '../../../store/index';
import { downloadJson } from '../utils';

export const extendedViewConfigtest = '';

export const ExtendedViewConfig = (config, propsFilters) => {
  const { extendedViewConfig } = config;
  if (!extendedViewConfig) {
    return null;
  }

  const { download } = extendedViewConfig;
  const { customDownload } = download;
  if (!customDownload) {
    return extendedViewConfig;
  }
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
      /**
      * combine both props and store filter.
      * 1. dashboard uses store filter (filterState)
      * 2. unifived view requires props filter
      */
      const activeFilters = getFilters({
        ...propsFilters,
        ...filterState,
      });
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

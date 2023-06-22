import { useApolloClient } from '@apollo/client';
import { downloadJson } from '../utils';

export const extendedViewConfigtest = '';

export const ExtendedViewConfig = (config, activeFilters) => {
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
      console.log(activeFilters);
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

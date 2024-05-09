import { useApolloClient } from '@apollo/client';
import { downloadJson } from '../utils';

export const extendedViewConfigtest = '';

export const ExtendedViewConfig = (config) => {
  const { extendedViewConfig } = config;
  if (!extendedViewConfig) {
    return null;
  }

  const { download } = extendedViewConfig;
  const { customDownload } = download;
  console.log(customDownload);
  if (!customDownload) {
    return extendedViewConfig;
  }
  /**
  * configure custom table download
  * extended data add or hide column different from table data
  */
  if (download) {
    console.log(download);
    const getQueryVeriables = (filters = {}) => {
      const variables = { ...filters };
      variables.offset = 0;
      variables.first = 10000;
      return variables;
    };

    const client = useApolloClient();
    // active filters or table query veriables
    download.downloadTable = (filterItems = {}) => {
      const queryVariables = getQueryVeriables(filterItems);
      console.log()
      client
        .query({
          query: download.query,
          variables: {
            ...queryVariables,
          },
        })
        .then((result) => {
          console.log(result);
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

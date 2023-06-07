import React, { useContext } from 'react';
import {
  btnTypes,
  TableContext,
} from '@bento-core/paginated-table';
import ViewJBrowseButton from '../../../pages/JbrowseDetail/components/JBrowseViewBtn';

export const CostomizeTableView = () => null;
/**
* 1. addFileQuery - query to addAll files or add selected files on cart
* 2. responseKeys - provided respose key for addFileQuery
* 3. Configure Jbrowse
*/
export const updateWrapperConfig = (tab, configs) => {
  // set reponse key to access file ids to add to my cart for add selected and add all files button
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => {
      if (item.role === btnTypes.ADD_ALL_FILES
        || item.role === btnTypes.ADD_SELECTED_FILES) {
        return {
          ...item,
          addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
            ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
          dataKey: tab.addFilesRequestVariableKey,
          responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
            ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
        };
      }
      // configure jbrowse button from Case Files tab
      // set selected files using table context
      if (item.Jbrowse) {
        const { context } = useContext(TableContext);
        const selectedRows = tab.jbrowse ? context.selectedRows : [];
        return {
          ...item,
          customViewElem: () => (
            <ViewJBrowseButton
              disable={!tab.jbrowse}
              selectedFileNames={selectedRows}
            />
          ),
        };
      }
      return item;
    }) : [],
  }));
  return wrpConfig;
};

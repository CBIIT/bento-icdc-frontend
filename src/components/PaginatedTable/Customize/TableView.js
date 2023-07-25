import React from 'react';
import {
  btnTypes,
} from '../../../bento-core';
import ViewJBrowseButton from '../../../pages/JbrowseDetail/components/JBrowseViewBtn';

export const DisplayCustomText = ({
  tab,
  totalRowCount,
}) => {
  const {
    id,
  } = tab;
  let text = '';
  switch (id) {
    case 'case_tab':
      text = `Add all files for the ${totalRowCount} selected Cases to My Files?`;
      break;
    case 'sample_tab':
      text = `Add all files for the ${totalRowCount} selected Samples to My Files?`;
      break;
    case 'file_tab':
      text = `Add all ${totalRowCount} files to My Files?`;
      break;
    case 'study_file_tab':
      text = `Add all files for the ${totalRowCount} selected StudyFiles to My Files?`;
      break;
    default:
      break;
  }
  return (
    <>
      {text}
    </>
  );
};

/**
* 1. addFileQuery - query to addAll files or add selected files on cart
* 2. responseKeys - provided respose key for addFileQuery
* 3. Configure Jbrowse
*/
export const updateWrapperConfig = (tab, configs, context, totalRowCount) => {
  // set reponse key to access file ids to add to my cart for add selected and add all files button
  const wrpConfig = configs.map((container) => ({
    ...container,
    items: (!container.paginatedTable) ? container.items.map((item) => {
      if (item.role === btnTypes.ADD_ALL_FILES
        || item.role === btnTypes.ADD_SELECTED_FILES) {
        return {
          ...item,
          title: (item.role === btnTypes.ADD_ALL_FILES) ? tab.selectAllButtonText : item.title,
          addFileQuery: (item.role === btnTypes.ADD_ALL_FILES)
            ? tab.addAllFileQuery : tab.addSelectedFilesQuery,
          dataKey: tab.addFilesRequestVariableKey,
          responseKeys: (item.role === btnTypes.ADD_ALL_FILES)
            ? tab.addAllFilesResponseKeys : tab.addFilesResponseKeys,
          DisplayCustomText: (props) => DisplayCustomText({ tab, ...props, totalRowCount }),
        };
      }
      // configure jbrowse button from Case Files tab
      // set selected files using table context
      if (item.Jbrowse) {
        // const { table } = context;
        // console.log(context);
        const selectedRows = context.selectedRows || [];
        return {
          ...item,
          customViewElem: () => (
            <ViewJBrowseButton
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

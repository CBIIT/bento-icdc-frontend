import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import {
  TableContext,
  TableView,
  btnTypes,
  onRowSeclect,
} from '../../../bento-core';
import {
  associateFilesTooltipConfig,
  fileTable,
} from '../../../bento/caseDetailsData';
import { CustomizeCellView } from '../../../components/PaginatedTable/Customize/CellView';
import { ExtendedViewConfig } from '../../../components/PaginatedTable/Customize/ExtendedView';
import { themeConfig } from '../SampleView/Theme';
import { AddSelectedFilesButton } from '../../../components/PaginatedTable/components/AddFilesButtons';
import ViewJBrowseButton from '../../JbrowseDetail/components/JBrowseViewBtn';
import {
  TitleContainer,
  TableTitle,
  TableContainer,
  ButtonContainer,
} from './FilteTable.styled';
import AddFilesButtonTheme from '../../../components/PaginatedTable/components/AddButtonTheme';
import JBrowseThemeProvider from './JBrowseTheme';

const FileTableView = ({ data }) => {
  const initTblState = initailState => ({
    ...initailState,
    title: fileTable.name,
    columns: CustomizeCellView(fileTable),
    selectedRows: [],
    tableMsg: fileTable.tableMsg,
    sortBy: fileTable.defaultSortField,
    sortOrder: fileTable.defaultSortDirection,
    rowsPerPage: 10,
    dataKey: fileTable.dataKey,
    extendedViewConfig: ExtendedViewConfig(fileTable),
    page: 0,
  });

  const { context } = useContext(TableContext);
  const { selectedRows } = context;
  const hasSelected = Boolean(selectedRows?.length);

  // const buttonConfiguration = data.length === 0 ? [] : fileWrapperConfig;

  const paginationOptions = {
    customizeToggleSelectAll: event => {
      const { dataKey, dispatch } = context;
      if (event.target.checked) {
        const ids = data.reduce((acc, item) => {
          acc.push(item[dataKey]);
          return acc;
        }, []);
        dispatch(onRowSeclect(ids));
      } else {
        // remove all the selection
        dispatch(onRowSeclect([]));
      }
    },
  };

  return (
    <>
      <TableContainer hasSelected={hasSelected}>
        <TitleContainer maxWidth={false}>
          <TableTitle>{fileTable.tableTitle}</TableTitle>
        </TitleContainer>
        <TableView
          initState={initTblState}
          themeConfig={{
            ...themeConfig(context, data),
          }}
          tblRows={data}
          totalRowCount={data.length}
          server={false}
          paginationOptions={paginationOptions}
        />
      </TableContainer>
      <ButtonContainer maxWidth={false}>
        <AddFilesButtonTheme>
          <Container maxWidth="xl">
            <AddSelectedFilesButton
              title="Add Selected Files"
              clsName="add_selected_button"
              dataKey={fileTable.addFilesRequestVariableKey}
              responseKeys={fileTable.addFilesResponseKeys}
              addFileQuery={fileTable.addSelectedFilesQuery}
              tooltipCofig={associateFilesTooltipConfig}
              buttonType={btnTypes.ADD_SELECTED_FILES}
            />
            <JBrowseThemeProvider>
              <ViewJBrowseButton selectedFileNames={selectedRows} />
            </JBrowseThemeProvider>
          </Container>
        </AddFilesButtonTheme>
      </ButtonContainer>
    </>
  );
};

export default FileTableView;

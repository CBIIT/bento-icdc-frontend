import React, { useContext } from 'react';
import {
  TableContext,
  TableView,
  onRowSeclect,
  btnTypes,
} from '../../../bento-core';
import {
  sampleFilesTooltipConfig,
  sampleTable,
} from '../../../bento/caseDetailsData';
import { themeConfig } from './Theme';
import { ExtendedViewConfig } from '../../../components/PaginatedTable/Customize/ExtendedView';
import { AddSelectedFilesButton } from '../../../components/PaginatedTable/components/AddFilesButtons';
import * as Styled from './SampleTable.styled';
import AddFilesButtonTheme from '../../../components/PaginatedTable/components/AddButtonTheme';
import { Container } from '@material-ui/core';

const SampleTableView = ({ data }) => {
  const initTblState = initailState => ({
    ...initailState,
    title: sampleTable.name,
    columns: sampleTable.columns,
    selectedRows: [],
    tableMsg: sampleTable.tableMsg,
    sortBy: sampleTable.defaultSortField,
    sortOrder: sampleTable.defaultSortDirection,
    rowsPerPage: 10,
    dataKey: sampleTable.dataKey,
    extendedViewConfig: ExtendedViewConfig(sampleTable),
    page: 0,
  });

  // accesss table state
  const { context } = useContext(TableContext);
  const hasSelected = Boolean(context?.selectedRows?.length);

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
      <Styled.TableContainer hasSelected={hasSelected}>
        <Styled.TitleContainer maxWidth={false}>
          <Styled.TableTitle>{sampleTable.tableTitle}</Styled.TableTitle>
        </Styled.TitleContainer>
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
        <Styled.ButtonContainer maxWidth={false}>
          <AddFilesButtonTheme>
            <Container maxWidth="xl">
              <AddSelectedFilesButton
                title="Add Files for Selected Samples"
                clsName="add_selected_button"
                dataKey={sampleTable.addFilesRequestVariableKey}
                responseKeys={sampleTable.addFilesResponseKeys}
                addFileQuery={sampleTable.addSelectedFilesQuery}
                tooltipCofig={sampleFilesTooltipConfig}
                buttonType={btnTypes.ADD_SELECTED_FILES}
              />
            </Container>
          </AddFilesButtonTheme>
        </Styled.ButtonContainer>
      </Styled.TableContainer>
    </>
  );
};

export default SampleTableView;

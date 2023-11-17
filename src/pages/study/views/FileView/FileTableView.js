import React, { useContext } from 'react';
import { Container, withStyles } from '@material-ui/core';
import { TableContext, TableView, Wrapper } from '../../../../bento-core';
import {
  fileTable, fileWrapperConfig,
} from '../../../../bento/studyDetailsData';
import { CustomizeCellView } from '../../../../components/PaginatedTable/Customize/CellView';
import { ExtendedViewConfig } from '../../../../components/PaginatedTable/Customize/ExtendedView';
import { updateWrapperConfig } from '../../../../components/PaginatedTable/Customize/TableView';
import { themeConfig, customTheme } from './Theme';

const FileTableView = ({
  classes,
  data,
}) => {
  const initTblState = (initailState) => ({
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
  if (data.length === 0) {
    fileWrapperConfig[1].items = [];
  }

  return (
    <>

      <Container className={classes.container}>
        <span className={classes.tableName}>
          {fileTable.tableTitle}
        </span>
      </Container>

      <div className={classes.tableContainer}>
        <Wrapper
          wrapConfig={updateWrapperConfig(fileTable, fileWrapperConfig, context)}
          customTheme={customTheme}
          classes={classes}
          section={fileTable.name}
        >
          <TableView
            initState={initTblState}
            themeConfig={{
              ...themeConfig(context),
            }}
            tblRows={data}
            totalRowCount={data.length}
            server={false}
          />
        </Wrapper>
      </div>
    </>
  );
};

const styles = () => ({
  container: {
    height: '35px',
    maxWidth: '100%',
    lineHeight: '40px',
    marginBottom: '-32px',
    paddingLeft: '0px',
  },
  tableContainer: {
    background: 'white',
  },
  tableName: {
    fontSize: '14px',
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  cartlink: {
    fontFamily: 'Lato',
    color: '#3E6886',
    fontSize: '12px',
    marginRight: '70px',
    textDecoration: 'none',
    borderBottom: '1px solid #3E6886',
    paddingBottom: '3px',
  },
  caseTitle: {
    color: '#194563',
    fontSize: '25.2pt',
    fontStyle: 'normal',
    fontFamily: 'Raleway',
    letterSpacing: '0.025em',
    backgroundColor: '#f5f5f5',
    padding: '10px 32px 8px 28px',
  },
  chips: {
    position: 'absolute',
    marginLeft: '250px',
    marginTop: '36px',
    zIndex: '999',
  },
  chipRoot: {
    color: '#ffffff',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.075em',
    marginLeft: '10px',
    backgroundColor: '#9b9b9b',
    fontSize: '9pt',
  },
  chipDeleteIcon: {
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
    },
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
  },
  saveButtonDiv: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
  },
  saveButtonDivBottom: {
    paddingTop: '5px',
    paddingRight: '25px',
    textAlign: 'right',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    borderRadius: '10px',
    width: '156px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#10A075',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  caseTableBorder: {
    borderTopColor: '#F48439',
  },
  fileTableBorder: {
    borderTopColor: '#2446C6',
  },
  sampleTableBorder: {
    borderTopColor: '#05C5CC',
  },
  messageBottom: {
    zIndex: '500',
    position: 'absolute',
    marginTop: '-148px',
    marginLeft: 'calc(100% - 220px)',
  },
  helpIcon: {
    zIndex: '600',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
});

export default withStyles(styles)(FileTableView);
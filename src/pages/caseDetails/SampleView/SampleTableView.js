import React, { useContext } from 'react';
import { Container } from '@mui/material';
import { withStyles } from "@mui/styles";
import {
  TableContext,
  TableView,
  Wrapper,
  onRowSeclect,
} from '../../../bento-core';
import {
  sampleTable, sampleWrapperConfig,
} from '../../../bento/caseDetailsData';
import { customTheme, themeConfig } from './Theme';
import { ExtendedViewConfig } from '../../../components/PaginatedTable/Customize/ExtendedView';
import { updateWrapperConfig } from '../../../components/PaginatedTable/Customize/TableView';

const SampleTableView = ({
  classes,
  data,
}) => {
  const initTblState = (initailState) => ({
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
  const buttonConfiguration = data.length === 0 ? [] : sampleWrapperConfig;
  const { context } = useContext(TableContext);

  const paginationOptions = {
    customizeToggleSelectAll: (event) => {
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

      <Container className={classes.container}>
        <span className={classes.tableName}>
          {sampleTable.tableTitle}
        </span>
      </Container>

      <div className={classes.tableContainer}>
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
        <Wrapper
          wrapConfig={updateWrapperConfig(sampleTable, buttonConfiguration, context)}
          customTheme={customTheme}
          classes={classes}
          section={sampleTable.name}
        />
      </div>
    </>
  );
};

const styles = () => ({
  container: {
    height: '35px',
    maxWidth: '100%',
    lineHeight: '40px',
    marginBottom: '24px',
  },
  tableContainer: {
    background: 'white',
  },
  tableName: {
    color: '#ff8a00',
    fontSize: '17px',
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
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
    border: '#a7afb3 2px solid',
  },
  customArrow: {
    '&::before': {
      border: '#a7afb3 2px solid',
    },
  },
});

export default withStyles(styles)(SampleTableView);

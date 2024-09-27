import React, { useContext } from 'react';
import {
  Grid2 as Grid,
  ThemeProvider,
  createTheme,
  Divider,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import styles from './CartStyle';
import {
  myFilesPageData,
  cartTable,
  tableLayOut,
} from '../../bento/fileCentricCartWorkflowData';
import HeaderView from './components/header/HeaderView';
import { TableContext } from '../../bento-core';
import PaginatedTableView from '../../components/PaginatedTable/TableView';
import { tblContainer, themeConfig } from './CartTheme';

const CartView = ({
  classes,
  filesId = [],
  deleteAllFiles,
  deleteCartFile,
}) => {
  const variables = {};

  variables.uuids = filesId.reduce((acc, item) => {
    if (item.file_uuid) {
      acc.push(item.file_uuid);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const tableContext = useContext(TableContext);
  const { context } = tableContext;

  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <HeaderView filesId={filesId} />
        <Grid xs={12} md={12} lg={12} className={classes.tableContainer}>
          <div className={classes.bodyWrapper}>
            <ThemeProvider theme={createTheme(tblContainer)}>
              <PaginatedTableView
                tableReduxActions={{
                  deleteAllFiles,
                  deleteCartFile,
                }}
                config={cartTable}
                tableLayOut={tableLayOut}
                activeFilters={variables}
                totalRowCount={filesId.length}
                customthemeConfig={themeConfig(context)}
              />
            </ThemeProvider>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CartView);

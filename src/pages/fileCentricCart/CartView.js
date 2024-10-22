import React, { useContext } from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import { Grid, ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
import { withStyles } from "@mui/styles";
import { TableContext } from '../../bento-core';
import {
  cartTable,
  tableLayOut,
} from '../../bento/fileCentricCartWorkflowData';
import PaginatedTableView from '../../components/PaginatedTable/TableView';
import CartHeader from './header/CartHeaderController';
import Styles from './CartStyle';
import { tblContainer, themeConfig } from './Theme';

const CartView = (props) => {
  const {
    classes, filesId = [], deleteAllFiles, deleteCartFile,
  } = props;
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
    (<Grid className={classes.marginTopNegative20}>
      <Grid item xs={12} className={classes.headerGrid}>
        <CartHeader filesId={filesId} context={context} />
      </Grid>
      <Grid item xs={12}>
        <div id="table_selected_files" className={classes.bodyWrapper}>
          <div className={classes.tableWrapper}>
            {/* Section: Header */}
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={createTheme(adaptV4Theme(tblContainer))}>
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
            </StyledEngineProvider>
          </div>
        </div>
      </Grid>
    </Grid>)
  );
};

export default withStyles(Styles)(CartView);

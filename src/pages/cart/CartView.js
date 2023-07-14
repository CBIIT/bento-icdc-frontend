import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { TableContextProvider } from '@bento-core/paginated-table';
import { cartTable, tableLayOut } from '../../bento/fileCentricCartWorkflowData';
import PaginatedTableView from '../../components/PaginatedTable/TableView';
import Styles from './CartStyle';

const CartView = ({
  classes,
  filesId = [],
}) => {
  console.log('cart view');
  const variables = {};
  variables.uuids = filesId;
  console.log(variables);
  return (
    <Grid className={classes.marginTopNegative20}>
      <Grid item xs={12}>
        <div id="table_selected_files" className={classes.bodyWrapper}>
          <div className={classes.tableWrapper}>
            <TableContextProvider>
              <PaginatedTableView
                config={cartTable}
                tableLayOut={tableLayOut}
                activeFilters={variables}
              />
            </TableContextProvider>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(Styles)(CartView);

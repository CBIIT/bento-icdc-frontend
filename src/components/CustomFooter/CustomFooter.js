import React from 'react';
import {TableFooter, TableRow, TablePagination} from '@mui/material';
import { withStyles } from "@mui/styles";

const defaultFooterStyles = {

};

const CustomFooter = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </TableRow>
    <TableRow />
  </TableFooter>
);

export default withStyles(defaultFooterStyles, { withTheme: true })(CustomFooter);

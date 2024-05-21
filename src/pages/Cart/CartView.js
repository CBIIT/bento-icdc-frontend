import React, { useContext } from 'react';
import {
  Grid,
  ThemeProvider,
  createTheme,
  withStyles,
  Divider,
} from '@material-ui/core';
import styles from './CartStyle';
import {
  myFilesPageData,
} from '../../bento/fileCentricCartWorkflowData';
import HeaderView from './HeaderView';

const CartView = ({
  classes,
}) => {
  return (
    <>
      <Grid container spacing={1} className={classes.container}>
        <HeaderView />
      </Grid>
    </>
  );
};

export default withStyles(styles)(CartView);

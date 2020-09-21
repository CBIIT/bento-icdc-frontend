import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FacetFilter from './SideBarComponents/FacetFilters';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const SideBarContent = () => (
  <FacetFilter />
);

export default withStyles(styles)(SideBarContent);

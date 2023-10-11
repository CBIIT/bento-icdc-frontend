import React from 'react';
import { withStyles } from '@material-ui/core';

const DataAvailabilityHeader = ({
  classes,
  icon,
  dataField,
}) => (
  <>
    <img src={icon} alt={dataField} className={classes.icon} />
  </>
);

const styles = () => ({
  icon: {
    width: '25px',
    textAlign: 'center',
  },
});

export default withStyles(styles)(DataAvailabilityHeader);

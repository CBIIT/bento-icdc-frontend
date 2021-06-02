import React from 'react';
import { withStyles } from '@material-ui/core';

const tabLabel = ({
  classes, title, primaryColorClass,
}) => (
  <div className={classes.defaultStyle}>
    <span className={primaryColorClass}>
      {title}
      {' '}

    </span>
  </div>
);

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);

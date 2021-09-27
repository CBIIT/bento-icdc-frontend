import React from 'react';
import { withStyles } from '@material-ui/core';
import { cn } from 'bento-components';

const tabLabel = ({
  classes, title, primaryColorClass,
}) => (
  <div className={cn(classes.defaultStyle, primaryColorClass)}>
    <span>
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
    height: '45px',
    marginBottom: '-5px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);

import React from 'react';
import { Icon } from '@mui/material';
import { withStyles } from "@mui/styles";

const Logo = ({
  imgSrc,
  imgAlt = 'Logo alt text',
  classes,
  styles,
}) => (
  <Icon>
    <img src={imgSrc} className={classes.root} styles={styles} alt={imgAlt} />
  </Icon>
);

const styles = () => ({
  root: {
    width: '1em',
    height: '1em',
    position: 'relative',
    left: '15%',
    display: 'inline-block',
    flexShrink: 0,
  },
});

export default withStyles(styles)(Logo);

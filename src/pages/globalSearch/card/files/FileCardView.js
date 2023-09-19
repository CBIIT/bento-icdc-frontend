import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import styles from './FileCardStyle';

const FileCardView = (props) => {
  console.log(props);
  return (
    <>
      <h3>Case Card</h3>
    </>
  );
};

export default withStyles(styles)(FileCardView);

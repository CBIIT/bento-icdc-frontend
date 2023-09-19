import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import styles from './SampleCardStyle';

const SampleCardView = (props) => {
  console.log(props);
  return (
    <>
      <h3>SampleCardView</h3>
    </>
  );
};

export default withStyles(styles)(SampleCardView);

import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import styles from './StudyCardStyle';

const StudyCardView = (props) => {
  console.log(props);
  return (
    <>
      <h3>Custom Study Card</h3>
    </>
  );
};

export default withStyles(styles)(StudyCardView);

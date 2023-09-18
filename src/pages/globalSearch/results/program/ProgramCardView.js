import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import styles from './ProgramCardStyle';

const ProgramCard = (props) => {
  console.log(props);
  return (
    <>
      <h3>Custom Program Card</h3>
    </>
  );
};

export default withStyles(styles)(ProgramCard);

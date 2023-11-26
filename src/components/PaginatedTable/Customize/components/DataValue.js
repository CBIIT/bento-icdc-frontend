import React from 'react';
import {
  ThemeProvider,
  createTheme,
} from '@material-ui/core';

const theme = {
  overrides: {
  },
};

const DataValue = (props) => {
  const {
    dataField,
  } = props;
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <span>
        {props[dataField]}
      </span>
    </ThemeProvider>
  );
};

export default DataValue;

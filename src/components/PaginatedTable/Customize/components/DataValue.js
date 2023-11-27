import React from 'react';
import _ from 'lodash';
import {
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import { ToolTip } from '../../../../bento-core';

const theme = {
  overrides: {
  },
};

const DataValue = (props) => {
  const {
    dataField,
  } = props;

  let content = `${props[dataField]}`;
  if (content.length > 92) {
    content = _.truncate(content, { length: 92, separator: ' ' });
  }
  return (
    <ThemeProvider theme={createTheme(theme)}>
      {content.length > 90 ? (
        <ToolTip
          title={Array.isArray(`${props[dataField]}`)
            ? `${props[dataField]}`.join(', ')
            : `${props[dataField]}`}
          placement="bottom"
        >
          <span>
            {Array.isArray(content) ? content.join(', ') : content}
          </span>
        </ToolTip>
      ) : (
        <span>
          {Array.isArray(content) ? content.join(', ') : content}
        </span>
      )}
    </ThemeProvider>
  );
};

export default DataValue;

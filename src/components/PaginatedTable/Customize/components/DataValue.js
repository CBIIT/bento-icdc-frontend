import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import _ from 'lodash';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material';
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(adaptV4Theme(theme))}>
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
    </StyledEngineProvider>
  );
};

export default DataValue;

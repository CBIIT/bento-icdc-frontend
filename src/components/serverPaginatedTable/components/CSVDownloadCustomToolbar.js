import React from 'react';
import {Download as DownloadIcon} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { withStyles } from "@mui/styles";
import { ToolTip as Tooltip } from '../../../bento-core';
import client from '../../../utils/graphqlClient';
import { downloadJson } from './utils';

const defaultToolbarStyles = {
  iconButton: {
    position: 'absolute',
    right: '30px',
  },
};

const CustomToolbar = ({
  classes, tableDownloadCSV, queryCustomVaribles, unifiedViewCaseIds, unifiedViewFlag,
}) => {
  async function fetchData() {
    const variables = unifiedViewFlag
      ? { first: 1000, ...{ case_ids: unifiedViewCaseIds } }
      : {
        first: 10000,
        ...queryCustomVaribles,
      };
    const fetchResult = await client
      .query({
        query: tableDownloadCSV.query,
        variables,
      })
      .then((result) => result.data[tableDownloadCSV.apiVariable]);
    return fetchResult;
  }

  async function prepareDownload() {
    const apiReturnedData = await fetchData();
    return downloadJson(
      apiReturnedData,
      tableDownloadCSV,
    );
  }

  return (<>
    <Tooltip title="Download Table Contents As CSV" placement="bottom">
      <IconButton
        className={classes.iconButton}
        onClick={() => prepareDownload(tableDownloadCSV)}
        size="large">
        <DownloadIcon className={classes.downloadIcon} />
      </IconButton>
    </Tooltip>
  </>);
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);

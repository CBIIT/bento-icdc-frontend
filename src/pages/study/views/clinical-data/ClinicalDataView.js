import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import styles from './ClinicalDataStyle';
import PaginatedTableView from '../../../../components/PaginatedTable/TableView';
import { table, tableLayOut } from '../../../../bento/studyDetailsData';
import { themeConfig } from './DataTheme';
import DownloadBtn from './components/downloadBtn';
import { downloadAndZipJson } from '../../../fileCentricCart/utils';

const ClinicalDataView = ({
  tblRows,
  classes,
  studyCode,
}) => {
  const downloadAndZipCvsFiles = () => {
    downloadAndZipJson(tblRows, null, studyCode);
  };

  return (
    <div className={classes.container}>
      <div>
        <p className={classes.paragraph}>
          Detailed clinical trial observations from this study can be downloaded from
          any node for which a CSV download option is displayed.
        </p>
        <p className={classes.paragraph}>
          The node-specific counts indicate the number of cases represented
          within a node into which data has been propagated versus the number
          of records within such nodes.
        </p>
      </div>
      <div className={classes.topDownloadBtn}>
        <DownloadBtn handleCSVDownload={downloadAndZipCvsFiles} />
      </div>
      <div>
        <PaginatedTableView
          isServer={false}
          tblRows={tblRows}
          config={table}
          rowsPerPage={100}
          tableLayOut={tableLayOut}
          customthemeConfig={themeConfig()}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(ClinicalDataView);

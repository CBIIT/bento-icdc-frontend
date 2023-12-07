import React from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import ClinicalDataView from './ClinicalDataView';
import styles from './ClinicalDataStyle';
import { GET_CILICAL_DATA_OF_STUDY, table } from '../../../../bento/studyDetailsData';

const ClinicalDataController = ({
  studyCode,
  classes,
  dataCount,
}) => {
  const { data, loading } = useQuery(GET_CILICAL_DATA_OF_STUDY, {
    variables: {
      study_code: studyCode,
    },
  });

  if (loading) {
    return (
      <div className={classes.container}>
        <CircularProgress />
      </div>
    );
  }
  const { caseCount, nodeCount } = dataCount;

  const getFileName = (title) => `ICDC_Clinical_Data-${studyCode}-${title
    .toUpperCase()}`.replace(' ', '_');

  /**
  * prepare data for table row and download CVS File download
  */
  const rows = table.rows.map((row) => ({
    ...row,
    dataNode: row.title,
    recordCount: nodeCount[row.nodeCount] || 0,
    caseCount: caseCount[row.caseCount] || 0,
    csvDataRow: data[row.csvDownload] || [],
    fileName: getFileName(row.title),
    node: data[row.csvDownload] || [],
    metadata: row.manifest,
  }));

  return (
    <ClinicalDataView
      tblRows={rows}
      studyCode={studyCode}
    />
  );
};

export default withStyles(styles)(ClinicalDataController);

import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import axios from 'axios';
import yaml from 'js-yaml';
import { useQuery } from '@apollo/client';
import ClinicalDataView from './ClinicalDataView';
import styles from './ClinicalDataStyle';
import { GET_CILICAL_DATA_OF_STUDY, table } from '../../../../bento/studyDetailsData';
import env from '../../../../utils/env';

const ClinicalDataController = ({
  studyCode,
  classes,
  dataCount,
}) => {
  /**
  * Set node description from ymal files
  */
  const [description, setDescription] = useState(null);
  const DATA_MODEL = env.REACT_APP_DATA_MODEL;
  const getNodeDescription = async () => {
    const response = await axios.get(DATA_MODEL);
    const dictionary = yaml.safeLoad(response.data);
    const { Nodes: allNodes } = dictionary;
    const nodeDescription = Object.keys(allNodes || [])
      .reduce((acc, node) => {
        acc[node] = allNodes[node].Desc;
        return acc;
      }, {});
    setDescription(nodeDescription);
  };

  useEffect(() => {
    getNodeDescription();
  }, []);
  /**
  * table CSV download data
  */
  const { data, loading } = useQuery(GET_CILICAL_DATA_OF_STUDY, {
    variables: {
      study_code: studyCode,
    },
  });

  if (loading || !description) {
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
  const rows = table.rows.map((row) => {
    const rowData = data[row.dataKey];
    // ICDC-3579
    const caseCnt = rowData ? rowData[row.caseCountKey] : caseCount[row.countKey] || 0;
    const csvDownloadData = rowData ? rowData[row.rowKey] : data[row.csvDownload] || [];
    return {
      ...row,
      clinicalDataNode: row.title,
      clinicalDataDescription: description[row.countKey] || '',
      recordCount: nodeCount[row.countKey] || 0,
      caseCount: caseCnt,
      csvDataRow: csvDownloadData,
      fileName: getFileName(row.title),
      node: data[row.csvDownload] || [],
      metadata: row.manifest
    }; 
  });

  return (
    <ClinicalDataView
      tblRows={rows}
      studyCode={studyCode}
    />
  );
};

export default withStyles(styles)(ClinicalDataController);

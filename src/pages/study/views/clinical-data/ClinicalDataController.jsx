import React, { useCallback, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import yaml from 'js-yaml';
import { useQuery } from '@apollo/client';
import ClinicalDataView from './ClinicalDataView';
import styles from './ClinicalDataStyle';
import {
  GET_CILICAL_DATA_OF_STUDY,
  table,
} from '../../../../bento/studyDetailsData';
import env from '../../../../utils/env';
import { SkeletonLoader } from '../../../../components/Skeleton';
import compact from '../../utils/compact';
import { logStudyDiagnostic } from '../../studyDiagnostics';

const ClinicalDataController = ({ studyCode, classes, dataCount }) => {
  /**
   * Set node description from ymal files
   */
  const [description, setDescription] = useState(null);
  const [hasDictionaryError, setHasDictionaryError] = useState(false);
  const DATA_MODEL = env.REACT_APP_DATA_MODEL;

  const getNodeDescription = useCallback(async () => {
    try {
      const response = await axios.get(DATA_MODEL);
      const dictionary = yaml.load(response.data);
      const { Nodes: allNodes } = dictionary;
      const nodeDescription = Object.keys(allNodes || {}).reduce(
        (acc, node) => {
          acc[node] = allNodes[node].Desc;
          return acc;
        },
        {}
      );

      setDescription(nodeDescription);
      setHasDictionaryError(false);
    } catch (error) {
      setDescription({});
      setHasDictionaryError(true);
      logStudyDiagnostic({
        operation: 'loadStudyDataDictionary',
        studyCode,
        section: 'Clinical Data',
        dictionaryUrl: DATA_MODEL,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'Data dictionary request failed',
      });
    }
  }, [DATA_MODEL, studyCode]);

  useEffect(() => {
    void getNodeDescription();
  }, [getNodeDescription]);

  /**
   * table CSV download data
   */
  const { data, error, loading, refetch } = useQuery(
    GET_CILICAL_DATA_OF_STUDY,
    {
      variables: {
        study_code: studyCode,
      },
      errorPolicy: 'all',
    }
  );

  useEffect(() => {
    if (!error) return;

    const graphQLErrors = error.graphQLErrors.map(graphQLError => ({
      message: graphQLError.message,
      ...(graphQLError.path ? { path: [...graphQLError.path] } : {}),
    }));

    logStudyDiagnostic({
      operation: 'studyClinicalData',
      studyCode,
      section: 'Clinical Data',
      ...(graphQLErrors.length > 0 ? { graphQLErrors } : {}),
      ...(error.networkError
        ? { networkError: error.networkError.message }
        : {}),
      ...(graphQLErrors.length === 0 && !error.networkError
        ? { errorMessage: 'Clinical Data request failed' }
        : {}),
    });
  }, [error, studyCode]);

  const clinicalData = data ?? {};
  const hasClinicalResponse =
    table.rows.some(row => clinicalData[row.csvDownload] != null) ||
    clinicalData.priorSurgeryNodeDataOverview != null;
  const isClinicalDataUnavailable = Boolean(error && !hasClinicalResponse);

  if (
    (loading && !hasClinicalResponse) ||
    (!isClinicalDataUnavailable && description === null)
  ) {
    return (
      <div className={classes.container}>
        <SkeletonLoader />
      </div>
    );
  }

  const caseCount = dataCount?.caseCount ?? {};
  const nodeCount = dataCount?.nodeCount ?? {};

  const getFileName = title =>
    `ICDC_Clinical_Data-${studyCode}-${title.toUpperCase()}`.replace(' ', '_');

  /**
   * prepare data for table row and download CVS File download
   */
  const rows = table.rows.map(row => {
    const rowData = row.dataKey ? clinicalData[row.dataKey] : undefined;
    const fallbackCaseCount = caseCount[row.countKey] ?? 0;
    const caseCnt = row.caseCountKey
      ? (rowData?.[row.caseCountKey] ?? fallbackCaseCount)
      : fallbackCaseCount;
    const csvDownloadSource = row.rowKey
      ? (rowData?.[row.rowKey] ?? clinicalData[row.csvDownload])
      : clinicalData[row.csvDownload];
    const csvDownloadData = compact(csvDownloadSource);
    const downloadAllData = compact(
      row.rowKey
        ? (clinicalData[row.csvDownload] ?? rowData?.[row.rowKey])
        : clinicalData[row.csvDownload]
    );
    const recordCount = nodeCount[row.countKey] ?? 0;
    const hasDownloadCountMismatch =
      csvDownloadSource != null &&
      csvDownloadData.length === 0 &&
      (recordCount > 0 || caseCnt > 0);

    return {
      ...row,
      clinicalDataNode: row.title,
      clinicalDataDescription: description?.[row.countKey] ?? '',
      recordCount,
      caseCount: caseCnt,
      csvDataRow: csvDownloadData,
      csvDownloadUnavailable:
        csvDownloadSource == null || hasDownloadCountMismatch,
      csvDownloadCountMismatch: hasDownloadCountMismatch,
      fileName: getFileName(row.title),
      node: downloadAllData,
      metadata: row.manifest,
    };
  });
  const hasDownloadCountMismatch = rows.some(
    row => row.csvDownloadCountMismatch
  );

  return (
    <ClinicalDataView
      tblRows={rows}
      studyCode={studyCode}
      hasPartialError={Boolean(error && hasClinicalResponse)}
      isClinicalDataUnavailable={isClinicalDataUnavailable}
      hasDownloadCountMismatch={hasDownloadCountMismatch}
      hasDictionaryError={hasDictionaryError}
      refreshClinicalData={refetch}
      refreshDataDictionary={getNodeDescription}
    />
  );
};

export default withStyles(styles)(ClinicalDataController);

import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import styles from './ClinicalDataStyle';
import PaginatedTableView from '../../../../components/PaginatedTable/TableView';
import { table, tableLayOut } from '../../../../bento/studyDetailsData';
import { themeConfig } from './DataTheme';
import DownloadBtn from './components/downloadBtn';
import { downloadAndZipJson } from '../../../Cart/utils';
import { CLINICAL_DATA_MESSAGES } from '../../constants/clinicalData';
import { STUDY_DETAILS_ACTION_LABELS } from '../../constants/studyDetails';

const ClinicalDataView = ({
  tblRows,
  classes,
  studyCode,
  hasPartialError,
  isClinicalDataUnavailable,
  hasDownloadCountMismatch,
  hasDictionaryError,
  refreshClinicalData,
  refreshDataDictionary,
}) => {
  const hasClinicalWarning =
    hasPartialError || isClinicalDataUnavailable || hasDownloadCountMismatch;
  const hasWarning = hasClinicalWarning || hasDictionaryError;
  const [warningOpen, setWarningOpen] = useState(hasWarning);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (hasWarning) {
      setWarningOpen(true);
    } else if (!isRefreshing) {
      setWarningOpen(false);
    }
  }, [hasWarning, isRefreshing]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const requests = [];

    if (hasClinicalWarning) requests.push(refreshClinicalData());
    if (hasDictionaryError) requests.push(refreshDataDictionary());

    await Promise.all(requests.map(request => request.catch(() => undefined)));
    setIsRefreshing(false);
  };

  const warningMessage = hasDictionaryError
    ? hasClinicalWarning
      ? CLINICAL_DATA_MESSAGES.combinedLoadFailure
      : CLINICAL_DATA_MESSAGES.dictionaryUnavailable
    : isClinicalDataUnavailable
      ? CLINICAL_DATA_MESSAGES.unavailable
      : hasDownloadCountMismatch && !hasPartialError
        ? CLINICAL_DATA_MESSAGES.downloadCountMismatch
        : CLINICAL_DATA_MESSAGES.partialLoad;

  const downloadAndZipCvsFiles = () => {
    downloadAndZipJson(tblRows, null, studyCode);
  };

  return (
    <div className={classes.container}>
      <Snackbar
        open={warningOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="warning"
          action={
            <>
              <Button
                className={classes.snackbarActionButton}
                color="inherit"
                size="small"
                disabled={isRefreshing}
                onClick={handleRefresh}
              >
                {isRefreshing ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  STUDY_DETAILS_ACTION_LABELS.refresh
                )}
              </Button>
              <IconButton
                aria-label={STUDY_DETAILS_ACTION_LABELS.close}
                color="inherit"
                size="small"
                onClick={() => setWarningOpen(false)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        >
          {warningMessage}
        </Alert>
      </Snackbar>
      {isClinicalDataUnavailable ? (
        <div role="alert">
          <p className={classes.paragraph}>
            {CLINICAL_DATA_MESSAGES.unavailable}
          </p>
        </div>
      ) : (
        <>
          <div>
            <p className={classes.paragraph}>
              Detailed clinical trial observations from this study can be
              downloaded from any node for which a CSV download option is
              displayed.
            </p>
            <p className={classes.paragraph}>
              The node-specific counts indicate the number of cases represented
              within a node into which data has been propagated versus the
              number of records within such nodes.
            </p>
          </div>
          <div className={classes.topDownloadBtn}>
            <DownloadBtn handleCSVDownload={downloadAndZipCvsFiles} />
          </div>
          <div className={classes.paginatedTableWrapper}>
            <PaginatedTableView
              isServer={false}
              tblRows={tblRows}
              config={table}
              rowsPerPage={100}
              tableLayOut={tableLayOut}
              customthemeConfig={themeConfig()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(ClinicalDataView);

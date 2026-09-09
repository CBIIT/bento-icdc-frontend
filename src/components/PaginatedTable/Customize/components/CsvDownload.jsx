import React from 'react';
import { withStyles } from '@material-ui/styles';
import downloadIcon from '../../../../assets/icons/clinical_data_csv_icon.svg';
import { downloadJson } from '../../../../pages/Cart/utils';
import { ToolTip } from '../../../../bento-core';
import {
  CLINICAL_DATA_MESSAGES,
  getDownloadCountMismatchTooltip,
  getDownloadUnavailableTooltip,
} from '../../../../pages/study/constants/clinicalData';

const CsvDownlaod = ({
  classes,
  csvDataRow = [],
  csvDownloadUnavailable = false,
  csvDownloadCountMismatch = false,
  clinicalDataNode,
  manifest,
  fileName,
}) => {
  const handleCSVDownload = () => {
    downloadJson(csvDataRow, '', fileName, manifest);
  };

  if (csvDataRow.length === 0 && !csvDownloadUnavailable) return null;

  const unavailableNode = clinicalDataNode
    ? `${clinicalDataNode.charAt(0).toUpperCase()}${clinicalDataNode.slice(1)}`
    : CLINICAL_DATA_MESSAGES.fallbackNodeLabel;

  return (
    <ToolTip
      maxWidth="auto"
      lineHeight="1.5"
      fontFamily="Nunito"
      fontSize="14px"
      fontWeight="500"
      padding="10px 19px"
      title={
        csvDownloadCountMismatch
          ? getDownloadCountMismatchTooltip(unavailableNode)
          : csvDownloadUnavailable
            ? getDownloadUnavailableTooltip(unavailableNode)
            : CLINICAL_DATA_MESSAGES.downloadAvailableTooltip
      }
    >
      <span
        className={
          csvDownloadUnavailable
            ? classes.disabledTooltipImageWrapper
            : classes.tooltipImageWrapper
        }
        aria-disabled={csvDownloadUnavailable || undefined}
        onClick={csvDownloadUnavailable ? undefined : handleCSVDownload}
      >
        <img
          src={downloadIcon}
          alt={CLINICAL_DATA_MESSAGES.downloadIconAlt}
          className={classes.icon}
        />
      </span>
    </ToolTip>
  );
};

const styles = {
  icon: {
    width: '24.71px',
    height: '24.72px',
  },
  tooltipImageWrapper: {
    display: 'inline-flex',
    lineHeight: 0,
    cursor: 'pointer',
  },
  disabledTooltipImageWrapper: {
    display: 'inline-flex',
    lineHeight: 0,
    cursor: 'not-allowed',
    opacity: 0.4,
  },
};

export default withStyles(styles)(CsvDownlaod);

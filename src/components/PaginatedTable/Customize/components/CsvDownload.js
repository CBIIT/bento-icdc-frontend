import React from 'react';
import { withStyles } from '@material-ui/styles';
import downloadIcon from '../../../../assets/icons/clinical_data_csv_icon.svg';
import { downloadJson } from '../../../../pages/fileCentricCart/utils';
import { ToolTip } from '../../../../bento-core';

const CsvDownlaod = ({
  classes,
  csvDataRow = [],
  manifest,
  fileName,
}) => {
  const handleCSVDownload = () => {
    downloadJson(csvDataRow, '', fileName, manifest);
  };
  return (
    <>
      {
        (csvDataRow.length > 0) && (
          <ToolTip
            maxWidth="auto"
            lineHeight="1.5"
            fontFamily="Nunito"
            fontSize="14px"
            fontWeight="500"
            padding="10px 19px"
            title="Click to download the contents of this node"
          >
            <div
              className={classes.tooltipImageWrapper}
              onClick={() => handleCSVDownload()}
            >
              <img
                src={downloadIcon}
                alt="csv download icon"
                className={classes.icon}
              />
            </div>
          </ToolTip>
        )
      }
    </>
  );
};

const styles = {
  icon: {
    width: '24.71px',
    height: '24.72px',
  },
  tooltipImageWrapper: {
    cursor: 'pointer',
  },
};

export default withStyles(styles)(CsvDownlaod);

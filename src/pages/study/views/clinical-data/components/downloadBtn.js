import { Button, CircularProgress, withStyles } from '@material-ui/core';
import React from 'react';
import { ToolTip as Tooltip } from '../../../../../bento-core';

const DownloadBtn = ({ classes, loading, handleCSVDownload }) => (
  <div className={classes.downloadAllBtnContainer}>
    <Button
      variant="contained"
      classes={{ root: classes.downloadAllBtn }}
      onClick={handleCSVDownload}
    >
      {loading ? <CircularProgress size={25} /> : 'Download All'}
      {
            !loading && (
            <img
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
              alt="download icon"
              style={{
                width: '20px',
                height: '20px',
                marginLeft: '20px',
              }}
            />
            )
        }
    </Button>
    <Tooltip
      maxWidth="auto"
      fontFamily="Nunito"
      lineHeight="1.5"
      fontSize="14px"
      fontWeight="500"
      padding="10px 19px"
      title="Click to download all available clinical data in the form of multiple csv files"
      arrow
      placement="top"
    >
      <img
        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
        alt="tooltip"
        className={classes.headerCellTooltip}
      />
    </Tooltip>
  </div>
);

const styles = {
  downloadAllBtn: {
    width: '190px',
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Lato',
    background: '#1A8CCB',
    color: '#FFF',
    border: '1px solid #000',
    borderRadius: '10px',
    textTransform: 'capitalize',
  },
  tooltipText: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
  },
  downloadAllBtnContainer: {
    margin: '36px 0 20px 0',
  },
  headerCellTooltip: {
    width: '12px',
    marginBottom: '5px',
    position: 'relative',
    left: '8px',
    bottom: '10px',
  },
};
export default withStyles(styles)(DownloadBtn);

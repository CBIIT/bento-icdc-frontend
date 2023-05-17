import { Button, withStyles } from '@material-ui/core';
import { ToolTip as Tooltip } from 'bento-components';
import React from 'react';

const DownloadBtn = ({ classes }) => (
  <div className={classes.downloadAllBtnContainer}>
    <Button
      variant="contained"
      classes={{ root: classes.downloadAllBtn }}
    >
      Download All
      <img
        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
        alt="download icon"
        style={{
          width: '20px',
          height: '20px',
          marginLeft: '20px',
        }}
      />
    </Button>
    <Tooltip
      title={(
        <div className={classes.tooltipText}>
          Click to download all available clinical data in the form of multiple csv files
        </div>
      )}
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
    width: '165px',
    fontSize: '11px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Lato',
    background: '#0D71A3',
    color: '#FFF',
    border: '1px solid #000',
    borderRadius: '10px',
  },
  tooltipText: {
    fontFamily: 'Munito',
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

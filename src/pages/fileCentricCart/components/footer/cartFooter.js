import React from 'react';
import {
  withStyles,
  IconButton,
  Link,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ToolTip as Tooltip } from 'bento-components';
import Styles from './cartFooter.style';

const CartFooter = ({
  classes,
  myFilesPageData,
  setUserComment,
  preparedownload,
  externalLinkIcon,
}) => {
  const {
    tooltipIcon,
    tooltipAlt,
    textareaPlaceholder,
    userCommentsTooltipMessage,
    downButtonText,
    downloadBtnTooltipMessage,
  } = myFilesPageData;

  const toolTipIcon = ({ title, placement }) => (
    <Tooltip arrow title={title} placement={placement}>
      <IconButton className={classes.helpBtn} aria-label="help">
        <img
          src={tooltipIcon}
          alt={tooltipAlt}
          className={classes.helpIcon}
        />
      </IconButton>
    </Tooltip>
  );
  return (
    <div className={classes.paddingLeftRight}>
      <div className={classes.message}>
        <span>
          To access and analyze files: select and remove unwanted files,
          click the “Download Manifest” button, and upload the resulting
          Manifest file to your
          {' '}
          <Link target="_blank" className={classes.link} href="http://www.cancergenomicscloud.org/">
            Seven Bridges Genomics
          </Link>
          <img
            src={externalLinkIcon.src}
            alt={externalLinkIcon.alt}
            className={classes.linkIcon}
          />
          {' '}
          account.
        </span>
      </div>
      {/* Section: User Comments */}
      <div className={classes.manifestTextarea}>
        <TextField
          id="multiline-user-coments"
          label={textareaPlaceholder}
          multiline
          rows={6}
          style={{ minWidth: '550px' }}
          className={classes.textField}
          margin="dense"
          variant="filled"
          onChange={setUserComment}
        />
        {toolTipIcon({ title: userCommentsTooltipMessage, placement: 'right' })}
      </div>
      {/* Section: Button Group */}
      <div className={classes.buttonGroup}>
        <button
          type="button"
          className={classes.downloadButton}
          onClick={preparedownload}
        >
          {downButtonText}
        </button>
        {toolTipIcon({ title: downloadBtnTooltipMessage, placement: 'right' })}
      </div>
    </div>
  );
};

export default withStyles(Styles, { withTheme: true })(CartFooter);

import React from 'react';
import {
  withStyles,
  IconButton,
  Link,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ToolTip as Tooltip } from 'bento-components';
import Styles from './cartFooter.style';

const CartFooter = React.forwardRef(({
  classes,
  myFilesPageData,
  preparedownload,
  externalLinkIcon,
}, ref) => {
  const [commentText, setcommentText] = React.useState('');
  const onChange = ({ target: { value } }) => setcommentText(value);
  React.useImperativeHandle(ref, () => ({
    getValue() {
      return commentText;
    },
  }));
  const toolTipIcon = ({ title, placement }) => (
    <Tooltip arrow title={title} placement={placement}>
      <IconButton className={classes.helpBtn} aria-label="help">
        <img
          src={myFilesPageData.tooltipIcon}
          alt={myFilesPageData.tooltipAlt}
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
          label={myFilesPageData.textareaPlaceholder}
          multiline
          rows={6}
          value={commentText}
          style={{ minWidth: '550px' }}
          className={classes.textField}
          margin="dense"
          variant="filled"
          onChange={onChange}
        />
        {toolTipIcon({ title: myFilesPageData.userCommentsTooltipMessage, placement: 'right' })}
      </div>
      {/* Section: Button Group */}
      <div className={classes.buttonGroup}>
        <button
          type="button"
          className={classes.downloadButton}
          onClick={preparedownload}
        >
          DOWNLOAD MANIFEST
        </button>
        {toolTipIcon({ title: myFilesPageData.downloadBtnTooltipMessage, placement: 'right' })}
      </div>
    </div>
  );
});

export default withStyles(Styles, { withTheme: true })(CartFooter);

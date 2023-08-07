import React from 'react';
import { useSelector } from 'react-redux';
import {
  withStyles,
  IconButton,
  Link,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { ToolTip as Tooltip } from '../../../../bento-core';
import Styles from './cartFooter.style';
import ViewJBrowseButton from '../../../JbrowseDetail/components/JBrowseViewBtn';
import FooterThemeProvider from './cartFooterThemeConfig';

const CartFooter = React.forwardRef(({
  classes,
  myFilesPageData,
  preparedownload,
  externalLinkIcon,
}, ref) => {
  const selectedRowData = useSelector((state) => (state.cart.selectedFiles));
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
    <FooterThemeProvider>
      <div className={classes.paddingLeftRight}>
        <div className={classes.message}>
          <span>
            To access and analyze files: select and remove unwanted files,
            click the “Download File Manifest” button, and upload the resulting
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
            DOWNLOAD FILE MANIFEST
          </button>
          {toolTipIcon({ title: myFilesPageData.downloadBtnTooltipMessage, placement: 'right' })}
        </div>
      </div>
      <ViewJBrowseButton
        customClass={classes.helpIcon}
        selectedFileNames={selectedRowData.selectedRowInfo}
      />
    </FooterThemeProvider>
  );
});

export default withStyles(Styles, { withTheme: true })(CartFooter);

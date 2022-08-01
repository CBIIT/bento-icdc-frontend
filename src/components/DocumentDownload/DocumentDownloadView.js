import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ToolTip } from 'bento-components';

import CustomIcon from '../CustomIcon';
import {
  jBrowseOptions,
  JbrowserFiles,
  SINGLE_FILE_VIEW,
} from '../../bento/JBrowseData';
import { setSelectedFiles } from '../../pages/JbrowseDetail/util';
import { setJborwseSelectedFiles } from '../../pages/JbrowseDetail/store/jborwse.reducer';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const fetchFileToDownload = (fileURL = '') => {
  fetch(`${FILE_SERVICE_API}${fileURL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
    .then((response) => response.text())
    .then((filePath) => {
      // Create blob link to download
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute(
        'download',
        'fileURL',
      );

      // Append to html link element page
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
};

const viewFileOnJbrowse = (file) => {
  const files = setSelectedFiles([file]);
  setJborwseSelectedFiles(files);
};

const DocumentDownload = ({
  fileSize = 0,
  fileFormat = '',
  maxFileSize = 2000,
  toolTipTextFileDownload = 'Download a copy of this file',
  toolTipTextFilePreview = 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
  toolTipTextFileViewer = 'Open and view this file',
  iconFileDownload = '',
  iconFilePreview = '',
  fileLocation = '',
  iconFileViewer = '',
  caseId = '',
}) => (
  <>
    { (JbrowserFiles.indexOf(fileFormat) !== -1) && jBrowseOptions.jBrowse ? (
      <ToolTip title={toolTipTextFileViewer}>
        <Link
          rel="noreferrer"
          color="inherit"
          onClick={() => viewFileOnJbrowse(caseId)}
          to={{
            pathname: `/jbroswse/${SINGLE_FILE_VIEW}`,
          }}
        >
          <CustomIcon imgSrc={iconFileViewer} />
        </Link>
      </ToolTip>
    ) : fileSize < maxFileSize ? (
      <ToolTip title={toolTipTextFileDownload}>
        <div onClick={() => fetchFileToDownload(fileLocation)}>
          <CustomIcon imgSrc={iconFileDownload} />
        </div>
      </ToolTip>
    ) : (
      <ToolTip title={toolTipTextFilePreview}>
        <span>
          <CustomIcon imgSrc={iconFilePreview} />
        </span>
      </ToolTip>
    )}
  </>
);

const styles = () => ({

});

export default withStyles(styles)(DocumentDownload);

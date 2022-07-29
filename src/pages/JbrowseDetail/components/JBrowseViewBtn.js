import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  IconButton,
  withStyles,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { ToolTip as Tooltip } from 'bento-components';
import {
  FILE_TYPE_BAI,
  FILE_TYPE_VCF_INDEX,
} from '../../../bento/JBrowseData';
import { setJborwseSelectedFiles } from '../store/jborwse.reducer';

const ViewJBrowseButton = ({
  classes,
  selectedFileNames,
}) => {
  const selectedDashFiles = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.dataFileSelected && state.dashboardTab.dataFileSelected.selectedRowInfo
    ? state.dashboardTab.dataFileSelected.selectedRowInfo : null));
  if (!selectedDashFiles) {
    return (
      <>circle</>
    );
  }

  const setSelectedFiles = (selectedFiles) => {
    const files = new Set();
    if (selectedFiles && selectedFiles.length > 0) {
      const convertFilesName = selectedFiles.map((file) => file.replace(`.${FILE_TYPE_BAI}`, '')
        .replace(`.${FILE_TYPE_VCF_INDEX}`, ''));
      convertFilesName.forEach((name) => files.add(name));
    }
    return [...files];
  };

  const filesName = (selectedFileNames && selectedFileNames.length >= 0)
    ? selectedFileNames : selectedDashFiles;
  const distinctFiles = setSelectedFiles(filesName);

  const viewFilesOnJBrowse = () => {
    localStorage.setItem('jbroseFiles', distinctFiles);
    setJborwseSelectedFiles(distinctFiles);
  };

  return (
    <>
      <Link
        to={{
          pathname: '/multiFileViewer',
          state: { fileNames: distinctFiles },
        }}
      >
        <button
          className={classes.button}
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={distinctFiles.length === 0 || distinctFiles.length > 5}
        >
          View in JBrowse
        </button>
      </Link>
      <Tooltip title="view file in jbrowse" arrow placement="bottom">
        <IconButton
          aria-label="help"
          className={classes.helpIconButton}
        >
          <HelpIcon
            className={classes.helpIcon}
            fontSize="small"
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '176px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#ff7f15',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
  },
  helpIcon: {
    zIndex: '600',
    width: '17px',
  },
});

export default withStyles(styles)(ViewJBrowseButton);

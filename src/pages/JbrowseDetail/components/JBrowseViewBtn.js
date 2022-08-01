import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  IconButton,
  withStyles,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToolTip as Tooltip } from 'bento-components';
import {
  MAX_NUMBER_OF_FILES,
  MULTI_FILES_VIEW,
  ButtonText,
} from '../../../bento/JBrowseData';
import { setJborwseSelectedFiles } from '../store/jborwse.reducer';
import { setSelectedFiles } from '../util';

const ViewJBrowseButton = ({
  classes,
  selectedFileNames,
}) => {
  const selectedDashFiles = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.dataFileSelected && state.dashboardTab.dataFileSelected.selectedRowInfo
    ? state.dashboardTab.dataFileSelected.selectedRowInfo : null));
  if (!selectedDashFiles) {
    return (
      <CircularProgress />
    );
  }

  const filesName = (selectedFileNames && selectedFileNames.length >= 0)
    ? selectedFileNames : selectedDashFiles;
  const distinctFiles = setSelectedFiles(filesName);

  const viewFilesOnJBrowse = () => {
    setJborwseSelectedFiles(distinctFiles);
  };

  return (
    <>
      <Link
        to={{
          pathname: `/jbroswse/${MULTI_FILES_VIEW}`,
          state: { fileNames: distinctFiles },
        }}
      >
        <button
          className={classes.button}
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={distinctFiles.length === 0 || distinctFiles.length > MAX_NUMBER_OF_FILES}
        >
          {ButtonText}
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

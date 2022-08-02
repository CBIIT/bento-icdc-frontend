import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToolTip as Tooltip } from 'bento-components';
import {
  MAX_NUMBER_OF_FILES,
  MULTI_FILES_VIEW,
  ButtonText1,
  ButtonText2,
  JBROWSE_BTN_ID,
  tooltipContent,
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

  const isInvlaid = distinctFiles.length === 0 || distinctFiles.length > MAX_NUMBER_OF_FILES;
  console.log(isInvlaid);
  return (
    <>
      <Link
        className={isInvlaid ? classes.diableLink : classes.activeLink}
        to={{
          pathname: `/jbroswse/${MULTI_FILES_VIEW}`,
        }}
      >
        <Button
          className={classes.button}
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={isInvlaid}
          id={JBROWSE_BTN_ID}
        >
          {ButtonText1}
          <img
            src="https://jbrowse.org/jb2/img/logo.svg"
            alt=""
            className={classes.jbrowseIcon}
          />
          {ButtonText2}
        </Button>
      </Link>
      <Tooltip title="View file in jbrowse" arrow placement="bottom">
        <img
          src={tooltipContent.src}
          alt={tooltipContent.alt}
          className={classes.helpIconButton}
        />
      </Tooltip>
    </>
  );
};

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '210px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#fffffff',
    backgroundColor: '#3e5c79',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-2px',
    width: '1.5em',
    position: 'absolute',
  },
  helpIcon: {
    zIndex: '600',
    width: '17px',
  },
  jbrowseIcon: {
    width: '2.25em',
  },
  diableLink: {
    pointerEvents: 'none',
  },
  activeLink: {
  },
});

export default withStyles(styles)(ViewJBrowseButton);

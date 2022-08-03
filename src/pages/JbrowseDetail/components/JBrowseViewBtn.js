import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  withStyles,
  Button,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToolTip as Tooltip, cn } from 'bento-components';
import {
  MAX_NUMBER_OF_FILES,
  MULTI_FILES_VIEW,
  ButtonText1,
  ButtonText2,
  JBROWSE_BTN_ID,
  JBROWSE_TOOLTIP_ICON_ID,
  tooltipContent,
  DISABLE_RIPPLE,
  jbrowseIconSrc,
  tooltipMsg1,
  tooltipMsg2,
  tooltipErrMsg,
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

  const renderTooltipContent = () => (
    <>
      {((distinctFiles.length > 0) && isInvlaid) && (
        <Typography className={classes.warning}>
          Warning:
        </Typography>
      )}
      <Typography align="center" color="inherit" className={classes.descripText}>
        {((distinctFiles.length > 0) && isInvlaid)
          ? tooltipErrMsg : (distinctFiles.length === 0) ? tooltipMsg1 : tooltipMsg2}
      </Typography>
    </>
  );
  return (
    <>
      <Link
        className={isInvlaid ? classes.diableLink : classes.activeLink}
        to={{
          pathname: `/jbroswse/${MULTI_FILES_VIEW}`,
        }}
      >
        <Button
          className={isInvlaid ? cn(classes.button, classes.disbaleButton) : classes.button}
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={isInvlaid}
          id={JBROWSE_BTN_ID}
          disableRipple={DISABLE_RIPPLE}
        >
          {ButtonText1}
          <img
            src={jbrowseIconSrc}
            alt="jbrowse_icon"
            className={cn(classes.jbrowseIcon)}
          />
          {ButtonText2}
        </Button>
      </Link>
      <Tooltip
        title={renderTooltipContent()}
        placement="right"
        maxWidth={250}
      >
        <img
          src={tooltipContent.src}
          alt={tooltipContent.alt}
          id={JBROWSE_TOOLTIP_ICON_ID}
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
    '&:hover': {
      backgroundColor: '#3e5c79',
    },
  },
  disbaleButton: {
    opacity: '0.7',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-1px',
    width: '17px',
    marginTop: '5px',
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
    cursor: 'pointer',
  },
  warning: {
    color: '#a32d05',
    float: 'left',
    fontWeight: '900',
  },
});

export default withStyles(styles)(ViewJBrowseButton);

import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  withStyles,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ToolTip as Tooltip, cn } from 'bento-components';
import {
  MAX_NUMBER_OF_FILES,
  MULTI_FILES_VIEW,
  JBROWSE_BTN_ID,
  JBROWSE_TOOLTIP_ICON_ID,
  JBROWSE_HELP_ICON_BTN,
  tooltipContent,
  DISABLE_RIPPLE,
  tooltipMsg1,
  tooltipMsg2,
  tooltipErrMsg,
} from '../../../bento/JBrowseData';
import { setJborwseSelectedFiles } from '../store/jborwse.reducer';
import { setSelectedFiles } from '../util';
import jBrowseLogo from '../../fileCentricCart/Group.svg';
import './index.css';

const customTheme = {
  override: {
  },
};

const ViewJBrowseButton = ({
  customClass,
  classes,
  disable,
  selectedFileNames,
}) => {
  const selectedDashFiles = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.dataFileSelected && state.dashboardTab.dataFileSelected.selectedRowInfo
    ? state.dashboardTab.dataFileSelected.selectedRowInfo : null));

  const filesName = (selectedFileNames && selectedFileNames.length >= 0)
    ? selectedFileNames : selectedDashFiles;
  const distinctFiles = setSelectedFiles(filesName);

  const viewFilesOnJBrowse = () => {
    setJborwseSelectedFiles(distinctFiles);
  };
  const isInactive = distinctFiles.length === 0;
  const isInvlaid = isInactive || distinctFiles.length > MAX_NUMBER_OF_FILES;

  const InValidToottipMsg = () => (
    <>
      <span className={classes.warning}>
        {'Warning: '}
      </span>
      <span>
        {tooltipErrMsg}
      </span>
    </>
  );

  const renderTooltipContent = () => (
    <MuiThemeProvider theme={createTheme(customTheme)}>
      <Typography align="center" color="inherit" className={classes.descripText}>
        {(isInactive || disable) ? tooltipMsg1
          : (isInvlaid) ? <InValidToottipMsg /> : tooltipMsg2}
      </Typography>
    </MuiThemeProvider>
  );
  return (
    <>
      <Link
        className={(isInvlaid || disable) ? classes.diableLink : classes.activeLink}
        to={{
          pathname: `/jbroswse/${MULTI_FILES_VIEW}`,
        }}
      >
        <Button
          className={(isInvlaid || disable)
            ? cn(classes.button, classes.disbaleButton) : classes.button}
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={isInvlaid}
          id={JBROWSE_BTN_ID}
          disableRipple={DISABLE_RIPPLE}
        >
          View in JBrowse
          <img
            src={jBrowseLogo}
            alt="jbrowse logo"
            style={{
              width: '24px',
              height: '21px',
              marginLeft: '8px',
            }}
          />
        </Button>
      </Link>
      <Tooltip
        title={renderTooltipContent()}
        placement="right"
        maxWidth={230}
        arrow
      >
        <IconButton className={classes.helpIconButton} id={JBROWSE_HELP_ICON_BTN}>
          <img
            src={tooltipContent.src}
            alt={tooltipContent.alt}
            id={JBROWSE_TOOLTIP_ICON_ID}
            className={customClass}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

const styles = () => ({
  button: {
    backgroundColor: '#FFF',
    border: '2px solid #2F567D',
    borderRadius: '8px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#2F567D',
  },
  disbaleButton: {
    backgroundColor: '#CCD1D4',
  },
  helpIconButton: {
    verticalAlign: 'top',
    position: 'relative',
    left: '5px',
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
    marginRight: '-5px',
  },
  activeLink: {
    cursor: 'pointer',
    marginRight: '-5px',
  },
  warning: {
    color: '#971818',
    fontWeight: '900',
  },
  descripText: {
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1.6',
    textAlign: 'left',
    fontFamily: 'Open Sans',
  },
});

export default withStyles(styles)(ViewJBrowseButton);

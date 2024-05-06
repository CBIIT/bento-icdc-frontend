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
import {
  ToolTip as Tooltip,
  cn,
} from '../../../bento-core';
import {
  MAX_NUMBER_OF_FILES,
  MULTI_FILES_VIEW,
  ButtonText1,
  ButtonText2,
  JBROWSE_BTN_ID,
  JBROWSE_TOOLTIP_ICON_ID,
  JBROWSE_HELP_ICON_BTN,
  tooltipContent,
  DISABLE_RIPPLE,
  jbrowseIconSrc,
  tooltipMsg1,
  tooltipMsg2,
  tooltipErrMsg,
} from '../../../bento/JBrowseData';
import { setJborwseSelectedFiles } from '../store/jborwse.reducer';
import { setSelectedFiles } from '../util';
import jbrowseLogo from '../../../assets/icons/JbrowseViewIcon2.svg';
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
          pathname: `/jBrowse/${MULTI_FILES_VIEW}`,
        }}
        target="_blank"
        rel="noreferrer noopener"
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
          {ButtonText1}
          <img
            src={(isInvlaid || disable) ? jbrowseIconSrc : jbrowseLogo}
            alt="jbrowse_icon"
            className={cn(classes.jbrowseIcon)}
          />
          {ButtonText2}
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
    borderRadius: '10px',
    width: '210px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#ffffff',
    backgroundColor: '#566672',
    marginTop: '6px',
    marginBottom: '10px',
    textTransform: 'none',
    marginRight: '5px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  disbaleButton: {
    // opacity: '0.7',
    color: '#ffffff !important',
    backgroundColor: '#CCD1D4',
  },
  helpIconButton: {
    verticalAlign: 'top',
    position: 'absolute',
    '&:hover': {
      backgroundColor: '#fff',
    },
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

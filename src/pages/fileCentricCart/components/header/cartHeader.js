import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup,
  Divider, ListItemText, Menu,
  withStyles,
} from '@material-ui/core';
import {
  cn,
  ToolTip as Tooltip,
} from 'bento-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { noop } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Styles from './cartHeader.style';
import ReadMoreSVG from './readMore';
// import ReadMeDialog from './readMeDialog';
import DownloadFileManifestDialog from './downloadFileManifestDialog';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import { pageData } from '../../../../bento/cartData';
import cgcIcon from './assets/cgc.svg';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '287px',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
  },
  list: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: '10px',
    color: '#095c85',
    '&:focus': {
      backgroundColor: '#0d71a3',
      color: 'white',
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const LABEL = 'Available Export Options';

const {
  EXPORT_TO_SEVEN_BRIDGES,
} = {
  EXPORT_TO_SEVEN_BRIDGES: 'Export to Seven Bridges',
};

const OPTIONS = [
  EXPORT_TO_SEVEN_BRIDGES,
];

const getReadMe = async (setContent) => {
  const { data } = await axios.get(pageData.readMeUrl);
  setContent(data);
};

const CartHeader = React.forwardRef(({
  classes,
  headerIconSrc,
  headerIconAlt,
  mainTitle,
  subTitle,
  prepareDownload,
}, ref) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [label, setLabel] = useState(LABEL);
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [readMoreDialogOpen, setReadMoreDialogOpen] = React.useState(false);
  const [downloadFileManifestDialogOpen, setDownloadFileManifestDialogOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    getReadMe(setContent);
  }, []);
  const exportOptionsClickHandler = (event) => {
    // setLabel('Available Downloads');
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const initiateDownload = () => {
    noop();
  };

  const handleDownloadFileManifestDialogOpen = () => {
    setDownloadFileManifestDialogOpen(true);
  };

  const handleDownloadFileManifestDialogClose = () => {
    setDownloadFileManifestDialogOpen(false);
  };

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  const setType = (value) => {
    setLabel(value);
    setAnchorElement(null);
  };

  const getMenuItem = (type) => {
    let icon;
    switch (type) {
      case EXPORT_TO_SEVEN_BRIDGES:
        icon = cgcIcon;
        break;
      default:
        icon = undefined;
        break;
    }
    return (
      <StyledMenuItem onClick={() => setType(type)}>
        <ListItemText
          classes={{
            primary: classes.listItemText,
          }}
          primary={type}
        />
        {
          icon && (
          <span>
            <img src={icon} alt="icon" />
          </span>
          )
        }
      </StyledMenuItem>
    );
  };

  const options = OPTIONS.map((item) => getMenuItem(item));
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.logoAndTitle}>
          <div className={classes.logo}>
            <img
              src={headerIconSrc}
              alt={headerIconAlt}
            />
          </div>

          <div className={classes.headerTitle}>
            <div className={cn(classes.headerMainTitle, classes.marginTop80)}>
              <span>
                <span>{mainTitle}</span>
              </span>
              <span className={classes.headerMainTitleTwo}>
                {' '}
                {' '}
                {subTitle}
              </span>
            </div>
          </div>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            classes={{
              root: classes.readMeBtnRoot,
              label: classes.readMeBtnLabel,
            }}
            variant="contained"
            color="primary"
            onClick={displayReadMeHandler}
          >
            README
            <div className={classes.readMoreIconContainer}>
              <ReadMoreSVG />
            </div>
          </Button>

          {/* Dropdown btns */}
          <div>
            <ButtonGroup variant="contained" classes={{ root: classes.btnGrpRoot, contained: classes.btnGrpContained }}>
              <Button
                classes={{
                  root: classes.availableDownloadDropdownBtn,
                  label: classes.availableDownloadDropdownBtnLabel,
                  contained: classes.availableDownloadBtnContained,
                }}
                startIcon={<KeyboardArrowDownIcon />}
                onClick={exportOptionsClickHandler}
              >
                {isLoading ? (<p>Loading...</p>) : (
                  <>
                    {label}
                  </>
                )}
              </Button>
              <Button
                disabled={LABEL === label}
                onClick={initiateDownload}
                classes={{
                  root: classes.availableDownloadBtn,
                }}
              >
                <img
                  style={{ height: '19px', width: '19px' }}
                  alt="download icon"
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
                />
              </Button>
            </ButtonGroup>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorElement}
              keepMounted
              open={Boolean(anchorElement)}
              onClose={closeHandler}
            >
              {options}
            </StyledMenu>
          </div>

          {/* Download file manifest */}
          <div>
            <Button
              variant="contained"
              onClick={handleDownloadFileManifestDialogOpen}
              classes={{
                root: classes.downloadFileManifestBtn,
              }}
            >
              Download File Manifest
              <div className={classes.downloadFileIconContainer}>
                <img
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
                  alt="download icon"
                  className={classes.downloadFileIcon}
                />
              </div>
            </Button>
            <Tooltip
              arrow
              interactive
              title={(
                <div className={classes.downloadFileManifestTooltip}>
                  {/* eslint-disable-next-line max-len */}
                  To access and analyze files select and remove unwanted files, click the 'Download File Manifest' button and upload the resulting manifest file to your
                  {' '}
                  <a
                    style={{ color: '#DA6300' }}
                    target="_blank"
                    rel="noreferrer"
                    href="https://cgc-accounts.sbgenomics.com/auth/login?next=https%3A%2F%2Fcgc-accounts.sbgenomics.com%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D08bbb98f354e4554bd7fd315de64d955%26redirect_uri%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Foauth2%252Fredirect%26state%3Dp8aBZtr4Vo9DKxtCgjG8aKPSZVyNXq%26client_next%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Fimport-redirect%252Fdrs%252Fcsv%253FURL%253D%25257Bdownload%26scope%3Dopenid%26nonce%3D67182501315305605201684948090"
                  >
                    Seven Bridges Genomics
                  </a>
                  {' '}
                  account.
                </div>
                            )}
              placement="top"
            >
              <img
                className={classes.downloadFileManifestInfoIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                alt="more info icon"
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <Divider classes={{ root: classes.divider }} />
      <ReadMeDialogComponent
        content={content}
        config={{
          readMeTitle: 'Understanding the “My Files” Cart Page',
        }}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
      {/* <ReadMeDialog onClose={handleReadMoreDialogClose} open={readMoreDialogOpen} /> */}
      <DownloadFileManifestDialog
        onClose={handleDownloadFileManifestDialogClose}
        open={downloadFileManifestDialogOpen}
        prepareDownload={prepareDownload}
        ref={ref}
      />
    </div>

  );
});

export default withStyles(Styles, { withTheme: true })(CartHeader);

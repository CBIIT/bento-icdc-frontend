import React, { useEffect, useState } from 'react';
import {
  Button, Divider,
  withStyles,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { noop } from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { cn } from '@bento-core/util';
import gql from 'graphql-tag';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import env from '../../../utils/env';
import Styles from './cartHeader.style';
import ReadMoreSVG from './readMore';
import DownloadFileManifestDialog from './downloadFileManifestDialog';
import ReadMeDialogComponent from '../../../components/ReadMeDialog/ReadMe.controller';
import cgcIcon from './assets/cgc.svg';
import { getManifestData } from '../util/TableService';
import { GET_STORE_MANIFEST_DATA_QUERY } from '../../../bento/fileCentricCartWorkflowData';
import {
  ToolTip as Tooltip,
} from '../../../bento-core';
import arrowDownPng from './assets/arrowDown.png';

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // padding: '10px',
    padding: '2px 26px',
    color: '#095c85',
    overflow: 'auto',
    whiteSpace: 'wrap',
    '&:focus': {
      backgroundColor: '#0d71a3',
      color: 'white',
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
        lineHeight: '1',
      },
    },
  },
}))(MenuItem);

const LABEL = 'Available Export Options';

const {
  EXPORT_TO_CANCER_GENOMICS_CLOUD,
} = {
  EXPORT_TO_CANCER_GENOMICS_CLOUD: 'Export to Cancer Genomics Cloud',
};

const OPTIONS = [
  EXPORT_TO_CANCER_GENOMICS_CLOUD,
];

const getReadMe = async (setContent, url) => {
  const { data } = await axios.get(url);
  setContent(data);
};

const STORE_MANIFEST_QUERY = gql`
    query storeManifest($manifest: String!) {
        storeManifest(manifest: $manifest)
    }
`;

const CartHeader = React.forwardRef(({
  classes,
  headerIconSrc,
  headerIconAlt,
  mainTitle,
  subTitle,
  prepareDownload,
  // manifestPayload,
  filesId,
}) => {
  const [sbgUrl, setSBGUrl] = useState('');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const getManifestPayload = () => {
    const { data: manifestData } = getManifestData(GET_STORE_MANIFEST_DATA_QUERY, filesId);

    if (!manifestData) {
      return null;
    }
    const processedStoreManifestPayload = manifestData.filesInList.map((el) => ({
      file_name: el?.file_name,
      file_type: el?.file_type,
      association: el?.association,
      file_description: el?.file_description,
      file_format: el?.file_format,
      file_size: el?.file_size,
      case_id: el?.case_id,
      breed: el?.breed,
      diagnosis: el?.diagnosis,
      study_code: el?.study_code,
      file_uuid: el?.file_uuid,
      md5sum: el?.md5sum,
      sample_id: el?.sample_id,
      individual_id: el?.individual_id,
      name: el?.name,
      drs_uri: el?.drs_uri,
    }));
    return processedStoreManifestPayload;
  };

  const { data } = useQuery(STORE_MANIFEST_QUERY, {
    variables: { manifest: JSON.stringify(getManifestPayload()) },
    context: { clientName: 'interopService' },
    skip: !getManifestPayload(),
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.storeManifest) {
      setSBGUrl(data.storeManifest);
    }
  }, [data]);

  const [label] = useState(LABEL);
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [readMoreDialogOpen, setReadMoreDialogOpen] = React.useState(false);
  const [downloadFileManifestDialogOpen, setDownloadFileManifestDialogOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = React.useState(false);

  useEffect(() => {
    getReadMe(setContent, env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const initiateDownload = (currLabel) => {
    switch (currLabel) {
      case 'Export to Cancer Genomics Cloud': window.open(`https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=${encodeURIComponent(sbgUrl)}`, '_blank');
        break;
      default: noop(data);
        break;
    }
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

  const getMenuItem = (type) => {
    let icon;
    switch (type) {
      case EXPORT_TO_CANCER_GENOMICS_CLOUD:
        icon = cgcIcon;
        break;
      default:
        icon = undefined;
        break;
    }
    return (
      <StyledMenuItem onClick={() => {
        initiateDownload(type);
        setOpen(false);
      }}
      >
        <div>{type}</div>
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
          <div style={{}}>
            <Button
              onClick={displayReadMeHandler}
              color="primary"
              variant="contained"
              endIcon={<ReadMoreSVG />}
              classes={{
                root: classes.readMeBtnRoot,
                label: classes.readMeBtnLabel,
              }}
            >
              README
            </Button>
          </div>

          <div>
            {' '}
            <Button
              classes={{
                root: open
                  ? classes.availableDownloadDropdownBtnIsOpen
                  : classes.availableDownloadDropdownBtn,
                label: classes.availableDownloadDropdownBtnLabel,
                contained: classes.availableDownloadBtnContained,
                startIcon: classes.availableDownloadDropdownBtnStartIcon,
              }}
              startIcon={<img style={{ marginRight: '8px' }} src={arrowDownPng} alt="arrow down icon" />}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {isLoading ? (<p>Loading...</p>) : (
                <>
                  {label}
                </>
              )}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper
                    className={classes.dropdownPaper}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                        classes={{
                          root: classes.dropdownMenuList,
                        }}
                      >
                        {options}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <div className={classes.downloadFileManifestTooltipWrapper}>
            <Button
              variant="contained"
              onClick={handleDownloadFileManifestDialogOpen}
              disabled={filesId.length === 0}
              classes={{
                root: classes.downloadFileManifestBtn,
              }}
              endIcon={(
                <img
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
                  alt="download icon"
                  className={classes.downloadFileIcon}
                />
 )}
            >
              Download File Manifest
            </Button>
            <div>
              <Tooltip
                arrow
                interactive
                title={(
                  <div className={classes.downloadFileManifestTooltip}>
                    {/* eslint-disable-next-line max-len */}
                    To access and analyze files select and remove unwanted files, click the 'Download File Manifest' button and upload the resulting manifest file to your

                    <a
                      style={{ color: '#DA6300' }}
                      target="_blank"
                      rel="noreferrer"
                      href="https://cgc-accounts.sbgenomics.com/auth/login?next=https%3A%2F%2Fcgc-accounts.sbgenomics.com%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D08bbb98f354e4554bd7fd315de64d955%26redirect_uri%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Foauth2%252Fredirect%26state%3Dp8aBZtr4Vo9DKxtCgjG8aKPSZVyNXq%26client_next%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Fimport-redirect%252Fdrs%252Fcsv%253FURL%253D%25257Bdownload%26scope%3Dopenid%26nonce%3D67182501315305605201684948090"
                    >
                      <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                        Seven Bridges Genomics
                      </span>
                    </a>
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
        filesId={filesId}
      />
    </div>

  );
});

export default withStyles(Styles, { withTheme: true })(CartHeader);

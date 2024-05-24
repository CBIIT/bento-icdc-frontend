import React, { useEffect, useState, useContext } from 'react';
import {
  withStyles,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Popper,
  Button,
  Grow,
  Paper,
} from '@material-ui/core';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { noop } from 'lodash';
import axios from 'axios';
import gql from 'graphql-tag';
import { TableContext, ToolTip as Tooltip } from '../../../../bento-core';
import styles from './DropDownStyle';
import cgcIcon from '../../assets/cgc.svg';
import linkIcon from '../../assets/linkIcon.svg';
import arrowDownPng from '../../assets/arrowDown.png';
import arrowUpPng from '../../assets/arrowUp.png';
import {
  GET_STORE_MANIFEST_DATA_QUERY,
} from '../../../../bento/fileCentricCartWorkflowData';
import { getManifestData } from '../../../fileCentricCart/util/TableService';
import env from '../../../../utils/env';
import DownloadFileManifestDialog from './downloadFileManifestDialog';

const LABEL = 'Export and Download';

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

const DropDownView = ({
  classes,
  filesId = [],
  allFiles,
}) => {
  const [sbgUrl, setSBGUrl] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  // download all or selected files
  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const { selectedRows = [] } = context;
  const disableDropdown = !allFiles && selectedRows.length === 0;

  // close dropdown if allFile is false and any row is not selected
  useEffect(() => {
    setOpen(false);
  }, [selectedRows]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const dropDownIcon = open ? (<img src={arrowUpPng} alt="arrow down icon" />)
    : (<img src={arrowDownPng} alt="arrow down icon" />);

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
    // if allFiles download all files in cart else selected files id
    const { selectedFileIds = [] } = context;
    const downloadFilesId = allFiles ? filesId : selectedFileIds;
    const { data: manifestData } = getManifestData(GET_STORE_MANIFEST_DATA_QUERY, downloadFilesId);

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
  const [content, setContent] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [downloadFileManifestDialogOpen, setDownloadFileManifestDialogOpen] = React.useState(false);

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
      <>
        <MenuItem>
          <Tooltip
            arrow
            interactive
            title={(
              <div className={classes.downloadFileManifestTooltip}>
                {/* eslint-disable-next-line max-len */}
                Click this link to go to 
                <a
                  style={{ color: '#165F83' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://cgc-accounts.sbgenomics.com/auth/login?next=https%3A%2F%2Fcgc-accounts.sbgenomics.com%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D08bbb98f354e4554bd7fd315de64d955%26redirect_uri%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Foauth2%252Fredirect%26state%3Dp8aBZtr4Vo9DKxtCgjG8aKPSZVyNXq%26client_next%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Fimport-redirect%252Fdrs%252Fcsv%253FURL%253D%25257Bdownload%26scope%3Dopenid%26nonce%3D67182501315305605201684948090"
                >
                  <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                  {" Cancer Genomics Cloud "}
                  <img className={classes.linkIcon} src={linkIcon} alt="linkIcon" />
                  </span>
                </a>
                account.
              </div>
            )}
            placement="right"
          >
          <span onClick={() => {
            initiateDownload(EXPORT_TO_CANCER_GENOMICS_CLOUD);
            setOpen(false);
            }}
          >
            <span className={classes.cgcLabal}>{EXPORT_TO_CANCER_GENOMICS_CLOUD}</span>
            <img className={classes.cgcIcon} src={cgcIcon} alt="icon" />
          </span>
          </Tooltip>
        </MenuItem>
        <MenuItem className="donwloadManiFestBtn">
          <Tooltip
            arrow
            interactive
            maxWidth={250}
            title={(
              <div className={classes.downloadFileManifestTooltip}>
                {/* eslint-disable-next-line max-len */}
                {"To access and analyze files select and remove unwanted files, click the 'Download File Manifest' button and upload the resulting manifest file to your "}
                <a
                  style={{ color: '#165F83' }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://cgc-accounts.sbgenomics.com/auth/login?next=https%3A%2F%2Fcgc-accounts.sbgenomics.com%2Foauth2%2Fauthorization%3Fresponse_type%3Dcode%26client_id%3D08bbb98f354e4554bd7fd315de64d955%26redirect_uri%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Foauth2%252Fredirect%26state%3Dp8aBZtr4Vo9DKxtCgjG8aKPSZVyNXq%26client_next%3Dhttps%253A%252F%252Fcgc.sbgenomics.com%252Fimport-redirect%252Fdrs%252Fcsv%253FURL%253D%25257Bdownload%26scope%3Dopenid%26nonce%3D67182501315305605201684948090"
                >
                  <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                    {"Seven Bridges Genomics"}
                  </span>
                </a>
                {" account."}
              </div>
            )}
            placement="right"
          >
            <span onClick={handleDownloadFileManifestDialogOpen}>
              <span className={classes.fileManifestLabal}>
                Download File Manifest
              </span>
              <img
                className={classes.downloadFileIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
                alt="icon"
              />
            </span>
          </Tooltip>
        </MenuItem>
      </>
    );
  };

  const options = OPTIONS.map((item) => getMenuItem(item));

  return (
    <>
      <div className={classes.dropDownBtnContainer}>
        {' '}
        <Tooltip
          arrow
          maxWidth={200}
          placement="left"
          title={disableDropdown? "Select at least one file from the table below." : ""}
        >
          <div>
            <Button
              disabled={disableDropdown}
              classes={{
                root: clsx({
                  [classes.availableDownloadDropdownBtnIsOpen]: open,
                  [classes.availableDownloadDropdownBtn]: !open,
                  [classes.disableDropDownBtn]: disableDropdown
                }),
                label: classes.availableDownloadDropdownBtnLabel,
                contained: classes.availableDownloadBtnContained,
                startIcon: classes.availableDownloadDropdownBtnStartIcon,
                endIcon: classes.endIcon,
              }}
              endIcon={dropDownIcon}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {label}
            </Button>
          </div>
        </Tooltip>
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
      <DownloadFileManifestDialog
        onClose={handleDownloadFileManifestDialogClose}
        open={downloadFileManifestDialogOpen}
        filesId={filesId}
        allFiles={allFiles}
      />
    </>
  );
};

export default withStyles(styles)(DropDownView);

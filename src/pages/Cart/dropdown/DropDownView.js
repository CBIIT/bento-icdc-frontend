import React, { useEffect, useState } from 'react';
import {
  Grid,
  ThemeProvider,
  createTheme,
  withStyles,
  Divider,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Popper,
  Button,
  Grow,
  Paper,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { noop } from 'lodash';
import axios from 'axios';
import { cn } from '@bento-core/util';
import gql from 'graphql-tag';
import styles from './DropDownStyle';
import cgcIcon from '../assets/cgc.svg';
import arrowDownPng from '../assets/arrowDown.png';
import {
  GET_STORE_MANIFEST_DATA_QUERY,
  myFilesPageData,
} from '../../../bento/fileCentricCartWorkflowData';
import { getManifestData } from '../../fileCentricCart/util/TableService';
import env from '../../../utils/env';

const StyledMenuItem = withStyles(() => ({
  root: {
    padding: '2px 26px',
    color: '#fff',
    overflow: 'auto',
    whiteSpace: 'wrap',
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

const DropDownView = ({
  classes,
  filesId = [],
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
      <>
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
        <StyledMenuItem onClick={handleDownloadFileManifestDialogOpen}>
          <div>Download File Manifest</div>
          <span>
            <img className={classes.downloadFileIcon} src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg" alt="icon" />
          </span>
        </StyledMenuItem>
      </>
    );
  };

  const options = OPTIONS.map((item) => getMenuItem(item));

  return (
    <>
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
    </>
  );
};

export default withStyles(styles)(DropDownView);

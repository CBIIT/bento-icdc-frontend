import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
} from '@mui/material';
// import { withStyles } from "@mui/styles";
import { withStyles, Button, MenuItem, MenuList, } from '@material-ui/core';
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
import { defaultTo } from 'lodash';
import {
    CREATE_MANIFEST,
  GET_STORE_MANIFEST_DATA_QUERY,
  myFilesPageData,
} from '../../../../bento/fileCentricCartWorkflowData';
import { getManifestData } from '../../../fileCentricCart/util/TableService';
import env from '../../../../utils/env';
import DownloadFileManifestDialog from './downloadFileManifestDialog';
import { downloadCsvString } from '../../utils';

const LABEL = 'Export and Download';

const {
  EXPORT_TO_CANCER_GENOMICS_CLOUD,
  DOWNLOAD_FILE_MANIFEST,
} = {
  EXPORT_TO_CANCER_GENOMICS_CLOUD: 'Export to Cancer Genomics Cloud',
  DOWNLOAD_FILE_MANIFEST: 'Download File Manifest'
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

const emptyCartTooltipContent = "Add some files to the cart to get started.";
const noSelectedRowsTooltipContent = "Select at least one file from the table below."

const DropDownView = ({
  classes,
  filesId = [],
  allFiles,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  // download all or selected files
  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const { selectedRows = [], selectedFileIds = [] } = context;
  const noSelectedRows = useMemo(() => selectedRows.length === 0, [selectedRows]);
  const cartIsEmpty = useMemo(() => filesId.length === 0, [filesId]);
  const [manifest, setManifest] = useState('');

  useQuery(CREATE_MANIFEST, {
    variables: { uuid: allFiles ? filesId : selectedFileIds},
    skip: allFiles ? !filesId : !selectedFileIds,
    onCompleted: ({ createManifest}) => {
        setManifest(createManifest);
    }
  })

  const {data}= useQuery(STORE_MANIFEST_QUERY, {
    variables: {
        manifest
    },
    skip: !manifest,
    context: { clientName: 'interopService' },
    fetchPolicy: 'no-cache',
})

  const sbgUrl = useMemo(() => defaultTo(data?.storeManifest, ""), [data]);

  

  const isDropDownDisabled = useMemo(() => {
    switch (allFiles) {
        case true:
            return cartIsEmpty
        case false:
            return noSelectedRows
    }
  }, [allFiles, filesId, noSelectedRows])

  const dropDownTooltipTitle = useMemo(() => {
    switch (allFiles) {
        case true:
            return cartIsEmpty 
            ? emptyCartTooltipContent
            : ""
            break;
        case false:
            return cartIsEmpty 
            ? emptyCartTooltipContent
            : noSelectedRows 
            ? noSelectedRowsTooltipContent
            : ""
    }
  }, [allFiles, noSelectedRows, cartIsEmpty])

  const exportToCGCTooltipTitle = useMemo(() => {
    switch (allFiles) {
        case true:
            switch (cartIsEmpty) {
                case true:
                   return <>Files in the cart can be easily exported into the<a
                   style={{ color: '#165F83' }}
                   target="_blank"
                   rel="noreferrer"
                   href="https://www.cancergenomicscloud.org/"
                 >
                   <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                   {" Cancer Genomics Cloud."}
                   <img className={classes.linkIcon} src={linkIcon} alt="linkIcon" />
                   </span>
                 </a></> 
                case false:
                    return ""
                default:
                    break;
            }
            break;
    
        case false:
            switch (noSelectedRows) {
                case true:
                   return <>Files in the cart can be easily exported into the<a
                   style={{ color: '#165F83' }}
                   target="_blank"
                   rel="noreferrer"
                   href="https://www.cancergenomicscloud.org/"
                 >
                   <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                   {" Cancer Genomics Cloud."}
                   <img className={classes.linkIcon} src={linkIcon} alt="linkIcon" />
                   </span>
                 </a></> 
                case false:
                    return ""
                default:
                    break;
            }
            break;
    }
    
  }, [cartIsEmpty, noSelectedRows, allFiles])

  const downloadFileManifestTooltipTitle = useMemo(() => {
    switch (allFiles) {
        case true:
            switch (cartIsEmpty) {
                case true:
                   return <>Files in the cart can be downloaded as a file manifest with <a
                   style={{ color: '#165F83' }}
                   target="_blank"
                   rel="noreferrer"
                   href="https://www.ga4gh.org/product/data-repository-service-drs/"
                 >
                   <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                   {"DRS"}
                   <img className={classes.linkIcon} src={linkIcon} alt="linkIcon" />
                   </span>
                 </a> identifiers and other useful metadata.</> 
                case false:
                    return ""
                default:
                    break;
            }
            break;
    
        case false:
            switch (noSelectedRows) {
                case true:
                   return <>Files in the cart can be downloaded as a file manifest with <a
                   style={{ color: '#165F83' }}
                   target="_blank"
                   rel="noreferrer"
                   href="https://www.ga4gh.org/product/data-repository-service-drs/"
                 >
                   <span style={{ textDecoration: 'underline', margin: 0, padding: 0 }}>
                   {"DRS"}
                   <img className={classes.linkIcon} src={linkIcon} alt="linkIcon" />
                   </span>
                 </a> identifiers and other useful metadata.</> 
                case false:
                    return ""
                default:
                    break;
            }
            break;
    }
    
  }, [cartIsEmpty, noSelectedRows, allFiles]) 

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

  const [label] = useState(LABEL);
  const [content, setContent] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [downloadFileManifestDialogOpen, setDownloadFileManifestDialogOpen] = React.useState(false);

  useEffect(() => {
    getReadMe(setContent, env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const initiateDownload = async (currLabel) => {
    switch (currLabel) {
      case EXPORT_TO_CANCER_GENOMICS_CLOUD: {
        if (sbgUrl) {
            window.open(`https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=${encodeURIComponent(sbgUrl)}`, '_blank');
        }
        break;
      }
      case DOWNLOAD_FILE_MANIFEST: {
        downloadCsvString(manifest, myFilesPageData.manifestFileName)
        break;
      }
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
            title={exportToCGCTooltipTitle}
            placement="right"
          >
          <span style={{ cursor: isDropDownDisabled && 'not-allowed'}} onClick={() => {
            if (isDropDownDisabled) {
               return noop()
            };

            initiateDownload(EXPORT_TO_CANCER_GENOMICS_CLOUD);
            setOpen(false);
            }}
          >
            <span className={classes.cgcLabal}>{EXPORT_TO_CANCER_GENOMICS_CLOUD}</span>
            <img className={classes.cgcIcon} src={cgcIcon} alt="icon" />
          </span>
          </Tooltip>
        </MenuItem>
        <MenuItem style={{ cursor: isDropDownDisabled && 'not-allowed'}} className="downloadManifestBtn">
          <Tooltip
            arrow
            interactive
            maxWidth={250}
            title={downloadFileManifestTooltipTitle}
            placement="right"
          >
            <span onClick={() => {
                if(isDropDownDisabled) {
                    return noop()
                }
                initiateDownload(DOWNLOAD_FILE_MANIFEST)
            }}>
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
          title={dropDownTooltipTitle}
        >
          <div>
            <Button
              // disabled={isDropDownDisabled}
              classes={{
                root: clsx({
                  [classes.availableDownloadDropdownBtnIsOpen]: open,
                  [classes.availableDownloadDropdownBtn]: !open,
                  [classes.disableDropDownBtn]: isDropDownDisabled
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

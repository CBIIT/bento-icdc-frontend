import React, { useEffect, useState, useContext, useMemo } from 'react';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useQuery } from '@apollo/client';
import { noop } from 'lodash';
import axios from 'axios';
import { TableContext, ToolTip as Tooltip } from '../../../../bento-core';
import cgcIcon from '../../assets/cgc.svg';
import linkIcon from '../../assets/linkIcon.svg';
import arrowDownPng from '../../assets/arrowDown.png';
import arrowUpPng from '../../assets/arrowUp.png';
import { defaultTo } from 'lodash';
import {
  CreateManifestDocument,
  CreateManifestQuery,
  CreateManifestQueryVariables,
  GetStoreManifestDataQueryDocument,
  GetStoreManifestDataQueryQuery,
  GetStoreManifestDataQueryQueryVariables,
} from '../../../../generated-types/graphql';
import { myFilesPageData } from '../../../../bento/fileCentricCartWorkflowData';
import DownloadFileManifestDialog from './downloadFileManifestDialog';
import { downloadCsvString } from '../../utils';
import env from '../../../../utils/env';
import * as Styled from './DropDown.styled';

const LABEL = 'Export and Download';

const { EXPORT_TO_CANCER_GENOMICS_CLOUD, DOWNLOAD_FILE_MANIFEST } = {
  EXPORT_TO_CANCER_GENOMICS_CLOUD: 'Export to Cancer Genomics Cloud',
  DOWNLOAD_FILE_MANIFEST: 'Download File Manifest',
};

const OPTIONS = [EXPORT_TO_CANCER_GENOMICS_CLOUD];

const getReadMe = async (
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>,
  url: string
) => {
  const { data } = await axios.get<string>(url);
  setContent(data);
};

const emptyCartTooltipContent = 'Add some files to the cart to get started.';
const noSelectedRowsTooltipContent =
  'Select at least one file from the table below.';

interface DropDownViewProps {
  filesId?: string[];
  allFiles: boolean;
}

const DropDownView: React.FC<DropDownViewProps> = ({
  filesId = [],
  allFiles,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // download all or selected files
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const { selectedRows = [], selectedFileIds = [] } = context as {
    selectedRows: unknown[];
    selectedFileIds: string[];
  };
  const noSelectedRows = useMemo(
    () => selectedRows.length === 0,
    [selectedRows]
  );
  const cartIsEmpty = useMemo(() => filesId.length === 0, [filesId]);
  const [manifest, setManifest] = useState('');

  useQuery<CreateManifestQuery, CreateManifestQueryVariables>(
    CreateManifestDocument,
    {
      variables: {
        uuid: allFiles ? filesId : selectedFileIds,
        first: allFiles ? filesId.length : selectedFileIds.length,
      },
      skip: allFiles ? !filesId : !selectedFileIds,
      onCompleted: ({ createManifest }) => {
        setManifest(createManifest || '');
      },
    }
  );

  const { data } = useQuery<
    GetStoreManifestDataQueryQuery,
    GetStoreManifestDataQueryQueryVariables
  >(GetStoreManifestDataQueryDocument, {
    variables: {
      manifest,
    },
    skip: !manifest,
    context: { clientName: 'interopService' },
    fetchPolicy: 'no-cache',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sbgUrl = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => defaultTo(data?.storeManifest, ''),
    [data]
  );

  const isDropDownDisabled = useMemo(() => {
    switch (allFiles) {
      case true:
        return cartIsEmpty;
      case false:
        return noSelectedRows;
    }
  }, [allFiles, filesId, noSelectedRows]);

  const dropDownTooltipTitle = useMemo(() => {
    switch (allFiles) {
      case true:
        return cartIsEmpty ? emptyCartTooltipContent : '';
      case false:
        return cartIsEmpty
          ? emptyCartTooltipContent
          : noSelectedRows
            ? noSelectedRowsTooltipContent
            : '';
    }
  }, [allFiles, noSelectedRows, cartIsEmpty]);

  const exportToCGCTooltipTitle = useMemo(() => {
    switch (allFiles) {
      case true:
        switch (cartIsEmpty) {
          case true:
            return (
              <>
                Files in the cart can be easily exported into the
                <Styled.CancerGenomicsCloudLink
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.cancergenomicscloud.org/"
                >
                  <Styled.CancerGenomicsCloudLinkText>
                    {' Cancer Genomics Cloud.'}
                    <Styled.CancerGenomicsCloudLinkIcon
                      src={linkIcon}
                      alt="linkIcon"
                    />
                  </Styled.CancerGenomicsCloudLinkText>
                </Styled.CancerGenomicsCloudLink>
              </>
            );
          case false:
            return '';
          default:
            break;
        }
        break;

      case false:
        switch (noSelectedRows) {
          case true:
            return (
              <>
                Files in the cart can be easily exported into the
                <Styled.CancerGenomicsCloudLink
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.cancergenomicscloud.org/"
                >
                  <Styled.CancerGenomicsCloudLinkText>
                    {' Cancer Genomics Cloud.'}
                    <Styled.CancerGenomicsCloudLinkIcon
                      src={linkIcon}
                      alt="linkIcon"
                    />
                  </Styled.CancerGenomicsCloudLinkText>
                </Styled.CancerGenomicsCloudLink>
              </>
            );
          case false:
            return '';
          default:
            break;
        }
        break;
    }
  }, [cartIsEmpty, noSelectedRows, allFiles]);

  const downloadFileManifestTooltipTitle = useMemo(() => {
    switch (allFiles) {
      case true:
        switch (cartIsEmpty) {
          case true:
            return (
              <>
                Files in the cart can be downloaded as a file manifest with{' '}
                <Styled.DownloadFileManifestLink
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.ga4gh.org/product/data-repository-service-drs/"
                >
                  <Styled.DownloadFileManifestLinkText>
                    {'DRS'}
                    <Styled.DownloadFileManifestLinkIcon
                      src={linkIcon}
                      alt="linkIcon"
                    />
                  </Styled.DownloadFileManifestLinkText>
                </Styled.DownloadFileManifestLink>{' '}
                identifiers and other useful metadata.
              </>
            );
          case false:
            return '';
          default:
            break;
        }
        break;

      case false:
        switch (noSelectedRows) {
          case true:
            return (
              <>
                Files in the cart can be downloaded as a file manifest with{' '}
                <Styled.DownloadFileManifestLink
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.ga4gh.org/product/data-repository-service-drs/"
                >
                  <Styled.DownloadFileManifestLinkText>
                    {'DRS'}
                    <Styled.DownloadFileManifestLinkIcon
                      src={linkIcon}
                      alt="linkIcon"
                    />
                  </Styled.DownloadFileManifestLinkText>
                </Styled.DownloadFileManifestLink>{' '}
                identifiers and other useful metadata.
              </>
            );
          case false:
            return '';
          default:
            break;
        }
        break;
    }
  }, [cartIsEmpty, noSelectedRows, allFiles]);

  // close dropdown if allFile is false and any row is not selected
  useEffect(() => {
    setOpen(false);
  }, [selectedRows]);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const dropDownIcon = open ? (
    <img src={arrowUpPng} alt="arrow up icon" />
  ) : (
    <img src={arrowDownPng} alt="arrow down icon" />
  );

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [label] = useState<string>(LABEL);
  // TODO: Is this useState necessary
  const [_content, setContent] = useState<string | undefined>(undefined);
  const [downloadFileManifestDialogOpen, setDownloadFileManifestDialogOpen] =
    React.useState(false);

  useEffect(() => {
    //TODO: investigate this env usage
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    void getReadMe(setContent, env.REACT_APP_FILE_CENTRIC_CART_README);
  }, []);

  const initiateDownload = (currLabel: string) => {
    switch (currLabel) {
      case EXPORT_TO_CANCER_GENOMICS_CLOUD: {
        if (sbgUrl) {
          window.open(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            `https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=${encodeURIComponent(sbgUrl)}`,
            '_blank'
          );
        }
        break;
      }
      case DOWNLOAD_FILE_MANIFEST: {
        downloadCsvString(manifest, myFilesPageData.manifestFileName);
        break;
      }
      default:
        noop(data);
        break;
    }
    noop();
  };

  /*const handleDownloadFileManifestDialogOpen = () => {
    setDownloadFileManifestDialogOpen(true);
  };*/

  const handleDownloadFileManifestDialogClose = () => {
    setDownloadFileManifestDialogOpen(false);
  };

  const getMenuItem = (_type: string) => {
    /*let icon;
    switch (type) {
      case EXPORT_TO_CANCER_GENOMICS_CLOUD:
        icon = cgcIcon;
        break;
      default:
        // TODO: investigate this component
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        icon = undefined;
        break;
    }*/
    return (
      <>
        <Styled.MenuItem isDropDownDisabled={isDropDownDisabled}>
          <Tooltip
            arrow
            interactive
            title={exportToCGCTooltipTitle}
            placement="right"
          >
            <Styled.CancerGenomicsCloudButton
              onClick={() => {
                if (isDropDownDisabled) {
                  return noop();
                }
                initiateDownload(EXPORT_TO_CANCER_GENOMICS_CLOUD);
                setOpen(false);
              }}
            >
              <Styled.CancerGenomicsCloudButtonLabel>
                {EXPORT_TO_CANCER_GENOMICS_CLOUD}
              </Styled.CancerGenomicsCloudButtonLabel>
              <Styled.CancerGenomicsCloudButtonIcon src={cgcIcon} alt="icon" />
            </Styled.CancerGenomicsCloudButton>
          </Tooltip>
        </Styled.MenuItem>
        <Styled.MenuItem isDropDownDisabled={isDropDownDisabled}>
          <Tooltip
            arrow
            interactive
            maxWidth={250}
            title={downloadFileManifestTooltipTitle}
            placement="right"
          >
            <Styled.DownloadFileManifestButton
              onClick={() => {
                if (isDropDownDisabled) {
                  return noop();
                }
                initiateDownload(DOWNLOAD_FILE_MANIFEST);
              }}
            >
              <Styled.DownloadFileManifestButtonLabel>
                Download File Manifest
              </Styled.DownloadFileManifestButtonLabel>
              <Styled.DownloadFileManifestButtonIcon
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_title_bar_download_icon.svg"
                alt="icon"
              />
            </Styled.DownloadFileManifestButton>
          </Tooltip>
        </Styled.MenuItem>
      </>
    );
  };

  const options = OPTIONS.map(item => getMenuItem(item));

  return (
    <>
      <Styled.DropDownMenuContainer>
        <Tooltip
          arrow
          maxWidth={200}
          placement="left"
          title={dropDownTooltipTitle}
        >
          <Styled.DisplayLinksDropDownButton
            open={open}
            isDropDownDisabled={isDropDownDisabled}
            endIcon={dropDownIcon}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {label}
          </Styled.DisplayLinksDropDownButton>
        </Tooltip>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{
            zIndex: '1000',
          }}
        >
          {({ TransitionProps, placement }) => (
            <Styled.MuiStyledGrow placement={placement} {...TransitionProps}>
              <Styled.MuiStyledPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Styled.DropDownMenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {options}
                  </Styled.DropDownMenuList>
                </ClickAwayListener>
              </Styled.MuiStyledPaper>
            </Styled.MuiStyledGrow>
          )}
        </Popper>
      </Styled.DropDownMenuContainer>
      <DownloadFileManifestDialog
        onClose={handleDownloadFileManifestDialogClose}
        open={downloadFileManifestDialogOpen}
        filesId={filesId}
        allFiles={allFiles}
      />
    </>
  );
};

export default DropDownView;

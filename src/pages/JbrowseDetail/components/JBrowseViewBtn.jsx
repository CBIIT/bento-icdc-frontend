import React from 'react';
import { useSelector } from 'react-redux';
import { ToolTip as Tooltip } from '../../../bento-core';
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
import * as Styled from './JBrowseBtn.styled';

const ViewJBrowseButton = ({ disable, selectedFileNames }) => {
  const selectedDashFiles = useSelector(state =>
    state.dashboardTab &&
    state.dashboardTab.dataFileSelected &&
    state.dashboardTab.dataFileSelected.selectedRowInfo
      ? state.dashboardTab.dataFileSelected.selectedRowInfo
      : null
  );

  const filesName =
    selectedFileNames && selectedFileNames.length >= 0
      ? selectedFileNames
      : selectedDashFiles;
  const distinctFiles = setSelectedFiles(filesName);

  const viewFilesOnJBrowse = () => {
    setJborwseSelectedFiles(distinctFiles);
  };
  const isInactive = distinctFiles.length === 0;
  const isInvlaid = isInactive || distinctFiles.length > MAX_NUMBER_OF_FILES;

  const InValidToottipMsg = () => (
    <>
      <Styled.WarningLabel>{'Warning: '}</Styled.WarningLabel>
      <span>{tooltipErrMsg}</span>
    </>
  );

  const renderTooltipContent = () => (
    <>
      <Styled.TooltipContent align="center" color="inherit">
        {isInactive || disable ? (
          tooltipMsg1
        ) : isInvlaid ? (
          <InValidToottipMsg />
        ) : (
          tooltipMsg2
        )}
      </Styled.TooltipContent>
    </>
  );
  return (
    <>
      <Styled.JBrowsePageLink
        isInvlaid={isInvlaid}
        disable={disable}
        to={{
          pathname: `/jBrowse/${MULTI_FILES_VIEW}`,
        }}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Styled.JBrowseButton
          type="button"
          onClick={viewFilesOnJBrowse}
          disabled={disable}
          isInvlaid={isInvlaid}
          id={JBROWSE_BTN_ID}
          disableRipple={DISABLE_RIPPLE}
        >
          {ButtonText1}
          <Styled.JBrowseIcon
            src={isInvlaid || disable ? jbrowseIconSrc : jbrowseLogo}
            alt="jbrowse_icon"
          />
          {ButtonText2}
        </Styled.JBrowseButton>
      </Styled.JBrowsePageLink>
      <Tooltip
        title={renderTooltipContent()}
        placement="right"
        maxWidth={230}
        arrow
      >
        <Styled.HelpIconButton id={JBROWSE_HELP_ICON_BTN}>
          <Styled.HelpIconImg
            src={tooltipContent.src}
            alt={tooltipContent.alt}
            id={JBROWSE_TOOLTIP_ICON_ID}
          />
        </Styled.HelpIconButton>
      </Tooltip>
    </>
  );
};

export default ViewJBrowseButton;

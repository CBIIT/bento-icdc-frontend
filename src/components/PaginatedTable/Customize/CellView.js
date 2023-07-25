import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '../../../bento-core';
import DocumentDownload from '../../DocumentDownload/DocumentDownloadView';
import { hasMultiStudyParticipants } from '../../../utils/columnsUtil';
import MultiStudyTooltip from '../../../pages/dashboardTab/components/multiStudyTooltip';
import { customizeColumn, customizeHeader, customizeLandScapeView } from './Types';
import DataAvailabilityCellView from './DataAvailability/TableCell';
import DataAvailabilityHeader from './DataAvailability/HeaderCell';
import NumberOfCasesView from './NumberOfCases';
import StudyLink from './StudyLink';

const CaseIdLink = (props) => {
  const {
    other_cases: otherCases,
    linkAttr = {},
    case_id: caseId,
    unifiedView,
  } = props;
  const { rootPath, pathParams } = linkAttr;
  const url = pathParams.map((attr) => `#${rootPath}/`.concat(props[attr]));
  return (
    <div style={{ display: 'flex' }}>
      <Link href={url} className={cellTypes.LINK}>
        <Typography>
          {caseId}
        </Typography>
      </Link>
      {
        ((!unifiedView) && hasMultiStudyParticipants(otherCases))
        && (
          <>
            <MultiStudyTooltip
              tableMeta={otherCases}
              value={caseId}
            />
          </>
        )
      }
    </div>
  );
};

const DocumentDownloadView = ({
  file_size: fileSize,
  file_format: fileFormat,
  file_name: caseId,
  file_uuid: fileLocation,
  documentDownloadProps,
  ...props
}) => (
  <DocumentDownload
    fileSize={fileSize}
    fileFormat={fileFormat}
    caseId={caseId}
    {...documentDownloadProps}
    fileLocation={props[documentDownloadProps.fileLocation]
      ? props[documentDownloadProps.fileLocation]
      : fileLocation}
  />
);

export const CustomCellView = (props) => {
  const { dataField } = props;
  switch (dataField) {
    case customizeColumn.DOCUMENT_DOWNLOAD:
      return (
        <DocumentDownloadView {...props} />
      );
    case customizeColumn.MULTI_STUDY_PARTICIPATION:
      return (
        <CaseIdLink {...props} />
      );
    case customizeColumn.numberOfCases:
      return (
        <NumberOfCasesView {...props} />
      );
    case customizeColumn.studyDesignation:
      return (
        <StudyLink {...props} />
      );
    case customizeLandScapeView.CASE_FILES:
    case customizeLandScapeView.STUDY_FILES:
    case customizeLandScapeView.IMAGE:
    case customizeLandScapeView.CRDCLinks:
    case customizeLandScapeView.PUBLICATTION:
      return (
        <DataAvailabilityCellView {...props} />
      );
    default:
      return (<></>);
  }
};

export const CustomHeaderCellView = (props) => {
  const { dataField, icon } = props;
  switch (dataField) {
    case customizeHeader.CASE_FILES:
    case customizeHeader.STUDY_FILES:
    case customizeHeader.IMAGE:
    case customizeHeader.CRDCLinks:
    case customizeHeader.PUBLICATTION:
      return (
        <DataAvailabilityHeader icon={icon} dataField={dataField} />
      );
    default:
      return (<></>);
  }
};

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const CustomizeCellView = ({
  columns,
  unifiedView = false,
  interOpData,
}) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  // const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...columns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => (
          <CustomCellView
            {...props}
            unifiedView={unifiedView}
            interOpData={interOpData}
          />
        ),
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};

import React from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core';
import { cellTypes, headerTypes } from '../../../bento-core';
import DocumentDownload from '../../DocumentDownload/DocumentDownloadView';
import { hasMultiStudyParticipants } from '../../../utils/columnsUtil';
import MultiStudyTooltip from './components/multiStudyTooltip';
import { customizeColumn, customizeHeader, customizeLandScapeView } from './Types';
import DataAvailabilityCellView from './DataAvailability/TableCell';
import DataAvailabilityHeader from './DataAvailability/HeaderCell';
import NumberOfCasesView from './components/NumberOfCases';
import StudyLink from './components/StudyLink';
import CustomHeaderRemover from './components/CustomHeaderRemover';

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
  const {
    dataField,
    icon,
    openDialogBox,
    cellType,
  } = props;
  switch (dataField || cellType) {
    case customizeHeader.CASE_FILES:
    case customizeHeader.STUDY_FILES:
    case customizeHeader.IMAGE:
    case customizeHeader.CRDCLinks:
    case customizeHeader.PUBLICATTION:
      return (
        <DataAvailabilityHeader icon={icon} dataField={dataField} />
      );
    case customizeHeader.DELETE:
      return (
        <CustomHeaderRemover openDialogBox={openDialogBox} />
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
  deleteCartFile,
  deleteAllFiles,
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
    if (column.cellType === cellTypes.DELETE) {
      return {
        ...column,
        cellEventHandler: deleteCartFile,
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
    if (column.headerType === headerTypes.DELETE) {
      return {
        ...column,
        headerEventHandler: deleteAllFiles,
        customColHeaderRender: (toggleDisplay) => (
          <CustomHeaderCellView openDialogBox={toggleDisplay} {...column} />
        ),
      };
    }
    /*
    * props deleteAllFiles
    */
    if (column.headerType === headerTypes.DELETE) {
      return {
        ...column,
        headerEventHandler: deleteAllFiles,
      };
    }
    return column;
  });
  return displayCustomHeader;
};

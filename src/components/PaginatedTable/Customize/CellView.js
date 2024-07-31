import React from 'react';
import {
  Link,
  Typography,
  styled,
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
import DeleteButton from './components/DeleteButton';
import DataValue from './components/DataValue';
import CsvDownload from './components/CsvDownload';
import { defaultTo } from 'lodash';

const ClinicalDataNodeWrapper = styled('span')({
    fontFamily: 'Open Sans',
    fontSize: '15px',
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '0em',
    textTransform: 'uppercase',
})

const ClinicalDataDescriptionWrapper = styled('span')({
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '20px',
    letterSpacing: '0em',
})

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

const ArmsCohortList = (props) => {
  const { dataField } = props;
  const value = props[dataField];
  return value
    .split('#').map((desc) => (desc === '' ? ''
      : <li style={{ listStyleType: 'none' }}>{desc}</li>));
};

const ArmView = (props) => {
  const { groupIndex } = props;
  return (
    <>
      {
        (groupIndex === 0)
          && (<span> {props.arm} </span>)
      }
    </>
  )
}

const ArmDescView = (props) => {
  const { groupIndex } = props;
  return (
    <>
      {
        (groupIndex === 0)
          && (<span> {props.armDescription} </span>)
      }
    </>
  )
}

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
  const { dataField, clinicalDataDescription, clinicalDataNode, caseCount, csvDataRow } = props;
  const hasNoValues = caseCount === " " && defaultTo(csvDataRow, []).length === 0;

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
    case customizeColumn.Description:
    case customizeColumn.Arm:
      return (
        <ArmView {...props} />
      );
    case customizeColumn.ArmDescription:
      return (
        <ArmDescView {...props} />
      );
    case customizeColumn.Cohort:
      return (
        <ArmsCohortList {...props} />
      );
    case customizeLandScapeView.CASE_FILES:
    case customizeLandScapeView.STUDY_FILES:
    case customizeLandScapeView.IMAGE:
    case customizeLandScapeView.CRDCLinks:
    case customizeLandScapeView.PUBLICATTION:
      return (
        <DataAvailabilityCellView {...props} />
      );
    case customizeColumn.DataValue:
      return (
        <DataValue {...props} />
      );
    case customizeColumn.csvDataRow:
      return (
        <CsvDownload {...props} />
      );
    case customizeColumn.clinicalDataNode: 
      return <ClinicalDataNodeWrapper style={{ color: hasNoValues ? '#A1A1A1' : '#0296C9' }}>{clinicalDataNode}</ClinicalDataNodeWrapper>
    case customizeColumn.clinicalDataDescription:
        return <ClinicalDataDescriptionWrapper style={{ color: hasNoValues ? '#A1A1A1' : '#0B3556' }}>{clinicalDataDescription}</ClinicalDataDescriptionWrapper>
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
        customCellRender: (row, onDeleteRow) => (
          <>
            <DeleteButton
              row={row}
              onDeleteRow={onDeleteRow}
              deleteCartFile={deleteCartFile}
            />
          </>
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

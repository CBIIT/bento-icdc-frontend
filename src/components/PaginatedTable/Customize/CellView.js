import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '../../../bento-core';
import DocumentDownload from '../../DocumentDownload/DocumentDownloadView';
import { hasMultiStudyParticipants } from '../../../utils/columnsUtil';
import MultiStudyTooltip from '../../../pages/dashboardTab/components/multiStudyTooltip';
import { customizeColumn } from './Types';

const CaseIdLink = (props) => {
  const {
    other_cases: otherCases,
    linkAttr = {},
    case_id: caseId,
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
        (hasMultiStudyParticipants(otherCases))
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
}) => (
  <DocumentDownload
    fileSize={fileSize}
    fileFormat={fileFormat}
    caseId={caseId}
    fileLocation={fileLocation}
    {...documentDownloadProps}
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
    default:
      return (<></>);
  }
};

export const CustomHeaderCellView = () => (<></>);

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const CustomizeCellView = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  // const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...columns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
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

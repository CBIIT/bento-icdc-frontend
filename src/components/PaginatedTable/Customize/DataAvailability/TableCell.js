/**
*
*/
import React from 'react';
import { withStyles, Tooltip } from '@material-ui/core';
import { FiberManualRecordRounded } from '@material-ui/icons';
import Styles from './CellStyle';
import CustomThemeProvider from './CustomTheme';

export function studyDisposition(value) {
  const embargo = 'under embargo';
  const pending = 'pending';
  if (value.toString().toLowerCase() === embargo) {
    return 'embargo';
  }
  if (value.toString().toLowerCase() === pending) {
    return 'pending';
  }
  return undefined;
}

const DataAvailabilityCellView = (props) => {
  const {
    classes,
    column,
    interOpData,
    clinical_study_designation: studyDesignation,
    dataField,
    numberOfCaseFiles = 0,
    numberOfStudyFiles = 0,
    numberOfPublications = 0,
    // header,
  } = props;
  const generateCRDCLinks = (linksArray, clinicalStudyDesignation) => (
    <ul className={classes.crdcLinks}>
      {linksArray.map((link) => (
        <li>
          {
            link.url.toLowerCase() !== 'api failed' ? (
              <a className={classes.crdcLinkStyle} target="_blank" rel="noreferrer" href={link.url}>
                {`${link.repository} | ICDC-${clinicalStudyDesignation}`}
                <img
                  style={{
                    width: '1.5em',
                  }}
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/ExternalLink.svg"
                  alt="external link icon"
                />
              </a>
            ) : (
              <div className={classes.crdcApiFailed}>
                {`${link.repository} | ${link.url}`}
              </div>
            )
          }
        </li>
      ))}
    </ul>
  );
  const studyData = interOpData?.studiesByProgram;
  const generateIndicatorTooltipTitle = () => {
    switch (dataField) {
      case 'numberOfCaseFiles':
        return `${numberOfCaseFiles} Case File(s)`;
      case 'numberOfStudyFiles':
        return `${numberOfStudyFiles} Study File(s)`;
      case 'numberOfImageCollections':
        return `${studyData.length && studyData[0].numberOfImageCollections} Image Collection(s)`;
      case 'numberOfPublications':
        return `${numberOfPublications} Publication(s)`;
      default: {
        return studyData.length
        && generateCRDCLinks(
          studyData[0].CRDCLinks, studyData[0].clinical_study_designation,
        );
      }
    }
  };

  const value = props[dataField];
  const currentStudyData = interOpData?.studiesByProgram
    .filter((study) => study.clinical_study_designation === studyDesignation);
  let flag;
  if (dataField === 'CRDCLinks' && currentStudyData?.[0]?.CRDCLinks.length) {
    flag = true;
  } else {
    flag = Array.isArray(value) ? value.length > 0 : value > 0;
  }
  const title = generateIndicatorTooltipTitle(column, value, currentStudyData);
  return (
    <CustomThemeProvider>
      {
      flag && (
      <div className={classes.dataAvailIndicator}>
        <Tooltip
          classes={{
            tooltip: dataField === 'CRDCLinks'
              ? classes.externalLinkDalTooltip : classes.defaultDalTooltip,
          }}
          title={title}
          interactive={dataField === 'CRDCLinks'}
        >
          <FiberManualRecordRounded className={classes.dataAvailIndicatorIcon} />
        </Tooltip>
      </div>
      )
    }
    </CustomThemeProvider>
  );
};

export default withStyles(Styles)(DataAvailabilityCellView);

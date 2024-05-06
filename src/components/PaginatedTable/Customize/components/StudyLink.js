import React from 'react';
import {
  withStyles,
  Link,
  Typography,
} from '@material-ui/core';
import { studyDisposition } from '../DataAvailability/TableCell';
import { getStudyIcon } from './NumberOfCases';
import { cellTypes } from '../../../../bento-core';

const StudyLink = (props) => {
  const {
    classes,
    clinical_study_designation: studyDesignation,
    study_disposition: studyDispositionValue,
    linkAttr,
  } = props;
  const { rootPath, pathParams } = linkAttr;
  const url = pathParams.map((attr) => `#${rootPath}/`.concat(props[attr]));
  const StudyIcon = getStudyIcon(classes, studyDisposition(studyDispositionValue));
  return (
    <>
      <Link href={url} className={cellTypes.LINK}>
        <Typography className={classes.studyLink}>
          {studyDesignation}
        </Typography>
      </Link>
      {
        (StudyIcon) && (
          <>
            { StudyIcon }
          </>
        )
      }
    </>
  );
};

const styles = () => ({
  studyLink: {
    float: 'left',
    marginRight: '5px',
  },
  embargoFileIcon: {
    width: '20px',
  },
  embargoToolTip: {
    visibility: 'hidden',
    fontWeight: '500',
    zIndex: '400',
    background: '#fff',
    border: '2px solid #A61401',
    borderRadius: '7px',
    fontSize: '12px',
    width: '110px',
    padding: '5px 0px 0px 2px',
    marginTop: '-30px',
    marginLeft: '-100px',
  },
  buttonCaseNumb: {
    background: 'none',
    border: 'none',
    padding: '0',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: '15px',
    lineSpacing: '19pt',
    color: '#DC762F',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles)(StudyLink);

import React from 'react';
import {
  Tooltip,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { studyDisposition } from '../DataAvailability/TableCell';
import { navigatedToDashboard } from '../../../../utils/utils';
import { pageData } from '../../../../bento/programDetailData';
import pendingFileIcon from '../../../../assets/icons/PendingRelease-icons.StudiesDetail-Box.svg';
import useDashboardTabs from '../../../../pages/dashboard/components/dashboard-tabs-store';

export const getStudyIcon = (classes, param) => {
  const embargoToolTipIcon = () => (
    <Tooltip title="Under Embargo" arrow placement="bottom">
      <img src={pageData.embargoFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </Tooltip>
  );

  const pendingToolTipIcon = () => (
    <Tooltip title="Release Pending" arrow placement="bottom">
      <img src={pendingFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </Tooltip>
  );

  /**
  * Conditionally returns a tooltip based on study disposition.
  * @param {String} param
  * @return {function}
  */
  switch (param) {
    case 'embargo':
      return embargoToolTipIcon();
    case 'pending':
      return pendingToolTipIcon();
    default:
      return false;
  }
};

const NumberOfCasesView = ({
  classes,
  clinical_study_designation: studyDesignation,
  numberOfCases,
  study_disposition: studyDispositionValue,
  accession_id: accessionId,
}) => {
  const StudyIcon = getStudyIcon(classes, studyDisposition(studyDispositionValue));
  const [, actions] = useDashboardTabs();
  return (
    <>
      {
        (StudyIcon) ? (
          <>
            { StudyIcon }
          </>
        )
          : (
            <Link
              to={(location) => ({ ...location, pathname: '/explore' })}
              className={classes.buttonCaseNumb}
              onClick={() => {
                actions.changeCurrentTab(0);
                navigatedToDashboard(`${studyDesignation} (${accessionId})`, 'Cases');
              }}
            >
              {numberOfCases}
            </Link>
          )
      }
    </>
  );
};

const styles = () => ({
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

export default withStyles(styles)(NumberOfCasesView);

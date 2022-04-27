import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  cn,
} from 'bento-components';
import Snackbar from '../../components/Snackbar';
import StatsView from '../../components/Stats/StatsView';
import { fetchDataForDashboardTabDataTable } from '../dashboardTab/store/dashboardReducer';
import {
  studyDisposition,
} from './utils';
import { navigatedToDashboard } from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  headerIcon,
  embargoHeaderIcon,
  embargoFileIcon,
  tab,
} from '../../bento/studyDetailsData';
import Tab from '../../components/Tab/Tab';
import Overview from './views/overview/Overview';
import Publication from './views/Publication';
import ArmsAndCohort from './views/cohort/ArmsAndCohort';
import StudyFiles from './views/StudyFiles';
import TabPanel from '../../components/Tab/TabPanel';
import pendingHeaderIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Main.svg';
import pendingFileIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Box.svg';
import Styles from './studyDetailsStyle';
import StudyThemeProvider from './studyDetailsThemeConfig';

const StudyDetailView = ({ classes, data }) => {
  const studyData = data.study[0];
  const diagnoses = [...new Set(studyData.cases.reduce((output, caseData) => output.concat(caseData.diagnoses ? caseData.diagnoses.map((diagnosis) => (diagnosis.disease_term ? diagnosis.disease_term : '')) : []), []))];
  const studyFileTypes = [...new Set(data.studyFiles.map((f) => (f.file_type)))];
  const caseFileTypes = [...new Set(data.filesOfStudy.map((f) => (f.file_type))
    .filter((f) => !studyFileTypes.includes(f)))];
  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfStudyFiles: data.fileCountOfStudyFiles,
    numberOfPrograms: data.programCountOfStudy,
    numberOfAliquots: data.aliquotCountOfStudy ? data.aliquotCountOfStudy : 0,
    volumeOfData: data.volumeOfDataOfStudy,
  };

  React.useEffect(() => {
    fetchDataForDashboardTabDataTable();
  }, []);

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: studyData.program.program_acronym,
    to: '',
    isALink: false,
  }];

  const [snackbarState, setsnackbarState] = React.useState({
    open: false,
    value: 0,
  });

  function openSnack(value) {
    setsnackbarState({ open: true, value, action: 'added' });
  }

  function closeSnack() {
    setsnackbarState({ open: false });
  }

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const renderEmbargoHeaderIcon = () => (
    <img
      src={embargoHeaderIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderPendingHeaderIcon = () => (
    <img
      src={pendingHeaderIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderDefaultHeaderIcon = () => (
    <img
      src={headerIcon}
      alt="ICDC case detail header logo"
    />
  );

  const renderEmbargoLabel = () => (
    <div className={classes.embargo}>
      <p className={classes.embarLabel}> UNDER EMBARGO </p>
      <img src={embargoFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </div>
  );

  const renderPendingLabel = () => (
    <div className={classes.pending}>
      <p className={classes.pendLabel}>RELEASE PENDING</p>
      <img src={pendingFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
    </div>
  );

  const renderSwitch = (param, embargoFunction, pendingFunction) => {
    switch (param) {
      case 'embargo':
        return embargoFunction;
      case 'pending':
        return pendingFunction;
      default:
        return undefined;
    }
  };

  const getHeaderIcon = renderSwitch(
    studyDisposition(studyData.study_disposition), renderEmbargoHeaderIcon, renderPendingHeaderIcon,
  ) ? (
      renderSwitch(
        studyDisposition(
          studyData.study_disposition,
        ), renderEmbargoHeaderIcon, renderPendingHeaderIcon,
      )
    ) : (
      renderDefaultHeaderIcon
    );

  const getLabel = renderSwitch(
    studyDisposition(
      studyData.study_disposition,
    ), renderEmbargoLabel, renderPendingLabel,
  );

  return (
    <StudyThemeProvider>
      <Snackbar
        snackbarState={snackbarState}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        classes={classes}
      />

      <StatsView data={stat} />
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            {
              getHeaderIcon()
            }
          </div>
          <div className={classes.headerTitle}>
            <div className={classes.headerMainTitle}>
              <span>
                {' '}
                <span>
                  Study :
                  {' '}
                  {' '}
                  {studyData.clinical_study_designation}
                </span>
              </span>
              {
              (studyData.accession_id !== null && studyData.accession_id !== undefined && studyData.accession_id !== '')
              && (
                <>
                  <span className={classes.headerBar}> | </span>
                  <span className={classes.headerAccessionItem}>
                    <span className={classes.accessionLabel}>{'Accession ID : '}</span>
                    <span className={classes.accessionValue}>{studyData.accession_id}</span>
                  </span>
                </>
              )
              }
            </div>
            <div
              className={
                String(studyData.clinical_study_name).length > 85
                  ? cn(classes.headerMSubTitle, classes.lowLetterSpace)
                  : cn(classes.headerMSubTitle, classes.headerSubTitleCate)
              }
            >
              <span>
                {' '}
                {studyData.clinical_study_name}
              </span>

            </div>
            <div className={classes.breadCrumb}>
              <CustomBreadcrumb data={breadCrumbJson} />
            </div>
          </div>
          {
            renderSwitch(
              studyDisposition(
                studyData.study_disposition,
              ), renderEmbargoLabel, renderPendingLabel,
            )
              ? (
                getLabel()
              )
              : (
                <div className={classes.headerButton}>
                  <span className={classes.headerButtonLinkSpan}>
                    {/* <span className={classes.headerButtonLinkText}> View </span> */}
                    <Link
                      className={classes.headerButtonLink}
                      to={(location) => ({ ...location, pathname: '/explore' })}
                      onClick={() => navigatedToDashboard(studyData
                        .clinical_study_designation, 'Cases')}
                    >
                      <div className={classes.headerButtonLinkNumber}>
                        {' '}
                        {' '}
                        {data.caseCountOfStudy}
                        {' '}
                        {' '}
                      </div>
                      <span className={classes.headerButtonLinkText}>Associated Cases</span>
                    </Link>
                  </span>
                </div>
              )
            }
        </div>

        <div className={classes.detailContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Tab
                styleClasses={classes}
                tabItems={tab.items}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <TabPanel value={currentTab} index={0}>
        <Overview
          studyData={studyData}
          diagnoses={diagnoses}
          caseFileTypes={caseFileTypes}
          closeSnack={closeSnack}
          openSnack={openSnack}
          data={data}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <ArmsAndCohort
          studyData={studyData}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <StudyFiles
          closeSnack={closeSnack}
          openSnack={openSnack}
          data={data}
          studyData={studyData}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <Publication
          publications={studyData.publications}
          display={tab.publication}
        />
      </TabPanel>
    </StudyThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(StudyDetailView);

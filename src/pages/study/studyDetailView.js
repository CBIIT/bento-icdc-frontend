/* eslint-disable no-shadow */
import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  cn,
} from '@bento-core/util';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import StatsView from '../../components/Stats/StatsView';
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
  studiesByProgram,
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
import SupportingData from './views/supporting-data/supportingData';
import env from '../../utils/env';
import ClinicalData from './views/clinical-data/clinicalData';

function hasPositiveValue(arr) {
  return arr.some((obj) => Object.values(obj).some((value) => value > 0));
}

const processData = (names, nodeCountArg, nodeCaseCountArg) => names.map((name) => {
  const objMatcher = _.toLower(_.replace(name, ' ', '_'));
  const nodeCount = nodeCountArg[objMatcher];
  const nodeCaseCount = nodeCaseCountArg[objMatcher];

  if (nodeCaseCount === 0 && nodeCount === 0) {
    return {
      name,
      iEmpty: true,
    };
  }
  return {
    name,
    nodeCount,
    nodeCaseCount,
    isEmpty: false,
  };
});

const StudyDetailView = ({ classes, data }) => {
  const { data: interOpData, isLoading, isError } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () => request(
      env.REACT_APP_INTEROP_SERVICE_URL,
      studiesByProgram,
    ),
  });

  const studyData = data.study[0];
  const { clinical_study_designation: studyCode } = studyData;
  const diagnoses = [...new Set(studyData.cases.reduce((output, caseData) => output.concat(caseData.diagnoses ? caseData.diagnoses.map((diagnosis) => (diagnosis.disease_term ? diagnosis.disease_term : '')) : []), []))];
  const studyFileTypes = [...new Set(data.studyFiles.map((f) => (f.file_type)))];
  const caseFileTypes = [...new Set(data.filesOfStudy.map((f) => (f.file_type))
    .filter((f) => !studyFileTypes.includes(f)))];
  const { clinicalDataNodeNames, clinicalDataNodeCounts, clinicalDataNodeCaseCounts } = data;
  const clinicalDataTabData = {
    names: clinicalDataNodeNames,
    nodeCount: clinicalDataNodeCounts,
    nodeCaseCount: clinicalDataNodeCaseCounts,
  };
  const hasClinicalData = hasPositiveValue([clinicalDataNodeCounts, clinicalDataNodeCaseCounts]);

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

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: studyData.program.program_acronym,
    to: '',
    isALink: false,
  }];

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  const { accession_id: accessionId } = data.study[0];
  const filterStudy = `${studyCode} (${accessionId})`;

  const currentStudy = interOpData?.studiesByProgram
    .find((item) => item.clinical_study_designation === studyData.clinical_study_designation);

  let processedTabs;
  if (!currentStudy) {
    processedTabs = tab.items.filter((item) => item.label !== 'SUPPORTING DATA');
  } else {
    processedTabs = tab.items;
  }

  if (!hasClinicalData) {
    processedTabs = processedTabs.filter((item) => item.label !== 'CLINICAL DATA');
  }

  const processedClinicalDataTabData = processData(
    clinicalDataTabData.names,
    clinicalDataTabData.nodeCount,
    clinicalDataTabData.nodeCaseCount,
  );

  let clinicalDataNodeCount = 0;
  const supportingDataCount = currentStudy?.CRDCLinks.length;

  const clinicalDataDownloadFlags = {};

  processedClinicalDataTabData.forEach((el) => {
    if (el?.isEmpty === false) {
      clinicalDataNodeCount += 1;
      clinicalDataDownloadFlags[el.name] = true;
    } else {
      clinicalDataDownloadFlags[el.name] = false;
    }
  });

  const supportingDataTabIndex = processedTabs.findIndex((tab) => tab.label === 'SUPPORTING DATA');
  const clinicalDataTabIndex = processedTabs.findIndex((tab) => tab.label === 'CLINICAL DATA');

  return (
    <StudyThemeProvider>
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
                      onClick={() => navigatedToDashboard(filterStudy)}
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
                tabItems={processedTabs}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {
            processedTabs.map((processedTab, index) => {
              switch (processedTab.label) {
                case 'OVERVIEW': return (
                  <TabPanel value={currentTab} index={index}>
                    <Overview
                      studyData={studyData}
                      diagnoses={diagnoses}
                      caseFileTypes={caseFileTypes}
                      data={data}
                      nodeCount={clinicalDataNodeCount}
                      supportingDataCount={supportingDataCount}
                      setCurrentTab={setCurrentTab}
                      supportingDataTabIndex={supportingDataTabIndex}
                      clinicalDataTabIndex={clinicalDataTabIndex}
                    />
                  </TabPanel>
                );

                case 'ARMS & COHORTS': return (
                  <TabPanel value={currentTab} index={index}>
                    <ArmsAndCohort
                      studyData={studyData}
                    />
                  </TabPanel>
                );
                case 'STUDY FILES': return (
                  <TabPanel value={currentTab} index={index}>
                    <StudyFiles
                      data={data}
                      studyData={studyData}
                    />
                  </TabPanel>
                );
                case 'PUBLICATIONS': return (
                  <TabPanel value={currentTab} index={index}>
                    <Publication
                      publications={studyData.publications}
                      display={tab.publication}
                    />
                  </TabPanel>
                );
                case 'CLINICAL DATA': return (
                  <TabPanel value={currentTab} index={index}>
                    {
                              hasClinicalData
                        && (
                        <ClinicalData
                          data={processedClinicalDataTabData}
                          csvDownloadFlags={clinicalDataDownloadFlags}
                          studyCode={studyCode}
                        />
                        )
                          }
                  </TabPanel>

                );
                case 'SUPPORTING DATA': return (
                  <TabPanel value={currentTab} index={index}>
                    {
                              currentStudy && (
                              <SupportingData
                                data={currentStudy}
                                isLoading={isLoading}
                              />
                              )
                          }
                  </TabPanel>
                );
                default:
                  return null;
              }
            })
        }
    </StudyThemeProvider>
  );
};

export default withStyles(Styles, { withTheme: true })(StudyDetailView);

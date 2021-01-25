import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  CustomDataTable, getOptions, cn, getColumns,
} from 'bento-components';
import Snackbar from '../../components/Snackbar';
import StatsView from '../../components/Stats/StatsView';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { fetchDataForDashboardTabDataTable } from '../dashboardTab/store/dashboardReducer';
import { studyDetailSorting, customSorting, fromArmTOCohorDoes } from './utils';
import filterCasePageOnStudyCode from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  table1, table2, tooltipContent, headerIcon,
} from '../../bento/studyDetailsData';

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
    numberOfBiospecimenAliquots: data.aliguotCountOfStudy,
  };

  React.useEffect(() => {
    fetchDataForDashboardTabDataTable();
  }, []);

  const cohortAndDosingTableData = [];
  const { noArmMessage } = table1;
  const { noCohortMessage } = table1;
  if (!studyData.cohorts || studyData.cohorts.length === 0) {
  // no cohort under studyData
    if (studyData.study_arms && studyData.study_arms.length !== 0) {
    // no cohort under studyData , has arms
      studyData.study_arms.forEach((arm) => {
      // decide arm
        let cohortAndDosing = {
          arm: arm.arm || arm.arm === '' ? arm.arm : '',
          description: arm.description ? arm.description : '',
          does: '',
          cohortDescription: '',
        };
        cohortAndDosing = fromArmTOCohorDoes(arm.cohorts, cohortAndDosing);
        cohortAndDosingTableData.push(cohortAndDosing);
      });
    } else { // no cohort under studyData no arms
      cohortAndDosingTableData.push({
        arm: noArmMessage,
        description: '',
        does: noCohortMessage,
        cohortDescription: '',
      });
    }
  } else if (studyData.study_arms && studyData.study_arms.length !== 0) {
    // has cohort under studyData and arms
    studyData.study_arms.forEach((arm) => {
      // decide arm
      let cohortAndDosing = {
        arm: arm.arm || arm.arm === '' ? arm.arm : '',
        description: arm.description ? arm.description : '',
        does: '',
        cohortDescription: '',
      };
      cohortAndDosing = fromArmTOCohorDoes(arm.cohorts, cohortAndDosing);
      cohortAndDosingTableData.push(cohortAndDosing);
    });
  } else { // has cohort under studyData , no arms
    let cohortAndDosing = {
      arm: noArmMessage,
      description: '',
      does: '',
      cohortDescription: '',
    };
    cohortAndDosing = fromArmTOCohorDoes(studyData.cohorts, cohortAndDosing);
    cohortAndDosingTableData.push(cohortAndDosing);
  }

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

  const fileTableData = data.studyFiles === null || data.studyFiles === '' ? [] : data.studyFiles.map((file) => {
    const cFile = { ...file };
    cFile.parent = 'Study';
    cFile.studyDesignation = studyData.clinical_study_designation;
    return cFile;
  });
  return (
    <>
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
            <img
              src={headerIcon}
              alt="ICDC case detail header logo"
            />

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
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span>
                {' '}
                {studyData.clinical_study_name}
              </span>

            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>
          <div className={classes.headerButton}>
            <span className={classes.headerButtonLinkSpan}>
              <Link
                className={classes.headerButtonLink}
                to={(location) => ({ ...location, pathname: '/cases' })}
                onClick={() => filterCasePageOnStudyCode(studyData.clinical_study_designation)}
              >
                {' '}
                <span className={classes.headerButtonLinkText}> View </span>
                <span className={classes.headerButtonLinkNumber}>
                  {' '}
                  {' '}
                  {data.caseCountOfStudy}
                  {' '}
                  {' '}
                </span>
                <span className={classes.headerButtonLinkText}>CASES</span>
              </Link>
            </span>
          </div>
        </div>

        <div className={classes.detailContainer}>

          <Grid container>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerLeft}>
                <Grid item xs={12}>
                  <span className={classes.detailContainerHeader}>Description</span>

                </Grid>

                <Grid item xs={12}>
                  <div>
                    <span className={classes.content}>
                      {' '}
                      {studyData.clinical_study_description}
                      {' '}
                    </span>
                  </div>
                  <div><hr className={classes.hrLine} /></div>
                </Grid>

                <Grid container className={classes.detailContainerItems}>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}> Study Type:</span>
                  </Grid>
                  <Grid item xs={12} spacing={0} className={classes.content}>
                    {studyData.clinical_study_type}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Principal Investigators:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => (`${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name},  `)) : ''}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Date of IACUC Approval:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.date_of_iacuc_approval}
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <span className={classes.title}>Conducted:</span>
                  </Grid>
                  <Grid item xs={12} className={classes.content}>
                    {studyData.dates_of_conduct}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <span className={classes.detailContainerHeader}>DIAGNOSES</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.paddingTop12}>
                    {diagnoses.sort((a, b) => customSorting(a, b, 'alphabetical')).map((diagnosis) => (
                      <Grid item xs={12}>
                        <span className={classes.content}>
                          {' '}
                          {diagnosis}
                        </span>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <span className={classes.detailContainerHeader}>Case File Types</span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.paddingTop12}>
                    {caseFileTypes.sort((a, b) => customSorting(a, b, 'alphabetical')).map((fileType) => (
                      <Grid item xs={12}>
                        <span className={classes.content}>{fileType}</span>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.tableContainer}>

        <div className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>ARMS AND COHORTS</span>
          </div>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} id="table_cohort_dosing">
                <Typography>
                  <CustomDataTable
                    data={cohortAndDosingTableData.sort(
                      (a, b) => studyDetailSorting(a.arm, b.arm),
                    )}
                    columns={table1.columns}
                    options={getOptions(table1, classes)}
                  />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.tableContainer2}>
        <div className={classes.tableDiv}>
          <Grid item xs={12}>
            <div className={classes.tableTitle}>
              <span className={classes.tableHeader}>ASSOCIATED STUDY FILES</span>
            </div>
          </Grid>
          <Grid item xs={12} id="table_associated_files">
            <GridWithFooter
              data={fileTableData}
              title=""
              columns={getColumns(table2, classes, fileTableData)}
              options={getOptions(table2, classes)}
              customOnRowsSelect={table2.customOnRowsSelect}
              openSnack={openSnack}
              closeSnack={closeSnack}
              disableRowSelection={table2.disableRowSelection}
              buttonText={table2.buttonText}
              saveButtonDefaultStyle={table2.saveButtonDefaultStyle}
              ActiveSaveButtonDefaultStyle={table2.ActiveSaveButtonDefaultStyle}
              DeactiveSaveButtonDefaultStyle={table2.DeactiveSaveButtonDefaultStyle}
              tooltipMessage={table2.tooltipMessage}
              tooltipContent={tooltipContent}
              showtooltip
            />

          </Grid>
        </div>
      </div>
    </>
  );
};

const styles = (theme) => ({
  hrLine: {
    width: '50px',
    float: 'left',
    marginTop: '30px',
    border: '#81a6b9 2px solid',
    background: '#81a6b9',
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '120px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  content: {
    fontSize: '12px',
    lineHeight: '14px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#f3f3f3',
  },
  header: {
    paddingLeft: '21px',
    paddingRight: '21px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
  },
  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    width: 'calc(100% - 265px)',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#0296c9',
    fontSize: '19px',
    height: '12px',
    lineHeight: '17px',
    paddingLeft: '3px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '35px',
    overflow: 'hidden',
    paddingLeft: '3px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingRight: '200px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '14pt',

  },
  headerMSubTitle: {
    paddingTop: '12px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    float: 'right',
    marginTop: '15px',
    width: '125px',
    height: '33px',
    background: '#F6F4F4',
    paddingLeft: '10px',
    paddingRight: '10px',

  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamilySans,
    height: '50px',
    background: '#F5F3EE',
    width: '200px',
    fontSize: '14px',
  },
  headerButtonLinkText: {
    fontFamily: theme.custom.fontFamilySans,
    color: '#0B3556',
    fontSize: '14px',
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamilySans,
    borderBottom: 'solid',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '14px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-13px',
    width: '100px',
  },
  detailContainer: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    paddingTop: '30px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    height: '525px',

  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#0296c9',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '13px',
    padding: ' 35px 0 63px 2px !important',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '5px  20px 5px 2px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',

  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerRight: {
    padding: '5px 0 5px 20px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '500px',
    width: 'calc(100% + 8px)',
  },

  tableContainer: {
    background: '#f3f3f3',
  },
  tableContainer2: {
    background: '#fff',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#0296c9',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  tableDiv: {
    paddingTop: '31px',
    maxWidth: theme.custom.maxContentWidth,
    margin: '40px auto auto auto',
  },

  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#DC762F',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    borderRadius: '22px',
    padding: '0 22px',
    width: '150px',
    height: '35px',
    lineHeight: '14px',
    fontSize: '10px',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: '#ff8a00',
    fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#ff8a00',
    },
  },
  detailContainerItems: {
    paddingTop: '7px',
    paddingLeft: '7px',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },

});

export default withStyles(styles, { withTheme: true })(StudyDetailView);

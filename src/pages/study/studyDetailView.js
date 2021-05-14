import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  CustomDataTable, getOptions, cn, getColumns,
} from 'bento-components';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '../../components/Snackbar';
import StatsView from '../../components/Stats/StatsView';
import GridWithFooter from '../../components/GridWithFooter/GridView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { fetchDataForDashboardTabDataTable } from '../dashboardTab/store/dashboardReducer';
import {
  studyDetailSorting,
  customSorting,
  fromArmTOCohorDoes,
  isStudyUnderEmbargo,
} from './utils';
import filterCasePageOnStudyCode from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  table1, table2, tooltipContent, headerIcon, textLabels, externalIcon,
} from '../../bento/studyDetailsData';
import themes, { overrides } from '../../themes';
import updateColumns from '../../utils/columnsUtil';
import embargoHeaderIcon from '../../assets/icons/EmbargoStudies.icon.svg';
import embargoFileIcon from '../../assets/icons/EmbargoFileIcon.svg';

const themesLight = _.cloneDeep(themes.light);
themesLight.overrides.MuiTableCell = {
  ...themesLight.overrides.MuiTableCell,
  root: {
    '&:first-child': {
      paddingLeft: '30px',
    },
    '&:lastchild': {
      paddingRight: '30px',
    },
  },
};
const computedTheme = createMuiTheme({
  ...themesLight,
  ...overrides,
});

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
    numberOfAliquots: data.aliguotCountOfStudy ? data.aliguotCountOfStudy : 0,
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
  const tableOneOptions = getOptions(table1, classes);
  const tableTwoOptions = getOptions(table2, classes);
  const columns2 = updateColumns(getColumns(table2, classes, fileTableData), table2.columns);

  const getImageTypes = (typeString) => {
    const types = JSON.parse(typeString);

    return types.join(', ');
  };

  const getAccessTypeString = (accessType) => (accessType === 'Cloud'
    ? 'Available only via the Cloud' : 'Available for Download');

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
            {
              isStudyUnderEmbargo(studyData.study_disposition)
                ? (
                  <img
                    src={embargoHeaderIcon}
                    alt="ICDC case detail header logo"
                  />
                )
                : (
                  <img
                    src={headerIcon}
                    alt="ICDC case detail header logo"
                  />
                )
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
                    <span className={classes.accessionLabel}>{'Accession Id : '}</span>
                    <span className={classes.accessionValue}>{studyData.accession_id}</span>
                  </span>
                </>
              )
              }
            </div>
            <div className={cn(classes.headerMSubTitle, classes.headerSubTitleCate)}>
              <span>
                {' '}
                {studyData.clinical_study_name}
              </span>

            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>
          {
            isStudyUnderEmbargo(studyData.study_disposition)
              ? (
                <div className={classes.embargo}>
                  <span className={classes.embarLabel}> UNDER EMBARGO </span>
                  <img src={embargoFileIcon} className={classes.embargoFileIcon} alt="icdc embargo file icon" />
                </div>
              )
              : (
                <div className={classes.headerButton}>
                  <span className={classes.headerButtonLinkSpan}>
                    <Link
                      className={classes.headerButtonLink}
                      to={(location) => ({ ...location, pathname: '/cases' })}
                      onClick={() => filterCasePageOnStudyCode(studyData
                        .clinical_study_designation)}
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
              )
            }
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
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Study Type:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.clinical_study_type}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Principal Investigators:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.principal_investigators ? studyData.principal_investigators.map((principalInvestigator) => (`${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name},  `)) : ''}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Date of IACUC Approval:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.date_of_iacuc_approval}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailContainerItem}>
                    <Grid item container direction="row">
                      <Grid item xs={12} sm={4} className={classes.title}>
                        Conducted:
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.content}>
                        {studyData.dates_of_conduct}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerRightTop}>
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

                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.detailContainerRightTop}>
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
                <div><hr className={classes.hrLine} /></div>
              </Grid>
              <Grid container spacing={16} direction="row" className={classes.detailContainerRight}>

                {/* START: Image Collection */}
                <Grid item lg={6} md={6} sm={6} xs={12} className={classes.marginTop10}>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <span className={classes.detailContainerHeader}> IMAGE COLLECTIONS </span>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.detailContainerItems}>
                    {studyData.image_collections.length > 0 ? studyData.image_collections.map(
                      (imageCollection) => (
                        <Grid item xs={12} className={classes.detailContainerItem}>
                          <Grid item container direction="row">
                            <Grid item xs={12} sm={4} className={classes.title}>
                              COLLECTION:
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={8}
                              className={[classes.content, classes.marginTopN5]}
                            >
                              <Tooltip title={getAccessTypeString(imageCollection.collection_access)} arrow placement="right-end">
                                <a href={`${imageCollection.image_collection_url}`} target="icdc" className={classes.outLink}>
                                  {imageCollection.image_collection_name}
                                  {' - '}
                                  {imageCollection.repository_name}
                                  <span className={classes.paddingLeft5}>
                                    <img
                                      src={externalIcon}
                                      alt="imageLink"
                                      className={classes.linkIcon}
                                    />
                                  </span>
                                </a>
                              </Tooltip>
                            </Grid>
                          </Grid>
                          <Grid item container direction="row">
                            <Grid item xs={12} sm={4} className={classes.title}>
                              IMAGE TYPES:
                            </Grid>
                            <Grid item xs={12} sm={8} className={classes.content}>
                              {imageCollection.image_type_included
                              && getImageTypes(imageCollection.image_type_included)}
                            </Grid>
                          </Grid>
                        </Grid>
                      ),
                    ) : (
                      <Grid item xs={12} sm={10} className={classes.content}>
                        <div className={classes.content}>
                          This study currently has no associated Image Collections
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {/* END: Image Collection */}
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
                <MuiThemeProvider theme={computedTheme}>
                  <Typography>
                    <CustomDataTable
                      data={cohortAndDosingTableData.sort(
                        (a, b) => studyDetailSorting(a.arm, b.arm),
                      )}
                      columns={table1.columns}
                      options={{ ...tableOneOptions, ...textLabels }}
                    />
                  </Typography>
                </MuiThemeProvider>
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
            <MuiThemeProvider theme={computedTheme}>
              <GridWithFooter
                data={fileTableData}
                title=""
                columns={columns2}
                options={{ ...tableTwoOptions, ...textLabels }}
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
                primaryKeyIndex={table2.primaryKeyIndex}
              />
            </MuiThemeProvider>
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
  headerItems: {
    width: '250px',
    float: 'right',
  },
  headerItemAccessionId: {
    paddingTop: '10px',
    '& span': {
      margin: '40px 20px',
      color: '#5e8ca5',
    },
  },
  embargoIcon: {
    position: 'absolute',
    color: 'white',
    top: '-12px',
    backgroundColor: '#de7328',
  },
  embargo: {
    color: '#6E6E6E',
    float: 'right',
    background: '#f3f3f3',
    width: '180px',
    height: '33px',
    fontSize: '15px',
    marginTop: '25px',
    fontWight: 'bolder',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    textAlign: 'center',
  },
  embargoFileIcon: {
    width: '20px',
    float: 'right',
    marginLeft: '5px',
  },
  headerBar: {
    fontWeight: '10',
    color: '#5e8ca5',
    margin: '0px 15px 0 15px',
  },
  headerAccessionItem: {
    borderRadius: '100px',
    border: '2px solid',
    textAlign: 'center',
    padding: '0 16px',
    background: 'rgb(203 226 238 / 11%)',
    fontSize: '15px',
  },
  accessionLabel: {
    fontSize: '14px',
    fontWeight: '100',
    color: '#5e8ca5',
  },
  accessionValue: {
    fontSize: '13px',
    fontWeight: '800',
  },
  paddingLeft8: {
    paddingLeft: '8px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '80px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
    paddingBottom: '25px',
  },
  content: {
    fontSize: '12px',
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
    margin: 'auto',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    width: 'calc(100% - 465px)',
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
  borderRight: {
    borderRight: '#81a6b9 1px solid',
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
    marginTop: '15px',
    float: 'right',
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
  detailContainerRight: {
    padding: '5px 0 5px 20px !important',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
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
    padding: '31px 34px',
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
  detailContainerRightTop: {
    maxHeight: '250px',
    overflow: 'auto',
  },
  outLink: {
    color: '#DD752F',
    textDecoration: 'none',
    fontSize: '12px',
  },
  paddingLeft5: {
    paddingLeft: '5px',
  },
  marginTopN5: {
    marginTop: '-5px',
  },
  marginTop10: {
    marginTop: '10px',
  },
  linkIcon: {
    width: '20px',
  },

});

export default withStyles(styles, { withTheme: true })(StudyDetailView);

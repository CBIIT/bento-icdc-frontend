import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import {
  CustomDataTable,
  getOptions,
  getColumns,
} from 'bento-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Typography } from '../../../components/Wrappers/Wrappers';
import GridWithFooter from '../../../components/GridWithFooter/GridView';
import {
  studyDetailSorting,
  customSorting,
  isStudyUnderEmbargo,
  fromArmTOCohorDoes,
} from '../utils';
import {
  table1,
  table2,
  externalIcon,
  textLabels,
  tooltipContent,
} from '../../../bento/studyDetailsData';
import themes, { overrides } from '../../../themes';
import updateColumns from '../../../utils/columnsUtil';
import Tooltip from '../../../components/MuiTooltip';
import DocumentDownload from '../../../components/DocumentDownload';

const Overview = ({
  classes,
  studyData,
  diagnoses,
  caseFileTypes,
  data,
  closeSnack,
  openSnack,
}) => {
  const getImageTypes = (typeString) => {
    const types = JSON.parse(typeString);

    return types.join(', ');
  };

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

  const getAccessTypeString = (accessType) => (accessType === 'Cloud'
    ? 'Available only via the Cloud' : 'Available for Download');

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

  const fileTableData = data.studyFiles === null || data.studyFiles === '' ? [] : data.studyFiles.map((file) => {
    const cFile = { ...file };
    cFile.parent = 'Study';
    cFile.studyDesignation = studyData.clinical_study_designation;
    return cFile;
  });

  const tableOneOptions = getOptions(table1, classes);
  const tableTwoOptions = getOptions(table2, classes);
  const columns2 = updateColumns(getColumns(table2, classes, fileTableData, externalIcon, '', () => {}, DocumentDownload), table2.columns);

  return (
    <>
      <div className={classes.container}>
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
            {
              (!isStudyUnderEmbargo(studyData.study_disposition))
              && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Grid
                  container
                  spacing={16}
                  direction="row"
                  className={classes.detailContainerRight}
                >
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.detailContainerRightTop}
                  >
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
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                    className={classes.detailContainerRightTop}
                  >
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
                                <Tooltip title={getAccessTypeString(imageCollection.collection_access)} arrow placement="top">
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
              )
          }
          </Grid>
        </div>
      </div>
      {
      (!isStudyUnderEmbargo(studyData.study_disposition))
      && (
      <>
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
                        components={{
                          Tooltip,
                        }}
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
                  closeSnack={closeSnack}
                  openSnack={openSnack}
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
      )
      }
    </>
  );
};

const styles = (theme) => ({
  container: {
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
    paddingBottom: '25px',
  },
  detailContainer: {
    margin: 'auto',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',

  },
  hrLine: {
    width: '50px',
    float: 'left',
    marginTop: '30px',
    border: '#81a6b9 2px solid',
    background: '#81a6b9',
  },
  borderRight: {
    borderRight: '#81a6b9 1px solid',
  },
  detailContainerLeft: {
    display: 'block',
    padding: '15px 20px 5px 10px !important',
    minHeight: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#0296c9',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerItems: {
    paddingTop: '7px',
  },
  title: {
    color: '#0296c9',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailContainerItem: {
    paddingTop: '15px !important',
  },
  detailContainerRight: {
    padding: '5px 0 5px 20px !important',
    maxHeight: '500px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px)',
  },
  detailContainerRightTop: {
    maxHeight: '250px',
    overflow: 'auto',
  },
  marginTop10: {
    marginTop: '10px',
  },
  paddingTop12: {
    paddingTop: '12px',
  },
  linkIcon: {
    width: '20px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableDiv: {
    padding: '31px 34px',
    margin: '40px auto auto auto',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#0296c9',
  },
  paddingLeft5: {
    paddingLeft: '5px',
  },
  tableContainer2: {
    background: '#fff',
  },
});

export default withStyles(styles, { withTheme: true })(Overview);

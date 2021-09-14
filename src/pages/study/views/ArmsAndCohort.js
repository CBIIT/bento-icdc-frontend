import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  CustomDataTable,
  getOptions,
  ToolTip as Tooltip,
} from 'bento-components';
import { Typography } from '../../../components/Wrappers/Wrappers';
import {
  table1,
  textLabels,
} from '../../../bento/studyDetailsData';
import themes, { overrides } from '../../../themes';
import {
  studyDetailSorting,
  fromArmTOCohorDoes,
  studyDisposition,
} from '../utils';

const ArmsAndCohort = ({
  classes,
  studyData,
}) => {
  console.log(studyData);
  // const [noArmsAndCohort, setNoArmsAndCohort] = React.useState(false);
  const cohortAndDosingTableData = [];
  const {
    noArmMessage,
    noCohortMessage,
    noArmsCohort,
    noArmsCohort2,
  } = table1;
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
      // setNoArmsAndCohort(true);
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

  themesLight.overrides.MUIDataTableToolbar = {
    ...themesLight.overrides.MUIDataTableToolbar,
    actions: {
      '& span': {
        '& button': {
          right: '0px',
        },
      },
    },
  };

  const computedTheme = createMuiTheme({
    ...themesLight,
    ...overrides,
  });
  const tableOneOptions = getOptions(table1, classes);
  // const studyDisposition = studyDisposition(studyData.study_disposition);
  return (
    <>
      {
      (!studyDisposition(studyData.study_disposition) && (studyData.cohorts.length > 0
        || studyData.study_arms.length > 0))
        ? (
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
        ) : (
          <div className={classes.detailContainer}>
            <div>
              <Grid item xs={12}>
                <div className={classes.noAssociatedFiles}>
                  {studyDisposition(studyData.study_disposition) ? noArmsCohort2 : noArmsCohort}
                </div>
              </Grid>
            </div>
          </div>
        )
      }
    </>
  );
};

const styles = (theme) => ({
  tableContainer: {
    background: '#f3f3f3',
    minHeight: '500px',
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
  detailContainer: {
    margin: 'auto',
    paddingTop: '10px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  noAssociatedFiles: {
    paddingLeft: '32px',
    marginTop: '20px',
    fontSize: '12px',
    minHeight: '500px',
  },
});

export default withStyles(styles, { withTheme: true })(ArmsAndCohort);

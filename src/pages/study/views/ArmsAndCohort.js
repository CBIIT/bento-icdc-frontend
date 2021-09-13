import React from 'react';

const ArmsAndCohort = ({
    studyData,
    table1,
    tableOneOptions,
    textLabels,
}) => {
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
  return (
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
  )
}

const styles = (theme) => ({

})

export default ArmsAndCohort;

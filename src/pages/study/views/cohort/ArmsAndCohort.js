import React, { useContext } from 'react';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  table1,
} from '../../../../bento/studyDetailsData';
import {
  fromArmTOCohorDoes,
  studyDisposition,
  isStudyUnderEmbargo,
  studyDetailSorting,
} from '../../utils';
// import CohortThemeProvider from './armsAndCohortThemeConfig';
import { TableContext, TableView } from '../../../../bento-core';
import { themeConfig } from './Theme';
import { CustomizeCellView } from '../../../../components/PaginatedTable/Customize/CellView';
import { ExtendedViewConfig } from '../../../../components/PaginatedTable/Customize/ExtendedView';

const ArmsAndCohort = ({
  classes,
  studyData,
}) => {
  const cohortAndDosingTableData = [];
  const {
    noArmMessage,
    noCohortMessage,
    noArmsCohort,
    noArmsCohort2,
  } = table1;
  const getTableData = () => {
    const { study_arms : studyArms, cohorts: cohortsWithoutArm } = studyData;
    const tableRows = [];
    // cohort types. without arms 1. without arms 2. with arms 
    // cohort without arms
    if (studyArms.length === 0 && cohortsWithoutArm.length > 0)
    {
      // iterate over each cohor wihtout arms
      cohortsWithoutArm.forEach((cohort, index) => {
        const { cohort_dose: dose, cohort_description: cohortDesc } = cohort;
        // Row grouping display arm and description at zero index
        tableRows.push({
          arm: 'This study is not divided into arms',
          description: '',
          does: dose,
          cohortDescription: cohortDesc
        });
      });
      return tableRows;
    }

    // iterate over arms
    studyArms.forEach((item, armIndex) => {
      const { arm, cohorts: armChorts, arm_description: desc } = item;
      if (armChorts.length === 0)
      {
        return tableRows.push({ arm: arm, description: desc });
      }
      // iterate over each cohors with in arm
      armChorts.forEach((cohort, index) => {
        const {
          cohort_dose: dose,
          cohort_description: cohortDesc,
        } = cohort;
        // Row grouping display arm and description at zero index
        tableRows.push({
          arm: arm,
          armDescription: desc,
          does: dose,
          cohortDescription: cohortDesc,
        });
      });
    });
    return tableRows;
  }

  const tblRows = getTableData();

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

  const initTblState = (initailState) => ({
    ...initailState,
    title: table1.name,
    columns: CustomizeCellView(table1),
    selectedRows: [],
    tableMsg: table1.tableMsg,
    sortBy: table1.defaultSortField,
    groupBy: table1.groupBy,
    sortOrder: table1.defaultSortDirection,
    rowsPerPage: 25,
    dataKey: table1.dataKey,
    extendedViewConfig: ExtendedViewConfig(table1),
    page: 0,
  });

  const { context } = useContext(TableContext);
  // const studyDisposition = studyDisposition(studyData.study_disposition);
  const data = cohortAndDosingTableData.sort(
    (a, b) => studyDetailSorting(a.arm, b.arm),
  );

  return (
    <>
      {
      (!isStudyUnderEmbargo(studyData.study_disposition) && (studyData.cohorts.length > 0
        || studyData.study_arms.length > 0))
        ? (
          <div className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Typography className={classes.tableText}>
                This study is organized as follows:
              </Typography>
              <TableView
                initState={initTblState}
                tblRows={tblRows}
                totalRowCount={tblRows.length}
                server={false}
                themeConfig={{
                  ...themeConfig(context),
                }}
              />
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
    minHeight: '500px',
  },
  tableDiv: {
    padding: '20px 70px 0px 65px',
    margin: '20px auto auto auto',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#ff17f15',
    paddingBottom: '20px',
  },
  tableHeader: {
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
  tableText: {
    marginBottom: '-40px',
  },
});

export default withStyles(styles, { withTheme: true })(ArmsAndCohort);

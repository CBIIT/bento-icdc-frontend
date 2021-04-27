import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import {
  CustomDataTable,
  cn,
  getOptions,
  getColumns,
} from 'bento-components';
import _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StatsView from '../../components/Stats/StatsView';
import {
  table,
  pageData,
  textLabels,
} from '../../bento/programDetailData';
import {
  pageData as ProgramImageConfig,
} from '../../bento/programData';
import filterCasePageOnStudyCode from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import themes, { overrides } from '../../themes';

const themesLight = _.cloneDeep(themes.light);
themesLight.overrides.MuiTableCell = {
  ...themesLight.overrides.MuiTableCell,
  root: {
    '&:first-child': {
      paddingLeft: '42px',
    },
    '&:last-child': {
      paddingRight: '41px',
    },
  },
};
const computedTheme = createMuiTheme({
  ...themesLight,
  ...overrides,
});

const ProgramView = ({ classes, data }) => {
  const programDetail = data.program[0];

  const redirectTo = (study) => {
    filterCasePageOnStudyCode(study.rowData[1]);
  };

  const stat = {
    numberOfStudies: data.studyCountOfProgram,
    numberOfCases: data.caseCountOfProgram,
    numberOfSamples: data.sampleCountOfProgram,
    numberOfFiles: data.fileCountOfProgram,
    numberOfAliquots: data.aliguotCountOfProgram ? data.aliguotCountOfProgram : 0,
  };

  const breadCrumbJson = [{
    name: 'ALL PROGRAMS',
    to: '/programs',
    isALink: true,
  }, {
    name: programDetail.program_acronym,
    to: '/cases',
    isALink: true,
  }];

  const programConfig = ProgramImageConfig[programDetail.program_acronym];
  const programImage = programConfig ? programConfig.secondaryImage : '';
  const tableOptions = getOptions(table, classes);

  return (
    <>
      <StatsView data={stat} />

      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <img
              src={pageData.headerIcon}
              alt="ICDC case detail header logo"
            />

          </div>
          <div className={classes.headerTitle}>
            <div className={cn(classes.headerMainTitle, classes.marginTop18)}>
              <span>
                {`${programDetail.program_name} (${programDetail.program_acronym})`}
              </span>
            </div>
            <CustomBreadcrumb data={breadCrumbJson} />
          </div>

        </div>

        <div className={classes.detailContainer}>

          <Grid container spacing={0}>
            <Grid item lg={8} md={8} sm={8} xs={12} className={classes.detailContainerLeft}>
              <span className={classes.content}>
                {programDetail.program_full_description
                  ? programDetail.program_full_description.split('**').map((item, i) => <p key={i}>{item}</p>) : null}
              </span>
            </Grid>
            {programConfig && (
            <Grid item lg={4} md={4} sm={4} xs={12} className={classes.detailContainerRight}>
              <img
                src={programImage}
                alt="dog for program detail"
                className={classes.dogImage}
              />

            </Grid>
            )}
          </Grid>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <Grid container spacing={8} className={classes.tableDiv}>
          <div className={classes.tableTitle}>
            <span className={classes.tableHeader}>STUDIES IN THIS PROGRAM</span>
          </div>
          <Grid item xs={12} lg={12} md={12} sm={12} id="table_studies" className={classes.table}>
            <MuiThemeProvider theme={computedTheme}>
              <CustomDataTable
                data={data.studiesByProgramId}
                columns={getColumns(table, classes, data, '', '/cases', redirectTo)}
                options={{ ...tableOptions, ...textLabels }}
              />
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const styles = (theme) => ({
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#DC762F',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dogImage: {
    width: '100%',
    paddingTop: '15px',
  },
  paddingLeft8: {
    paddingLeft: '12px',
  },
  paddingBottm17: {
    paddingBottm: '17px',
  },
  container: {
    paddingTop: '80px',
    paddingBottom: '45px',
    fontFamily: 'Raleway, sans-serif',
    background: 'white',
  },
  content: {
    fontSize: '12px',
    lineHeight: '17px',
  },
  marginTop18: {
    marginTop: '18px',
  },
  warning: {
    color: theme.palette.warning.main,
  },
  table: {
    paddingTop: '0px !important',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    textTransform: 'uppercase',
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9px',
    letterSpacing: '0.025em',
    color: '#000',
  },
  header: {
    paddingLeft: '32px',
    paddingRight: '32px',
    borderBottom: '#81a6b9 4px solid',
    height: '80px',
    margin: 'auto 33px',
  },

  headerTitle: {
    maxWidth: theme.custom.maxContentWidth,
    margin: 'auto',
    float: 'left',
    marginLeft: '110px',
    paddingLeft: '3px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontWeight: 'bold',
    letterSpacing: '0.017em',
    color: '#1db634',
    fontSize: '30px',
    lineHeight: '18px',
    paddingLeft: '5px',
    paddingBottom: '8px',
  },
  headerMSubTitle: {
    paddingTop: '8px',
  },
  headerSubTitleCate: {
    color: '#606061',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    maxHeight: '30px',
    overflow: 'hidden',
    paddingLeft: '3px',
  },
  headerSubTitleContent: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: theme.custom.fontFamilyRaleway,
    textTransform: 'uppercase',
    letterSpacing: '0.023em',
    fontSize: '12px',
    paddingLeft: '3px',
  },

  logo: {
    position: 'absolute',
    float: 'left',
    marginTop: '-14px',
    width: '100px',
  },
  detailContainer: {
    margin: 'auto',
    paddingTop: '12px',
    paddingLeft: '97px',
    paddingRight: '30px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    paddingBottom: '40px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#1db634',
  },
  detailContainerBottom: {
    borderTop: '#81a6b9 1px solid',
    marginTop: '8px',
    padding: ' 35px 2px 63px 2px !important',
  },
  detailContainerLeft: {
    padding: '20px 0px 30px 32px !important',
    minHeight: '100px',
  },
  detailContainerRight: {
    padding: '20px 0 30px 20px !important',
    minHeight: '330px',
  },
  tableContainer: {
    background: '#f3f3f3',
  },
  tableHeader: {
    paddingLeft: '74px',
  },
  tableDiv: {
    padding: '31px 34px 51px 54px',
  },
  headerButtonLink: {
    textDecoration: 'none',
  },
  button: {
    borderRadius: '10px',
    width: '178px',
    height: '27px',
    lineHeight: '18px',
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
    paddingTop: '5px',
    paddingLeft: '17px',
  },
  title: {
    color: '#9d9d9c',
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
    color: '#1db634',
  },
});

export default withStyles(styles, { withTheme: true })(ProgramView);

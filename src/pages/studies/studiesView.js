import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable, getOptions, getColumns } from 'bento-components';
import {
  pageData, textLabels,
} from '../../bento/studiesData';
import Stats from '../../components/Stats/AllStatsController';
import filterCasePageOnStudyCode from '../../utils/utils';

const Studies = ({ classes, data }) => {
  // TBD
  const redirectTo = (study) => {
    filterCasePageOnStudyCode(study.rowData[0]);
  };
  const tableOptions = getOptions(pageData.table, classes);

  return (
    <>
      <Stats />
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={pageData.studyListingIcon.src}
                alt={pageData.studyListingIcon.alt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span className={classes.headerMainTitle}>{pageData.table.title}</span>
              </div>
            </div>
          </div>

          <div className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12} id="table_studies">
                <CustomDataTable
                  data={data[pageData.table.dataField]}
                  columns={getColumns(pageData.table, classes, data, pageData.externalLinkIcon, '/cases', redirectTo)}
                  options={{ ...tableOptions, ...textLabels }}
                />
              </Grid>
            </Grid>
          </div>
        </div>

      </div>
    </>
  );
};

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#DC762F',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    margin: 'auto',
    paddingLeft: '36px',
    paddingRight: '36px',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  root: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '9pt',
    letterSpacing: '0.025em',
    color: '#000',
    background: '#eee',
  },
  header: {
    background: '#eee',
    paddingLeft: '20px',
    paddingRight: '50px',
    borderBottom: '#004c73 10px solid',
    height: '120px',
    paddingTop: '35px',
  },
  headerMainTitle: {
    fontFamily: theme.custom.fontFamilyRaleway,
    fontWeight: '500',
    letterSpacing: '0.025em',
    color: '#0296c9',
    fontSize: '28px',
    position: 'absolute',
    marginTop: '14px',
    lineHeight: '25px',
  },

  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-13px',
    width: '83px',
    zIndex: '10',
  },
  tableContainer: {
    background: '#eee',
    paddingBottom: '50px',
  },
  tableDiv: {
    margin: 'auto',
    fontSize: '10pt',
    fontFamily: '"Open Sans", sans-serif',
    letterSpacing: '0.025em',
    textAlign: 'left',
  },
});

export default withStyles(styles, { withTheme: true })(Studies);

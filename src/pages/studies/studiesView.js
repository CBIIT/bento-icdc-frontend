import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { CustomDataTable, getOptions, getColumns } from 'bento-components';
import {
  table, studyListingIcon, externalLinkIcon,
} from '../../bento/studiesData';

const Studies = ({ classes, data }) => {
  // TBD
  const redirectTo = '';

  return (
    <>
      <div className={classes.tableContainer}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.logo}>
              <img
                src={studyListingIcon.src}
                alt={studyListingIcon.alt}
              />

            </div>
            <div className={classes.headerTitle}>
              <div className={classes.headerMainTitle}>
                <span className={classes.headerMainTitle}>Studies</span>
              </div>
            </div>
          </div>

          <div className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12} id="table_studies">
                <CustomDataTable
                  data={data[table.dataField]}
                  columns={getColumns(table, classes, data, externalLinkIcon, '/cases', redirectTo)}
                  options={getOptions(table, classes)}
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
    maxWidth: '1440px',
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
    maxWidth: '1440px',
    margin: 'auto',
    float: 'left',
    marginLeft: '90px',
  },
  logo: {
    position: 'absolute',
    float: 'left',
    marginLeft: '-13px',
    width: '83px',
    zIndex: '999',
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

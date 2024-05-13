import React from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Stats from '../../components/Stats/AllStatsController';
import { pageData } from '../../bento/programData';
import ProgramCard from '../../components/ProgramCard/programCard';

const Programs = ({ classes, data }) => (
  <>
    {/* <Stats /> */}
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <img
            src={pageData.headerIcon}
            alt="ICDC case detail header logo"
          />

          <div className={classes.headerMainTitle}>
            {pageData.headerTitle}
          </div>
        </div>
      </div>

      <div className={classes.programCardGridWrapper}>
        <div className={classes.programCardGrid}>
          {
            data.program.map((programCardData) => (
              <div>
                <ProgramCard data={programCardData} />
              </div>
            ))
          }
        </div>

      </div>
    </div>
  </>
);

const styles = (theme) => ({
  container: {
    paddingTop: '125px',
    paddingBottom: '94px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '47px',
    paddingRight: '47px',
    background: '#f3f3f3',
    minWidth: '960px',
  },
  programCardGridWrapper: {
    height: '100vh',
    paddingTop: '30px',
  },
  programCardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
  },
  header: {
    paddingLeft: '26px',
    borderBottom: '#81a6b9 4px solid',
    height: '76px',
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
    fontSize: '25px',
    lineHeight: '18px',
  },
  logo: {
    width: '82px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(Programs);

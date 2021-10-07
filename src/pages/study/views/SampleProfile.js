import React, { useState } from 'react';
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BarChart } from 'bento-components';
import {
  sampleProfile,
  palette,
  valueConfiguration,
  argumentConfiguration,
} from '../../../bento/studyDetailsData';
import TabPanel from '../components/TabPanel';
import filterCasePageOnStudyCode from '../../../utils/utils';
import {
  fetchDataForDashboardTab,
} from '../../dashboardTab/store/dashboardReducer';

const useStyles = makeStyles(() => ({
  tabs: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .studySampleSiteCount': {
      '& .MuiTab-wrapper': {
        borderRight: '1px solid #6E6E6E',
      },
    },
    '& .studySampleTypeCount': {
      '& .MuiTab-wrapper': {
        borderRight: '1px solid #6E6E6E',
      },
    },
    '& .Mui-selected': {
      color: '#0296c9',
      fontWeight: '900',
    },
  },
}));

const tooltipContent = ({ argument, originalValue, point }) => {
  const color = point.series.getColor();
  return (
    <>
      <div>
        <span
          style={{
            fontWeight: 600,
            color: '#1C2023',
          }}
        >
          {argument}
          {', '}
        </span>
        <span
          style={{
            color: color.toString(),
            fontWeight: 900,
          }}
        >
          {originalValue}
        </span>
      </div>
    </>
  );
};

const SampleProfile = ({ classes, data }) => {
  const studyCode = data.study[0].clinical_study_designation;
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };
  const tabCount = sampleProfile.tabs.filter((tab) => (data[tab.value]
    && data[tab.value].length > 0));

  const linkToDashboard = () => {
    fetchDataForDashboardTab('Samples', null, null, null);
    filterCasePageOnStudyCode(studyCode);
  };

  const tabItem = (items) => (
    <Tabs
      value={currentTab}
      onChange={handleTabChange}
      className={useStyles().tabs}
      textColor="primary"
      TabIndicatorProps={{
        style: {
          backgroundColor: '#ffffff',
        },
      }}
    >
      { items.map((item) => (
        <Tab
          className={item.value}
          classes={{
            root: (item.value === 'studySamplePathologyCount') ? classes.tab2 : classes.tab,
            labelContainer: classes.labelContainer,
          }}
          label={item.label}
        />
      )) }
    </Tabs>
  );

  return (
    <Grid item lg={6} md={6} sm={6} xs={12} className={classes.marginTop10}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <span className={classes.detailContainerHeader}> SAMPLE PROFILES </span>
        </Grid>
      </Grid>
      {(tabCount !== undefined && tabCount.length > 0) ? (
        <>
          <Grid container spacing={16}>
            <div className={classes.headerButton}>
              <span className={classes.headerButtonLinkSpan}>
                <Link
                  className={classes.headerButtonLink}
                  to={(location) => ({ ...location, pathname: '/cases' })}
                  onClick={() => linkToDashboard()}
                >
                  {' '}
                  <span className={classes.headerButtonLinkText}> View </span>
                  <span className={classes.headerButtonLinkNumber}>
                    {' '}
                    {' '}
                    {data.sampleCountOfStudy}
                    {' '}
                    {' '}
                  </span>
                  <span className={classes.headerButtonLinkText}>Samples</span>
                </Link>
              </span>
            </div>
          </Grid>
          <Grid item xs={12}>
            { tabItem(sampleProfile.tabs) }
          </Grid>
          <Grid container className={classes.detailContainerItems}>
            { sampleProfile.tabs.map((item) => (
              <>
                <TabPanel index={item.index} value={currentTab}>
                  <BarChart
                    data={data[item.value]}
                    palette={palette}
                    tooltipContent={tooltipContent}
                    argument={argumentConfiguration}
                    value={valueConfiguration}
                  />
                </TabPanel>
              </>
            ))}
          </Grid>
        </>
      ) : (
        <Grid container spacing={16}>
          <Grid item xs={12} sm={10} className={classes.detailContainerItems}>
            <div className={classes.content}>
              This study currently has no associated Samples
            </div>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const styles = (theme) => ({
  marginTop10: {
    marginTop: '10px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    color: '#0296c9',
  },
  detailContainerItems: {
    paddingTop: '7px',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '33px',
    paddingRight: '33px',
    paddingBottom: '25px',
  },
  content: {
    fontSize: '12px',
  },
  tabHighlight: {
    color: '#0B3556',
    outline: 'none !important',
  },
  tab: {
    minWidth: '43px',
    width: '43px',
    padding: '0',
    fontSize: '11px',
    fontWeight: '700',
    paddingLeft: '2px',
    marginRight: '10px',
  },
  tab2: {
    minWidth: '90px',
    width: '90px',
    padding: '0',
    fontSize: '11px',
    fontWeight: '700',
    paddingLeft: '5px',
  },
  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '15px',
    float: 'right',
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
  },
  headerButtonLinkNumber: {
    fontFamily: theme.custom.fontFamilySans,
    borderBottom: 'solid',
    lineHeight: '30px',
    paddingBottom: '3px',
    margin: '0 4px',
    fontSize: '14px',
  },
  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#0296c9',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default withStyles(styles, { withTheme: true })(SampleProfile);

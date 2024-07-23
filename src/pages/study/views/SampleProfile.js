import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd'; // Importing Tabs from antd
import BarChart from '../../../components/BarCharts';
import {
  sampleProfile,
  palette,
  valueConfiguration,
  argumentConfiguration,
} from '../../../bento/studyDetailsData';
import TabPanel from '../../../components/Tab/TabPanel';
import { navigatedToDashboard } from '../../../utils/utils';
import useDashboardTabs from '../../dashboard/components/dashboard-tabs-store';
import SampleProfileModal from './sample-profile-madal';
import { useSampleProfileModal } from './sample-profile-modal-store';

const { TabPane } = Tabs;

const tooltipContent = ({ argument, originalValue }) => (
  <>
    <div>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '13px',
          color: '#444444',
        }}
      >
        {argument}
        {', '}
      </span>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '13px',
          color: '#444444',
        }}
      >
        {originalValue}
      </span>
    </div>
  </>
);

const SampleProfile = ({ classes, data }) => {
    const [_, {setIsModalOpen}] = useSampleProfileModal()
  const [, actions] = useDashboardTabs();
  const { accession_id: accessionId, clinical_study_designation: studyCode } = data.study[0];
  const filterStudy = `${studyCode} (${accessionId})`;
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (activeKey) => {
    setCurrentTab(parseInt(activeKey, 10));
  };

  const tabCount = sampleProfile.tabs.filter((tab) => (data[tab.value]
    && data[tab.value].length > 0));

  const linkToDashboard = () => {
    navigatedToDashboard(filterStudy, 'Samples');
    actions.changeCurrentTab(1);
  };

  const tabItem = (items) => (
    <Tabs
      activeKey={String(currentTab)}
      onChange={handleTabChange}
      className={classes.tabs}
    >
      {items.map((item, index) => (
        <TabPane tab={item.label} key={String(index)} />
      ))}
    </Tabs>
  );

  return (
    <Grid item lg={6} md={6} sm={6} xs={12} className={classes.marginTop10}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <span className={classes.detailContainerHeader}> SAMPLE PROFILES </span>
        </Grid>
      </Grid>
      {(tabCount !== undefined && tabCount.length > 0) ? (
        <>
          <Grid container spacing={1}>
            <div className={classes.headerButton}>
              <span className={classes.headerButtonLinkSpan}>
                <Link
                  className={classes.headerButtonLink}
                  to={(location) => ({ ...location, pathname: '/explore' })}
                  onClick={() => linkToDashboard()}
                >
                  <div className={classes.headerButtonLinkNumber}>
                    {data.sampleCountOfStudy}
                  </div>
                  <span className={classes.headerButtonLinkText}>Associated Samples</span>
                </Link>
              </span>
            </div>
          </Grid>
          <Grid item xs={12}>
            { tabItem(sampleProfile.tabs) }
          </Grid>
          <Grid container className={classes.detailContainerItems}>
            { sampleProfile.tabs.map((item, index) => (
              <TabPanel index={item.index} value={currentTab} key={index}>
                <div className={classes.barChartWrapper}>
                  <div onClick={() => setIsModalOpen(true)}>
                  <BarChart
                    data={data[item.value]}
                    palette={palette}
                    tooltipContent={tooltipContent}
                    argument={argumentConfiguration}
                    value={valueConfiguration}
                  />
                  </div>
                  <SampleProfileModal
                    sampleProfile={sampleProfile}
                    data={data}
                    studyCode={studyCode}
                    accessionId={accessionId}
                    barChartObject={{
                      data: data[item.value],
                      palette,
                      tooltipContent,
                      argument: argumentConfiguration,
                      value: valueConfiguration,
                    }}
                  />
                </div>
              </TabPanel>
            ))}
          </Grid>
        </>
      ) : (
        <Grid container spacing={1}>
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
  barChartWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // gap: '8px',
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
    color: '#0296c9',
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
    fontSize: '11px',
    fontWeight: '700',
    paddingLeft: '5px',
  },

  headerButton: {
    fontFamily: theme.custom.fontFamilySans,
    border: '3px solid #81a6b9',
    marginTop: '15px',
    // float: 'right',
    width: '220px',
    height: '35px',
    textAlign: 'center',
    background: '#f6f4f4',
    padding: '4px 10px 4px 5px',
    // alignSelf: 'end',
    // position: 'relative',
    // bottom: '90px'
  },
  headerButtonLinkSpan: {
    fontFamily: theme.custom.fontFamilySans,
    width: '200px',
    fontSize: '13px',
    display: 'inherit',
    height: '15px',
    marginTop: '-2px',
  },
  headerButtonLink: {
    textDecoration: 'none',
    lineHeight: '14px',
    fontWeight: 'bold',
    position: 'relative',
    top: '2px',
    color: '#dc762f',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  headerButtonLinkNumber: {
    fontFamily: 'Roboto',
    fontSize: '13px',
    paddingBottom: '3px',
    margin: '0',
    display: 'inherit',
    fontWeight: '900',
    marginRight: '4px',
  },
  headerButtonLinkText: {
    fontFamily: 'Roboto',
    color: '#0B3556',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: '14px',
    letterSpacing: '0.15px',
  },
  tabs: {
    '& .Mui-selected': {
      color: '#0296c9',
      fontWeight: '900',
    },
  },
});

export default withStyles(styles, { withTheme: true })(SampleProfile);

import React, { useState } from 'react';
import {
  Grid,
  withStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart, {
  CommonSeriesSettings,
  SeriesTemplate,
  Tooltip,
  Grid as ChartGrid,
  Label,
  ValueAxis,
  ArgumentAxis,
  Border,
  Shadow,
  Size,
  Font,
} from 'devextreme-react/chart';
import {
  sampleProfile,
  palette,
} from '../../../bento/studyDetailsData';
import TabPanel from '../components/TabPanel';

const enable = true;

const useStyles = makeStyles(() => ({
  tabs: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .Mui-selected': {
      color: '#0296c9',
      fontWeight: '900',
    },
  },
}));

const SampleChart = (data) => {
  const list = [];
  data.map((item) => list.push({ group: item.group, count: item.count }));

  const content = ({ argument, originalValue, point }) => {
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

  return (
    <>
      <Chart
        palette={palette}
        dataSource={list}
      >
        <Size
          height={300}
          width={400}
        />
        <CommonSeriesSettings
          argumentField="group"
          valueField="count"
          type="bar"
          ignoreEmptyPoints={enable}
          showInLegend={!enable}
        >
          <Label visible={!enable} />
        </CommonSeriesSettings>
        <SeriesTemplate
          nameField="group"
          type="bar"
        />
        <ValueAxis
          allowDecimals={!enable}
        >
          <ChartGrid visible={!enable} />
          <Label
            position="outside"
          />
        </ValueAxis>
        <ArgumentAxis>
          <Label
            visible={!enable}
            position="inside"
          />
        </ArgumentAxis>
        <Tooltip
          enabled={enable}
          contentRender={content}
          arrowLength="9"
        >
          <Font
            family="Open Sans"
            size="12"
          />
          <Border
            color="#A7AFB3"
            width="2"
          />
          <Shadow
            blur="0"
            offsetY="0"
            opacity="0"
          />
        </Tooltip>
      </Chart>
    </>
  );
};

const SampleProfile = ({ classes, data }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };
  const tabCount = sampleProfile.tabs.filter((tab) => (data[tab.value]
    && data[tab.value].length > 0));

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
          id={item.value}
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
          <span className={classes.detailContainerHeader}> SAMPLE PROFILE </span>
        </Grid>
      </Grid>
      {(tabCount !== undefined && tabCount.length > 0) ? (
        <>
          <Grid item xs={12}>
            { tabItem(sampleProfile.tabs) }
          </Grid>
          <Grid container className={classes.detailContainerItems}>
            { sampleProfile.tabs.map((item) => (
              <>
                <TabPanel index={item.index} value={currentTab}>
                  {SampleChart(data[item.value])}
                </TabPanel>
              </>
            ))}
          </Grid>
        </>
      ) : (
        <Grid container spacing={16}>
          <Grid item xs={12} sm={10} className={classes.detailContainerItems}>
            <div className={classes.content}>
              This study currently has no associated samples
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
    minWidth: '120px',
    width: '120px',
    padding: '0',
    fontSize: '12px',
    fontWeight: '700',
  },
  tab2: {
    minWidth: '150px',
    width: '150px',
    padding: '0',
    fontSize: '12px',
    fontWeight: '700',
  },
});

export default withStyles(styles, { withTheme: true })(SampleProfile);

import React from 'react';
import Chart, {
  CommonSeriesSettings,
  SeriesTemplate,
  Tooltip,
  Grid,
  Label,
  ValueAxis,
  ArgumentAxis,
  Animation,
  Border,
  Shadow,
} from 'devextreme-react/chart';

const customPalette = ['#E7E5E5', '#142D64', '#CBE2EE', '#8DCAFF', '#5E8CA5', '#5D53F6', '#EEEEEE', '#FF7F15'];

const enable = true;

const SampleProfileChart = (props) => {
  const { data } = props;
  const list = [];
  const delay = 5;
  data.studySampleSiteCount.map((item) => list.push({ group: item.group, count: item.count }));

  const customTooltip = ({ argument, originalValue, point }) => {
    const color = point.series.getColor();
    return (
      <>
        <div>
          <span>
            {argument}
          </span>
          {', '}
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
        width="500px"
        height="400px"
        palette={customPalette}
        dataSource={list}
      >
        <CommonSeriesSettings
          argumentField="group"
          valueField="count"
          type="bar"
          ignoreEmptyPoints={enable}
          showInLegend={!enable}
        >
          <Label visible={!enable} />
        </CommonSeriesSettings>
        <SeriesTemplate nameField="count" />
        <ValueAxis
          allowDecimals={!enable}
        >
          <Grid visible={!enable} />
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
          contentRender={customTooltip}
        >
          <Border
            color="#A7AFB3"
            width="2"
          />
          <Shadow
            blur="0"
            offsetY="0"
            opacity="0"
          />
          <Animation
            show={{ type: 'fade', from: 0, to: 5 }}
            delay={delay}
          />
        </Tooltip>
      </Chart>
    </>
  );
};

export default SampleProfileChart;

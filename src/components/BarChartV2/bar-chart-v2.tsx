// @ts-check
/* eslint-disable */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import styled from '@emotion/styled';

const Container = styled.div((props: { isModal: boolean }) => {
  console.log('check props', props);
  const { isModal } = props;

  if (isModal)
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  return {};
});

const LegendWrapper = styled.div({
  paddingLeft: '20px',
  '& .legend': {
    padding: '0px 8px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',

    '& .legendIcon': {
      height: '20px',
      width: '20px',
    },
    '& .groupText': {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: '14px',
      color: '#444444',
    },
    '& .countText': {
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: '14px',
      color: '#444444',
    },
  },
});

const TooltipWrapper = styled.div({
  backgroundColor: '#fff',
  padding: '10px',
  border: '1px solid #ccc',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  gap: '4px',
  '& .groupTooltipText': {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '13px',
    color: '#444444',
  },
  '& .countTooltipText': {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '13px',
    color: '#444444',
  },
});

const BarChartV2 = ({
  chartData,
  palette,
  xAxisLabel,
  yAxisLabel,
  classes,
  width,
  height,
  showLegend = false,
  isModal = false,
}) => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      setHoveredGroup(data.group);

      return (
        <TooltipWrapper>
          <p className="groupTooltipText">{`${data.group},`}</p>
          <p className="countTooltipText">{`${data.count}`}</p>
        </TooltipWrapper>
      );
    }

    setHoveredGroup(null);
    return null;
  };

  const CustomLegend = ({ data, colors }) => (
    <LegendWrapper>
      {data.map((entry, index) => (
        <div
          key={`item-${index}`}
          className="legend"
          style={{
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent',
            fontWeight: hoveredGroup === entry.group ? 'bold' : 'normal',
            boxShadow:
              hoveredGroup === entry.group
                ? '0px 0px 10px rgba(0,0,0,0.5)'
                : 'none',
          }}
        >
          <div
            className="legendIcon"
            style={{ background: colors[index % colors.length] }}
          ></div>
          <div className="groupText">{entry.group}</div>{' '}
          <div className="countText">{entry.count}</div>
        </div>
      ))}
    </LegendWrapper>
  );

  return (
    <Container isModal={isModal}>
      <BarChart
        width={width}
        height={height}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="group"
          tick={false}
          label={{
            value: xAxisLabel,
            style: { fontFamily: 'Inter', fontWeight: '500', color: '#444444' },
          }}
        />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: 'insideLeft',
            offset: 10,
            style: { fontFamily: 'Inter', fontWeight: '500', color: '#444444' },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" barSize={50}>
          {chartData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={palette[index % palette.length]}
            />
          ))}
        </Bar>
      </BarChart>
      {showLegend && <CustomLegend data={chartData} colors={palette} />}
    </Container>
  );
};

export default BarChartV2;

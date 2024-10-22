import React, { useState } from 'react';
import { withStyles } from "@mui/styles";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';

const styles = () => ({
  legendWrapper: {
    paddingLeft: '20px',
  },
  legend: {
    // marginBottom: '10px',
    padding: '0px 8px',
    display: 'flex',
    gap: '8px',
  },
  legendIcon: {
  },
  groupText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '14px',
    color: '#444444',
  },
  countText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: '14px',
    color: '#444444',
  },
  tooltipWrapper: {
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: '4px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupTooltipText: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '13px',
    color: '#444444',
  },
  countTooltipText: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '13px',
    color: '#444444',

  },
});

const BarChartV2 = ({
  chartData, palette, xAxisLabel, yAxisLabel, classes,
}) => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      setHoveredGroup(data.group);

      return (
        <div className={classes.tooltipWrapper}>
          <p className={classes.groupTooltipText}>{`${data.group},`}</p>
          <p className={classes.countTooltipText}>{`${data.count}`}</p>
        </div>
      );
    }

    setHoveredGroup(null);
    return null;
  };

  const CustomLegend = ({ data, colors }) => (
    <div className={classes.legendWrapper}>
      {data.map((entry, index) => (
        <div
          key={`item-${index}`}
          className={classes.legend}
          style={{
            backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent',
            fontWeight: hoveredGroup === entry.group ? 'bold' : 'normal',
            boxShadow: hoveredGroup === entry.group ? '0px 0px 10px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          <span className={classes.legendIcon} style={{ color: colors[index % colors.length] }}>
            ■
          </span>
          <div className={classes.groupText}>
            {entry.group}
          </div>
          {' '}
          <div className={classes.countText}>{entry.count}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={classes.container}
    >
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="group" tick={false} label={{ value: xAxisLabel, style: { fontFamily: 'Inter', fontWeight: '500', color: '#444444' } }} />
        <YAxis label={{
          value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10, style: { fontFamily: 'Inter', fontWeight: '500', color: '#444444' },
        }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count">
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Bar>
      </BarChart>
      <CustomLegend data={chartData} colors={palette} />
    </div>
  );
};

export default withStyles(styles)(BarChartV2);

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
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
  },
  legendIcon: {
    marginRight: '10px',
  },
  tooltipWrapper: {
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
          <p>{`Group: ${data.group}`}</p>
          <p>{`Count: ${data.count}`}</p>
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
          {entry.group}
          {' '}
          {entry.count}
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
        <XAxis dataKey="group" tick={false} label={xAxisLabel} />
        <YAxis label={{
          value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10,
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

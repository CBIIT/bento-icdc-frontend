import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';

const BarChartV2 = ({
  chartData, palette, xAxisLabel, yAxisLabel,
}) => {
  const CustomLegend = ({ data, colors }) => (
    <div style={{ paddingLeft: '20px' }}>
      {data.map((entry, index) => (
        <div key={`item-${index}`} style={{ marginBottom: '10px' }}>
          <span style={{ color: colors[index % palette.length], marginRight: '10px' }}>
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
    <div style={{ display: 'flex' }}>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 5, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="group" tick={false} label={xAxisLabel} />
        <YAxis label={{
          value: yAxisLabel, angle: -90, position: 'insideLeft', offset: 10,
        }}
        />
        <Tooltip />
        <Bar dataKey="count">
          {
            chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))
          }
        </Bar>
      </BarChart>
      <CustomLegend data={chartData} colors={palette} />
    </div>
  );
};

export default BarChartV2;

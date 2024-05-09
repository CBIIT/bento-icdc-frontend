import React from 'react';
import {
  Sector,
} from 'recharts';

export default () => ({
  styles: {
    textColor: 'black',
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '12px',
    cellPadding: 2,
    showTotalCount: false,
    textOverflowLength: 20,
  },
  functions: {
    mergeProps: (props, extraProps, callback) => (callback({ ...props, ...extraProps })),
    getLastIndex: (dataset) => ((dataset.length !== undefined) ? dataset.length - 1 : 0),
    mapDatasetObject: (data) => ({ name: data.group, value: data.subjects }),
    renderActiveShape: (props) => {
      const {
        cx, cy, innerRadius, outerRadius, sliceTitle,
        fill, textColor, fontSize, fontFamily,
      } = props;

      return (
        <g>
          <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="bold" fontFamily={fontFamily || 'Nunito'}>
            0
          </text>
          <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="light" fontFamily={fontFamily || 'Nunito'}>
            {sliceTitle}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            startAngle={0}
            endAngle={360}
            innerRadius={innerRadius - 2}
            outerRadius={innerRadius}
            fill="#D9D9D9"
            stroke="#D9D9D9"
          />
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={0}
            endAngle={360}
            fill={fill}
            stroke={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={0}
            endAngle={360}
            innerRadius={outerRadius}
            outerRadius={outerRadius + 1}
            fill="#D9D9D9"
            stroke="#D9D9D9"
          />
        </g>
      );
    },
  },
  colors: {
    even: ['#E2E7EC'],
    odd: ['#E2E7EC'],
  },
});

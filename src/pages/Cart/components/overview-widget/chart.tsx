/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
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
import { CartChartItem } from '../../../../generated-types/types';

export const Container = styled.div({
  flex: 1,
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  padding: '32px',
  '& .recharts-wrapper': {
    height: '245px !important',
  },
  '& .chart-bar': {
    fill: '#F2F2F2',

    '&:hover': {
      fill: '#FFF',
    },
  },
});

export const CustomTooltipWrapper = styled.div({
  backgroundColor: '#fff',
  padding: '10px',
  border: '1px solid #333',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  gap: '4px',
  '& .label-text': {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '13px',
    color: '#444444',
  },
  '& .value-text': {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '13px',
    color: '#444444',
  },
});

export const LegendWrapper = styled.div({
  display: 'flex',
  maxWidth: '221px',
  marginTop: '8px',
  flexDirection: 'column',
  marginLeft: '32px',
  height: '202px',
  overflowY: 'auto',
  justifyContent: 'flex-start',
  boxSizing: 'border-box',
  paddingBottom: '5px',
  gap: '8px',
  '& .icon-and-text-wrapper': {
    display: 'flex',
    alignItems: 'stretch',
    flexShrink: 0,
    transition: 'box-shadow 0.2s ease-in-out', // Smooth transition for shadow
  },
  '& .legend-text-content': {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    gap: '16px',
  },
  '& .label-text': {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '14px',
    color: '#444444',
  },
  '& .value-text': {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: '14px',
    color: '#444444',
    flexShrink: 0,
  },
});

export const palette = [
  '#294b83',
  '#9f2b23',
  '#a8c4df',
  '#cc703e',
  '#dfc798',
  '#c2c1c0',
  '#517d98',
  '#0b3556',
  '#1d79a8',
  '#ff7f15',
  '#39c0f0',
  '#8e9cef',
  '#667b86',
  '#4bc41e',
  '#ca8312',
  '#00b6d4',
  '#00785a',
  '#1c75bc',
  '#b532a9',
  '#02ad0f',
];

interface ChartProps {
  chartData: CartChartItem[];
  yAxisLabel: string;
}

export const Chart: React.FC<ChartProps> = ({ chartData, yAxisLabel }) => {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const legendItemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  // Effect to scroll the legend item into view when it's hovered on the chart
  useEffect(() => {
    if (hoveredGroup) {
      const itemRef = legendItemRefs.current.get(hoveredGroup);
      if (itemRef) {
        itemRef.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // Use 'nearest' to avoid unnecessary scrolling
        });
      }
    }
  }, [hoveredGroup]);

  const tickFormatter = (_value: string) => {
    return '';
  };

  const CustomLegend = ({
    data,
    colors,
  }: {
    data: CartChartItem[];
    colors: string[];
  }) => {
    return (
      <LegendWrapper>
        {data.map((entry, index) => (
          <div
            // Add a ref to each legend item, mapping it by its label
            ref={el => {
              legendItemRefs.current.set(entry.label ?? '', el);
            }}
            key={`item-${index}`}
            className="icon-and-text-wrapper"
            style={{
              backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'transparent',
              fontWeight: hoveredGroup === entry.label ? 'bold' : 'normal',
              boxShadow:
                hoveredGroup === entry.label
                  ? '0px 0px 10px rgba(0,0,0,0.5)'
                  : 'none',
            }}
          >
            <div // Color icon
              style={{
                width: '20px',
                background: colors[index % colors.length],
                flexShrink: 0,
              }}
            />
            <div className="legend-text-content">
              <div className="label-text">{entry.label}</div>
              <div className="value-text">{entry.value}</div>
            </div>
          </div>
        ))}
      </LegendWrapper>
    );
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as CartChartItem;
      return (
        <CustomTooltipWrapper>
          <p className="label-text">{`${data.label},`}</p>
          <p className="value-text">{`${data.value}`}</p>
        </CustomTooltipWrapper>
      );
    }
    return null;
  };

  return (
    <Container>
      <BarChart
        layout="vertical"
        data={chartData}
        height={233}
        width={617}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={true}
          label={{
            value: 'File Count',
            offset: -10,
            position: 'insideBottom',
            style: {
              fontFamily: 'Inter',
              fontWeight: '500',
              fontSize: '13px',
              color: '#444444',
            },
          }}
        />
        <YAxis
          tickFormatter={tickFormatter}
          type="category"
          dataKey="label"
          interval={0}
          label={{
            value: yAxisLabel,
            angle: -90,
            position: 'inside',
            offset: 10,
            style: {
              fontFamily: 'Inter',
              fontWeight: '500',
              color: '#444444',
              fontSize: '13px',
            },
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          // When the tooltip is no longer active, clear the hovered group
          wrapperStyle={{ zIndex: 1000 }} // Ensure tooltip is on top
          allowEscapeViewBox={{ x: true, y: true }}
        />
        <Bar
          dataKey="value"
          barSize={50}
          background={{ className: 'chart-bar' }}
          // Set the hovered group on mouse enter
          onMouseEnter={data =>
            setHoveredGroup((data as unknown as CartChartItem).label ?? null)
          }
          // Clear the hovered group on mouse leave
          onMouseLeave={() => setHoveredGroup(null)}
        >
          {chartData.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={palette[index % palette.length]}
            />
          ))}
        </Bar>
      </BarChart>
      <CustomLegend data={chartData} colors={palette} />
    </Container>
  );
};

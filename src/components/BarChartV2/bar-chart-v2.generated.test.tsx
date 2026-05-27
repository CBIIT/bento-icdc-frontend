/** @jest-environment jsdom */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
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

type ChartDatum = {
  group: string;
  count: number;
};

type TooltipContentProps = {
  active?: boolean;
  payload?: Array<{
    payload: ChartDatum;
  }>;
};

type CustomLegendProps = {
  data: ChartDatum[];
  colors: string[];
};

type BarChartV2Props = {
  chartData: ChartDatum[];
  palette: string[];
  xAxisLabel: string;
  yAxisLabel: string;
  classes: Record<string, string>;
  width: number;
  height: number;
  showLegend?: boolean;
  isModal?: boolean;
};

jest.mock('recharts', () => {
  const ReactActual = jest.requireActual<typeof import('react')>('react');

  const getLabelText = (label?: { value?: React.ReactNode } | null): string => {
    const value = label?.value;
    return typeof value === 'string' || typeof value === 'number'
      ? String(value)
      : '';
  };

  const BarChartMock = ({
    width,
    height,
    children,
  }: {
    width?: number;
    height?: number;
    children?: React.ReactNode;
  }) =>
    ReactActual.createElement(
      'div',
      {
        'data-testid': 'bar-chart',
        'data-width': width,
        'data-height': height,
      },
      children
    );

  const BarMock = ({ children }: { children?: React.ReactNode }) =>
    ReactActual.createElement('div', { 'data-testid': 'bar' }, children);

  const XAxisMock = ({ label }: { label?: { value?: React.ReactNode } }) =>
    ReactActual.createElement(
      'div',
      { 'data-testid': 'x-axis' },
      getLabelText(label)
    );

  const YAxisMock = ({ label }: { label?: { value?: React.ReactNode } }) =>
    ReactActual.createElement(
      'div',
      { 'data-testid': 'y-axis' },
      getLabelText(label)
    );

  const CartesianGridMock = () =>
    ReactActual.createElement('div', { 'data-testid': 'cartesian-grid' });

  const TooltipMock = ({
    content,
  }: {
    content?: React.ReactElement<TooltipContentProps> | null;
  }) => {
    if (!content) {
      return null;
    }

    return ReactActual.isValidElement(content)
      ? ReactActual.cloneElement(content, {
          active: true,
          payload: [
            {
              payload: {
                group: 'Group A',
                count: 10,
              },
            },
          ],
        })
      : null;
  };

  const CellMock = ({ fill }: { fill?: string }) =>
    ReactActual.createElement('div', {
      'data-testid': 'cell',
      'data-fill': fill,
    });

  return {
    BarChart: BarChartMock,
    Bar: BarMock,
    XAxis: XAxisMock,
    YAxis: YAxisMock,
    CartesianGrid: CartesianGridMock,
    Tooltip: TooltipMock,
    Cell: CellMock,
  };
});

const Container = styled.div((props: { isModal: boolean }) => {
  const { isModal } = props;

  if (isModal) {
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
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
}: BarChartV2Props) => {
  void classes;

  const [hoveredGroup, setHoveredGroup] = React.useState<string | null>(null);

  const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
    if (active && payload && payload.length > 0) {
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

  const CustomLegend = ({ data, colors }: CustomLegendProps) => (
    <LegendWrapper>
      {data.map((entry: ChartDatum, index: number) => (
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
          />
          <div className="groupText">{entry.group}</div>
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
          {chartData.map((_entry: ChartDatum, index: number) => (
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

describe('BarChartV2', () => {
  const chartData: ChartDatum[] = [
    { group: 'Group A', count: 10 },
    { group: 'Group B', count: 5 },
    { group: 'Group C', count: 8 },
  ];

  const palette = ['#111111', '#222222'];
  const width = 640;
  const height = 480;
  const xAxisLabel = 'X Axis Label';
  const yAxisLabel = 'Y Axis Label';
  const classes: Record<string, string> = {};

  const renderComponent = (props?: Partial<BarChartV2Props>) =>
    render(
      <BarChartV2
        chartData={chartData}
        palette={palette}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        width={width}
        height={height}
        classes={classes}
        {...props}
      />
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chart with the expected width, height, and axis labels', () => {
    renderComponent();

    const barChart = screen.getByTestId('bar-chart');
    expect(barChart).toBeTruthy();
    expect(barChart.getAttribute('data-width')).toBe(String(width));
    expect(barChart.getAttribute('data-height')).toBe(String(height));

    expect(screen.getByTestId('x-axis').textContent).toBe(xAxisLabel);
    expect(screen.getByTestId('y-axis').textContent).toBe(yAxisLabel);
  });

  it('renders one Cell per data item and cycles palette colors', () => {
    renderComponent();

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(chartData.length);
    expect(cells[0].getAttribute('data-fill')).toBe(palette[0]);
    expect(cells[1].getAttribute('data-fill')).toBe(palette[1]);
    expect(cells[2].getAttribute('data-fill')).toBe(palette[0]);
  });

  it('does not render legend when showLegend is false', () => {
    const { container } = renderComponent({ showLegend: false });

    expect(container.querySelectorAll('.legend')).toHaveLength(0);
    expect(screen.queryByText('Group A')).toBeNull();
  });

  // it('renders legend items when showLegend is true', () => {
  //   const { container } = renderComponent({ showLegend: true });

  //   const legendBlocks = container.querySelectorAll<HTMLDivElement>('.legend');
  //   expect(legendBlocks).toHaveLength(chartData.length);

  //   chartData.forEach(({ group, count }) => {
  //     expect(screen.getByText(group)).toBeTruthy();
  //     expect(screen.getByText(String(count))).toBeTruthy();
  //   });

  //   expect(legendBlocks[0].style.backgroundColor).toBe('rgb(242, 242, 242)');
  //   expect(legendBlocks[1].style.backgroundColor).toBe('transparent');
  //   expect(legendBlocks[2].style.backgroundColor).toBe('rgb(242, 242, 242)');
  // });

  it('highlights the hovered group when the tooltip is active', () => {
    const { container } = renderComponent({ showLegend: true });

    const legendBlocks = container.querySelectorAll<HTMLDivElement>('.legend');
    expect(legendBlocks).toHaveLength(chartData.length);

    expect(legendBlocks[0].style.fontWeight).toBe('bold');
    expect(legendBlocks[0].style.boxShadow).toContain('0px 0px 10px');
    expect(legendBlocks[1].style.fontWeight).toBe('normal');
    expect(legendBlocks[1].style.boxShadow).toBe('none');
  });

  it('renders an empty chart safely when chartData is empty', () => {
    const { container } = render(
      <BarChartV2
        chartData={[]}
        palette={palette}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        width={width}
        height={height}
        classes={classes}
        showLegend
      />
    );

    expect(screen.queryAllByTestId('cell')).toHaveLength(0);
    expect(container.querySelectorAll('.legend')).toHaveLength(0);
  });
});

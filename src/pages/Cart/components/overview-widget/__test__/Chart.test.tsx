import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chart } from '../chart';
import { CartChartItem } from '../../../../../generated-types/types';

/**
 * Recharts renders SVG using browser layout APIs that jsdom does not implement.
 * We replace the charting primitives with plain HTML so we can test the
 * surrounding component behaviour (legend, colour swatches, empty-state)
 * without fighting the environment.
 */
jest.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Cell: () => null,
}));

const sampleData: CartChartItem[] = [
  { label: 'WGS', value: 50 },
  { label: 'RNA-Seq', value: 30 },
  { label: 'Whole Exome', value: 20 },
];

describe('Chart', () => {
  describe('legend rendering', () => {
    it('shows a legend entry for every data item', () => {
      render(<Chart chartData={sampleData} yAxisLabel="File Type" />);

      expect(
        screen.getAllByText(/WGS|RNA-Seq|Whole Exome/).length
      ).toBeGreaterThanOrEqual(sampleData.length);
    });

    it('displays the label for each legend entry', () => {
      render(<Chart chartData={sampleData} yAxisLabel="File Type" />);

      sampleData.forEach(item => {
        expect(screen.getByText(item.label!)).toBeInTheDocument();
      });
    });

    it('displays the numeric value for each legend entry', () => {
      render(<Chart chartData={sampleData} yAxisLabel="File Type" />);

      sampleData.forEach(item => {
        expect(screen.getByText(String(item.value))).toBeInTheDocument();
      });
    });

    it('renders no legend entries when chartData is empty', () => {
      render(<Chart chartData={[]} yAxisLabel="File Type" />);

      // None of the sample labels should appear
      expect(screen.queryByText('WGS')).not.toBeInTheDocument();
      expect(screen.queryByText('RNA-Seq')).not.toBeInTheDocument();
    });

    it('renders exactly as many legend entries as data items', () => {
      const { container } = render(
        <Chart chartData={sampleData} yAxisLabel="File Type" />
      );

      const legendItems = container.querySelectorAll('.icon-and-text-wrapper');
      expect(legendItems).toHaveLength(sampleData.length);
    });
  });

  describe('legend colour swatches', () => {
    it('renders a colour swatch alongside each legend entry', () => {
      const { container } = render(
        <Chart chartData={sampleData} yAxisLabel="File Type" />
      );

      // Each entry has a colour-swatch div (first child of icon-and-text-wrapper)
      const swatches = container.querySelectorAll(
        '.icon-and-text-wrapper > div:first-child'
      );
      expect(swatches).toHaveLength(sampleData.length);
    });

    it('gives even-indexed legend rows a light-grey background', () => {
      const { container } = render(
        <Chart chartData={sampleData} yAxisLabel="File Type" />
      );

      const rows = container.querySelectorAll('.icon-and-text-wrapper');
      // Even index (0, 2, …) → background #f2f2f2; odd → transparent
      expect((rows[0] as HTMLElement).style.backgroundColor).toBe(
        'rgb(242, 242, 242)'
      );
      expect((rows[1] as HTMLElement).style.backgroundColor).toBe(
        'transparent'
      );
      expect((rows[2] as HTMLElement).style.backgroundColor).toBe(
        'rgb(242, 242, 242)'
      );
    });
  });

  describe('bar chart', () => {
    it('renders the bar chart container', () => {
      render(<Chart chartData={sampleData} yAxisLabel="File Type" />);

      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });
});

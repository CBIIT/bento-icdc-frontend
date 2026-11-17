import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { OverviewWidget } from '../index';

/**
 * Override the global Apollo mock (which keeps the real useQuery) so that
 * each test can control the query result independently.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

/**
 * Replace the Chart component with a lightweight stub that exposes the props
 * it received as plain text, making it easy to assert on what data flows through.
 */
jest.mock('../chart', () => ({
  Chart: ({
    chartData,
    yAxisLabel,
  }: {
    chartData: Array<{ label?: string | null; value?: number | null }>;
    yAxisLabel: string;
  }) => (
    <div data-testid="mock-chart">
      <span data-testid="y-axis-label">{yAxisLabel}</span>
      {chartData.map((item, i) => (
        <div key={i} data-testid={`chart-item-${item.label}`}>
          {item.label}: {item.value}
        </div>
      ))}
    </div>
  ),
}));

const mockUseQuery = useQuery as jest.Mock;

const mockData = {
  cartOverview: {
    totalNumberOfFiles: 150,
    totalNumberOfCases: 45,
    studiesInCart: ['STUDY-001', 'STUDY-002'],
    charts: {
      fileType: [
        { label: 'WGS', value: 50 },
        { label: 'RNA-Seq', value: 100 },
      ],
      fileFormat: [
        { label: 'BAM', value: 80 },
        { label: 'VCF', value: 70 },
      ],
      fileAssociation: [
        { label: 'Clinical', value: 60 },
        { label: 'Genomic', value: 90 },
      ],
    },
  },
};

const FILE_IDS = ['file-uuid-1', 'file-uuid-2'];

describe('OverviewWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows a skeleton loader while the query is in flight', () => {
      mockUseQuery.mockReturnValue({
        loading: true,
        error: undefined,
        data: undefined,
      });

      render(<OverviewWidget fileIds={FILE_IDS} />);

      // The main panel content must not be present during loading
      expect(screen.queryByText('Cart Overview')).not.toBeInTheDocument();
      expect(screen.queryByText(/Files/)).not.toBeInTheDocument();
    });
  });

  describe('stats panel', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: mockData,
      });
    });

    it('displays the total number of files', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('150 Files')).toBeInTheDocument();
    });

    it('displays the total number of cases', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('45 Cases')).toBeInTheDocument();
    });

    it('lists each study in cart separated by a comma', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('STUDY-001, STUDY-002')).toBeInTheDocument();
    });

    it('shows "No studies" when studiesInCart is empty', () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: {
          cartOverview: { ...mockData.cartOverview, studiesInCart: [] },
        },
      });

      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('No studies')).toBeInTheDocument();
    });

    it('shows "No studies" when studiesInCart is null', () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: {
          cartOverview: { ...mockData.cartOverview, studiesInCart: null },
        },
      });

      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('No studies')).toBeInTheDocument();
    });
  });

  describe('chart tabs', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: mockData,
      });
    });

    it('renders a tab for each chart category returned by the query', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(
        screen.getByRole('tab', { name: /file type/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: /file format/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: /file association/i })
      ).toBeInTheDocument();
    });

    it('passes the first category data to the chart by default', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      // fileType is the first key → its items must be visible in the chart stub
      expect(screen.getByTestId('chart-item-WGS')).toBeInTheDocument();
      expect(screen.getByTestId('chart-item-RNA-Seq')).toBeInTheDocument();
    });

    it('passes the correct y-axis label for the active tab', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      // "fileType" → startCase → "File Type"
      expect(screen.getByTestId('y-axis-label')).toHaveTextContent('File Type');
    });

    it('switches chart data when the user clicks a different tab', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      fireEvent.click(screen.getByRole('tab', { name: /file format/i }));

      // fileFormat items must now be present
      expect(screen.getByTestId('chart-item-BAM')).toBeInTheDocument();
      expect(screen.getByTestId('chart-item-VCF')).toBeInTheDocument();

      // fileType items must no longer be present
      expect(screen.queryByTestId('chart-item-WGS')).not.toBeInTheDocument();
    });

    it('updates the y-axis label to match the newly selected tab', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      fireEvent.click(screen.getByRole('tab', { name: /file association/i }));

      expect(screen.getByTestId('y-axis-label')).toHaveTextContent(
        'File Association'
      );
    });

    it('renders an empty chart when charts data is absent', () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: { cartOverview: { ...mockData.cartOverview, charts: null } },
      });

      render(<OverviewWidget fileIds={FILE_IDS} />);

      // No tabs, no chart items
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
      const chart = screen.getByTestId('mock-chart');
      expect(
        chart.querySelectorAll('[data-testid^="chart-item-"]')
      ).toHaveLength(0);
    });
  });

  describe('panel visibility toggle', () => {
    beforeEach(() => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: mockData,
      });
    });

    it('shows the full panel by default', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      expect(screen.getByText('150 Files')).toBeInTheDocument();
    });

    it('hides the stats panel after the collapse button is clicked', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      // The collapse image is the 4th img (after Files, Studies, Cases icons)
      const allImages = screen.getAllByRole('img');
      const collapseImg = allImages[allImages.length - 1];
      fireEvent.click(collapseImg);

      expect(screen.queryByText('150 Files')).not.toBeInTheDocument();
      expect(screen.queryByText('45 Cases')).not.toBeInTheDocument();
    });

    it('shows a collapsed header with "Cart Overview" text when collapsed', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      const allImages = screen.getAllByRole('img');
      fireEvent.click(allImages[allImages.length - 1]);

      // The collapsed wrapper renders the title as a clickable label
      expect(screen.getByText('Cart Overview')).toBeInTheDocument();
    });

    it('restores the full panel when the collapsed header is clicked', () => {
      render(<OverviewWidget fileIds={FILE_IDS} />);

      // Collapse
      const allImages = screen.getAllByRole('img');
      fireEvent.click(allImages[allImages.length - 1]);

      // Expand by clicking the "Cart Overview" text in the collapsed bar
      fireEvent.click(screen.getByText('Cart Overview'));

      expect(screen.getByText('150 Files')).toBeInTheDocument();
    });
  });
});

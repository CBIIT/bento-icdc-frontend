import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Stats from './DashboardStatsController';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@material-ui/core/CircularProgress', () => ({
  __esModule: true,
  default: () => <div role="progressbar" data-testid="loader" />,
}));

jest.mock('./StatsView', () => ({
  __esModule: true,
  default: props => (
    <div
      data-testid="stats-view"
      data-length={Array.isArray(props.data) ? String(props.data.length) : 'na'}
    />
  ),
}));

const mockUseSelector = useSelector;

describe('DashboardStatsController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithState = state => {
    mockUseSelector.mockImplementation(selector => selector(state));
    return render(<Stats />);
  };

  it('should render loader when stats is an empty array', () => {
    renderWithState({ dashboardTab: { stats: [] } });

    expect(screen.queryByRole('progressbar')).not.toBeNull();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  it('should render loader when dashboardTab is missing', () => {
    renderWithState({});

    expect(screen.queryByRole('progressbar')).not.toBeNull();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  it('should render loader when stats is null', () => {
    renderWithState({ dashboardTab: { stats: null } });

    expect(screen.queryByRole('progressbar')).not.toBeNull();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  it('should render StatsView with data when stats contains items', () => {
    const data = [{ id: 1 }, { id: 2 }];

    renderWithState({ dashboardTab: { stats: data } });

    const statsView = screen.queryByTestId('stats-view');
    expect(statsView).not.toBeNull();
    expect(statsView.getAttribute('data-length')).toBe(String(data.length));
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('should handle undefined stats by showing loader', () => {
    renderWithState({ dashboardTab: { stats: undefined } });

    expect(screen.queryByRole('progressbar')).not.toBeNull();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });
});

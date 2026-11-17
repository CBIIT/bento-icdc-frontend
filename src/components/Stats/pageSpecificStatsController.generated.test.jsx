// src/components/Stats/pageSpecificStatsController.test.jsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Stats from './pageSpecificStatsController';

jest.mock('@material-ui/core/CircularProgress', () => {
  return function MockCircularProgress() {
    return <div data-testid="spinner" />;
  };
});

jest.mock('./StatsView', () => {
  return function MockStatsView({ data }) {
    return (
      <div data-testid="stats-view">
        <span data-testid="stats-view-count">
          {Array.isArray(data) ? data.length : 'na'}
        </span>
        <span data-testid="stats-view-data">{JSON.stringify(data)}</span>
      </div>
    );
  };
});

const mockFilterData = jest.fn();
jest.mock('../../bento-core', () => ({
  filterData: (...args) => mockFilterData(...args),
}));

const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: selectorFn => mockUseSelector(selectorFn),
}));

describe('Stats (pageSpecificStatsController)', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders loader when subjectOverView data is missing', () => {
    const state = {
      dashboard: {
        isFetched: false,
      },
    };

    mockUseSelector.mockImplementation(selectorFn => selectorFn(state));

    render(<Stats filter={{ some: 'filter' }} />);

    expect(screen.getByTestId('spinner')).toBeTruthy();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  test('calls filterData for each datum and renders loader because selector returns undefined', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const filter = { type: 'foo' };
    const state = {
      dashboard: {
        isFetched: true,
        subjectOverView: {
          data,
        },
      },
    };

    mockFilterData.mockImplementation(() => true);
    mockUseSelector.mockImplementation(selectorFn => selectorFn(state));

    render(<Stats filter={filter} />);

    expect(mockFilterData).toHaveBeenCalledTimes(data.length);
    data.forEach((item, idx) => {
      expect(mockFilterData).toHaveBeenNthCalledWith(idx + 1, item, filter);
    });

    expect(screen.getByTestId('spinner')).toBeTruthy();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  test('uses undefined filter when no filter prop is provided', () => {
    const data = [{ id: 'a' }];
    const state = {
      dashboard: {
        isFetched: false,
        subjectOverView: {
          data,
        },
      },
    };

    mockFilterData.mockImplementation(() => true);
    mockUseSelector.mockImplementation(selectorFn => selectorFn(state));

    render(<Stats />);

    expect(mockFilterData).toHaveBeenCalledTimes(1);
    expect(mockFilterData).toHaveBeenCalledWith(data[0], undefined);

    expect(screen.getByTestId('spinner')).toBeTruthy();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });

  test('renders StatsView when useSelector returns a non-empty array directly', () => {
    const returnedData = [{ x: 1 }, { x: 2 }];
    mockUseSelector.mockImplementation(() => returnedData);

    render(<Stats filter={{ any: 'thing' }} />);

    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByTestId('stats-view')).toBeTruthy();
    expect(screen.getByTestId('stats-view-count').textContent).toBe(
      String(returnedData.length)
    );
    expect(screen.getByTestId('stats-view-data').textContent).toBe(
      JSON.stringify(returnedData)
    );
  });

  test('renders loader when useSelector returns an empty array', () => {
    mockUseSelector.mockImplementation(() => []);

    render(<Stats filter={{}} />);

    expect(screen.getByTestId('spinner')).toBeTruthy();
    expect(screen.queryByTestId('stats-view')).toBeNull();
  });
});

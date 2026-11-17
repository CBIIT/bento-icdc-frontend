// src/components/Stats/StatsView.test.jsx
import React from 'react';
import { render } from '@testing-library/react';

// Mock StatsBar from bento-core to avoid rendering the real component and to inspect props
const mockStatsBar = jest.fn(() => null);
jest.mock('../../bento-core', () => ({
  StatsBar: (...args) => mockStatsBar(...args),
}));

// Mock globalStatsData and statsStyling to be deterministic
jest.mock('../../bento/globalStatsData', () => ({
  globalStatsData: [
    {
      statTitle: 'Programs',
      statAPI: 'numberOfPrograms',
      statIconSrc: 'programs-icon.svg',
    },
    {
      statTitle: 'Studies',
      statAPI: 'numberOfStudies',
      statIconSrc: 'studies-icon.svg',
    },
    {
      statTitle: 'Data Volume',
      statAPI: 'volumeOfData',
      statIconSrc: 'data-volume-icon.svg',
    },
  ],
  statsStyling: { global: { horizontalStyle: true } },
}));

// Mock updateStat so we can control output and errors
const mockUpdateStat = jest.fn();
jest.mock('./utils', () => ({
  updateStat: (...args) => mockUpdateStat(...args),
}));

// Import after mocks so the component uses the mocked modules
import StatsView from './StatsView';

describe('StatsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render StatsBar with mapped stats and provided styles (happy path)', () => {
    const inputData = { some: 'input' };
    const transformedData = {
      numberOfPrograms: 5,
      numberOfStudies: 12,
      volumeOfData: '3.2 GB',
    };
    mockUpdateStat.mockReturnValue(transformedData);

    render(<StatsView data={inputData} />);

    expect(mockUpdateStat).toHaveBeenCalledTimes(1);
    expect(mockUpdateStat).toHaveBeenCalledWith(inputData);

    expect(mockStatsBar).toHaveBeenCalledTimes(1);
    const propsPassed = mockStatsBar.mock.calls[0][0];

    expect(propsPassed.styles).toEqual({ global: { horizontalStyle: true } });

    expect(propsPassed.stats).toEqual([
      {
        name: 'Programs',
        val: 5,
        statIconSrc: 'programs-icon.svg',
        statIconAlt: 'Programs-icon',
      },
      {
        name: 'Studies',
        val: 12,
        statIconSrc: 'studies-icon.svg',
        statIconAlt: 'Studies-icon',
      },
      {
        name: 'Data Volume',
        val: '3.2 GB',
        statIconSrc: 'data-volume-icon.svg',
        statIconAlt: 'Data Volume-icon',
      },
    ]);
  });

  it('should handle missing fields from updateStat by passing undefined values', () => {
    const inputData = { other: 'data' };
    const transformedData = {
      numberOfPrograms: 2,
      volumeOfData: '10 MB',
    };
    mockUpdateStat.mockReturnValue(transformedData);

    render(<StatsView data={inputData} />);

    expect(mockStatsBar).toHaveBeenCalledTimes(1);
    const propsPassed = mockStatsBar.mock.calls[0][0];

    expect(propsPassed.stats).toEqual([
      {
        name: 'Programs',
        val: 2,
        statIconSrc: 'programs-icon.svg',
        statIconAlt: 'Programs-icon',
      },
      {
        name: 'Studies',
        val: undefined,
        statIconSrc: 'studies-icon.svg',
        statIconAlt: 'Studies-icon',
      },
      {
        name: 'Data Volume',
        val: '10 MB',
        statIconSrc: 'data-volume-icon.svg',
        statIconAlt: 'Data Volume-icon',
      },
    ]);
  });

  it('throws error if updateStat throws (error path)', () => {
    const boom = new Error('boom');
    mockUpdateStat.mockImplementation(() => {
      throw boom;
    });

    expect(() => render(<StatsView data={{}} />)).toThrow(boom);
    expect(mockStatsBar).not.toHaveBeenCalled();
  });

  it('should call updateStat with null and render undefined stats when it returns an empty object', () => {
    mockUpdateStat.mockReturnValue({});

    render(<StatsView data={null} />);

    expect(mockUpdateStat).toHaveBeenCalledTimes(1);
    expect(mockUpdateStat).toHaveBeenCalledWith(null);
    expect(mockStatsBar).toHaveBeenCalledTimes(1);

    const propsPassed = mockStatsBar.mock.calls[0][0];
    expect(propsPassed.stats).toEqual([
      {
        name: 'Programs',
        val: undefined,
        statIconSrc: 'programs-icon.svg',
        statIconAlt: 'Programs-icon',
      },
      {
        name: 'Studies',
        val: undefined,
        statIconSrc: 'studies-icon.svg',
        statIconAlt: 'Studies-icon',
      },
      {
        name: 'Data Volume',
        val: undefined,
        statIconSrc: 'data-volume-icon.svg',
        statIconAlt: 'Data Volume-icon',
      },
    ]);
  });
});

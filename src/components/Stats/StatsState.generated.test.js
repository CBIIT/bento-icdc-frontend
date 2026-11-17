import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsView from './StatsView';
import { StatsBar } from '../../bento-core';
import { updateStat } from './utils';
import { globalStatsData, statsStyling } from '../../bento/globalStatsData';

jest.mock('../../bento-core', () => ({
  StatsBar: jest.fn(() => <div data-testid="stats-bar" />),
}));

jest.mock('./utils', () => ({
  updateStat: jest.fn(),
}));

describe('StatsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StatsBar with mapped stats and styling', () => {
    const data = [{ id: 1, name: 'sample' }];

    const updatedData = {
      volumeOfData: '10 TB',
      numberOfPrograms: 5,
      numberOfStudies: 12,
      numberOfCases: 34,
      numberOfSamples: 56,
      numberOfFiles: 78,
      numberOfStudyFiles: 90,
    };

    updateStat.mockReturnValue(updatedData);

    render(<StatsView data={data} />);

    expect(screen.getByTestId('stats-bar')).toBeTruthy();
    expect(updateStat).toHaveBeenCalledTimes(1);
    expect(updateStat).toHaveBeenCalledWith(data);

    expect(StatsBar).toHaveBeenCalledTimes(1);

    const expectedStats = globalStatsData.map(stat => ({
      name: stat.statTitle,
      val: updatedData[stat.statAPI],
      statIconSrc: stat.statIconSrc,
      statIconAlt: `${stat.statTitle}-icon`,
    }));

    expect(StatsBar).toHaveBeenCalledWith(
      {
        stats: expectedStats,
        styles: statsStyling,
      },
      {}
    );
  });

  test('passes undefined values when updateStat does not return a matching key', () => {
    updateStat.mockReturnValue({});

    render(<StatsView data={[]} />);

    const passedProps = StatsBar.mock.calls[0][0];

    expect(passedProps.stats).toEqual(
      globalStatsData.map(stat => ({
        name: stat.statTitle,
        val: undefined,
        statIconSrc: stat.statIconSrc,
        statIconAlt: `${stat.statTitle}-icon`,
      }))
    );
    expect(passedProps.styles).toBe(statsStyling);
  });
});

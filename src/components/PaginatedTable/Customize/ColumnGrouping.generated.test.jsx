// src/components/PaginatedTable/Customize/ColumnGrouping.test.jsx
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { ColumnGrouping } from './ColumnGrouping';

function MockColGrouping() {
  return <div data-testid="availability-col-grouping" />;
}

jest.mock('./DataAvailability/ColGrouping', () => ({
  __esModule: true,
  default: MockColGrouping,
}));

describe('ColumnGrouping', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('returns null when groups is null', () => {
    expect(ColumnGrouping(null)).toBeNull();
  });

  it('returns an empty array when called without arguments', () => {
    const result = ColumnGrouping();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it('returns the same object reference for non-custom groups', () => {
    const group1 = { id: 'g1', label: 'Group 1' };
    const group2 = { id: 'g2', label: 'Group 2', custom: false };
    const input = [group1, group2];

    const result = ColumnGrouping(input);

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(group1);
    expect(result[1]).toBe(group2);
    expect(result[0].customViewRender).toBeUndefined();
    expect(result[1].customViewRender).toBeUndefined();
  });

  it('adds customViewRender for groups with custom=true', () => {
    const group = { id: 'custom-group', label: 'Custom', custom: true };

    const [resultGroup] = ColumnGrouping([group]);

    expect(resultGroup).toMatchObject({
      id: 'custom-group',
      label: 'Custom',
      custom: true,
    });
    expect(typeof resultGroup.customViewRender).toBe('function');

    render(resultGroup.customViewRender());
    expect(screen.queryByTestId('availability-col-grouping')).not.toBeNull();
  });

  it('overrides any existing customViewRender when custom=true', () => {
    const originalRender = () => <div data-testid="original" />;

    const group = {
      id: 'override-group',
      label: 'Override',
      custom: true,
      customViewRender: originalRender,
    };

    const [resultGroup] = ColumnGrouping([group]);

    expect(resultGroup.customViewRender).not.toBe(originalRender);

    render(resultGroup.customViewRender());
    expect(screen.queryByTestId('availability-col-grouping')).not.toBeNull();
    expect(screen.queryByTestId('original')).toBeNull();
  });

  it('handles mixed custom and non-custom groups correctly', () => {
    const nonCustom = { id: 'g1', label: 'Non-Custom' };
    const custom = { id: 'g2', label: 'Custom', custom: true };

    const [resNonCustom, resCustom] = ColumnGrouping([nonCustom, custom]);

    expect(resNonCustom).toBe(nonCustom);
    expect(resNonCustom.customViewRender).toBeUndefined();

    expect(resCustom).toMatchObject({
      id: 'g2',
      label: 'Custom',
      custom: true,
    });
    expect(typeof resCustom.customViewRender).toBe('function');

    render(resCustom.customViewRender());
    expect(screen.queryByTestId('availability-col-grouping')).not.toBeNull();
  });
});

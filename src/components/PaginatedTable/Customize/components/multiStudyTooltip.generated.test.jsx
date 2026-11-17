// File: src/components/PaginatedTable/Customize/components/multiStudyTooltip.test.jsx

import React from 'react';
import { render, screen, within } from '@testing-library/react';

const mockReact = React;

// Mock bento-core's ToolTip so the component renders deterministically
jest.mock('../../../../bento-core', () => {
  const MockToolTip = ({ title, children }) =>
    mockReact.createElement(
      'div',
      { 'data-testid': 'mock-tooltip' },
      mockReact.createElement('div', { 'data-testid': 'tooltip-title' }, title),
      children
    );

  return { ToolTip: MockToolTip };
});

// Mock dashboardTabData to keep icon/text stable
jest.mock('../../../../bento/dashboardTabData', () => ({
  multiStudyData: {
    icon: 'mock-icon.png',
    alt: 'mock-multi-study-icon',
    toolTipText: 'Mock: Multi-study participant also enrolled as:',
  },
}));

import MultiStudyToolTip from './multiStudyTooltip';

describe('MultiStudyToolTip', () => {
  it('renders icon, counter (length + 1), tooltip text, case links, and unified view link (happy path)', () => {
    const tableMeta = ['CASE-1', 'CASE-2'];
    const value = 'PARENT-CASE-ID';

    render(<MultiStudyToolTip tableMeta={tableMeta} value={value} />);

    const img = screen.getByAltText('mock-multi-study-icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('mock-icon.png');

    expect(screen.getByText('3')).toBeTruthy();

    const tooltip = screen.getByTestId('mock-tooltip');
    expect(
      within(tooltip).getByText(
        'Mock: Multi-study participant also enrolled as:'
      )
    ).toBeTruthy();

    const case1Link = within(tooltip).getByText('Case: CASE-1').closest('a');
    const case2Link = within(tooltip).getByText('Case: CASE-2').closest('a');
    expect(case1Link.getAttribute('href')).toBe('/#/case/CASE-1');
    expect(case2Link.getAttribute('href')).toBe('/#/case/CASE-2');

    const viewAllLink = within(tooltip)
      .getByText('View All Related Cases')
      .closest('a');
    expect(viewAllLink.getAttribute('href')).toBe(
      '/#/unifiedView/PARENT-CASE-ID'
    );
  });

  it('renders correctly with an empty tableMeta (edge case)', () => {
    const tableMeta = [];
    const value = 'SINGLE-ID';

    render(<MultiStudyToolTip tableMeta={tableMeta} value={value} />);

    expect(screen.getByText('1')).toBeTruthy();

    const tooltip = screen.getByTestId('mock-tooltip');
    expect(within(tooltip).queryByText(/^Case:/)).toBeNull();

    const unifiedLink = within(tooltip)
      .getByText('View All Related Cases')
      .closest('a');
    expect(unifiedLink.getAttribute('href')).toBe('/#/unifiedView/SINGLE-ID');
  });

  it('renders unified view link with "undefined" when value prop is missing (invalid input scenario)', () => {
    const tableMeta = ['ONLY-CASE'];

    render(<MultiStudyToolTip tableMeta={tableMeta} />);

    const tooltip = screen.getByTestId('mock-tooltip');
    const unifiedLink = within(tooltip)
      .getByText('View All Related Cases')
      .closest('a');
    expect(unifiedLink.getAttribute('href')).toBe('/#/unifiedView/undefined');
  });

  it('throws error if tableMeta is undefined (error handling)', () => {
    expect(() =>
      render(<MultiStudyToolTip tableMeta={undefined} value="X" />)
    ).toThrow();
  });

  it('renders the same number of "Case:" links as items in tableMeta (boundary check)', () => {
    const tableMeta = ['A', 'B', 'C', 'D'];

    render(<MultiStudyToolTip tableMeta={tableMeta} value="P" />);

    const tooltip = screen.getByTestId('mock-tooltip');
    const caseLabels = within(tooltip).getAllByText(/^Case:/);
    const caseLinks = caseLabels.map(node => node.closest('a'));

    expect(caseLinks).toHaveLength(tableMeta.length);
    expect(caseLinks.map(a => a.getAttribute('href'))).toEqual([
      '/#/case/A',
      '/#/case/B',
      '/#/case/C',
      '/#/case/D',
    ]);
  });
});

// src/components/PaginatedTable/Customize/components/NumberOfCases.test.jsx
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Keep the React object available for JSX and for mock factories
const mockReact = React;

// Stable mock objects that jest.mock factories can safely reference
const mockStudyDisposition = jest.fn();
const mockNavigatedToDashboard = jest.fn();
const mockActions = { changeCurrentTab: jest.fn() };

// Explicit deterministic mocks for assets and data
jest.mock(
  '../../../../assets/icons/PendingRelease-icons.StudiesDetail-Box.svg',
  () => 'mock-pending.svg'
);
jest.mock('../../../../bento/programDetailData', () => ({
  pageData: { embargoFileIcon: 'mock-embargo.svg' },
}));

// Mock studyDisposition to control behavior
jest.mock('../DataAvailability/TableCell', () => ({
  studyDisposition: (...args) => mockStudyDisposition(...args),
}));

// Mock navigation util
jest.mock('../../../../utils/utils', () => ({
  navigatedToDashboard: (...args) => mockNavigatedToDashboard(...args),
}));

// Mock dashboard tabs store hook with controllable actions
jest.mock('../../../../pages/dashboard/components/dashboard-tabs-store', () => {
  const hook = () => [{ currentTab: 0 }, mockActions];
  return { __esModule: true, default: hook };
});

import NumberOfCasesViewWrapped, { getStudyIcon } from './NumberOfCases';

describe('getStudyIcon', () => {
  const classes = { embargoFileIcon: 'embargoFileIcon' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should return an embargo tooltip icon when param is "embargo"', () => {
    const element = getStudyIcon(classes, 'embargo');
    render(
      <MemoryRouter>
        {mockReact.createElement(React.Fragment, null, element)}
      </MemoryRouter>
    );
    const img = screen.getByAltText('icdc embargo file icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src') || '').toContain('mock-embargo.svg');
  });

  it('should return a pending tooltip icon when param is "pending"', () => {
    const element = getStudyIcon(classes, 'pending');
    render(
      <MemoryRouter>
        {mockReact.createElement(React.Fragment, null, element)}
      </MemoryRouter>
    );
    const img = screen.getByAltText('icdc embargo file icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src') || '').toContain('mock-pending.svg');
  });

  it('should return false when param is unknown', () => {
    const result = getStudyIcon(classes, 'unknown-status');
    expect(result).toBe(false);
  });
});

describe('NumberOfCasesView (withStyles-wrapped)', () => {
  const defaultProps = {
    clinical_study_designation: 'STUDY-123',
    numberOfCases: 42,
    study_disposition: 'anything',
    accession_id: 'ACC-001',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const renderComponent = (props = {}) =>
    render(
      <MemoryRouter>
        <NumberOfCasesViewWrapped {...defaultProps} {...props} />
      </MemoryRouter>
    );

  it('should render a link with numberOfCases and invoke actions/navigate when clicked (happy path)', () => {
    mockStudyDisposition.mockReturnValue(undefined);

    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe(String(defaultProps.numberOfCases));
    expect(link.getAttribute('href')).toBe('/explore');

    fireEvent.click(link);

    expect(mockActions.changeCurrentTab).toHaveBeenCalledTimes(1);
    expect(mockActions.changeCurrentTab).toHaveBeenCalledWith(0);
    expect(mockNavigatedToDashboard).toHaveBeenCalledTimes(1);
    expect(mockNavigatedToDashboard).toHaveBeenCalledWith(
      'STUDY-123 (ACC-001)',
      'Cases'
    );
  });

  it('should render embargo tooltip icon (no link) when study is under embargo', () => {
    mockStudyDisposition.mockReturnValue('embargo');

    renderComponent();

    expect(screen.queryByRole('link')).toBeNull();

    const img = screen.getByAltText('icdc embargo file icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src') || '').toContain('mock-embargo.svg');
  });

  it('should render pending tooltip icon (no link) when study is pending', () => {
    mockStudyDisposition.mockReturnValue('pending');

    renderComponent();

    expect(screen.queryByRole('link')).toBeNull();

    const img = screen.getByAltText('icdc embargo file icon');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src') || '').toContain('mock-pending.svg');
  });

  it('should handle 0 cases and still render the link when not embargo/pending (edge case)', () => {
    mockStudyDisposition.mockReturnValue(undefined);

    renderComponent({ numberOfCases: 0 });

    const link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('0');
    expect(link.getAttribute('href')).toBe('/explore');

    fireEvent.click(link);
    expect(mockActions.changeCurrentTab).toHaveBeenCalledWith(0);
    expect(mockNavigatedToDashboard).toHaveBeenCalledWith(
      'STUDY-123 (ACC-001)',
      'Cases'
    );
  });

  it('should render link when study_disposition is null/undefined (null/undefined case)', () => {
    mockStudyDisposition.mockReturnValue(undefined);

    renderComponent({ study_disposition: undefined });
    let link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('42');

    cleanup();

    renderComponent({ study_disposition: null });
    link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect(link.textContent).toBe('42');
  });
});

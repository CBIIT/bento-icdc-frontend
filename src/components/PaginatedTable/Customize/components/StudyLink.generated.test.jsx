// src/components/PaginatedTable/Customize/components/StudyLink.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import StudyLink from './StudyLink';

// Mock bento-core to provide a deterministic LINK class
jest.mock('../../../../bento-core', () => ({
  cellTypes: { LINK: 'bento-link' },
}));

// Mock studyDisposition to be controllable and safe for undefined/null
const mockStudyDisposition = jest.fn(value => value);
jest.mock('../DataAvailability/TableCell', () => ({
  studyDisposition: value => mockStudyDisposition(value),
}));

// Mock getStudyIcon to be controllable
const mockGetStudyIcon = jest.fn(() => false);
jest.mock('./NumberOfCases', () => ({
  getStudyIcon: (...args) => mockGetStudyIcon(...args),
}));

describe('StudyLink component', () => {
  const defaultProps = {
    clinical_study_designation: 'ICDC-TEST',
    study_disposition: 'under embargo',
    accession_id: 'ACC-123',
    program: 'DOG',
    linkAttr: {
      rootPath: 'studies',
      pathParams: ['accession_id', 'program'],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders link with study designation text and LINK class when icon is not returned (happy path)', () => {
    mockGetStudyIcon.mockReturnValueOnce(false);
    mockStudyDisposition.mockImplementationOnce(value => value);

    render(<StudyLink {...defaultProps} />);

    const link = screen.getByRole('link', { name: /ICDC-TEST/i });
    expect(link).toBeTruthy();

    // href is created by mapping pathParams to ["#studies/ACC-123", "#studies/DOG"]
    // React/DOM sets attribute to comma-separated string for an array value
    expect(link.getAttribute('href')).toBe('#studies/ACC-123,#studies/DOG');

    // Ensure class from cellTypes is applied
    expect(link.classList.contains('bento-link')).toBe(true);

    // No icon should be present
    expect(screen.queryByTestId('study-icon')).toBeNull();

    // Ensure getStudyIcon called with transformed disposition
    expect(mockStudyDisposition).toHaveBeenCalledWith('under embargo');
    expect(mockGetStudyIcon).toHaveBeenCalledWith(
      expect.any(Object),
      'under embargo'
    );
  });

  test('renders StudyIcon when getStudyIcon returns an element', () => {
    mockStudyDisposition.mockImplementationOnce(() => 'embargo');
    // Return a deterministic icon element
    mockGetStudyIcon.mockImplementationOnce(() =>
      React.createElement('span', { 'data-testid': 'study-icon' }, 'ICON')
    );

    render(<StudyLink {...defaultProps} />);

    const link = screen.getByRole('link', { name: /ICDC-TEST/i });
    expect(link).toBeTruthy();

    // Icon should be present
    expect(screen.getByTestId('study-icon')).toBeTruthy();

    expect(mockGetStudyIcon).toHaveBeenCalledWith(
      expect.any(Object),
      'embargo'
    );
  });

  test('constructs empty href when pathParams is empty (edge case)', () => {
    mockGetStudyIcon.mockReturnValueOnce(false);
    mockStudyDisposition.mockImplementationOnce(v => v);

    const props = {
      ...defaultProps,
      linkAttr: { rootPath: 'studies', pathParams: [] },
    };

    render(<StudyLink {...props} />);

    const link = screen.getByRole('link', { name: /ICDC-TEST/i });
    expect(link).toBeTruthy();
    // Empty array as href yields empty string on the DOM attribute
    expect(link.getAttribute('href')).toBe('');
  });

  test('handles missing props for a requested path param by producing undefined in href (invalid input)', () => {
    mockGetStudyIcon.mockReturnValueOnce(false);
    mockStudyDisposition.mockImplementationOnce(v => v);

    const props = {
      ...defaultProps,
      // Remove "program" from props so it becomes undefined in URL
      program: undefined,
    };

    render(<StudyLink {...props} />);

    const link = screen.getByRole('link', { name: /ICDC-TEST/i });
    expect(link).toBeTruthy();
    // Array becomes "#studies/ACC-123,#studies/undefined"
    expect(link.getAttribute('href')).toBe(
      '#studies/ACC-123,#studies/undefined'
    );
  });

  test('does not render icon and does not crash when study_disposition is undefined (null/undefined case)', () => {
    mockStudyDisposition.mockImplementationOnce(() => undefined);
    mockGetStudyIcon.mockReturnValueOnce(false);

    const props = {
      ...defaultProps,
      study_disposition: undefined,
    };

    render(<StudyLink {...props} />);

    // Link still present
    const link = screen.getByRole('link', { name: /ICDC-TEST/i });
    expect(link).toBeTruthy();
    // No icon rendered
    expect(screen.queryByTestId('study-icon')).toBeNull();

    expect(mockGetStudyIcon).toHaveBeenCalledWith(
      expect.any(Object),
      undefined
    );
  });
});

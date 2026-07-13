// src/components/PaginatedTable/Customize/DataAvailability/TableCell.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataAvailabilityCellView, { studyDisposition } from './TableCell';

describe('studyDisposition', () => {
  test('should return "embargo" when input is "Under Embargo" (case-insensitive)', () => {
    expect(studyDisposition('Under Embargo')).toBe('embargo');
    expect(studyDisposition('under embargo')).toBe('embargo');
    expect(studyDisposition('UNDER EMBARGO')).toBe('embargo');
  });

  test('should return "pending" when input is "PENDING" (case-insensitive)', () => {
    expect(studyDisposition('pending')).toBe('pending');
    expect(studyDisposition('PENDING')).toBe('pending');
    expect(studyDisposition('PeNdInG')).toBe('pending');
  });

  test('should return undefined for non-matching values', () => {
    expect(studyDisposition('available')).toBeUndefined();
    expect(studyDisposition('')).toBeUndefined();
    expect(studyDisposition('foo')).toBeUndefined();
  });

  test('throws error if value is undefined or null', () => {
    expect(() => studyDisposition(undefined)).toThrow();
    expect(() => studyDisposition(null)).toThrow();
  });
});

describe('DataAvailabilityCellView', () => {
  const baseProps = {
    column: {},
    interOpData: undefined,
    clinical_study_designation: 'STUDY-1',
    numberOfCaseFiles: 0,
    numberOfStudyFiles: 0,
    numberOfPublications: 0,
  };

  const hoverTooltip = container => {
    const svgIcon = container.querySelector('svg');
    if (!svgIcon) {
      throw new Error('Expected indicator icon (svg) to exist for this test.');
    }
    fireEvent.mouseOver(svgIcon);
  };

  test('should not render indicator when numeric value is 0 (numberOfCaseFiles)', () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfCaseFiles"
        numberOfCaseFiles={0}
      />
    );

    expect(container.querySelector('svg')).toBeNull();
  });

  test('should render indicator and show tooltip with correct text for numberOfCaseFiles', async () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfCaseFiles"
        numberOfCaseFiles={3}
      />
    );

    expect(container.querySelector('svg')).not.toBeNull();

    hoverTooltip(container);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain('3 Case File(s)');
  });

  test('should render indicator and show tooltip with correct text for numberOfStudyFiles', async () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfStudyFiles"
        numberOfStudyFiles={5}
      />
    );

    expect(container.querySelector('svg')).not.toBeNull();

    hoverTooltip(container);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain('5 Study File(s)');
  });

  test('should render indicator when value > 0 for numberOfImageCollections and use studyData count in tooltip', async () => {
    const interOpData = {
      externalDataOverview: [
        {
          clinical_study_designation: 'STUDY-1',
          numberOfImageCollections: 7,
        },
      ],
    };

    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfImageCollections"
        interOpData={interOpData}
        numberOfImageCollections={1}
      />
    );

    expect(container.querySelector('svg')).not.toBeNull();

    hoverTooltip(container);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain('7 Image Collection(s)');
  });

  test('should not render indicator when numberOfPublications is 0', () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfPublications"
        numberOfPublications={0}
      />
    );

    expect(container.querySelector('svg')).toBeNull();
  });

  test('should render indicator and show tooltip with correct text for numberOfPublications > 0', async () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfPublications"
        numberOfPublications={2}
      />
    );

    expect(container.querySelector('svg')).not.toBeNull();

    hoverTooltip(container);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain('2 Publication(s)');
  });

  test('should render indicator and CRDC links list in tooltip when dataField is CRDCLinksText and links exist', async () => {
    const interOpData = {
      externalDataOverview: [
        {
          clinical_study_designation: 'STUDY-1',
          CRDCLinks: [
            { repository: 'RepoA', url: 'https://example.com/a' },
            { repository: 'RepoB', url: 'api failed' },
          ],
        },
      ],
    };

    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="CRDCLinksText"
        interOpData={interOpData}
        clinical_study_designation="STUDY-1"
      />
    );

    expect(container.querySelector('svg')).not.toBeNull();

    hoverTooltip(container);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).not.toBeNull();

    const link = tooltip.querySelector('a[href="https://example.com/a"]');
    expect(link).not.toBeNull();
    expect(link.textContent).toContain('RepoA | ICDC-STUDY-1');

    expect(tooltip.textContent).toContain('RepoB | api failed');
  });

  test('should not render indicator for CRDCLinksText when current study has no CRDCLinks', () => {
    const interOpData = {
      externalDataOverview: [
        {
          clinical_study_designation: 'STUDY-1',
          CRDCLinks: [],
        },
      ],
    };

    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="CRDCLinksText"
        interOpData={interOpData}
        clinical_study_designation="STUDY-1"
      />
    );

    expect(container.querySelector('svg')).toBeNull();
  });

  test('should handle empty interOpData gracefully (no crash) and not render indicator when value is falsy', () => {
    const { container } = render(
      <DataAvailabilityCellView
        {...baseProps}
        dataField="numberOfStudyFiles"
        numberOfStudyFiles={0}
        interOpData={undefined}
      />
    );

    expect(container.querySelector('svg')).toBeNull();
  });
});

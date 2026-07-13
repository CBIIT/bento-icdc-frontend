// src/components/PaginatedTable/Customize/DataAvailability/ColGrouping.test.tsx

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

// Mock MUI IconButton to avoid React/MUI context issues
jest.mock('@mui/material/IconButton', () => {
  const MockIconButton = ({ children, ...props }: { children?: ReactNode }) => (
    <button type="button" {...props}>
      {children}
    </button>
  );

  return {
    __esModule: true,
    default: MockIconButton,
  };
});

// Explicitly mock the image import to ensure deterministic src
jest.mock('../../assets/speechBubble.svg', () => 'mock-speech-bubble.svg');

// Mock styled components with lightweight DOM wrappers
jest.mock('./ColGrouping.styled', () => {
  const MockAvailabilityColumnGroupingIcon = (
    props: ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />;

  const MockDataAvailabilityTooltipTextIcon = (
    props: ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />;

  const MockDataAvailabilityTooltipTextIconAndLabelWrapper = (
    props: HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />;

  const MockDataAvailabilityTooltipTextTitle = (
    props: HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />;

  const MockDataAvailabilityTooltipTextWrapper = (
    props: HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />;

  const MockGroup = (props: HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  );

  const MockTooltip = ({
    title,
    children,
  }: {
    title: ReactNode;
    children: ReactNode;
    placement?: string;
  }) => (
    <div data-testid="mock-tooltip">
      {children}
      <div data-testid="tooltip-title">{title}</div>
    </div>
  );

  return {
    __esModule: true,
    AvailabilityColumnGroupingIcon: MockAvailabilityColumnGroupingIcon,
    DataAvailabilityTooltipTextIcon: MockDataAvailabilityTooltipTextIcon,
    DataAvailabilityTooltipTextIconAndLabelWrapper:
      MockDataAvailabilityTooltipTextIconAndLabelWrapper,
    DataAvailabilityTooltipTextTitle: MockDataAvailabilityTooltipTextTitle,
    DataAvailabilityTooltipTextWrapper: MockDataAvailabilityTooltipTextWrapper,
    Group: MockGroup,
    Tooltip: MockTooltip,
  };
});

const mockIcons = [
  {
    label: 'Case Files',
    icon: 'https://example.com/case.svg',
  },
  {
    label: 'Study Files',
    icon: 'https://example.com/study.svg',
  },
  {
    label: 'Publications',
    icon: 'https://example.com/pubs.svg',
  },
];

describe('ColGrouping - generateDataAvailabilityTooltipText', () => {
  const importWithConstants = async (iconsExport: unknown) => {
    jest.resetModules();

    jest.doMock(
      './constants',
      () => ({
        ICDC_DATA_AVAIL_ICONS: iconsExport,
      }),
      { virtual: true }
    );

    return import('./ColGrouping');
  };

  test('happy path: renders title and all icon-label rows from constants', async () => {
    const mod = await importWithConstants(mockIcons);

    render(mod.generateDataAvailabilityTooltipText());

    const title = screen.getByText(/Data Availability:/i);

    expect(title).not.toBeNull();

    for (const item of mockIcons) {
      const icon = screen.getByAltText(`${item.label} icon`);

      expect(icon).not.toBeNull();
      expect(icon.getAttribute('src')).toBe(item.icon);

      const label = screen.getByText(item.label);

      expect(label).not.toBeNull();
    }
  });

  test('edge case: renders only title when constants array is empty', async () => {
    const mod = await importWithConstants([]);

    render(mod.generateDataAvailabilityTooltipText());

    const title = screen.getByText(/Data Availability:/i);

    expect(title).not.toBeNull();

    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  test('error case: throws when constants is not an array', async () => {
    const mod = await importWithConstants(undefined);

    expect(() => render(mod.generateDataAvailabilityTooltipText())).toThrow();
  });
});

describe('ColGrouping - AvailabilityColumnGrouping component', () => {
  const importComponent = async (iconsExport: unknown = mockIcons) => {
    jest.resetModules();

    jest.doMock(
      './constants',
      () => ({
        ICDC_DATA_AVAIL_ICONS: iconsExport,
      }),
      { virtual: true }
    );

    return import('./ColGrouping');
  };

  test('renders group label, help button, and icon with deterministic src', async () => {
    const mod = await importComponent();

    const AvailabilityColumnGrouping = mod.default;

    render(<AvailabilityColumnGrouping />);

    const groupLabel = screen.getByText('Data Availability');

    expect(groupLabel).not.toBeNull();

    const helpButton = screen.getByRole('button');

    expect(helpButton).not.toBeNull();

    const tooltipImg = within(helpButton).getByAltText('tooltip');

    expect(tooltipImg).not.toBeNull();

    expect(tooltipImg.getAttribute('src')).toBe('mock-speech-bubble.svg');
  });

  test('passes tooltip content generated from constants (images and labels are present)', async () => {
    const mod = await importComponent();

    const AvailabilityColumnGrouping = mod.default;

    render(<AvailabilityColumnGrouping />);

    const tooltipTitle = screen.getByTestId('tooltip-title');

    expect(tooltipTitle).not.toBeNull();

    const titleText = within(tooltipTitle).getByText(/Data Availability:/i);

    expect(titleText).not.toBeNull();

    for (const item of mockIcons) {
      const img = within(tooltipTitle).getByAltText(`${item.label} icon`);

      expect(img).not.toBeNull();

      expect(img.getAttribute('src')).toBe(item.icon);

      const label = within(tooltipTitle).getByText(item.label);

      expect(label).not.toBeNull();
    }
  });

  test('edge case: tooltip content contains only title when constants is empty', async () => {
    const mod = await importComponent([]);

    const AvailabilityColumnGrouping = mod.default;

    render(<AvailabilityColumnGrouping />);

    const tooltipTitle = screen.getByTestId('tooltip-title');

    expect(tooltipTitle).not.toBeNull();

    const titleText = within(tooltipTitle).getByText(/Data Availability:/i);

    expect(titleText).not.toBeNull();

    expect(within(tooltipTitle).queryAllByRole('img')).toHaveLength(0);
  });
});

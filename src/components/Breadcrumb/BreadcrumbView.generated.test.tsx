// src/components/Breadcrumb/BreadcrumbView.test.tsx
import React, { type ReactNode } from 'react';
import { render, screen, within } from '@testing-library/react';
import type { BreadcrumbData } from '../../pages/caseDetails/caseDetailsView';
import CustomBreadcrumb from './BreadcrumbView';

jest.mock('./BreadcrumbView.styled', () => {
  const MockContainer = ({ children }: { children: ReactNode }) => (
    <div data-testid="breadcrumb-container">{children}</div>
  );

  const MockBreadcrumbNavLink = ({
    to,
    children,
  }: {
    to: string;
    children: ReactNode;
  }) => (
    <a data-testid="breadcrumb-link" href={to}>
      {children}
    </a>
  );

  const MockBreadcrumbSpan = ({ children }: { children: ReactNode }) => (
    <span data-testid="breadcrumb-span">{children}</span>
  );

  return {
    __esModule: true,
    Container: MockContainer,
    BreadcrumbNavLink: MockBreadcrumbNavLink,
    BreadcrumbSpan: MockBreadcrumbSpan,
  };
});

type BreadcrumbFixture = {
  name?: string | null;
  to?: string;
  isALink: boolean;
};

const buildData = (items: BreadcrumbFixture[]): BreadcrumbData[] => items;

describe('CustomBreadcrumb', () => {
  const getSeparators = (containerEl: HTMLElement) =>
    within(containerEl).queryAllByText('>');

  it('should render links with start-cased names and spans with raw names', () => {
    const data = buildData([
      { name: 'all programs', to: '/programs', isALink: true },
      { name: 'study_detail', to: '/study/abc', isALink: true },
      { name: 'CASE-123', isALink: false },
    ]);

    render(<CustomBreadcrumb data={data} />);

    const container = screen.getByTestId('breadcrumb-container');
    const links = within(container).getAllByTestId('breadcrumb-link');
    const spans = within(container).getAllByTestId('breadcrumb-span');

    expect(links).toHaveLength(2);
    expect(links[0].getAttribute('href')).toBe('/programs');
    expect(links[0].textContent).toBe('All Programs');

    expect(links[1].getAttribute('href')).toBe('/study/abc');
    expect(links[1].textContent).toBe('Study Detail');

    expect(spans).toHaveLength(1);
    expect(spans[0].textContent).toBe('CASE-123');

    const separators = getSeparators(container);
    expect(separators).toHaveLength(2);
  });

  it('should render separator between each breadcrumb and not after the last', () => {
    const data = buildData([
      { name: 'first', to: '/first', isALink: true },
      { name: 'second', isALink: false },
      { name: 'third', to: '/third', isALink: true },
      { name: 'fourth', isALink: false },
    ]);

    render(<CustomBreadcrumb data={data} />);

    const container = screen.getByTestId('breadcrumb-container');
    const separators = getSeparators(container);

    expect(separators).toHaveLength(3);

    const lastChild = container.children[container.children.length - 1];
    expect(lastChild.textContent).not.toBe('>');
  });

  it('should render a span if isALink is true but "to" is missing', () => {
    const data = buildData([{ name: 'orphan link', isALink: true }]);

    render(<CustomBreadcrumb data={data} />);

    expect(screen.queryByTestId('breadcrumb-link')).toBeNull();
    const span = screen.getByTestId('breadcrumb-span');
    expect(span.textContent).toBe('orphan link');
  });

  it('should render a span if "to" is provided but isALink is false', () => {
    const data = buildData([
      { name: 'not a link', to: '/somewhere', isALink: false },
    ]);

    render(<CustomBreadcrumb data={data} />);

    expect(screen.queryByTestId('breadcrumb-link')).toBeNull();
    const span = screen.getByTestId('breadcrumb-span');
    expect(span.textContent).toBe('not a link');
  });

  it('should handle undefined and null names by rendering empty text', () => {
    const data = buildData([
      { name: undefined, isALink: false },
      { name: null, isALink: false },
      { name: '', isALink: false },
    ]);

    render(<CustomBreadcrumb data={data} />);

    const spans = screen.getAllByTestId('breadcrumb-span');
    expect(spans).toHaveLength(3);
    expect(spans[0].textContent).toBe('');
    expect(spans[1].textContent).toBe('');
    expect(spans[2].textContent).toBe('');

    const container = screen.getByTestId('breadcrumb-container');
    const separators = within(container).getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('should render nothing inside container when data is empty', () => {
    const data = buildData([]);

    render(<CustomBreadcrumb data={data} />);

    const container = screen.getByTestId('breadcrumb-container');

    expect(container.childElementCount).toBe(0);
    expect(within(container).queryByTestId('breadcrumb-link')).toBeNull();
    expect(within(container).queryByTestId('breadcrumb-span')).toBeNull();
    expect(within(container).queryByText('>')).toBeNull();
  });
});

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { TableContextProvider } from '../../../../../bento-core';
import SupportingData from '../SupportingDataView';

jest.mock('../../../../../bento-core', () =>
  jest.requireActual('../../../../../bento-core')
);
jest.mock('@bento-core/paginated-table', () =>
  jest.requireActual('@bento-core/paginated-table')
);

afterEach(cleanup);

const metadata = (collection, tciaCollection) => ({
  CRDCLinks: [
    {
      repository: 'IDC',
      metadata: { collection_id: collection, species: 'Canine' },
    },
    { repository: 'TCIA', metadata: { Collection: tciaCollection } },
  ],
});

const view = data => (
  <TableContextProvider>
    <SupportingData data={data} />
  </TableContextProvider>
);

it('shows metadata for both repositories and their external links', () => {
  render(view(metadata('IDC study one', 'TCIA study one')));
  expect(screen.getByText('IDC study one')).toBeTruthy();
  expect(screen.getByText('TCIA study one')).toBeTruthy();
  expect(screen.getByText('Canine')).toBeTruthy();
  expect(
    screen.getAllByRole('link').map(link => link.getAttribute('href'))
  ).toEqual([
    'https://portal.imaging.datacommons.cancer.gov/explore/',
    'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70227341#702273419937cb85808048c99e4b55fd520d63f2',
  ]);
});

it('replaces displayed values when supporting data changes', () => {
  const { rerender } = render(
    view(metadata('IDC study one', 'TCIA study one'))
  );
  rerender(view(metadata('IDC study two', 'TCIA study two')));
  expect(screen.getByText('IDC study two')).toBeTruthy();
  expect(screen.getByText('TCIA study two')).toBeTruthy();
  expect(screen.queryByText('IDC study one')).toBeNull();
  expect(screen.queryByText('TCIA study one')).toBeNull();
});

it('shows the existing empty message and clears rows when metadata disappears', () => {
  const { rerender } = render(
    view(metadata('IDC study one', 'TCIA study one'))
  );
  rerender(view({ CRDCLinks: [] }));
  expect(screen.queryByText('IDC study one')).toBeNull();
  expect(screen.queryByText('TCIA study one')).toBeNull();
  expect(screen.getAllByText('Data unavailable at this time')).toHaveLength(2);
});

it('lets users collapse and expand a repository', () => {
  render(view(metadata('IDC study one', 'TCIA study one')));
  const summary = screen
    .getByText('Imaging Data Commons (IDC)')
    .closest('[role="button"]');
  expect(summary.getAttribute('aria-expanded')).toBe('true');
  fireEvent.click(summary);
  expect(summary.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(summary);
  expect(summary.getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByText('IDC study one')).toBeTruthy();
});

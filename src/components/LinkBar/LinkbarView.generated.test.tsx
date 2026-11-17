// src/components/LinkBar/LinkbarView.generated.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router';
import LinkBar from './LinkbarView';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
}));

const mockedUseLocation = jest.mocked(useLocation);

describe('LinkBar', () => {
  const DEFAULT_TITLE = 'NCI Cancer Research Data Commons';
  const DEFAULT_URL =
    'https://datacommons.cancer.gov/?cid=crdcnav_hp_gdc.cancer.gov';

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setPathname = (pathname: string) => {
    mockedUseLocation.mockReturnValue({
      pathname,
      search: '',
      hash: '',
      state: null,
      key: 'test',
    });
  };

  it('renders a link with default title and url when not on a jBrowse page', () => {
    setPathname('/some/regular/path');

    render(<LinkBar />);

    const link = screen.getByRole('link', {
      name: DEFAULT_TITLE,
    });

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(DEFAULT_URL);

    expect(
      screen.queryByText(DEFAULT_TITLE, {
        selector: 'span',
      })
    ).toBeNull();
  });

  it('renders a non-link title when on a jBrowse page', () => {
    setPathname('/viewer/jBrowse/session/abc');

    render(<LinkBar />);

    expect(screen.queryByRole('link')).toBeNull();

    const titleEl = screen.getByText(DEFAULT_TITLE);

    expect(titleEl).not.toBeNull();
    expect(titleEl.closest('a')).toBeNull();
  });

  it('renders the provided title and url when not on a jBrowse page', () => {
    setPathname('/home');

    const customTitle = 'Custom Data Commons';
    const customUrl = 'https://example.org/data';

    render(<LinkBar title={customTitle} url={customUrl} />);

    const link = screen.getByRole('link', {
      name: customTitle,
    });

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(customUrl);
  });

  it('renders the provided title as non-link on a jBrowse page', () => {
    setPathname('/jBrowse');

    const customTitle = 'Custom Non-Link Title';

    render(<LinkBar title={customTitle} />);

    expect(screen.queryByRole('link')).toBeNull();

    const titleEl = screen.getByText(customTitle);

    expect(titleEl).not.toBeNull();
    expect(titleEl.closest('a')).toBeNull();
  });

  it('does not treat lowercase "/jbrowse" as a jBrowse page', () => {
    setPathname('/path/jbrowse/view');

    render(<LinkBar />);

    const link = screen.getByRole('link', {
      name: DEFAULT_TITLE,
    });

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(DEFAULT_URL);
  });

  it('handles the root path as a non-jBrowse page and renders a link', () => {
    setPathname('/');

    render(<LinkBar />);

    const link = screen.getByRole('link', {
      name: DEFAULT_TITLE,
    });

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(DEFAULT_URL);
  });
});

// src/components/Footer/FooterView.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock axios for network calls
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));
import axios from 'axios';

// Mock react-router useLocation
jest.mock('react-router', () => ({
  __esModule: true,
  useLocation: jest.fn(),
}));
import { useLocation } from 'react-router';

// Mock env to provide deterministic URLs
jest.mock('../../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_FILE_SERVICE_VERSION: 'https://example.com/fs/version',
    REACT_APP_BACKEND_VERSION: 'https://example.com/be/version',
    REACT_APP_FE_VERSION: '0.0.0-test',
    REACT_APP_BE_VERSION: '0.0.0-test-be',
  },
}));

// Mock FooterData to avoid side-effects and simplify assertions
jest.mock('../../bento/globalFooterData', () => ({
  __esModule: true,
  default: {
    bg: '#000',
    version: '0.0.0-test',
    BEversion: '0.0.0-test-be',
    link_sections: [
      { title: 'Contact Information', items: [] },
      { title: 'More Information', items: [] },
      {
        title: 'System Info',
        systemInfoInLinkSection: true,
        items: [
          { text: 'Release Notes', link: 'https://example.com/releases' },
          { text: 'FE Version: 0.0.0-test' },
          { text: 'BE Version: 0.0.0-test-be' },
          { text: 'System Info Page', link: '/sysinfo' },
        ],
      },
      { title: 'Policies', items: [] },
    ],
    global_footer_links: [],
  },
}));

// Mock Footer to capture props deterministically
jest.mock('../../bento-core', () => ({
  __esModule: true,
  Footer: ({ data, styles }) => (
    <div data-testid="footer" data-styles={JSON.stringify(styles)}>
      {JSON.stringify(data)}
    </div>
  ),
}));

// Mock CustomThemeProvider to a transparent wrapper
jest.mock('./FooterThemConfig', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

import ICDCFooter from './FooterView';

describe('ICDCFooter', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default axios responses for all tests to prevent unhandled errors in effects
    axios.get.mockImplementation(url => {
      if (url === 'https://example.com/fs/version') {
        return Promise.resolve({ data: { version: '1.0.0' } });
      }
      if (url === 'https://example.com/be/version') {
        return Promise.resolve({ data: { version: '2.0.0' } });
      }
      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });
  });

  test('should return null when pathname includes /jBrowse/', async () => {
    useLocation.mockReturnValue({ pathname: '/some/jBrowse/path' });

    render(<ICDCFooter />);

    // Footer should not render at all
    expect(screen.queryByTestId('footer')).toBeNull();

    // Even though the effect runs, our axios mocks prevent crashes; verify calls were attempted
    expect(axios.get).toHaveBeenCalledWith('https://example.com/fs/version');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/be/version');
  });

  test('happy path: renders Footer and appends FS Version from API', async () => {
    useLocation.mockReturnValue({ pathname: '/home' });

    // Override defaults with specific versions for this test
    axios.get.mockImplementation(url => {
      if (url === 'https://example.com/fs/version') {
        return Promise.resolve({ data: { version: '1.2.3' } });
      }
      if (url === 'https://example.com/be/version') {
        return Promise.resolve({ data: { version: '9.9.9' } });
      }
      return Promise.reject(new Error('Unexpected URL: ' + url));
    });

    render(<ICDCFooter />);

    const footerEl = await screen.findByTestId('footer');

    // Verify axios calls
    expect(axios.get).toHaveBeenCalledWith('https://example.com/fs/version');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/be/version');

    // Verify the rendered data contains appended FS Version
    const data = JSON.parse(footerEl.textContent || '{}');

    expect(Array.isArray(data.link_sections)).toBe(true);

    const sysInfo =
      data.link_sections.find(s => s && s.title === 'System Info') ||
      data.link_sections[2];

    const itemTexts = (sysInfo?.items || []).map(i => i.text);
    expect(itemTexts).toContain('FS Version: 1.2.3');

    // Ensure styles prop is passed through to Footer
    const styles = JSON.parse(footerEl.getAttribute('data-styles') || '{}');
    expect(styles).toEqual({ padding: '24px 294px 45px' });
  });

  test('error path: sets FileServiceVersion error field when FS call handling fails', async () => {
    useLocation.mockReturnValue({ pathname: '/home' });

    // Make FS response undefined so destructuring throws inside try block and is caught
    axios.get.mockImplementation(url => {
      if (url === 'https://example.com/fs/version') {
        return Promise.resolve(undefined);
      }
      if (url === 'https://example.com/be/version') {
        return Promise.resolve({ data: { version: '2.0.0' } });
      }
      return Promise.reject(new Error('Unexpected URL: ' + url));
    });

    render(<ICDCFooter />);

    const footerEl = await screen.findByTestId('footer');
    const data = JSON.parse(footerEl.textContent || '{}');

    expect(data.FileServiceVersion).toBe(
      'Error in getting File service verison'
    );

    // Both endpoints should still have been attempted/called
    expect(axios.get).toHaveBeenCalledWith('https://example.com/fs/version');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/be/version');
  });
});

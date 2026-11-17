// src/components/USABanner/index.test.tsx

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import USABanner from './index';

jest.mock('../../../public/images/us_flag.png', () => 'mock-flag.png');

describe('USABanner', () => {
  it('should render the banner with correct test id and text', () => {
    render(<USABanner />);

    const banner = screen.getByTestId('navigation-flag-banner');
    expect(banner).not.toBeNull();

    const container = within(banner).getByText(
      'An official website of the United States government'
    );
    expect(container).not.toBeNull();
  });

  it('should display the US flag image with correct alt text and mocked src', () => {
    render(<USABanner />);

    const img = screen.getByRole('img', { name: /us flag/i });
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('mock-flag.png');
  });

  it('should render text inside a dedicated container with class "text"', () => {
    render(<USABanner />);

    const textEl = screen.getByText(
      'An official website of the United States government'
    );
    expect(textEl.className).toContain('text');

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
  });
});

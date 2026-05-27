// src/components/CustomIcon/CustomIconView.test.jsx
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CustomIconView from './CustomIconView';

const expectElement = (element, message) => {
  if (!element) {
    throw new Error(message);
  }
  return element;
};

afterEach(() => {
  cleanup();
});

describe('CustomIconView', () => {
  it('renders an img with the default alt text and provided src', () => {
    const { container } = render(<CustomIconView imgSrc="mock-flag.png" />);

    const iconEl = container.querySelector('.MuiIcon-root');
    const img = container.querySelector('img[alt="Logo alt text"]');

    expect(iconEl).not.toBeNull();
    expect(img).not.toBeNull();

    const imgEl = expectElement(img, 'Expected image element to be rendered');
    expect(imgEl.getAttribute('src')).toBe('mock-flag.png');
    expect(imgEl.getAttribute('alt')).toBe('Logo alt text');
  });

  it('uses the provided imgAlt instead of the default', () => {
    const { container } = render(
      <CustomIconView imgSrc="mock-flag.png" imgAlt="Custom Alt" />
    );

    const img = container.querySelector('img[alt="Custom Alt"]');

    expect(img).not.toBeNull();

    const imgEl = expectElement(img, 'Expected image element to be rendered');
    expect(imgEl.getAttribute('src')).toBe('mock-flag.png');
    expect(imgEl.getAttribute('alt')).toBe('Custom Alt');
  });

  it('wraps the image inside a Material-UI Icon element', () => {
    const { container } = render(<CustomIconView imgSrc="mock-flag.png" />);

    const iconEl = container.querySelector('.MuiIcon-root');
    const img = container.querySelector('img[alt="Logo alt text"]');

    expect(iconEl).not.toBeNull();
    expect(img).not.toBeNull();

    const iconNode = expectElement(iconEl, 'Expected Material-UI Icon wrapper');
    const imgNode = expectElement(img, 'Expected image element to be rendered');
    expect(iconNode.contains(imgNode)).toBe(true);
  });

  it('handles undefined imgSrc gracefully by omitting the src attribute', () => {
    const { container } = render(<CustomIconView />);

    const img = container.querySelector('img[alt="Logo alt text"]');

    expect(img).not.toBeNull();

    const imgNode = expectElement(img, 'Expected image element to be rendered');
    expect(imgNode.hasAttribute('src')).toBe(false);
    expect(imgNode.getAttribute('alt')).toBe('Logo alt text');
  });

  it('applies the generated withStyles class to the image', () => {
    const { container } = render(<CustomIconView imgSrc="mock-flag.png" />);

    const img = container.querySelector('img[alt="Logo alt text"]');

    expect(img).not.toBeNull();

    const imgNode = expectElement(img, 'Expected image element to be rendered');
    expect(imgNode.className).toBeTruthy();
    expect(imgNode.className).toMatch(/root/);
  });
});

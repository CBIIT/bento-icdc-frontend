// src/components/Tab/TabLable.test.tsx
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TabLabel from './TabLable';

describe('TabLabel', () => {
  const basePrimaryStyles = { color: 'rgb(0, 0, 0)' };

  afterEach(() => {
    cleanup();
  });

  it('renders start-cased title when it does not include ICDC', () => {
    render(
      <TabLabel
        title="hello_world example"
        primaryColorStyles={basePrimaryStyles}
      />
    );

    const titleNode = screen.getByText('Hello World Example');
    expect(titleNode).not.toBeNull();
    expect(titleNode.textContent).toBe('Hello World Example');
  });

  it('preserves title casing when it includes ICDC', () => {
    const title = 'Welcome to ICDC Portal';
    render(<TabLabel title={title} primaryColorStyles={basePrimaryStyles} />);

    const titleNode = screen.getByText(title);
    expect(titleNode).not.toBeNull();
    expect(titleNode.textContent).toBe(title);
  });

  it('renders icon and spacer when icon is provided', () => {
    render(
      <TabLabel
        title="with icon"
        primaryColorStyles={basePrimaryStyles}
        icon="mock-icon.png"
        iconSpacing="12px"
      />
    );

    const img = screen.getByAltText('icdc_carousel_tabs') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toContain('mock-icon.png');

    const spacer = img.nextElementSibling as HTMLDivElement | null;
    expect(spacer).not.toBeNull();
    expect(spacer?.tagName).toBe('DIV');
    expect(spacer?.style.height).toBe('12px');

    const titleNode = screen.getByText('With Icon');
    expect(titleNode).not.toBeNull();
  });

  it('uses default spacer height of 0 when iconSpacing is not provided', () => {
    render(
      <TabLabel
        title="default spacing"
        primaryColorStyles={basePrimaryStyles}
        icon="mock-icon.png"
      />
    );

    const img = screen.getByAltText('icdc_carousel_tabs') as HTMLImageElement;
    expect(img).not.toBeNull();

    const spacer = img.nextElementSibling as HTMLDivElement | null;
    expect(spacer).not.toBeNull();
    expect(spacer?.tagName).toBe('DIV');
    expect(spacer?.style.height).toBe('0px');
  });

  it('does not render img or spacer when icon is not provided', () => {
    render(<TabLabel title="no icon" primaryColorStyles={basePrimaryStyles} />);

    expect(screen.queryByAltText('icdc_carousel_tabs')).toBeNull();

    const titleNode = screen.getByText('No Icon');
    expect(titleNode).not.toBeNull();
  });

  it('renders empty text when title is an empty string', () => {
    const { container } = render(
      <TabLabel title="" primaryColorStyles={basePrimaryStyles} />
    );

    const span = container.querySelector('span');
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe('');
  });
});

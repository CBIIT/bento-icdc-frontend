// src/components/PaginatedTable/Customize/components/DataValue.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import DataValue from './DataValue';

const mockReact = React;

// Mock only the ToolTip from bento-core to make tests deterministic.
// Avoid JSX inside the factory and avoid require() to satisfy lint rules.
jest.mock('../../../../bento-core', () => {
  const ToolTipMock = ({ title, children }) =>
    mockReact.createElement(
      'span',
      { 'data-testid': 'tooltip', 'data-title': title, role: 'tooltip' },
      children
    );
  return { ToolTip: ToolTipMock };
});

describe('DataValue', () => {
  const renderWith = (dataField, value) =>
    render(<DataValue dataField={dataField} {...{ [dataField]: value }} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render plain span without ToolTip when content length is <= 90', () => {
    const value = 'a'.repeat(90);
    renderWith('name', value);

    expect(screen.queryByTestId('tooltip')).toBeNull();
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should render ToolTip when content length is 91', () => {
    const value = 'b'.repeat(91);
    renderWith('label', value);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.getAttribute('data-title')).toBe(value);
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should render ToolTip and not truncate when content length is 92', () => {
    const value = 'c'.repeat(92);
    renderWith('field', value);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.getAttribute('data-title')).toBe(value);
    expect(screen.getByText(value)).toBeTruthy();
  });

  it('should truncate content longer than 92 characters without rendering ToolTip', () => {
    const longValue = 'The quick brown fox jumps over the lazy dog '.repeat(3);
    const { container } = renderWith('desc', longValue);

    expect(screen.queryByTestId('tooltip')).toBeNull();

    const displayed = container.querySelector('span');
    expect(displayed).toBeTruthy();

    const text = displayed.textContent || '';
    expect(text).not.toEqual(longValue);
    expect(text.length).toBeLessThanOrEqual(92);
    expect(text.length).toBeGreaterThan(0);
  });

  it('should handle undefined value and render "undefined" without ToolTip', () => {
    renderWith('value', undefined);

    expect(screen.queryByTestId('tooltip')).toBeNull();
    expect(screen.getByText('undefined')).toBeTruthy();
  });

  it('should handle null value and render "null" without ToolTip', () => {
    renderWith('value', null);

    expect(screen.queryByTestId('tooltip')).toBeNull();
    expect(screen.getByText('null')).toBeTruthy();
  });

  it('should render empty string as-is without ToolTip', () => {
    const { container } = renderWith('text', '');

    expect(screen.queryByTestId('tooltip')).toBeNull();

    const spans = Array.from(container.querySelectorAll('span'));
    const emptySpan = spans.find(s => s.textContent === '');
    expect(emptySpan).toBeTruthy();
  });

  it('should coerce array values to comma-separated string and show ToolTip when long', () => {
    const arr = Array.from({ length: 50 }, (_, i) => `item${i}`);
    renderWith('items', arr);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeTruthy();

    const expectedTitle = `${arr}`;
    expect(tooltip.getAttribute('data-title')).toBe(expectedTitle);

    const displayed = tooltip.textContent || '';
    expect(displayed).not.toEqual(expectedTitle);
    expect(displayed.length).toBeLessThanOrEqual(92);
  });

  it('should coerce short array values to string and not show ToolTip when short', () => {
    const arr = ['a', 'b', 'c'];
    renderWith('items', arr);

    expect(screen.queryByTestId('tooltip')).toBeNull();
    expect(screen.getByText('a,b,c')).toBeTruthy();
  });
});

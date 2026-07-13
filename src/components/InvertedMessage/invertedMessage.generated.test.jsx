// src/components/InvertedMessage/invertedMessage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import InvertedMessage from './invertedMessage.jsx';

describe('InvertedMessage component', () => {
  it('renders the provided data inside the message text area', () => {
    const data = 'Hello, Inverted World!';
    const { container } = render(<InvertedMessage data={data} />);

    expect(screen.getByText(data)).toBeTruthy();

    const outer = container.firstElementChild;
    expect(outer).not.toBeNull();
    expect(outer.tagName).toBe('DIV');
    expect(outer.children).toHaveLength(2);

    const arrayIcon = outer.children[0];
    const textArea = outer.children[1];

    expect(arrayIcon.children).toHaveLength(2);
    expect(textArea.textContent).toBe(data);
  });

  it.each([
    ['undefined', undefined],
    ['null', null],
    ['empty string', ''],
  ])('renders empty text when data is %s', (_label, data) => {
    const { container } = render(<InvertedMessage data={data} />);

    const outer = container.firstElementChild;
    expect(outer).not.toBeNull();
    expect(outer.children).toHaveLength(2);

    const arrayIcon = outer.children[0];
    const textArea = outer.children[1];

    expect(arrayIcon.children).toHaveLength(2);
    expect(textArea.textContent).toBe('');
  });

  it('keeps the icon structure intact', () => {
    const { container } = render(<InvertedMessage data="Structure check" />);

    const outer = container.firstElementChild;
    const arrayIcon = outer.children[0];
    const cover = arrayIcon.children[0];
    const base = arrayIcon.children[1];

    expect(outer).not.toBeNull();
    expect(arrayIcon).not.toBeNull();
    expect(cover).not.toBeNull();
    expect(base).not.toBeNull();
    expect(arrayIcon.contains(cover)).toBe(true);
    expect(arrayIcon.contains(base)).toBe(true);
  });
});

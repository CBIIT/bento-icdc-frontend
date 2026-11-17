// src/components/Message/message.test.jsx
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@material-ui/core', () => {
  const ReactLib = jest.requireActual('react');

  return {
    withStyles: styles => Component => props => {
      const styleObj = typeof styles === 'function' ? styles() : styles || {};
      const classes = Object.keys(styleObj).reduce((acc, key) => {
        acc[key] = key;
        return acc;
      }, {});

      return ReactLib.createElement(Component, { ...props, classes });
    },
  };
});

import Message from './message';

describe('message component', () => {
  test('should render provided data inside messageTextArea', () => {
    const text = 'Hello, ICDC!';
    const { container, getByText } = render(<Message data={text} />);

    expect(getByText(text)).toBeTruthy();

    const textArea = container.querySelector('.messageTextArea');
    expect(textArea).not.toBeNull();
    expect(textArea.textContent).toBe(text);
  });

  test('should render array icon structure with cover and base', () => {
    const { container } = render(<Message data="icon test" />);

    const arrayIcon = container.querySelector('.arrayIcon');
    const cover = container.querySelector('.arrayIconCover');
    const base = container.querySelector('.arrayIconBase');

    expect(arrayIcon).not.toBeNull();
    expect(cover).not.toBeNull();
    expect(base).not.toBeNull();
    expect(arrayIcon.contains(cover)).toBe(true);
    expect(arrayIcon.contains(base)).toBe(true);
  });

  test.each([
    { label: 'undefined', value: undefined },
    { label: 'null', value: null },
    { label: 'empty string', value: '' },
  ])('should render empty content when data is $label', ({ value }) => {
    const { container } = render(<Message data={value} />);

    const textArea = container.querySelector('.messageTextArea');
    expect(textArea).not.toBeNull();
    expect(textArea.textContent).toBe('');
  });

  test('should render outer container without crashing even if outer class is undefined', () => {
    const { container } = render(<Message data="outer container test" />);
    const outer = container.firstChild;

    expect(outer).not.toBeNull();
    expect(outer.nodeName).toBe('DIV');
  });
});

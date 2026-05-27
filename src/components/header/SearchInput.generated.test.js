import React from 'react';
import {
  render,
  fireEvent,
  createEvent,
  cleanup,
} from '@testing-library/react';
import SearchBar from './SearchInput';

describe('SearchBar', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
    }
    cleanup();
  });

  function renderSearchBar(props = {}) {
    return render(
      <SearchBar
        placeholder="Search here"
        defaultValue=""
        ariaLabel="Search"
        {...props}
      />
    );
  }

  test('renders with placeholder, default value, and button text', () => {
    const { container } = renderSearchBar({
      placeholder: 'Search here',
      defaultValue: 'initial text',
      buttonText: 'Go',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const button = container.querySelector('button');

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    expect(input.getAttribute('placeholder')).toBe('Search here');
    expect(input.value).toBe('initial text');
    expect(button.textContent).toContain('Go');
  });

  test('calls onClick with the current input value when button is clicked', () => {
    const onClick = jest.fn();
    const { container } = renderSearchBar({
      onClick,
      defaultValue: 'hello',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const button = container.querySelector('button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('hello');
    expect(input.value).toBe('hello');
  });

  test('updates the input value and passes the latest value to onClick', () => {
    const onClick = jest.fn();
    const { container } = renderSearchBar({
      onClick,
      defaultValue: '',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const button = container.querySelector('button');

    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('new query');
    expect(input.value).toBe('new query');
  });

  test('calls onEnter when Enter is pressed and prevents default behavior', () => {
    const onEnter = jest.fn();
    const { container } = renderSearchBar({
      onEnter,
      defaultValue: 'enter value',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const event = createEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    fireEvent(input, event);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith('enter value');
  });

  test('does not call onEnter when a non-Enter key is pressed', () => {
    const onEnter = jest.fn();
    const { container } = renderSearchBar({
      onEnter,
      defaultValue: 'value',
    });

    const input = container.querySelector('input[aria-label="Search"]');

    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
      bubbles: true,
      cancelable: true,
    });

    expect(onEnter).not.toHaveBeenCalled();
  });

  test('is disabled and shows a loading indicator when loading is true', () => {
    const onClick = jest.fn();
    const onEnter = jest.fn();
    const { container } = renderSearchBar({
      loading: true,
      onClick,
      onEnter,
      defaultValue: 'loading text',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const button = container.querySelector('button');
    const progress = container.querySelector('[role="progressbar"]');

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
    expect(progress).not.toBeNull();

    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);
    expect(button.textContent).not.toContain('Search');

    fireEvent.click(button);
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true,
    });

    expect(onClick).not.toHaveBeenCalled();
    expect(onEnter).not.toHaveBeenCalled();
  });

  test('is disabled when disabled prop is true', () => {
    const onClick = jest.fn();
    const onEnter = jest.fn();
    const { container } = renderSearchBar({
      disabled: true,
      onClick,
      onEnter,
      defaultValue: 'disabled text',
    });

    const input = container.querySelector('input[aria-label="Search"]');
    const button = container.querySelector('button');

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();

    expect(input.disabled).toBe(true);
    expect(button.disabled).toBe(true);

    fireEvent.click(button);
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
      cancelable: true,
    });

    expect(onClick).not.toHaveBeenCalled();
    expect(onEnter).not.toHaveBeenCalled();
  });

  test('applies a custom aria label', () => {
    const { container } = renderSearchBar({
      ariaLabel: 'Custom search field',
    });

    const input = container.querySelector(
      'input[aria-label="Custom search field"]'
    );

    expect(input).not.toBeNull();
  });
});

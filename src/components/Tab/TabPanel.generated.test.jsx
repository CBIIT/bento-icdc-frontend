import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPanel from './TabPanel';

describe('TabPanel', () => {
  test('renders with role tabpanel', () => {
    render(
      <TabPanel value={0} index={0}>
        content
      </TabPanel>
    );

    expect(screen.getByRole('tabpanel')).toBeTruthy();
  });

  test('renders children and is visible when value equals index', () => {
    render(
      <TabPanel value={1} index={1}>
        visible child
      </TabPanel>
    );

    const tabpanel = screen.getByRole('tabpanel');

    expect(tabpanel).toBeTruthy();
    expect(tabpanel.hidden).toBe(false);
    expect(screen.getByText('visible child')).toBeTruthy();
    expect(getComputedStyle(tabpanel).display).toBe('block');
  });

  test('applies container display flex when style is provided and value equals index', () => {
    render(
      <TabPanel
        value={2}
        index={2}
        style={{ backgroundColor: 'red' }}
        innerDivStyle={{ padding: '10px' }}
      >
        styled child
      </TabPanel>
    );

    const tabpanel = screen.getByRole('tabpanel');
    const innerContainer = tabpanel.firstElementChild;

    expect(tabpanel).toBeTruthy();
    expect(tabpanel.hidden).toBe(false);
    expect(getComputedStyle(tabpanel).display).toBe('flex');
    expect(getComputedStyle(tabpanel).backgroundColor).toBe('red');

    expect(innerContainer).toBeTruthy();
    expect(screen.getByText('styled child')).toBeTruthy();
  });

  test('is hidden and has display none when value does not equal index and style is provided', () => {
    render(
      <TabPanel value={0} index={1} style={{ backgroundColor: 'blue' }}>
        hidden child
      </TabPanel>
    );

    const tabpanel = screen.getByRole('tabpanel', { hidden: true });

    expect(tabpanel).toBeTruthy();
    expect(tabpanel.hidden).toBe(true);
    expect(getComputedStyle(tabpanel).display).toBe('none');
    expect(getComputedStyle(tabpanel).backgroundColor).toBe('blue');
  });

  test('is hidden when value does not equal index and no style is provided', () => {
    render(
      <TabPanel value={5} index={6}>
        another hidden child
      </TabPanel>
    );

    const tabpanel = screen.getByRole('tabpanel', { hidden: true });

    expect(tabpanel).toBeTruthy();
    expect(tabpanel.hidden).toBe(true);
    expect(getComputedStyle(tabpanel).display).toBe('none');
  });

  test('renders even with null children', () => {
    render(<TabPanel value={0} index={0} />);

    const tabpanel = screen.getByRole('tabpanel');
    const innerContainer = tabpanel.firstElementChild;

    expect(tabpanel).toBeTruthy();
    expect(innerContainer).toBeTruthy();
    expect(innerContainer.textContent).toBe('');
  });
});

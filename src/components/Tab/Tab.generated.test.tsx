import React, { CSSProperties } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { Orientation } from '@mui/material';
import TabItems from './Tab';

type TabLabelMockProps = {
  title: string;
  icon?: string;
  iconSpacing?: string;
  primaryColorStyles: CSSProperties;
};

jest.mock('./TabLable', () => {
  const MockTabLabel = ({
    title,
    icon,
    iconSpacing,
    primaryColorStyles,
  }: TabLabelMockProps) => (
    <div
      data-testid={`tab-label-${title}`}
      data-style-color={String(primaryColorStyles.color ?? '')}
      data-icon={icon ?? ''}
      data-icon-spacing={iconSpacing ?? ''}
    >
      {title}
    </div>
  );

  return {
    __esModule: true,
    default: MockTabLabel,
  };
});

describe('TabItems', () => {
  const baseStyleClasses = {
    tabPrimaryColor: { color: 'blue' },
    tabHighlightColor: { color: 'red' },
    hrLine: { borderTop: '1px solid #ccc', marginTop: '8px' },
  };

  const makeProps = (
    overrides?: Partial<React.ComponentProps<typeof TabItems>>
  ): React.ComponentProps<typeof TabItems> => {
    const tabItems = [
      { index: 0, label: 'overview', value: 'overview', icon: 'icon-1.png' },
      { index: 1, label: 'data summary', value: 'data', icon: 'icon-2.png' },
      { index: 2, label: 'ICDC special', value: 'icdc', icon: 'icon-3.png' },
    ];

    return {
      tabItems,
      styleClasses: baseStyleClasses,
      handleTabChange: jest.fn(
        (_: React.SyntheticEvent<Element, Event>, __: any) => undefined
      ),
      currentTab: 0,
      orientation: 'horizontal',
      tabPadding: '20px 24px',
      iconSpacing: '4px',
      ...overrides,
    };
  };

  it('renders the provided tabs and separator', () => {
    const props = makeProps();
    render(<TabItems {...props} />);

    const tablist = screen.getByRole('tablist');
    const tabs = within(tablist).getAllByRole('tab');

    expect(tabs).toHaveLength(props.tabItems.length);

    props.tabItems.forEach(tab => {
      expect(screen.getByTestId(`tab-label-${tab.label}`)).toBeDefined();
    });

    expect(screen.getByRole('separator')).toBeDefined();
  });

  it('applies highlight styling to the active tab label and primary styling to others', () => {
    const props = makeProps({ currentTab: 1 });
    render(<TabItems {...props} />);

    props.tabItems.forEach((tab, index) => {
      const label = screen.getByTestId(`tab-label-${tab.label}`);
      const expectedColor = index === props.currentTab ? 'red' : 'blue';

      expect(label.getAttribute('data-style-color')).toBe(expectedColor);
    });
  });

  it('updates the highlighted tab when currentTab changes', () => {
    const initialProps = makeProps({ currentTab: 0 });
    const { rerender } = render(<TabItems {...initialProps} />);

    initialProps.tabItems.forEach((tab, index) => {
      const label = screen.getByTestId(`tab-label-${tab.label}`);
      const expectedColor = index === 0 ? 'red' : 'blue';
      expect(label.getAttribute('data-style-color')).toBe(expectedColor);
    });

    const nextProps = makeProps({ currentTab: 2 });
    rerender(<TabItems {...nextProps} />);

    nextProps.tabItems.forEach((tab, index) => {
      const label = screen.getByTestId(`tab-label-${tab.label}`);
      const expectedColor = index === 2 ? 'red' : 'blue';
      expect(label.getAttribute('data-style-color')).toBe(expectedColor);
    });
  });

  it('calls handleTabChange when a different tab is clicked', () => {
    const handleTabChange = jest.fn(
      (_: React.SyntheticEvent<Element, Event>, __: any) => undefined
    );

    const props = makeProps({
      currentTab: 0,
      handleTabChange,
    });

    render(<TabItems {...props} />);

    const tablist = screen.getByRole('tablist');
    const tabs = within(tablist).getAllByRole('tab');

    fireEvent.click(tabs[1]);

    expect(handleTabChange).toHaveBeenCalledTimes(1);
    expect(handleTabChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('sets aria-orientation when orientation is vertical', () => {
    const props = makeProps({ orientation: 'vertical' as Orientation });
    render(<TabItems {...props} />);

    expect(screen.getByRole('tablist').getAttribute('aria-orientation')).toBe(
      'vertical'
    );
  });

  it('renders safely when tabItems is empty', () => {
    const props = makeProps({ tabItems: [] });
    render(<TabItems {...props} />);

    const tablist = screen.getByRole('tablist');
    expect(within(tablist).queryAllByRole('tab')).toHaveLength(0);
    expect(screen.getByRole('separator')).toBeDefined();
  });

  it('passes tab padding and icon spacing to the mocked TabLabel', () => {
    const props = makeProps({
      tabPadding: '28px 32px',
      iconSpacing: '12px',
    });
    render(<TabItems {...props} />);

    expect(
      screen.getByTestId('tab-label-overview').getAttribute('data-icon-spacing')
    ).toBe('12px');
    expect(
      screen.getByTestId('tab-label-overview').getAttribute('data-icon')
    ).toBe('icon-1.png');
  });
});

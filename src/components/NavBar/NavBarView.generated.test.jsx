// src/components/NavBar/NavBarView.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@bento-core/nav-bar', () => {
  function NavBarMock(props) {
    return (
      <div data-testid="mock-nav-bar" data-props={JSON.stringify(props)}>
        MockNavBar
      </div>
    );
  }

  return {
    NavBar: NavBarMock,
  };
});

jest.mock('./NavBarThemeConfig', () => {
  function NavBarThemeConfigMock({ children }) {
    return <>{children}</>;
  }

  return {
    __esModule: true,
    default: NavBarThemeConfigMock,
  };
});

jest.mock('../../bento/navigationBarData', () => ({
  navBarCartData: { sentinel: 'mockCartData' },
  HeaderLinks: [{ id: 'link1' }, { id: 'link2' }],
  HeaderSubLinks: [{ id: 'sublink1' }],
  headerData: { title: 'Mock Header' },
}));

import BentoNavBar from './NavBarView';

const getNavBarProps = () => {
  const el = screen.getByTestId('mock-nav-bar');
  return JSON.parse(el.getAttribute('data-props'));
};

describe('BentoNavBar', () => {
  test('should render NavBar with numberOfCases equal to cartFieldIds length', () => {
    const cartFieldIds = ['a', 'b', 'c', 'd'];

    render(<BentoNavBar cartFieldIds={cartFieldIds} />);

    const props = getNavBarProps();
    expect(props.numberOfCases).toBe(cartFieldIds.length);
    expect(props.endComponent).toBe(true);
    expect(props.navBarCartData).toEqual({ sentinel: 'mockCartData' });
    expect(props.config).toEqual({
      HeaderLinks: [{ id: 'link1' }, { id: 'link2' }],
      HeaderSubLinks: [{ id: 'sublink1' }],
      headerData: { title: 'Mock Header' },
    });
  });

  test('should default numberOfCases to 0 when cartFieldIds is undefined', () => {
    render(<BentoNavBar />);

    const props = getNavBarProps();
    expect(props.numberOfCases).toBe(0);
    expect(props.endComponent).toBe(true);
  });

  test('should set numberOfCases to 0 when cartFieldIds is an empty array', () => {
    render(<BentoNavBar cartFieldIds={[]} />);

    const props = getNavBarProps();
    expect(props.numberOfCases).toBe(0);
    expect(props.endComponent).toBe(true);
  });

  test('should render the mocked NavBar component once', () => {
    render(<BentoNavBar cartFieldIds={['x']} />);
    const nav = screen.getByTestId('mock-nav-bar');
    expect(nav).not.toBeNull();
  });
});

// src/components/Layout/LayoutView.generated.test.tsx
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LayoutView from './LayoutView';

jest.useFakeTimers();

jest.mock('../../bento/aboutPagesRoutes', () => ({
  __esModule: true,
  default: [],
}));

jest.mock('../../bento/navigationBarData', () => ({
  __esModule: true,
  navBarExclusions: ['#/jBrowse/singleFileView'],
}));

jest.mock('../LinkBar', () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => (
    <div data-testid="linkbar">LinkBar url: {url}</div>
  ),
}));

jest.mock('../Footer/FooterView', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('../header/HeaderView', () => ({
  __esModule: true,
  default: () => <div data-testid="header">Header</div>,
}));

jest.mock('../NavBar/NavBarContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">NavBar</div>,
}));

jest.mock('../USABanner', () => ({
  __esModule: true,
  default: () => <div data-testid="usabanner">USABanner</div>,
}));

jest.mock('../OverlayWindow/OverlayWindow', () => ({
  __esModule: true,
  default: ({
    open,
    handleClose,
  }: {
    open: boolean;
    handleClose: () => void;
  }) => (
    <button
      data-testid="overlay"
      data-open={String(open)}
      onClick={handleClose}
    >
      Overlay
    </button>
  ),
}));

jest.mock('../../pages/landing/landingController', () => ({
  __esModule: true,
  default: () => <div data-testid="home">Home</div>,
}));

jest.mock('../../pages/dashboard/DashboardController', () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard">Dashboard</div>,
}));

jest.mock('../../pages/unifiedView/unifiedController', () => ({
  __esModule: true,
  default: () => <div data-testid="unifiedDash">UnifiedDash</div>,
}));

jest.mock('../../pages/globalSearch/GlobalSearchController', () => ({
  __esModule: true,
  default: () => <div data-testid="globalSearch">GlobalSearch</div>,
}));

jest.mock('../../pages/JbrowseDetail/JbrowseController', () => ({
  __esModule: true,
  default: () => <div data-testid="jbrowse">Jbrowse</div>,
}));

jest.mock('../../pages/navigator/NavigatorView', () => ({
  __esModule: true,
  default: () => <div data-testid="navigator">Navigator</div>,
}));

jest.mock('../graphql/GraphQLView', () => ({
  __esModule: true,
  default: () => <div data-testid="graphql">GraphQL</div>,
}));

jest.mock('../../pages/about/aboutController', () => ({
  __esModule: true,
  default: () => <div data-testid="about">About</div>,
}));

jest.mock('../../pages/studies/studiesController', () => ({
  __esModule: true,
  default: () => <div data-testid="studies">Studies</div>,
}));

jest.mock('../../pages/programs/programsController', () => ({
  __esModule: true,
  default: () => <div data-testid="programs">Programs</div>,
}));

jest.mock('../../pages/programDetail/program-detail-controller', () => ({
  __esModule: true,
  default: () => <div data-testid="programDetail">ProgramDetail</div>,
}));

jest.mock('../../pages/study/studyDetailController', () => ({
  __esModule: true,
  default: () => <div data-testid="studyDetail">StudyDetail</div>,
}));

jest.mock('../../pages/caseDetails/caseDetailsController', () => ({
  __esModule: true,
  default: () => <div data-testid="caseDetails">CaseDetails</div>,
}));

jest.mock('../../pages/Cart/CartController', () => ({
  __esModule: true,
  default: () => <div data-testid="cartView">CartView</div>,
}));

jest.mock('../../pages/sysinfo/sysInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="sysinfo">SysInfo</div>,
}));

jest.mock('../../pages/error/Error', () => ({
  __esModule: true,
  default: () => <div data-testid="error">Error</div>,
}));

jest.mock('./LayoutView.styled', () => {
  const mockReact = jest.requireActual<typeof import('react')>('react');

  const HeaderContainer = mockReact.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >((props, ref) => (
    <div data-testid="header-container" ref={ref} {...props} />
  ));
  HeaderContainer.displayName = 'HeaderContainer';

  const ContentWrapper = mockReact.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
  >((props, ref) => <div data-testid="content-wrapper" ref={ref} {...props} />);
  ContentWrapper.displayName = 'ContentWrapper';

  return {
    __esModule: true,
    HeaderContainer,
    ContentWrapper,
  };
});

const flushTimers = (): void => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
};

describe('LayoutView', () => {
  let requestAnimationFrameSpy: jest.SpyInstance;
  let cancelAnimationFrameSpy: jest.SpyInstance;
  let scrollToDescriptor: PropertyDescriptor | undefined;
  let scrollToMock: jest.Mock;

  beforeAll(() => {
    requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback): number => {
        cb(0);
        return 0;
      });

    cancelAnimationFrameSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => undefined);

    scrollToDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'scrollTo'
    );
  });

  beforeEach(() => {
    sessionStorage.clear();
    document.documentElement.style.removeProperty('--site-alert-offset');
    document.documentElement.style.removeProperty('--header-offset');
    document.documentElement.style.removeProperty('--content-offset');
    document.body.innerHTML = '<div id="root"></div>';
    window.location.hash = '#/home';

    scrollToMock = jest.fn();

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      writable: true,
      value: scrollToMock,
    });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });

    jest.clearAllTimers();

    if (scrollToDescriptor) {
      Object.defineProperty(
        HTMLElement.prototype,
        'scrollTo',
        scrollToDescriptor
      );
    } else {
      delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo;
    }
  });

  afterAll(() => {
    requestAnimationFrameSpy.mockRestore();
    cancelAnimationFrameSpy.mockRestore();
    jest.useRealTimers();
  });

  it('renders the header, footer, and navbar on a normal route', () => {
    render(<LayoutView />);

    flushTimers();

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.getByTestId('footer')).toBeTruthy();
    expect(screen.getByTestId('navbar')).toBeTruthy();
    expect(screen.getByTestId('linkbar').textContent).toContain(
      'https://datacommons.cancer.gov/?cid=caninecommons.cancer.gov'
    );
  });

  it('hides the navbar when the route is excluded', () => {
    window.location.hash = '#/jBrowse/singleFileView';

    render(<LayoutView />);
    flushTimers();

    expect(screen.getByTestId('header')).toBeTruthy();
    expect(screen.queryByTestId('navbar')).toBeNull();
  });

  it('shows the overlay on first load and sets offsets when no site alert banner exists', () => {
    window.location.hash = '#/home';

    render(<LayoutView />);
    flushTimers();

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeTruthy();
    expect(overlay.getAttribute('data-open')).toBe('true');
    expect(
      document.documentElement.style.getPropertyValue('--content-offset')
    ).toBe('179px');
    expect(
      document.documentElement.style.getPropertyValue('--site-alert-offset')
    ).toBe('0px');
    expect(
      document.documentElement.style.getPropertyValue('--header-offset')
    ).toBe('0px');
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it('hides the overlay after close and persists overlayLoad in sessionStorage', () => {
    render(<LayoutView />);
    flushTimers();

    fireEvent.click(screen.getByTestId('overlay'));
    flushTimers();

    expect(sessionStorage.getItem('overlayLoad')).toBe('true');
    expect(screen.queryByTestId('overlay')).toBeNull();
  });

  it('adjusts CSS variables when a site alert banner exists', () => {
    sessionStorage.setItem('overlayLoad', 'true');
    window.location.hash = '#/home';

    const host = document.createElement('div');
    host.id = 'host-with-shadow';

    const bannerEl = document.createElement('div');
    bannerEl.className = 'usa-site-alert';

    Object.defineProperty(bannerEl, 'offsetHeight', {
      configurable: true,
      get: () => 50,
    });

    Object.defineProperty(host, 'shadowRoot', {
      configurable: true,
      value: {
        querySelector: (selector: string): Element | null => {
          return selector === '.usa-site-alert' ? bannerEl : null;
        },
      },
    });

    document.body.appendChild(host);

    render(<LayoutView />);
    flushTimers();

    expect(screen.queryByTestId('overlay')).toBeNull();
    expect(
      document.documentElement.style.getPropertyValue('--site-alert-offset')
    ).toBe('46px');
    expect(
      document.documentElement.style.getPropertyValue('--header-offset')
    ).toBe('179px');
    expect(bannerEl.style.position).toBe('fixed');
    expect(bannerEl.style.top).toBe('-2px');
    expect(bannerEl.style.left).toBe('0px');
    expect(bannerEl.style.width).toBe('100%');
    expect(bannerEl.style.zIndex).toBe('1000');
  });

  it('renders the home page route', () => {
    window.location.hash = '#/home';

    render(<LayoutView />);
    flushTimers();

    expect(screen.getByTestId('home')).toBeTruthy();
  });
});

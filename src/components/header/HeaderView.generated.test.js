import React from 'react';
import { render, screen } from '@testing-library/react';
import ICDCHeader from './HeaderView';
import headerData from '../../bento/globalHeaderData';
import { SEARCH_PUBLIC } from '../../bento/search';

const mockReact = jest.requireActual('react');
const mockUseLocation = jest.fn();
const mockClientQuery = jest.fn().mockResolvedValue({
  data: {
    globalSearch: {
      programs: [{ program_acronym: 'ABC' }],
      studies: [],
      cases: [],
      samples: [],
      files: [],
      model: [],
    },
  },
});

let lastHeaderProps = null;
let consoleErrorSpy;

const mockSearchBarGenerator = jest.fn(config => {
  const SearchBar = () =>
    mockReact.createElement('div', { 'data-testid': 'searchbar-stub' });

  return { SearchBar, config };
});

jest.mock('react-router', () => ({
  useLocation: () => mockUseLocation(),
}));

jest.mock('@material-ui/core', () => ({
  Grid: ({ children, container }) =>
    mockReact.createElement(
      'div',
      { 'data-testid': 'grid', 'data-container': container ? 'true' : 'false' },
      children
    ),
  withStyles: () => arg => arg,
}));

jest.mock('../../bento-core', () => ({
  Header: props => {
    lastHeaderProps = props;

    return mockReact.createElement(
      'div',
      { 'data-testid': 'header' },
      props.SearchComponent
        ? mockReact.createElement(props.SearchComponent, {
            'data-testid': 'search-component',
          })
        : null
    );
  },
}));

jest.mock('./HeaderTheme', () => ({
  __esModule: true,
  default: ({ children }) =>
    mockReact.createElement(mockReact.Fragment, null, children),
}));

jest.mock('./SearchInput', () => ({
  __esModule: true,
  default: () =>
    mockReact.createElement('input', { 'data-testid': 'search-input' }),
}));

jest.mock('@bento-core/global-search', () => ({
  SearchBarGenerator: (...args) => mockSearchBarGenerator(...args),
}));

jest.mock('../../utils/graphqlClient', () => ({
  __esModule: true,
  default: { query: (...args) => mockClientQuery(...args) },
}));

jest.mock('../../bento/globalHeaderData', () => ({
  __esModule: true,
  default: {
    globalHeaderLogo:
      'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/icdc_nih_logo.svg',
    globalHeaderLogoLink: '/',
    globalHeaderLogoAltText: 'ICDC Logo',
    globalHeaderImage:
      'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/png/header_Canine3000.png',
  },
}));

describe('ICDCHeader', () => {
  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    lastHeaderProps = null;

    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
      consoleErrorSpy = null;
    }
  });

  const renderWithPath = pathname => {
    mockUseLocation.mockReturnValue({ pathname });
    return render(<ICDCHeader />);
  };

  test('renders themed Header with SearchComponent on non-jBrowse and non-search routes', () => {
    renderWithPath('/');

    expect(screen.getByTestId('grid')).toBeTruthy();
    expect(lastHeaderProps).toBeTruthy();
    expect(lastHeaderProps.logo).toBe(headerData.globalHeaderLogo);
    expect(lastHeaderProps.alt).toBe(headerData.globalHeaderLogoAltText);
    expect(lastHeaderProps.homeLink).toBe(headerData.globalHeaderLogoLink);
    expect(lastHeaderProps.noLink).toBeUndefined();
    expect(lastHeaderProps.customStyle).toBeTruthy();
    expect(lastHeaderProps.customStyle.headerBar).toEqual({
      top: '0px',
      zIndex: '600',
      position: 'relative',
    });
    expect(typeof lastHeaderProps.SearchComponent).toBe('function');

    expect(screen.getByTestId('searchbar-stub')).toBeTruthy();

    expect(mockSearchBarGenerator).toHaveBeenCalledTimes(1);
    const searchBarConfig = mockSearchBarGenerator.mock.calls[0][0];
    expect(searchBarConfig.config.placeholder).toBe('SEARCH THE ICDC');
    expect(searchBarConfig.config.searchKeys).toBeDefined();
    expect(searchBarConfig.config.searchFields).toBeDefined();
    expect(typeof searchBarConfig.config.inputComponent).toBe('function');
    expect(typeof searchBarConfig.classes).toBe('function');
  });

  test('does not pass SearchComponent when route matches /search', () => {
    renderWithPath('/search');

    expect(screen.getByTestId('grid')).toBeTruthy();
    expect(lastHeaderProps).toBeTruthy();
    expect(lastHeaderProps.SearchComponent).toBeUndefined();
    expect(screen.queryByTestId('searchbar-stub')).toBeNull();
  });

  test('renders bare Header with noLink on /jBrowse routes', () => {
    renderWithPath('/jBrowse/somewhere');

    expect(screen.queryByTestId('grid')).toBeNull();
    expect(lastHeaderProps).toBeTruthy();
    expect(lastHeaderProps.noLink).toBe(true);
    expect(lastHeaderProps.homeLink).toBeUndefined();
    expect(lastHeaderProps.logo).toBe(headerData.globalHeaderLogo);
    expect(lastHeaderProps.alt).toBe(headerData.globalHeaderLogoAltText);
    expect(lastHeaderProps.SearchComponent).toBeUndefined();
    expect(screen.queryByTestId('searchbar-stub')).toBeNull();
  });

  test('SearchBarConfig.query calls GraphQL client with SEARCH_PUBLIC and returns globalSearch', async () => {
    renderWithPath('/');

    const searchBarConfig = mockSearchBarGenerator.mock.calls[0][0];
    const input = 'dog';

    const result = await searchBarConfig.config.query(input);

    expect(mockClientQuery).toHaveBeenCalledTimes(1);
    expect(mockClientQuery.mock.calls[0][0]).toEqual({
      query: SEARCH_PUBLIC,
      variables: {
        input,
      },
    });
    expect(result).toEqual({
      programs: [{ program_acronym: 'ABC' }],
      studies: [],
      cases: [],
      samples: [],
      files: [],
      model: [],
    });
  });

  test('SearchBar is created by the generator and can render', () => {
    renderWithPath('/');

    expect(screen.getByTestId('searchbar-stub')).toBeTruthy();
  });

  test('query promise resolves even when called multiple times', async () => {
    renderWithPath('/');

    const searchBarConfig = mockSearchBarGenerator.mock.calls[0][0];

    const first = await searchBarConfig.config.query('cat');
    const second = await searchBarConfig.config.query('mouse');

    expect(mockClientQuery).toHaveBeenCalledTimes(2);
    expect(mockClientQuery.mock.calls[0][0]).toEqual({
      query: SEARCH_PUBLIC,
      variables: {
        input: 'cat',
      },
    });
    expect(mockClientQuery.mock.calls[1][0]).toEqual({
      query: SEARCH_PUBLIC,
      variables: {
        input: 'mouse',
      },
    });

    expect(first.programs[0].program_acronym).toBe('ABC');
    expect(second.programs[0].program_acronym).toBe('ABC');
  });
});

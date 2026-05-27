// src/components/sideBarFilter/BentoFacetFilter.test.jsx

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import BentoFacetFilter from './BentoFacetFilter';

jest.mock('./assets/clearIcon.svg', () => 'mock-clear-icon.svg');

const dispatchMockFn = jest.fn();
const mockOnClearAllFilters = jest.fn();
const mockClearFacetSectionValues = jest.fn();

function mockDispatch(...args) {
  return dispatchMockFn(...args);
}

jest.mock('../../store', () => ({
  __esModule: true,
  default: { dispatch: mockDispatch },
}));

jest.mock('../../bento-core', () => {
  const ClearAllFiltersBtn = ({ Component }) => {
    const onClearAllFilters = (...args) => mockOnClearAllFilters(...args);
    return <Component onClearAllFilters={onClearAllFilters} disable={false} />;
  };

  const FacetFilter = ({
    data,
    tooltipText,
    facetsConfig,
    facetSectionConfig,
    CustomFacetSection,
    CustomFacetView,
    clearIcon,
  }) => {
    const customCountUndefined = facetsConfig?.[0]?.customCount
      ? facetsConfig[0].customCount(undefined)
      : 'n/a';
    const customCountFive = facetsConfig?.[0]?.customCount
      ? facetsConfig[0].customCount(5)
      : 'n/a';

    const sectionNames = Object.keys(facetSectionConfig || {});

    const clearFn = () => {
      mockClearFacetSectionValues();
    };

    return (
      <div data-testid="facet-filter-root" data-clear-icon={clearIcon}>
        <pre data-testid="facet-data">
          {JSON.stringify({ data, tooltipText })}
        </pre>

        <div data-testid="custom-counts">
          <span data-testid="custom-count-undefined">
            {customCountUndefined}
          </span>
          <span data-testid="custom-count-5">{customCountFive}</span>
        </div>

        <div data-testid="sections">
          {sectionNames.map(name => (
            <div key={name} data-testid={`section-${name}`}>
              <CustomFacetSection section={{ name, expandSection: true }} />
            </div>
          ))}
        </div>

        <div data-testid="facet-view">
          {facetsConfig?.[0] ? (
            <div data-testid="facet-view-container">
              <CustomFacetView
                facet={facetsConfig[0]}
                facetClasses="some class"
                hasSelections
                clearFacetSectionValues={clearFn}
              />
              <button
                type="button"
                data-testid="mock-clear-section-btn"
                onClick={clearFn}
              >
                trigger-clear
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const resetAllData = () => ({ type: 'RESET_ALL_DATA' });

  const chunkSplit = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  };

  const SearchView = ({ hidden }) => (
    <div data-testid="search-view" data-hidden={hidden}>
      SearchView Hidden: {String(hidden)}
    </div>
  );

  const SearchBoxGenerator = () => ({
    SearchBox: () => <div data-testid="search-box">SearchBox</div>,
  });

  const UploadModalGenerator = () => ({
    UploadModal: () => <div data-testid="upload-modal">UploadModal</div>,
  });

  return {
    __esModule: true,
    ClearAllFiltersBtn,
    FacetFilter,
    resetAllData,
    chunkSplit,
    SearchView,
    SearchBoxGenerator,
    UploadModalGenerator,
  };
});

jest.mock('./BentoFilterUtils', () => ({
  __esModule: true,
  getAllIds: jest.fn().mockResolvedValue([]),
  getAllSubjectIds: jest.fn().mockResolvedValue([]),
}));

describe('BentoFacetFilter', () => {
  const defaultClasses = {
    disableExpansion: 'disableExpansion',
    dropDownIconSubSection: 'dropDownIconSubSection',
    sectionSummaryText: 'sectionSummaryText',
    someclass: 'someclass',
  };

  const baseProps = {
    classes: defaultClasses,
    activeFilters: {},
    isUnifiedView: false,
    localFindAutocomplete: false,
  };

  const facetsConfig = [
    {
      label: 'Diagnosis',
      apiPath: 'subjectCountByDiagnoses',
      tooltipKey: 'subjectCountByDiagnoses',
    },
  ];

  const facetSectionVariables = {
    Cases: { hasSearch: true },
  };

  const searchData = {
    subjectCountByDiagnoses: [{ group: 'BRCA', subjects: 10 }],
  };

  const tooltipConfig = {
    subjectCountByDiagnoses: { acronym: 'group', name: 'full' },
  };

  const tooltipItems = [
    {
      __typename: 'subjectCountByDiagnoses',
      group: 'BRCA',
      full: 'Breast Cancer',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should build tooltipText and inject tooltip into filterData for matching facets', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    const pre = screen.getByTestId('facet-data');
    const parsed = JSON.parse(pre.textContent);

    expect(parsed.data.subjectCountByDiagnoses).toHaveLength(1);
    expect(parsed.data.subjectCountByDiagnoses[0]).toMatchObject({
      group: 'BRCA',
      subjects: 10,
      tooltip: 'Breast Cancer',
    });
  });

  test('should provide customCount that stringifies values and defaults undefined to "0"', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    const container = screen.getByTestId('custom-counts');
    expect(
      within(container).getByTestId('custom-count-undefined').textContent
    ).toBe('0');
    expect(within(container).getByTestId('custom-count-5').textContent).toBe(
      '5'
    );
  });

  test('should render CLEAR ALL button when not unified view and dispatch resetAllData on click', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        isUnifiedView={false}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    const clearBtnText = screen.getByText(/clear all/i);
    const clearBtn = clearBtnText.closest('button');
    expect(clearBtn).not.toBeNull();

    fireEvent.click(clearBtn);

    expect(mockOnClearAllFilters).toHaveBeenCalledTimes(1);
    expect(dispatchMockFn).toHaveBeenCalledTimes(1);
    expect(dispatchMockFn).toHaveBeenCalledWith({ type: 'RESET_ALL_DATA' });
  });

  test('should render RESET QUERY button when unified view and call onClearAllFilters on click', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        isUnifiedView
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    const resetText = screen.getByText(/reset query/i);
    const resetBtn = resetText.closest('a') || resetText.closest('button');
    expect(resetBtn).not.toBeNull();
    expect(resetBtn.getAttribute('href')).toBe('#/explore');

    fireEvent.click(resetBtn);

    expect(mockOnClearAllFilters).toHaveBeenCalledTimes(1);
    expect(dispatchMockFn).not.toHaveBeenCalled();
  });

  test('CustomFacetSection: search visibility toggles and collapse affects SearchView hidden state', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    const section = screen.getByTestId('section-Cases');

    const searchView1 = screen.getByTestId('search-view');
    expect(searchView1.getAttribute('data-hidden')).toBe('false');

    const toggleBtn = within(section)
      .getByRole('img', { name: /search/i })
      .closest('div');
    expect(toggleBtn?.className || '').toContain('findCaseButton');
    fireEvent.click(toggleBtn);

    const searchView2 = screen.getByTestId('search-view');
    expect(searchView2.getAttribute('data-hidden')).toBe('true');

    const summary = document.querySelector('.customExpansionPanelSummaryRoot');
    expect(summary).not.toBeNull();
    fireEvent.click(summary);

    const searchView3 = screen.getByTestId('search-view');
    expect(searchView3.getAttribute('data-hidden')).toBe('true');
  });

  test('CustomFacetView: triggers clearFacetSectionValues via auxiliary test button', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    fireEvent.click(screen.getByTestId('mock-clear-section-btn'));
    expect(mockClearFacetSectionValues).toHaveBeenCalledTimes(1);
  });

  test('passes clearIcon prop to FacetFilter', () => {
    render(
      <BentoFacetFilter
        {...baseProps}
        searchData={searchData}
        facetsConfig={facetsConfig}
        facetSectionVariables={facetSectionVariables}
        tooltipItems={tooltipItems}
        tooltipConfig={tooltipConfig}
      />
    );

    expect(
      screen.getByTestId('facet-filter-root').getAttribute('data-clear-icon')
    ).toBe('mock-clear-icon.svg');
  });
});

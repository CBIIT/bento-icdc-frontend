import React, { useCallback, useMemo, useState } from 'react';
import {
  AccordionSummary,
  Button,
  Container,
  withStyles,
} from '@material-ui/core';
import {
  // ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  ClearAllFiltersBtn, FacetFilter, resetAllData, chunkSplit,
  SearchView, SearchBoxGenerator, UploadModalGenerator,
} from '../../bento-core';

import FacetFilterThemeProvider from './FilterThemeConfig';
import styles, { customStyles, uploadCustomStyles } from './BentoFacetFilterStyle';
import { getAllIds, getAllSubjectIds } from './BentoFilterUtils';
import store from '../../store';
import { localFindConfig } from '../../bento/localSearchData';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    paddingTop: 6,
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    display: 'block',
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

// Generate SearchBox Component

const { SearchBox } = SearchBoxGenerator({
  functions: {
    getSuggestions: async (searchType) => {
      try {
        const response = await getAllIds(searchType).catch(() => []);
        return response && response instanceof Array
          ? response.map((id) => ({ type: searchType, title: id }))
          : [];
      } catch (e) {
        return [];
      }
    },
  },
  config: {
    inputPlaceholder: 'e.g. ICDC-CASE-06, ICDC-CASE-22',
    noOptionsText: 'No matching items found',
    searchType: 'case_id',
  },
  customStyles,
});

// Generate UploadModal Component
const { UploadModal } = UploadModalGenerator({
  functions: {
    searchMatches: async (inputArray) => {
      try {
        // Split the search terms into chunks of 500
        const caseChunks = chunkSplit(inputArray, 500);
        const matched = (await Promise.allSettled(caseChunks.map((chunk) => (
          getAllSubjectIds(chunk)))))
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value || [])
          .flat(1);

        // Combine the results and remove duplicates
        const unmatched = new Set(inputArray);
        matched.forEach((obj) => unmatched.delete(obj.case_id.toUpperCase()));
        return { matched, unmatched: [...unmatched] };
      } catch (e) {
        return { matched: [], unmatched: [] };
      }
    },
  },
  config: localFindConfig,
  customStyles: uploadCustomStyles,
});
const BentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
  tooltipItems = [],
  facetSectionVariables,
  facetsConfig,
  tooltipConfig,
  isUnifiedView = false,
  localFindAutocomplete,
}) => {
  // set tooltip text progams / biobank
  // useMemo to prevent execution of func everytime component re renders
  const tooltipText = useMemo(() => tooltipItems.reduce((acc, item) => {
    const { __typename: datafield } = item;
    const { acronym, name } = tooltipConfig[datafield];
    return { ...acc, [datafield]: { ...acc[datafield], [item[acronym]]: item[name] } };
  }, {}), []);

  /**
   * Add Bento frontend filter count/subjects
   * Add tootip text
   */
  const updateFacetConfig = useMemo(() => facetsConfig.map((item) => ({
    ...item,
    customCount: (text) => `${text || 0}`,
  })), []);

  const filterData = facetsConfig.reduce((acc, item) => {
    const facetValues = searchData[item.apiPath];
    if (!facetValues) {
      return acc;
    }
    if (item.tooltipKey) {
      const subjectCounts = [...facetValues].map((checkbox) => {
        const text = tooltipText[item.tooltipKey];
        return {
          ...checkbox,
          tooltip: text ? text[checkbox.group] : undefined,
        };
      });
      return {
        ...acc,
        [item.apiPath]: [...subjectCounts],
      };
    }
    return { ...acc, [item.apiPath]: facetValues };
  }, {});

  /**
  * Clear All Filter Button
  * Custom button component
  * bento core params
  * 1. onClearAllFilters - dispatch clear all filters
  * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = useCallback(({ onClearAllFilters, disable }) => (
    <Container className="floatRight">
      <Button
        variant="outlined"
        disabled={disable}
        className="resetButton"
        onClick={() => {
          onClearAllFilters();
          store.dispatch(resetAllData());
        }}
        disableRipple
      >
        CLEAR ALL
      </Button>
    </Container>
  ), []);

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = useCallback(({ section }) => {
    const { name, expandSection } = section;
    const { hasSearch = false } = facetSectionVariables[name];
    const [expanded, setExpanded] = useState(expandSection);
    const [showSearch, setShowSearch] = useState(true);

    const toggleSearch = (e) => {
      e.stopPropagation();
      setShowSearch(!showSearch);
    };
    const collapseHandler = () => setExpanded(!expanded);

    return (
      <>
        <CustomExpansionPanelSummary
          onClick={collapseHandler}
          id={section}
          className={clsx(
            {
              [classes.disableExpansion]: isUnifiedView,
            },
            'customExpansionPanelSummaryRoot',
          )}
          disabled={isUnifiedView}
        >
          <div className="sectionSummaryTextContainer">
            {name}
            {hasSearch && (
              <div className="findCaseButton" onClick={toggleSearch}>
                <img
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FacetLocalFindSearchIcon.svg"
                  className="findCaseIcon"
                  alt="search"
                />
              </div>
            )}
          </div>
          {hasSearch && (
            <SearchView
              classes={classes}
              SearchBox={SearchBox}
              UploadModal={UploadModal}
              hidden={!expanded || !showSearch}
            />
          )}
        </CustomExpansionPanelSummary>
      </>

    );
  }, [localFindAutocomplete]);

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const RedirectButton = useCallback(({ onClearAllFilters }) => (
    <Container className="restBtn">
      <Button
        variant="outlined"
        className="resetButton"
        href="#/explore"
        onClick={() => {
          onClearAllFilters();
        }}
        disableRipple
      >
        RESET QUERY
      </Button>
    </Container>
  ), []);

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = useCallback(({ facet, facetClasses }) => {
    const clsName = `${facetClasses}`.replace(/\s+/g, '');
    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={(
            <ExpandMoreIcon
              classes={{ root: classes.dropDownIconSubSection }}
              style={{ fontSize: 26 }}
            />
          )}
          id={facet.label}
          className="customExpansionPanelSummaryRoot"
        >
          <div
            id={facet.label}
            className={
              clsx(
                classes.sectionSummaryText,
                classes[clsName],
                'sectionSummaryText',
              )
            }
          >
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  }, []);
  return (
    <FacetFilterThemeProvider>
      <ClearAllFiltersBtn
        Component={isUnifiedView ? RedirectButton : CustomClearAllFiltersBtn}
        activeFilters={activeFilters}
      />
      <FacetFilter
        data={filterData}
        tooltipText={tooltipText}
        facetSectionConfig={facetSectionVariables}
        facetsConfig={updateFacetConfig}
        CustomFacetSection={CustomFacetSection}
        CustomFacetView={CustomFacetView}
      />
    </FacetFilterThemeProvider>
  );
};

export default withStyles(styles)(BentoFacetFilter);

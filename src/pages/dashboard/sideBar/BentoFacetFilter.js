import React, { useState } from 'react';
import {
  AccordionSummary,
  Button,
  //   ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { ClearAllFiltersBtn, FacetFilter } from '@bento-core/facet-filter';
import FacetFilterThemeProvider from './FilterThemeConfig';
import styles from './BentoFacetFilterStyle';
import { facetSectionVariables, facetsConfig } from '../../../bento/dashboardData';

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
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

const BentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
}) => {
  /**
   * Add Bento frontend filter count/subjects
   */
  const filterData = { ...searchData };
  facetsConfig.forEach((item) => {
    const subjectCounts = [...searchData[item.apiPath]];
    filterData[item.apiPath] = subjectCounts
      .map((checkbox) => ({ ...checkbox, customSubjects: checkbox.count }));
  });

  /**
  * Clear All Filter Button
  * Custom button component
  * bento core params
  * 1. onClearAllFilters - dispatch clear all filters
  * 2. disable - true/ false
  */
  const CustomClearAllFiltersBtn = ({ onClearAllFilters, disable }) => (
    <div className={classes.floatRight}>
      <Button
        id="button_sidebar_clear_all_filters"
        variant="outlined"
        disabled={disable}
        className={classes.customButton}
        classes={{ root: classes.clearAllButtonRoot }}
        onClick={() => {
          onClearAllFilters();
        }}
        disableRipple
      >
        CLEAR ALL
      </Button>
    </div>
  );

  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetSection = ({ section }) => {
    const { name, expandSection } = section;
    const [expanded, setExpanded] = useState(expandSection);
    const collapseHandler = () => setExpanded(!expanded);

    return (
      <>
        <CustomExpansionPanelSummary
          expandIcon={
            <ArrowDropDownIcon classes={{ root: classes.dropDownIconSection }} />
          }
          onClick={collapseHandler}
          id={section}
        >
          <div className={classes.sectionSummaryTextContainer}>
            {name}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet, facetClasses }) => {
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
          className={classes.customExpansionPanelSummaryRoot}
        >
          <div
            id={facet.label}
            className={
              clsx(classes.sectionSummaryText, classes[clsName])
            }
          >
            {facet.label}
          </div>
        </CustomExpansionPanelSummary>
      </>
    );
  };

  return (
    <FacetFilterThemeProvider>
      <ClearAllFiltersBtn
        Component={CustomClearAllFiltersBtn}
        activeFilters={activeFilters}
      />
      <FacetFilter
        data={filterData}
        facetSectionConfig={facetSectionVariables}
        facetsConfig={facetsConfig}
        CustomFacetSection={CustomFacetSection}
        CustomFacetView={CustomFacetView}
      />
    </FacetFilterThemeProvider>
  );
};

export default withStyles(styles)(BentoFacetFilter);

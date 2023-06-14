import React, { useMemo, useState } from 'react';
import {
  AccordionSummary,
  Button,
  withStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { ClearAllFiltersBtn, FacetFilter } from '../../bento-core';
import FacetFilterThemeProvider from './FilterThemeConfig';
import styles from './BentoFacetFilterStyle';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

const BentoFacetFilter = ({
  classes,
  searchData,
  activeFilters,
  tooltipItems = [],
  facetSectionVariables,
  facetsConfig,
  tooltipConfig,
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
  const filterData = facetsConfig.reduce((acc, item) => {
    const facetValues = searchData[item.apiPath];
    if (!facetValues) {
      return acc;
    }
    const subjectCounts = [...facetValues].map((checkbox) => {
      const text = tooltipText[item.tooltipKey];
      return {
        ...checkbox,
        customSubjects: checkbox.count,
        tooltip: text ? text[checkbox.group] : undefined,
      };
    });
    return { ...acc, [item.apiPath]: [...subjectCounts] };
  }, {});

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
        variant="outlined"
        disabled={disable}
        className={classes.resetButton}
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
          className={classes.customExpansionPanelSummaryRoot}
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

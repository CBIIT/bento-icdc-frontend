import React from 'react';
import {
  AccordionSummary,
  //   ExpansionPanelSummary,
  withStyles,
} from '@material-ui/core';
import {
//   ArrowDropDown as ArrowDropDownIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import clsx from 'clsx';
import { FacetFilter } from '@bento-core/facet-filter';
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
}) => {
  /**
   * Add Bento frontend filter count/subjects
   */
  const filterData = { ...searchData };
  facetsConfig.forEach((item) => {
    const subjectCounts = [...searchData[item.apiPath]];
    filterData[item.apiPath] = subjectCounts
      .map((checkbox) => ({ ...checkbox, subjects: checkbox.count }));
  });
  /**
  * Generate Custom facet View Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomFacetView = ({ facet, facetClasses }) => (
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
            clsx(classes.sectionSummaryText, classes[facetClasses])
          }
        >
          {facet.label}
        </div>
      </CustomExpansionPanelSummary>
    </>
  );
  console.log(filterData);
  return (
    <FacetFilterThemeProvider>
      <FacetFilter
        data={filterData}
        facetSectionConfig={facetSectionVariables}
        facetsConfig={facetsConfig}
        CustomFacetView={CustomFacetView}
      />
    </FacetFilterThemeProvider>
  );
};

export default withStyles(styles)(BentoFacetFilter);

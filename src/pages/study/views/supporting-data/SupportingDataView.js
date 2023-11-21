import React, { useCallback, useState } from 'react';
import {
  withStyles,
  Accordion,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
// import clsx from 'clsx';
import CustomAccordionSummary from './summary/AccordionSummaryView';
import styles from './SupportingDataStyle';

const CustomAccordion = withStyles({
  root: {
    width: '100%',
  },
})(Accordion);

const SupportingData = ({
  classes,
}) => {
  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomAccordian = useCallback(() => {
    const [expand, setExpand] = useState(true);
    const onExpandSection = () => {
      setExpand(!expand);
    };

    return (
      <>
        <CustomAccordion
          expanded={expand}
          onChange={onExpandSection}
          classes={{
            root: classes.expansionPanel,
          }}
        >
          <CustomAccordionSummary
            expand={expand}
          >
            <div className={classes.sectionSummaryText}>
              Repository:
            </div>
          </CustomAccordionSummary>
          <AccordionDetails
            classes={{ root: classes.expansionPanelDetailsRoot }}
          >
            Repository: 123
          </AccordionDetails>
        </CustomAccordion>
      </>
    );
  }, []);

  return (
    <>
      <div className={classes.supportDataContainer}>
        <Grid container justifyContent="center">
          <CustomAccordian />
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(SupportingData);

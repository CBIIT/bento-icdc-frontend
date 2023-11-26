import React, { useEffect, useState } from 'react';
import {
  withStyles,
  Accordion,
  AccordionDetails,
  Grid,
  CircularProgress,
} from '@material-ui/core';
// import clsx from 'clsx';
import CustomAccordionSummary from './summary/AccordionSummaryView';
import styles from './SupportingDataStyle';
import { supportDataList, tableLayOut } from './dataConfig';
import PaginatedTableView from '../../../../components/PaginatedTable/TableView';
import { useOrderSupportingDataByRepo } from './useOrderSupportingData';

const CustomAccordion = withStyles({
  root: {
    width: '100%',
  },
})(Accordion);

const SupportingData = ({
  classes,
  data,
  isLoading,
}) => {
  if (isLoading) {
    return <CircularProgress />;
  }
  /** Note:
  * Generate Custom facet Section Component
  * 1. Config local search input for Case
  * 2. Facet Section Name
  */
  const CustomAccordian = ({
    defaultExpand = false,
    title,
    table,
    repository = 'IDC',
  }) => {
    // const supportData = useOrderSupportingData(data);
    // const tableData = supportData[dataIndex];
    const { rows } = table;
    const [tableRows, setRows] = useState(null);
    useEffect(() => {
      const tblData = useOrderSupportingDataByRepo(data, repository, rows);
      setRows(tblData);
    }, [data]);

    const [expand, setExpand] = useState(defaultExpand);
    const onExpandSection = () => {
      setExpand(!expand);
    };

    if (!tableRows) {
      return <CircularProgress />;
    }

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
            <div>
              <span className={classes.summaryTextLebal}>
                Repository:
              </span>
              <span className={classes.summaryTextTitle}>
                {title}
              </span>
            </div>
          </CustomAccordionSummary>
          <AccordionDetails
            classes={{ root: classes.expansionPanelDetailsRoot }}
          >
            <PaginatedTableView
              isServer={false}
              tblRows={tableRows}
              config={table}
              tableLayOut={tableLayOut}
            />
          </AccordionDetails>
        </CustomAccordion>
      </>
    );
  };

  return (
    <>
      <div className={classes.supportDataContainer}>
        <Grid container justifyContent="center">
          {
            supportDataList.map((item) => <CustomAccordian {...item} />)
          }
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(SupportingData);

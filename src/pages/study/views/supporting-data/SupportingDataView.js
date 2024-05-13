import React, { useCallback, useState, useEffect } from 'react';
import {
  withStyles,
  AccordionDetails,
  Grid,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from '@material-ui/core';
import CustomAccordionSummary from './summary/AccordionSummaryView';
import styles from './SupportingDataStyle';
import { supportDataList, tableLayOut } from './dataConfig';
import PaginatedTableView from '../../../../components/PaginatedTable/TableView';
import { useOrderSupportingDataByRepo } from './useOrderSupportingData';
import { customTheme, themeConfig } from './DataTheme';
import hyperlinkIcon from '../../../../assets/icons/hyperlink.svg';
import { ToolTip } from '../../../../bento-core';
import CustomAccordion from './accordian/CustomAccordion';

const SupportingData = ({
  classes,
  data,
  isLoading,
}) => {
  if (isLoading) {
    return <CircularProgress />;
  }
  /**
  * Generate Custom Accordian Section Component
  */
  const CustomAccordian = useCallback(({
    defaultExpand = false,
    title,
    table,
    repository = 'IDC',
    repositoryUrl,
    styledClasses,
  }) => {
    const { rows } = table;
    const [tableRows, setRows] = useState(null);
    useEffect(() => {
      const tblRows = useOrderSupportingDataByRepo(data, repository, rows);
      setRows(tblRows);
    }, []);

    const [expand, setExpand] = useState(defaultExpand);
    const onExpandSection = () => {
      setExpand(!expand);
    };

    return (
      <>
        <CustomAccordion
          expanded={expand}
          onChange={onExpandSection}
          styles={{
            root: styledClasses.expansionPanel,
          }}
        >
          <CustomAccordionSummary
            classes={styledClasses}
            expand={expand}
          >
            <div>
              <span className={styledClasses.summaryTextLebal}>
                Repository:
              </span>
              <span className={styledClasses.summaryTextTitle}>
                {title}
              </span>
              <ToolTip title="Click to view external link in new tab">
                <a href={repositoryUrl} target="_blank" rel="noreferrer">
                  <img className={styledClasses.hyperlink} src={hyperlinkIcon} alt="exp-icon" />
                </a>
              </ToolTip>
            </div>
          </CustomAccordionSummary>
          <AccordionDetails className={styledClasses.expansionPanelDetailsRoot}>
            <PaginatedTableView
              isServer={false}
              tblRows={tableRows}
              config={table}
              tableLayOut={tableLayOut}
              customthemeConfig={themeConfig()}
            />
          </AccordionDetails>
        </CustomAccordion>
      </>
    );
  }, [data]);

  return (
    <ThemeProvider theme={createTheme(customTheme)}>
      <div className={classes.supportDataContainer}>
        <Grid container justifyContent="center">
          {
            supportDataList.map((item) => <CustomAccordian {...item} styledClasses={classes} />)
          }
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(styles)(SupportingData);

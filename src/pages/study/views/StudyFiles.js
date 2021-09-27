import React from 'react';
import _ from 'lodash';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  getOptions,
  getColumns,
} from 'bento-components';
import {
  table2,
  externalIcon,
  textLabels,
  tooltipContent,
} from '../../../bento/studyDetailsData';
import DocumentDownload from '../../../components/DocumentDownload';
import GridWithFooter from '../../../components/GridWithFooter/GridView';
import updateColumns from '../../../utils/columnsUtil';
import themes, { overrides } from '../../../themes';
import {
  studyDisposition,
} from '../utils';

const StudyFiles = ({
  closeSnack,
  openSnack,
  data,
  studyData,
  classes,
}) => {
  const fileTableData = data.studyFiles === null || data.studyFiles === '' ? [] : data.studyFiles.map((file) => {
    const cFile = { ...file };
    cFile.parent = 'Study';
    cFile.studyDesignation = studyData.clinical_study_designation;
    return cFile;
  });
  const tableTwoOptions = getOptions(table2, classes);
  const columns2 = updateColumns(getColumns(table2, classes, fileTableData, externalIcon, '', () => {}, DocumentDownload), table2.columns);
  const themesLight = _.cloneDeep(themes.light);
  themesLight.overrides.MuiTableCell = {
    ...themesLight.overrides.MuiTableCell,
    root: {
      '&:first-child': {
        paddingLeft: '30px',
      },
      '&:lastchild': {
        paddingRight: '30px',
      },
    },
  };

  themesLight.overrides.MUIDataTableToolbar = {
    ...themesLight.overrides.MUIDataTableToolbar,
    actions: {
      '& span': {
        '& button': {
          right: '0px',
        },
      },
    },
  };

  const computedTheme = createMuiTheme({
    ...themesLight,
    ...overrides,
  });
  return (
    <>
      {
      (!studyDisposition(studyData.study_disposition) && fileTableData.length > 0)
        ? (
          <div className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <Grid item xs={12}>
                <div className={classes.tableTitle}>
                  <span className={classes.tableHeader}>
                    This study currently has the following Study Files directly associated with it:
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} id="table_associated_files">
                <MuiThemeProvider theme={computedTheme}>
                  <GridWithFooter
                    data={fileTableData}
                    title=""
                    columns={columns2}
                    options={{ ...tableTwoOptions, ...textLabels }}
                    customOnRowsSelect={table2.customOnRowsSelect}
                    closeSnack={closeSnack}
                    openSnack={openSnack}
                    disableRowSelection={table2.disableRowSelection}
                    buttonText={table2.buttonText}
                    saveButtonDefaultStyle={table2.saveButtonDefaultStyle}
                    ActiveSaveButtonDefaultStyle={table2.ActiveSaveButtonDefaultStyle}
                    DeactiveSaveButtonDefaultStyle={table2.DeactiveSaveButtonDefaultStyle}
                    tooltipMessage={table2.tooltipMessage}
                    tooltipContent={tooltipContent}
                    showtooltip
                    primaryKeyIndex={table2.primaryKeyIndex}
                  />
                </MuiThemeProvider>
              </Grid>
            </div>
          </div>
        ) : (
          <div className={classes.detailContainer}>
            <div>
              <Grid item xs={12}>
                <div className={classes.noAssociatedFiles}>
                  {table2.noAssociatedFiles}
                </div>
              </Grid>
            </div>
          </div>
        )
      }
    </>
  );
};

const styles = (theme) => ({
  tableContainer2: {
    background: '#fff',
    minHeight: '500px',
  },
  tableDiv: {
    padding: '20px 34px',
    margin: '10px auto auto auto',
  },
  tableTitle: {
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '17px',
    letterSpacing: '0.017em',
    // color: '#ff17f15',
    paddingBottom: '20px',
  },
  tableHeader: {
    paddingLeft: '32px',
    color: '#0296c9',
  },
  tableContainer: {
    // background: '#f3f3f3',
    minHeight: '500px',
  },
  detailContainer: {
    margin: 'auto',
    paddingTop: '10px',
    paddingLeft: '36px',
    paddingRight: '36px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  noAssociatedFiles: {
    paddingLeft: '32px',
    marginTop: '20px',
    fontSize: '12px',
    minHeight: '500px',
  },
});

export default withStyles(styles, { withTheme: true })(StudyFiles);

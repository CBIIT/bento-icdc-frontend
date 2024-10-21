import React from 'react';
import _ from 'lodash';
import {
  Grid2 as Grid,
} from '@mui/material';
// import { withStyles } from "@mui/styles";
import { withStyles } from '@material-ui/core';
import FileTableView from './FileView/FileTableView';
import {
  TableContextProvider,
} from '../../../bento-core';
import themes from '../../../themes';
import {
  studyDisposition,
} from '../utils';
import { fileTable } from '../../../bento/studyDetailsData';

const StudyFiles = ({
  data,
  studyData,
  classes,
}) => {
  const fileTableData = data.studyFiles === null || data.studyFiles === '' ? [] : data.studyFiles.map((file) => {
    const cFile = { ...file };
    cFile.parent = 'study';
    cFile.studyDesignation = studyData.clinical_study_designation;
    return cFile;
  });
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

  return (
    <>
      {
      (!studyDisposition(studyData.study_disposition) && fileTableData.length > 0)
        ? (
          <div className={classes.tableContainer}>
            <div className={classes.tableDiv}>
              <TableContextProvider>
                <FileTableView
                  data={fileTableData}
                  classes={classes}
                />
              </TableContextProvider>
            </div>
          </div>
        ) : (
          <div className={classes.detailContainer}>
            <div>
              <Grid item xs={12}>
                <div className={classes.noAssociatedFiles}>
                  {fileTable.noAssociatedFiles}
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
    padding: '20px 55px 0px 55px',
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
  customTooltip: {
    border: '#a7afb3 2px solid',
  },
  customArrow: {
    '&::before': {
      border: '#a7afb3 2px solid',
    },
  },
});

export default withStyles(styles, { withTheme: true })(StudyFiles);

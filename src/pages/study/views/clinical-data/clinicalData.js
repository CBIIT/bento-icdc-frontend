import React from 'react';
import {
  Grid,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import { ToolTip as Tooltip } from 'bento-components';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'lightblue',
    color: 'white',
  },
  body: {
    fontSize: 14,
    border: '1px solid black',
  },
}))(TableCell);

const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 400px;
  min-height: fit-content;
  margin-top: 37px;
  border-top: 3px solid #004C73;
  border-bottom: 3px solid #004C73;
  width: 80%;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #81ACDF;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  scrollbar-color: #81ACDF #fff
  scrollbar-width: thin;

`;

const tableHeaders = [
  {
    title: 'Clinical Data Nodes',
    tooltip: {
      display: false,
    },
  },
  {
    title: 'Cases',
    tooltip: {
      display: true,
      content: 'For each of the nodes listed below, the number of cases represented by one or more records within that node',
    },
  },
  {
    title: 'Records',
    tooltip: {
      display: true,
      content: 'For each of the nodes listed below, the total number of records within each node. Cases may have multiple/numerous records within certain nodes.',
    },
  },
  {
    title: 'CSV',
    tooltip: {
      display: false,
    },
  },
];

const ClinicalData = ({ classes }) => (
  <div className={classes.clinicalDataContainer}>
    <Grid container justifyContent="center">
      <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
        <Paper className={classes.paper}>
          <Grid container direction="row" className={classes.containerLeft} spacing={2}>
            <Grid
              item
              xs={12}
              classes={{
                'spacing-xs-2': classes.leftItem,
              }}
            >
              <div>
                Detailed clinical trial observations from this study can be downloaded from
                any node for which a CSV download option is displayed.
              </div>
            </Grid>
            <Grid item xs={12}>
              The node-specific counts indicate the number of cases represented
              within a node into which data has been propagated versus the number
              of records within such nodes.
            </Grid>

            <ScrollContainer>
              <div>
                <Grid container className={classes.tableContainer}>
                  <TableContainer component={Paper}>
                    <Table aria-label="table">
                      <TableHead>
                        <TableRow>
                          {
                                tableHeaders.map((header, index) => {
                                  // logic
                                  console.log('--');
                                  if (header.tooltip.display) {
                                    return (
                                      <StyledTableCell
                                        key={index}
                                        align={index === 0 ? 'left' : 'center'}
                                      >
                                        <div className={classes.headerCellText}>
                                          <div>{header.title}</div>
                                          <Tooltip title={header.tooltip.content} arrow placement="top">
                                            <img
                                              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                              alt="tooltip"
                                              className={classes.headerCellTooltip}
                                            />
                                          </Tooltip>
                                        </div>
                                      </StyledTableCell>
                                    );
                                  }
                                  return (
                                    <StyledTableCell
                                      key={index}
                                      align={index === 0 ? 'left' : 'center'}
                                    >
                                      {header.title}
                                    </StyledTableCell>
                                  );
                                })
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </div>
            </ScrollContainer>
          </Grid>
        </Paper>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
        <Paper className={classes.paper}>
          <Grid container direction="row" className={classes.containerRight}>
            <ScrollContainer className={classes.rightContainerTable}>
              <div>
                <Grid container className={classes.tableContainer}>
                  <TableContainer component={Paper}>
                    <Table aria-label="table">
                      <TableHead>
                        <TableRow>
                          {
                            tableHeaders.map((header, index) => {
                              // logic
                              console.log('--');
                              if (header.tooltip.display) {
                                return (

                                  <StyledTableCell
                                    key={index}
                                    align={index === 0 ? 'left' : 'center'}
                                  >
                                    {header.title}
                                  </StyledTableCell>
                                );
                              }
                              return (
                                <StyledTableCell
                                  key={index}
                                  align={index === 0 ? 'left' : 'center'}
                                >
                                  {header.title}
                                </StyledTableCell>
                              );
                            })
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                        <StyledTableCell>Test 1</StyledTableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </div>
            </ScrollContainer>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

const styles = {
  clinicalDataContainer: {
    margin: 'auto',
    paddingLeft: '77px',
    paddingRight: '77px',
    // fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    minHeight: '800px',
  },
  headerCellText: {
    display: 'flex',
    gap: '5px',
  },
  paper: {
    boxShadow: 'none',
  },
  leftItem: {
    padding: '8px 0',
  },
  rightContainerTable: {
    marginTop: '150px',
  },
  headerCellTooltip: {
    width: '12px',
    alignSelf: 'flex-start',
  },
};

export default withStyles(styles)(ClinicalData);

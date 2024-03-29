import React from 'react';
import {
  Button, CircularProgress,
  Grid,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow, useMediaQuery,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import { ToolTip as Tooltip } from 'bento-components';
import { noop, filter } from 'lodash';
// import DownloadBtn from './components/downloadBtn';
import { downloadJson } from '../../../fileCentricCart/utils';
import useFetchCSVDownload from './hooks/useFetchCSVDownload';
import
{
  adverseEventNodeMetadata,
  agentAdministrationNodeMetadata,
  agentNodeMetadata,
  cycleNodeMetadata,
  diseaseExtentNodeMetadata, followUpNodeMetadata,
  labExamNodeMetadata,
  offStudyNodeMetadata, offTreatmentNodeMetadata,
  physicalExamNodeMetadata,
  priorSurgeryNodeMetadata,
  priorTherapyNodeMetadata,
  visitNodeMetadata, vitalSignsNodeMetadata,
} from '../../../../bento/studyDetailsData';

function splitArray(originalArray) {
  const mid = Math.ceil(originalArray.length / 2);

  const firstHalf = originalArray.slice(0, mid);
  const secondHalf = originalArray.slice(mid);

  return [firstHalf, secondHalf];
}

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#F5F5F5',
    color: '#194563',
    fontSize: '15px',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontFamily: 'Raleway',
    fontStyle: 'normal',
  },
  body: {
    fontSize: '13px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    border: '1px solid black',
  },
}))(TableCell);

const StyledStarterTableCell = withStyles(() => ({
  head: {
    paddingLeft: '15px',
  },
  body: {
    paddingLeft: '15px',
    borderLeft: '0',
    fontSize: '12px',
  },
}))(StyledTableCell);

const StyledEndTableCell = withStyles(() => ({
  body: {
    borderWidth: '1px 0 1px 1px',
    borderColor: 'black',
    borderStyle: 'solid',
  },
}))(StyledTableCell);

const StyledStarterEmptyTableCell = withStyles(() => ({
  body: {
    color: '#A1A1A1',
  },
}))(StyledStarterTableCell);

const StyledStarterFilledTableCell = withStyles(() => ({
  body: {
    color: '#0296C9',
  },
}))(StyledStarterTableCell);

const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 450px;
  min-height: fit-content;
  margin-top: 37px;
  border-top: 3px solid #004C73;
  border-bottom: 3px solid #004C73;
  width: 618px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #81ACDF;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  scrollbar-color: #81ACDF #fff;
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

const ClinicalData = ({
  classes,
  data,
  csvDownloadFlags,
  studyCode,
}) => {
  const [
    agentNodeCSV,
    cycleNodeCSV,
    visitNodeCSV,
    priorTherapyNodeCSV,
    priorSurgeryNodeCSV,
    agentAdministrationNodeCSV,
    physicalExamNodeCSV,
    vitalSignsNodeCSV,
    labExamNodeCSV,
    adverseEventNodeCSV,
    diseaseExtentNodeCSV,
    followUpNodeCSV,
    offStudyNodeCSV,
    offTreatmentNodeCSV,
    isLoading,
  ] = useFetchCSVDownload(csvDownloadFlags, studyCode);

  const useColumn = useMediaQuery('(max-width:1460px)');
  const [tableA, tableB] = splitArray(data);

  const handleCSVDownload = (element) => {
    const fileName = `ICDC_Clinical_Data-${studyCode}-${element.name}`;
    switch (element.name) {
      case 'AGENT': {
        const processedAgentNodeCSV = filter(agentNodeCSV, (el) => el !== null);
        return downloadJson(processedAgentNodeCSV, '', fileName, agentNodeMetadata);
      }
      case 'CYCLE': {
        const processedCycleNodeCSV = filter(cycleNodeCSV, (el) => el !== null);
        return downloadJson(processedCycleNodeCSV, '', fileName, cycleNodeMetadata);
      }
      case 'VISIT': {
        const processedVisitNodeCSV = filter(visitNodeCSV, (el) => el !== null);
        return downloadJson(processedVisitNodeCSV, '', fileName, visitNodeMetadata);
      }
      case 'PRIOR THERAPY': {
        const processedPriorTherapyNodeCSV = filter(priorTherapyNodeCSV, (el) => el !== null);
        return downloadJson(processedPriorTherapyNodeCSV, '', fileName, priorTherapyNodeMetadata);
      }
      case 'PRIOR SURGERY': {
        const processedPriorSurgeryNodeCSV = filter(priorSurgeryNodeCSV, (el) => el !== null);
        return downloadJson(processedPriorSurgeryNodeCSV, '', fileName, priorSurgeryNodeMetadata);
      }
      case 'AGENT ADMINISTRATION': {
        const processedAgentAdministrationNodeCSV = filter(
          agentAdministrationNodeCSV,
          (el) => el !== null,
        );
        return downloadJson(processedAgentAdministrationNodeCSV, '', fileName, agentAdministrationNodeMetadata);
      }
      case 'PHYSICAL EXAM': {
        const processedPhysicalExamNodeCSV = filter(physicalExamNodeCSV, (el) => el !== null);
        return downloadJson(processedPhysicalExamNodeCSV, '', fileName, physicalExamNodeMetadata);
      }
      case 'VITAL SIGNS': {
        const processedVitalSignsNodeCSV = filter(vitalSignsNodeCSV, (el) => el !== null);
        return downloadJson(processedVitalSignsNodeCSV, '', fileName, vitalSignsNodeMetadata);
      }
      case 'LAB EXAM': {
        const processedLabExamNodeCSV = filter(labExamNodeCSV, (el) => el !== null);
        return downloadJson(processedLabExamNodeCSV, '', fileName, labExamNodeMetadata);
      }
      case 'ADVERSE EVENT': {
        const processedAdverseEventNodeCSV = filter(adverseEventNodeCSV, (el) => el !== null);
        return downloadJson(processedAdverseEventNodeCSV, '', fileName, adverseEventNodeMetadata);
      }
      case 'DISEASE EXTENT': {
        const processedDiseaseExtentNodeCSV = filter(diseaseExtentNodeCSV, (el) => el !== null);
        return downloadJson(processedDiseaseExtentNodeCSV, '', fileName, diseaseExtentNodeMetadata);
      }
      case 'FOLLOW UP': {
        const processedFollowUpNodeCSV = filter(followUpNodeCSV, (el) => el !== null);
        return downloadJson(processedFollowUpNodeCSV, '', fileName, followUpNodeMetadata);
      }
      case 'OFF STUDY': {
        const processedOffStudyNodeCSV = filter(offStudyNodeCSV, (el) => el !== null);
        return downloadJson(processedOffStudyNodeCSV, '', fileName, offStudyNodeMetadata);
      }
      case 'OFF TREATMENT': {
        const processedOffTreatmentNodeCSV = filter(offTreatmentNodeCSV, (el) => el !== null);
        return downloadJson(processedOffTreatmentNodeCSV, '', fileName, offTreatmentNodeMetadata);
      }
      default: return noop();
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.clinicalDataContainer}>
      <Grid container justifyContent="flex-start">
        <Grid
          container
          justifyContent="center"
          spacing={1}
        >
          <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
            <Paper className={classes.paper}>
              <Grid container className={classes.containerLeft} spacing={2}>
                <Grid
                  item
                  xs={12}
                  classes={{
                    'spacing-xs-2': classes.leftItem,
                  }}
                >
                  <div className={classes.leftContainerText}>
                    Detailed clinical trial observations from this study can be downloaded from
                    any node for which a CSV download option is displayed.
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.leftContainerText}>
                    The node-specific counts indicate the number of cases represented
                    within a node into which data has been propagated versus the number
                    of records within such nodes.
                  </div>
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
                                  if (header.tooltip.display) {
                                    if (index === 0) {
                                      return (
                                        <StyledStarterTableCell
                                          key={index}
                                        >
                                          <div className={classes.headerCellText}>
                                            <div>
                                              {header.title}
                                              {' '}
                                              <Tooltip title={<div className={classes.tooltipText}>{header.tooltip.content}</div>} arrow placement="top">
                                                <img
                                                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                                  alt="tooltip"
                                                  className={classes.headerCellTooltip}
                                                />
                                              </Tooltip>
                                            </div>
                                          </div>
                                        </StyledStarterTableCell>
                                      );
                                    }
                                    return (
                                      <StyledTableCell
                                        key={index}
                                        align="center"
                                      >
                                        <div className={classes.headerCellText}>
                                          <div>
                                            {header.title}
                                            {' '}
                                            <Tooltip title={<div className={classes.tooltipText}>{header.tooltip.content}</div>} arrow placement="top">
                                              <img
                                                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                                alt="tooltip"
                                                className={classes.headerCellTooltip}
                                              />
                                            </Tooltip>
                                          </div>
                                        </div>
                                      </StyledTableCell>
                                    );
                                  }

                                  if (index === 0) {
                                    return (
                                      <StyledStarterTableCell
                                        key={index}
                                        align={index === 0 ? 'left' : 'center'}
                                      >
                                        {header.title}
                                      </StyledStarterTableCell>
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
                            {
                              tableA.map((element, index) => {
                                if (element.isEmpty === false) {
                                  return (
                                    <TableRow key={index}>
                                      <StyledStarterFilledTableCell>
                                        {element.name}
                                      </StyledStarterFilledTableCell>
                                      <StyledTableCell align="center">{element.nodeCaseCount}</StyledTableCell>
                                      <StyledTableCell align="center">{element.nodeCount}</StyledTableCell>
                                      <StyledEndTableCell align="center">
                                        <Button
                                          onClick={() => handleCSVDownload(element)}
                                        >
                                          <img
                                            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/clinical_data_csv_icon.svg"
                                            alt="csv download icon"
                                            style={{ marginLeft: '20px' }}
                                          />
                                        </Button>
                                      </StyledEndTableCell>
                                    </TableRow>
                                  );
                                }
                                return (
                                  <TableRow key={index}>
                                    <StyledStarterEmptyTableCell>
                                      {element.name}
                                    </StyledStarterEmptyTableCell>
                                    <StyledTableCell align="center">{' '}</StyledTableCell>
                                    <StyledTableCell align="center">{' '}</StyledTableCell>
                                    <StyledEndTableCell align="center">{' '}</StyledEndTableCell>
                                  </TableRow>
                                );
                              })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </div>
                </ScrollContainer>
                {/* { */}
                {/*    !useColumn && <DownloadBtn /> */}
                {/* } */}
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12} className={classes.borderRight}>
            <Paper className={classes.paper}>
              <Grid container direction="row" className={classes.containerRight}>
                <ScrollContainer style={{ marginTop: useColumn ? '15px' : '210px' }}>
                  <div>
                    <Grid container className={classes.tableContainer}>
                      <TableContainer component={Paper}>
                        <Table aria-label="table">
                          <TableHead>
                            <TableRow>
                              {
                                tableHeaders.map((header, index) => {
                                  if (header.tooltip.display) {
                                    if (index === 0) {
                                      return (
                                        <StyledStarterTableCell
                                          key={index}
                                        >
                                          <div className={classes.headerCellText}>
                                            <div>
                                              {header.title}
                                              {' '}
                                              <Tooltip title={<div className={classes.tooltipText}>{header.tooltip.content}</div>} arrow placement="top">
                                                <img
                                                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                                  alt="tooltip"
                                                  className={classes.headerCellTooltip}
                                                />
                                              </Tooltip>
                                            </div>
                                          </div>
                                        </StyledStarterTableCell>
                                      );
                                    }
                                    return (
                                      <StyledTableCell
                                        key={index}
                                        align="center"
                                      >
                                        <div className={classes.headerCellText}>
                                          <div>
                                            {header.title}
                                            {' '}
                                            <Tooltip title={<div className={classes.tooltipText}>{header.tooltip.content}</div>} arrow placement="top">
                                              <img
                                                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                                alt="tooltip"
                                                className={classes.headerCellTooltip}
                                              />
                                            </Tooltip>
                                          </div>
                                        </div>
                                      </StyledTableCell>
                                    );
                                  }

                                  if (index === 0) {
                                    return (
                                      <StyledStarterTableCell
                                        key={index}
                                        align={index === 0 ? 'left' : 'center'}
                                      >
                                        {header.title}
                                      </StyledStarterTableCell>
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
                            {
                              tableB.map((element, index) => {
                                if (element.isEmpty === false) {
                                  return (
                                    <TableRow key={index}>
                                      <StyledStarterFilledTableCell>
                                        {element.name}
                                      </StyledStarterFilledTableCell>
                                      <StyledTableCell align="center">{element.nodeCaseCount}</StyledTableCell>
                                      <StyledTableCell align="center">{element.nodeCount}</StyledTableCell>
                                      <StyledEndTableCell align="center">
                                        <Button
                                          onClick={() => handleCSVDownload(element)}
                                        >
                                          <img
                                            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/clinical_data_csv_icon.svg"
                                            alt="csv download icon"
                                            style={{ marginLeft: '20px' }}
                                          />
                                        </Button>
                                      </StyledEndTableCell>
                                    </TableRow>
                                  );
                                }
                                return (
                                  <TableRow key={index}>
                                    <StyledStarterEmptyTableCell>
                                      {element.name}
                                    </StyledStarterEmptyTableCell>
                                    <StyledTableCell align="center">{' '}</StyledTableCell>
                                    <StyledTableCell align="center">{' '}</StyledTableCell>
                                    <StyledEndTableCell align="center">{' '}</StyledEndTableCell>
                                  </TableRow>
                                );
                              })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </div>
                </ScrollContainer>
                {/* { */}
                {/*    useColumn && <DownloadBtn /> */}
                {/* } */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* <Grid item lg={6} md={6} sm={6} xs={12}> */}
        {/*  <DownloadBtn /> */}
        {/* </Grid> */}
      </Grid>
    </div>
  );
};

const styles = {
  clinicalDataContainer: {
    margin: 'auto',
    paddingLeft: '77px',
    paddingRight: '77px',
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
  },
  tooltipText: {
    fontFamily: 'Munito',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
  },
  paper: {
    boxShadow: 'none',
  },
  rightContainerTable: {
    marginTop: '210px',
  },
  leftContainerText: {
    textAlign: 'justify',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    width: '610px',
  },
  borderRight: {
    maxWidth: '100%',
    marginBottom: '14px',
  },
  containerLeft: {
    display: 'block',
    padding: '28px 20px 5px 10px',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'calc(100% + 8px) !important',
    margin: '0px -8px',
  },
  headerCellTooltip: {
    width: '12px',
    marginBottom: '5px',
  },
};

export default withStyles(styles)(ClinicalData);

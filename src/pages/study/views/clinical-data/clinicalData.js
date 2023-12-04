import React, { useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import { filter } from 'lodash';
import DownloadBtn from './components/downloadBtn';
import { downloadAndZipJson, downloadJson } from '../../../fileCentricCart/utils';
import useFetchCSVDownload from './hooks/useFetchCSVDownload';
import {
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
import { ToolTip, ToolTip as Tooltip } from '../../../../bento-core';
import ClinicalDataTable from './clinicalDataTable';

function splitArray(originalArray) {
  const mid = Math.ceil(originalArray.length / 2);

  const firstHalf = originalArray.slice(0, mid);
  const secondHalf = originalArray.slice(mid);

  return [firstHalf, secondHalf];
}

const StyledTableCell = withStyles(() => ({
  root: {
    width: '20%',
    '&:last-child': {
      paddingRight: '8px',
    },
  },
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
    padding: '8px',
  },
}))(TableCell);

const StyledStarterTableCell = withStyles(() => ({
  head: {
    paddingLeft: '15px',
    width: '30%',
  },
  body: {
    paddingLeft: '15px',
    borderLeft: '0',
    fontSize: '12px',
    width: '30%',

  },
}))(StyledTableCell);

const StyledEndTableCell = withStyles(() => ({

  body: {
    // paddingLeft: '15px',
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
  margin-bottom: 90px;

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
  const [loading, setLoading] = useState(false);
  console.log(studyCode);
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

  // const useColumn = useMediaQuery('(max-width:1460px)');
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
      default: {
        setLoading(true);
        const name = `ICDC_Clinical_Data-${studyCode}`;
        const nodes = [{
          node: agentNodeCSV, comments: '', fileName: `${name}-AGENT`, metadata: agentNodeMetadata,
        },
        {
          node: cycleNodeCSV, comments: '', fileName: `${name}-CYCLE`, metadata: cycleNodeMetadata,
        },
        {
          node: visitNodeCSV, comments: '', fileName: `${name}-VISIT`, metadata: visitNodeMetadata,
        },
        {
          node: priorTherapyNodeCSV, comments: '', fileName: `${name}-PRIOR THERAPY`, metadata: priorTherapyNodeMetadata,
        },
        {
          node: priorSurgeryNodeCSV, comments: '', fileName: `${name}-PRIOR SURGERY`, metadata: priorSurgeryNodeMetadata,
        },
        {
          node: agentAdministrationNodeCSV, comments: '', fileName: `${name}-AGENT ADMINISTRATION`, metadata: agentAdministrationNodeMetadata,
        },
        {
          node: physicalExamNodeCSV, comments: '', fileName: `${name}-PHYSICAL EXAM`, metadata: physicalExamNodeMetadata,
        },
        {
          node: vitalSignsNodeCSV, comments: '', fileName: `${name}-VITAL SIGN`, metadata: vitalSignsNodeMetadata,
        },
        {
          node: labExamNodeCSV, comments: '', fileName: `${name}-LAB EXAM`, metadata: labExamNodeMetadata,
        },
        {
          node: adverseEventNodeCSV, comments: '', fileName: `${name}-ADVERSE EVENT`, metadata: adverseEventNodeMetadata,
        },
        {
          node: diseaseExtentNodeCSV, comments: '', fileName: `${name}-DISEASE EXTENT`, metadata: diseaseExtentNodeMetadata,
        },
        {
          node: followUpNodeCSV, comments: '', fileName: `${name}-FOLLOW UP`, metadata: followUpNodeMetadata,
        },
        {
          node: offStudyNodeCSV, comments: '', fileName: `${name}-OFF STUDY`, metadata: offStudyNodeMetadata,
        },
        {
          node: offTreatmentNodeCSV, comments: '', fileName: `${name}-OFF TREATMENT`, metadata: offTreatmentNodeMetadata,
        }];

        return downloadAndZipJson(nodes, setLoading, studyCode);
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.paper}>
      <div className={classes.leftArea}>
        <div className={classes.container}>
          <p className={classes.paragraphOne}>
            Detailed clinical trial observations from this study can be downloaded from
            any node for which a CSV download option is displayed.
          </p>
          <p className={classes.paragraphTwo}>
            The node-specific counts indicate the number of cases represented
            within a node into which data has been propagated versus the number
            of records within such nodes.
          </p>
          <ClinicalDataTable />
          <div>
            <ScrollContainer>
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
                                  <div
                                    className={classes.headerWrapper}
                                  >
                                    {header.title}
                                    <Tooltip
                                      maxWidth="auto"
                                      fontFamily="Nunito"
                                      fontSize="14px"
                                      lineHeight="1.5"
                                      fontWeight="500"
                                      padding="10px 19px"
                                      title={header.tooltip.content}
                                      arrow
                                      placement="top"
                                    >
                                      <img
                                        className={classes.helpIcon}
                                        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                        alt="tooltip"
                                      />
                                    </Tooltip>
                                  </div>
                                </StyledStarterTableCell>
                              );
                            }
                            return (
                              <StyledTableCell
                                key={index}
                                align="center"
                              >
                                <div
                                  className={classes.headerWrapper}
                                >
                                  {header.title}
                                  <Tooltip
                                    maxWidth="auto"
                                    fontFamily="Nunito"
                                    fontSize="14px"
                                    fontWeight="500"
                                    lineHeight="1.5"
                                    title={header.tooltip.content}
                                    padding="10px 19px"
                                    arrow
                                    placement="top"
                                  >
                                    <img
                                      className={classes.helpIcon}
                                      src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                      alt="tooltip"
                                    />
                                  </Tooltip>
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
                                <ToolTip
                                  maxWidth="auto"
                                  lineHeight="1.5"
                                  fontFamily="Nunito"
                                  fontSize="14px"
                                  fontWeight="500"
                                  padding="10px 19px"
                                  title="Click to download the contents of this node"
                                >
                                  <div
                                    className={classes.tooltipImageWrapper}
                                    onClick={() => handleCSVDownload(element)}
                                  >
                                    <img
                                      src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/clinical_data_csv_icon.svg"
                                      alt="csv download icon"
                                      style={{
                                        width: '32px',
                                      }}
                                    />
                                  </div>
                                </ToolTip>
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
            </ScrollContainer>
            <div className={classes.topDownloadBtn}>
              <DownloadBtn loading={loading} handleCSVDownload={handleCSVDownload} />
            </div>
          </div>
        </div>

      </div>
      <div className={classes.rightArea}>
        <div className={classes.container}>
          <p className={classes.paragraphOne} style={{ color: 'transparent' }}>
            Detailed clinical trial observations from this study can be downloaded from
            any node for which a CSV download option is displayed.
          </p>
          <p className={classes.paragraphTwo} style={{ color: 'transparent' }}>
            The node-specific counts indicate the number of cases represented
            within a node into which data has been propagated versus the number
            of records within such nodes.
          </p>
          <div>
            <ScrollContainer>
              <TableContainer component={Paper}>
                <Table aria-label="table">
                  <TableHead className={classes.bottomHeader}>
                    <TableRow>
                      {
                        tableHeaders.map((header, index) => {
                          if (header.tooltip.display) {
                            if (index === 0) {
                              return (
                                <StyledStarterTableCell
                                  key={index}
                                >
                                  <div className={classes.headerWrapper}>
                                    {header.title}
                                    <Tooltip
                                      lineHeight="1.5"
                                      maxWidth="auto"
                                      fontFamily="Nunito"
                                      fontSize="14px"
                                      fontWeight="500"
                                      padding="10px 19px"
                                      title={header.tooltip.content}
                                      arrow
                                      placement="top"
                                    >
                                      <img
                                        className={classes.helpIcon}
                                        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                        alt="tooltip"
                                      />
                                    </Tooltip>
                                  </div>
                                </StyledStarterTableCell>
                              );
                            }
                            return (
                              <StyledTableCell
                                key={index}
                                align="center"
                              >
                                <div className={classes.headerWrapper}>
                                  {header.title}
                                  <Tooltip
                                    lineHeight="1.5"
                                    maxWidth="auto"
                                    fontFamily="Nunito"
                                    fontSize="14px"
                                    fontWeight="500"
                                    padding="10px 19px"
                                    title={header.tooltip.content}
                                    arrow
                                    placement="top"
                                  >
                                    <img
                                      className={classes.helpIcon}
                                      src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
                                      alt="tooltip"
                                    />
                                  </Tooltip>
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
                                <ToolTip
                                  maxWidth="auto"
                                  lineHeight="1.5"
                                  fontFamily="Nunito"
                                  fontSize="14px"
                                  fontWeight="500"
                                  padding="10px 19px"
                                  title="Click to download the contents of this node"
                                >
                                  <div
                                    className={classes.tooltipImageWrapper}
                                    onClick={() => handleCSVDownload(element)}
                                  >
                                    <img
                                      src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/clinical_data_csv_icon.svg"
                                      alt="csv download icon"
                                      style={{
                                        width: '32px',
                                      }}
                                    />
                                  </div>
                                </ToolTip>
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
            </ScrollContainer>
            <div className={classes.bottomDownloadBtn}>
              <DownloadBtn loading={loading} handleCSVDownload={handleCSVDownload} />
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

const styles = {
  bottomHeader: { borderBottom: '3px solid #004C73' },
  leftArea: { gridArea: 'a', paddingLeft: '77px' },
  rightArea: { gridArea: 'b', paddingLeft: '83px' },
  container: {
    display: 'grid',
    '@media (max-width: 1500px)': {
      placeItems: 'center',
    },
  },
  helpIcon: {
    width: '12px',
    alignSelf: 'baseline',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px',
  },
  paragraphOne: { width: '617px' },
  paragraphTwo: { width: '623px' },
  csvBtn: { maxWidth: '35px' },
  tooltipText: {
    fontFamily: 'Nunito',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'justify',
    hyphen: 'auto',
    width: 'fit-content',
  },
  tooltip: {
    backgroundColor: 'red',
  },
  headerCellTooltip: {
    width: '12px',
    marginBottom: '15px',
  },
  paper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateAreas: `
    "a a b b"
    "a a b b"
    `,
    '@media (max-width: 1500px)': {
      gridTemplateAreas: `
    "a a a a"
    "b b b b"
    `,
    },
  },
  tooltipImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topDownloadBtn: {
    '@media (max-width: 1500px)': {
      display: 'none',
    },
  },
  bottomDownloadBtn: {
    '@media (min-width: 1500px)': {
      display: 'none',
    },
  },
};

export default withStyles(styles)(ClinicalData);

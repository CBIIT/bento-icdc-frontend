import {
  cellTypes,
} from '../../../../bento-core';

export const table = {
  title: 'Imaging Data Commons (IDC)',
  defaultSortField: 'dataNode',
  // 'asc' or 'desc'
  defaultSortDirection: 'asc',
  columns: [
    {
      dataField: 'dataNode',
      header: 'Clinical Data Nodes',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'description',
      header: 'Definition',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
    },
    {
      dataField: 'caseCount',
      header: 'Case',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
      columnDefaultValues: {
        0: ' ',
      },
    },
    {
      dataField: 'recordCount',
      header: 'Records',
      sort: 'asc',
      display: true,
      tooltipText: 'sort',
      columnDefaultValues: {
        0: ' ',
      },
    },
    {
      dataField: 'csvDownload',
      header: 'CSV',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
    },
  ],
  rows: [
    {
      title: 'adverse event',
      nodeCount: 'adverse_event',
      caseCount: 'adverse_event',
      csvDownload: 'adverseEventNodeData',
    },
    {
      title: 'agent',
      nodeCount: 'agent',
      caseCount: 'agent',
      csvDownload: 'agentNodeData',
    },
    {
      title: 'agent administration',
      nodeCount: 'agent_administration',
      caseCount: 'agent_administration',
      csvDownload: 'agentAdministrationNodeData',
    },
    {
      title: 'cycle',
      nodeCount: 'cycle',
      caseCount: 'cycle',
      csvDownload: 'cycleNodeData',
    },
    {
      title: 'disease extent',
      nodeCount: 'disease_extent',
      caseCount: 'disease_extent',
      csvDownload: 'diseaseExtentNodeData',
    },
    {
      title: 'follow_up',
      nodeCount: 'follow_up',
      caseCount: 'follow_up',
      csvDownload: 'followUpNodeData',
    },
    {
      title: 'lab exam',
      nodeCount: 'lab_exam',
      caseCount: 'lab_exam',
      csvDownload: 'labExamNodeData',
    },
    {
      title: 'off_study',
      nodeCount: 'off_study',
      caseCount: 'off_study',
      csvDownload: 'offStudyNodeData',
    },
    {
      title: 'off_treatment',
      nodeCount: 'off_treatment',
      caseCount: 'off_treatment',
      csvDownload: 'offTreatmentNodeData',
    },
    {
      title: 'physical exam',
      nodeCount: 'physical_exam',
      caseCount: 'physical_exam',
      csvDownload: 'physicalExamNodeData',
    },
    {
      title: 'prior surgery',
      nodeCount: 'prior_surgery',
      caseCount: 'prior_surgery',
      csvDownload: 'priorSurgeryNodeData',
    },
    {
      title: 'prior_therapy',
      nodeCount: 'prior_therapy',
      caseCount: 'prior_therapy',
      csvDownload: 'priorTherapyNodeData',
    },
    {
      title: 'visit',
      nodeCount: 'visit',
      caseCount: 'visit',
      csvDownload: 'visitNodeData',
    },
    {
      title: 'vital_signs',
      nodeCount: 'vital_signs',
      caseCount: 'vital_signs',
      csvDownload: 'vitalSignsNodeData',
    },
  ],
  tableMsg: {
    noMatch: 'Data unavailable at this time',
  },
};

export const tableLayOut = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

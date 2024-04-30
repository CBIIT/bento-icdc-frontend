import {
  cellTypes,
} from '../../../../bento-core';

export const supportDataList = [
  {
    title: 'Imaging Data Commons (IDC)',
    defaultExpand: true,
    repository: 'IDC',
    repositoryUrl: 'https://portal.imaging.datacommons.cancer.gov/explore/',
    table: {
      // defaultSortField: 'property',
      // 'asc' or 'desc'
      defaultSortDirection: 'asc',
      columns: [
        {
          dataField: 'property',
          header: 'Property',
          sort: 'asc',
          display: true,
          tooltipText: 'sort',
        },
        {
          dataField: 'dataValue',
          header: 'Value',
          display: true,
          tooltipText: 'sort',
          cellType: cellTypes.CUSTOM_ELEM,
        },
      ],
      rows: [
        {
          title: 'collection id',
          key: 'collection_id',
        },
        {
          title: 'species',
          key: 'species',
        },
        {
          title: 'cancer type',
          key: 'cancer_type',
        },
        {
          title: 'description',
          key: 'description',
        },
        {
          title: 'image types',
          key: 'image_types',
        },
        {
          title: 'location',
          key: 'location',
        },
        {
          title: 'subject count',
          key: 'subject_count',
        },
        {
          title: 'date updated',
          key: 'date_updated',
        },
        {
          title: 'doi',
          key: 'doi',
        },
        {
          title: 'supporting data',
          key: 'supporting_data',
        },
      ],
      tableMsg: {
        noMatch: 'Data unavailable at this time',
      },
    },
  },
  {
    title: 'The Cancer Imaging Archive (TCIA)',
    defaultExpand: true,
    repository: 'TCIA',
    repositoryUrl: 'https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70227341#702273419937cb85808048c99e4b55fd520d63f2',
    table: {
      // defaultSortField: 'property',
      // 'asc' or 'desc'
      defaultSortDirection: 'asc',
      columns: [
        {
          dataField: 'property',
          header: 'Property',
          sort: 'asc',
          display: true,
          tooltipText: 'sort',
        },
        {
          dataField: 'dataValue',
          header: 'Value',
          display: true,
          tooltipText: 'sort',
          cellType: cellTypes.CUSTOM_ELEM,
        },
      ],
      rows: [
        {
          title: 'Collection',
          key: 'Collection',
        },
        {
          title: 'TOTAL PATIENT IDS',
          key: 'Aggregate_PatientID',
        },
        {
          title: 'total image counts',
          key: 'Aggregate_ImageCount',
        },
        {
          title: 'unique modalities',
          key: 'Aggregate_Modality',
        },
        {
          title: 'unique bodyparts examined',
          key: 'Aggregate_BodyPartExamined',
        },
      ],
      tableMsg: {
        noMatch: 'Data unavailable at this time',
      },
    },
  },
];

export const tableLayOut = [
  {
    container: 'paginatedTable',
    paginatedTable: true,
  },
];

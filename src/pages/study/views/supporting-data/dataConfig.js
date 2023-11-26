import {
  cellTypes,
} from '../../../../bento-core';

export const supportDataList = [
  {
    title: 'Imaging Data Commons (IDC)',
    defaultExpand: true,
    repository: 'IDC',
    table: {
      defaultSortField: 'property',
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
          title: 'collection id 123',
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
        noMatch: 'Sorry, no matching records found',
      },
    },
  },
  {
    title: 'The Cancer Imaging Archive (TCIA)',
    defaultExpand: true,
    repository: 'TCIA',
    table: {
      defaultSortField: 'property',
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
          key: 'total_patient_IDs',
        },
        {
          title: 'total image counts',
          key: 'total_image_counts',
        },
        {
          title: 'unique modalities',
          key: 'unique_modalities',
        },
        {
          title: 'unique bodyparts examined',
          key: 'unique_bodyparts_examined',
        },
      ],
      tableMsg: {
        noMatch: 'Sorry, no matching records found',
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

// src/components/DataAvailabilityTable/tableThemeConfig.test.ts

import {
  tblBody,
  headerTheme,
  extendedView,
  themeConfig,
} from './tableThemeConfig';
import { TableConfig } from './types';

type TableColumn = NonNullable<TableConfig['columns']>[number];

const makeTable = (columns: TableColumn[]): TableConfig => ({
  title: 'Test Table',
  dataKey: 'id',
  dispatch: jest.fn(),
  columns,
  count: 0,
  selectedRows: [],
  selectedFileIds: [],
  sortBy: '',
  sortOrder: 'asc',
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'file.csv',
      downloadCsv: '',
    },
    manageViewColumns: {
      title: 'Manage Columns',
    },
  },
  columnGroups: [],
  rowsPerPage: 10,
  page: 0,
  totalRowCount: 0,
});

const asRecord = (value: unknown): Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Expected a non-null object');
  }

  return value as Record<string, unknown>;
};

const getBodyStyles = (table: TableConfig): Record<string, unknown> => {
  const body = tblBody(table).tblBody.MuiTableCell.body;
  return asRecord(body);
};

const getHeaderStyles = (table: TableConfig): Record<string, unknown> => {
  const root = headerTheme(table).tblHeader.MuiTableCell.root;
  return asRecord(root);
};

describe('tableThemeConfig - dynamic data availability styling via public APIs', () => {
  describe('tblBody()', () => {
    test('should not add data availability styles when there are no matching columns', () => {
      const table = makeTable([
        { dataField: 'foo', header: 'Foo', display: true },
        { dataField: 'bar', header: 'Bar', display: false },
      ]);

      const body = getBodyStyles(table);
      const dynamicKeys = Object.keys(body).filter(key => key.startsWith('&.'));

      expect(dynamicKeys).toHaveLength(0);
    });

    test('should apply center alignment and padding for a single matching column without borders', () => {
      const table = makeTable([
        { dataField: 'numberOfCaseFiles', header: 'Cases', display: true },
        { dataField: 'foo', header: 'Foo', display: true },
      ]);

      const body = getBodyStyles(table);

      expect(body['&.numberOfCaseFiles']).toEqual({
        borderLeft: undefined,
        borderRight: undefined,
        textAlign: 'center',
        padding: '15px',
      });
    });

    test('should apply left styling to first and right styling to last when multiple matching columns exist', () => {
      const table = makeTable([
        { dataField: 'numberOfCaseFiles', header: 'Cases', display: true },
        { dataField: 'numberOfStudyFiles', header: 'Studies', display: true },
        { dataField: 'CRDCLinksText', header: 'CRDC', display: true },
      ]);

      const body = getBodyStyles(table);

      expect(body['&.numberOfCaseFiles']).toEqual({
        borderLeft: undefined,
        textAlign: 'center',
        padding: '15px',
      });

      expect(body['&.CRDCLinksText']).toEqual({
        borderRight: undefined,
        textAlign: 'center',
        padding: '15px',
      });

      expect(body['&.numberOfStudyFiles']).toBeUndefined();
    });

    test('should return an empty dynamic style object when matching columns are hidden', () => {
      const table = makeTable([
        { dataField: 'numberOfCaseFiles', header: 'Cases', display: false },
        { dataField: 'numberOfPublications', header: 'Pubs', display: false },
      ]);

      const body = getBodyStyles(table);
      const dynamicKeys = Object.keys(body).filter(key => key.startsWith('&.'));

      expect(dynamicKeys).toHaveLength(0);
    });
  });

  describe('headerTheme()', () => {
    test('should apply both left and right borders when a single matching column exists', () => {
      const table = makeTable([
        { dataField: 'numberOfCaseFiles', header: 'Cases', display: true },
      ]);

      const root = getHeaderStyles(table);

      expect(root['&.numberOfCaseFiles']).toEqual({
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      });
    });

    test('should apply left border to first and right border to last when multiple matching columns exist', () => {
      const table = makeTable([
        { dataField: 'numberOfCaseFiles', header: 'Cases', display: true },
        {
          dataField: 'numberOfImageCollections',
          header: 'Images',
          display: true,
        },
        { dataField: 'CRDCLinksText', header: 'CRDC', display: true },
      ]);

      const root = getHeaderStyles(table);

      expect(root['&.numberOfCaseFiles']).toEqual({
        borderLeft: '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      });

      expect(root['&.CRDCLinksText']).toEqual({
        borderRight: '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      });

      expect(root['&.numberOfImageCollections']).toEqual({
        textAlign: 'center',
        padding: '15px',
      });
    });

    test('should match column names case-insensitively and preserve the original selector case', () => {
      const table = makeTable([
        { dataField: 'NumberOfPublications', header: 'Pubs', display: true },
      ]);

      const root = getHeaderStyles(table);

      expect(root['&.NumberOfPublications']).toEqual({
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      });
    });

    test('should not add a selector for a non-data-availability column', () => {
      const table = makeTable([
        { dataField: 'foo', header: 'Foo', display: true },
      ]);

      const root = getHeaderStyles(table);

      expect(root['&.foo']).toBeUndefined();
    });
  });

  describe('themeConfig()', () => {
    test('should compose body, header, pagination, container, and extended views', () => {
      const table = makeTable([
        { dataField: 'numberOfStudyFiles', header: 'Studies', display: true },
      ]);

      const result = themeConfig(table);

      expect(result.tblBody).toBeDefined();
      expect(result.tblHeader).toBeDefined();
      expect(result.tblPgn).toBeDefined();
      expect(result.tblContainer).toBeDefined();
      expect(result.extendedView).toBeDefined();

      const bodyStyle = asRecord(result.tblBody.MuiTableCell.body);
      const headerStyle = asRecord(result.tblHeader.MuiTableCell.root);

      expect(bodyStyle['&.numberOfStudyFiles']).toEqual({
        borderLeft: undefined,
        borderRight: undefined,
        textAlign: 'center',
        padding: '15px',
      });

      expect(headerStyle['&.numberOfStudyFiles']).toEqual({
        borderLeft: '1px solid #808080',
        borderRight: '1px solid #808080',
        textAlign: 'center',
        padding: '15px',
      });
    });

    test('should include the exported extendedView object unchanged in composition', () => {
      const table = makeTable([]);
      const result = themeConfig(table);

      expect(result.extendedView).toBe(extendedView);

      const svgIconRoot = asRecord(result.extendedView.MuiSvgIcon.root);
      expect(svgIconRoot['&.checkBoxIcon']).toEqual({
        color: '#0B3556',
      });

      expect(result.extendedView.MuiOutlinedInput.root).toEqual({
        border: '#4A8ECB solid 1px',
        borderRadius: '8px',
      });
    });
  });

  describe('extendedView (exported object)', () => {
    test('should have expected nested structure for tooltip and toolbar', () => {
      expect(extendedView).toHaveProperty(
        'MuiTooltip.tooltip.backgroundColor',
        '#ffffff'
      );
      expect(extendedView).toHaveProperty('MuiToolbar.root.minHeight', '45px');
    });
  });
});

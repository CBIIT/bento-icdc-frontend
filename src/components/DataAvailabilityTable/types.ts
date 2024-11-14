import React from 'react';

export interface ExtendedCSSProperties extends React.CSSProperties {
  [key: `&.${string}`]: React.CSSProperties;
}

interface ColumnLinkAttr {
  rootPath: string;
  pathParams: string[];
}

interface ColumnDefaultValues {
  [key: string]: string;
}

interface ColumnConfig {
  dataField: string;
  header: string;
  display: boolean;
  tooltipText?: string;
  role?: string;
  cellType?: string;
  linkAttr?: ColumnLinkAttr;
  columnDefaultValues?: ColumnDefaultValues;
  headerType?: string;
  icon?: string;
  link?: string;
}

interface TableMsg {
  noMatch: string;
}

interface DownloadConfig {
  customDownload: boolean;
  downloadFileName: string;
  downloadCsv: string;
}

interface ManageViewColumnsConfig {
  title: string;
}

interface ExtendedViewConfig {
  download: DownloadConfig;
  manageViewColumns: ManageViewColumnsConfig;
}

interface ColumnGroup {
  clsName: string;
  custom?: boolean;
  columnIndexes: number[];
}

export interface TableConfig {
  title: string;
  dataKey?: string;
  dispatch: () => void;
  columns: ColumnConfig[];
  count: number;
  selectedRows: any[];
  selectedFileIds: any[];
  tableMsg?: TableMsg;
  sortBy: string;
  sortOrder: string;
  extendedViewConfig: ExtendedViewConfig;
  columnGroups: ColumnGroup[];
  rowsPerPage: number;
  page: number;
  paginationAPIField?: string;
  query?: string;
  totalRowCount: number;
}

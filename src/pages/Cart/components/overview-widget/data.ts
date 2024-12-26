export const mockData = {
  totalNumberOfFiles: 926,
  studiesInCart: ['GLIOMA01', 'MGT01'],
  totalNumberOfCases: 94,
  charts: {
    fileType: [
      {
        label: 'Whole Exome Sequence File',
        value: 290,
      },
      {
        label: 'Whole Genome Sequence File',
        value: 234,
      },
      {
        label: 'Variant Cell File',
        value: 209,
      },
      {
        label: 'Index File',
        value: 182,
      },
      {
        label: 'DBA Methylation Analysis File',
        value: 11,
      },
    ],
    fileFormat: [
      {
        label: 'bai',
        value: 874,
      },
      {
        label: 'bam',
        value: 916,
      },
      {
        label: 'csv',
        value: 1,
      },
      {
        label: 'doc',
        value: 8,
      },
      {
        label: 'docx',
        value: 4,
      },
      {
        label: 'gz',
        value: 77,
      },
      {
        label: 'pdf',
        value: 37,
      },
      {
        label: 'rtf',
        value: 14,
      },
      {
        label: 'tbi',
        value: 77,
      },
      {
        label: 'tif',
        value: 3,
      },
      {
        label: 'xls',
        value: 2,
      },
      {
        label: 'xlsx',
        value: 5,
      },
    ],
    fileAssociation: [
      {
        label: 'Sample',
        value: 1790,
      },
      {
        label: 'Case',
        value: 154,
      },
      {
        label: 'Diagnosis',
        value: 61,
      },
      {
        label: 'Study',
        value: 13,
      },
    ],
  },
};

export interface ChartData {
  label: string;
  value: number;
}

export interface Charts {
  fileType: ChartData[];
  fileFormat: ChartData[];
  fileAssociation: ChartData[];
}

export interface MockData {
  totalNumberOfFiles: number;
  studiesInCart: string[];
  totalNumberOfCases: number;
  charts: Charts;
}

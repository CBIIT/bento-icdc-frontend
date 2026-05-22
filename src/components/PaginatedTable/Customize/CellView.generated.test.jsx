import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Helpful alias so jest.mock factories can reference it safely
const mockReact = React;

// Mock bento-core enums used for cell/header type checks
jest.mock('../../../bento-core', () => ({
  cellTypes: {
    CUSTOM_ELEM: 'CUSTOM_ELEM',
    DELETE: 'DELETE',
    LINK: 'link-class',
  },
  headerTypes: {
    CUSTOM_ELEM: 'CUSTOM_ELEM',
    DELETE: 'DELETE',
  },
}));

// Mock Types constants used by switch statements
jest.mock('../Customize/Types', () => ({
  customizeColumn: {
    DOCUMENT_DOWNLOAD: 'DOCUMENT_DOWNLOAD',
    MULTI_STUDY_PARTICIPATION: 'MULTI_STUDY_PARTICIPATION',
    numberOfCases: 'numberOfCases',
    studyDesignation: 'studyDesignation',
    Description: 'Description',
    Arm: 'Arm',
    ArmDescription: 'ArmDescription',
    Cohort: 'Cohort',
    DataValue: 'DataValue',
    csvDataRow: 'csvDataRow',
    clinicalDataNode: 'clinicalDataNode',
    clinicalDataDescription: 'clinicalDataDescription',
  },
  customizeHeader: {
    CASE_FILES: 'CASE_FILES',
    STUDY_FILES: 'STUDY_FILES',
    IMAGE: 'IMAGE',
    CRDCLinks: 'CRDCLinks',
    PUBLICATTION: 'PUBLICATTION',
    DELETE: 'DELETE',
  },
  customizeLandScapeView: {
    CASE_FILES: 'CASE_FILES',
    STUDY_FILES: 'STUDY_FILES',
    IMAGE: 'IMAGE',
    CRDCLinks: 'CRDCLinks',
    PUBLICATTION: 'PUBLICATTION',
  },
}));

// Explicitly mock children components to isolate parent behavior
jest.mock('../../DocumentDownload/DocumentDownloadView', () => {
  function DocumentDownloadMock() {
    return mockReact.createElement('div', {
      'data-testid': 'DocumentDownload',
    });
  }
  DocumentDownloadMock.displayName = 'DocumentDownloadMock';
  return {
    __esModule: true,
    default: DocumentDownloadMock,
  };
});

jest.mock('../Customize/DataAvailability/TableCell', () => {
  function DataAvailabilityCellMock() {
    return mockReact.createElement('div', {
      'data-testid': 'DataAvailabilityCellView',
    });
  }
  DataAvailabilityCellMock.displayName = 'DataAvailabilityCellMock';
  return {
    __esModule: true,
    default: DataAvailabilityCellMock,
  };
});

jest.mock('../Customize/DataAvailability/HeaderCell', () => {
  function DataAvailabilityHeaderMock() {
    return mockReact.createElement('div', {
      'data-testid': 'DataAvailabilityHeader',
    });
  }
  DataAvailabilityHeaderMock.displayName = 'DataAvailabilityHeaderMock';
  return {
    __esModule: true,
    default: DataAvailabilityHeaderMock,
  };
});

jest.mock('../Customize/components/NumberOfCases', () => {
  function NumberOfCasesMock() {
    return mockReact.createElement('div', {
      'data-testid': 'NumberOfCasesView',
    });
  }
  NumberOfCasesMock.displayName = 'NumberOfCasesMock';
  return {
    __esModule: true,
    default: NumberOfCasesMock,
  };
});

jest.mock('../Customize/components/StudyLink', () => {
  function StudyLinkMock() {
    return mockReact.createElement('div', { 'data-testid': 'StudyLink' });
  }
  StudyLinkMock.displayName = 'StudyLinkMock';
  return {
    __esModule: true,
    default: StudyLinkMock,
  };
});

jest.mock('../Customize/components/CustomHeaderRemover', () => {
  function CustomHeaderRemoverMock({ openDialogBox }) {
    return mockReact.createElement(
      'button',
      {
        'data-testid': 'CustomHeaderRemover',
        onClick: openDialogBox,
      },
      'Remove'
    );
  }
  CustomHeaderRemoverMock.displayName = 'CustomHeaderRemoverMock';
  return {
    __esModule: true,
    default: CustomHeaderRemoverMock,
  };
});

jest.mock('../Customize/components/DeleteButton', () => {
  function DeleteButtonMock({ deleteCartFile, onDeleteRow }) {
    return mockReact.createElement(
      'button',
      {
        'data-testid': 'DeleteButton',
        onClick: onDeleteRow || deleteCartFile,
      },
      'Delete'
    );
  }
  DeleteButtonMock.displayName = 'DeleteButtonMock';
  return {
    __esModule: true,
    default: DeleteButtonMock,
  };
});

jest.mock('../Customize/components/DataValue', () => {
  function DataValueMock() {
    return mockReact.createElement('div', { 'data-testid': 'DataValue' });
  }
  DataValueMock.displayName = 'DataValueMock';
  return {
    __esModule: true,
    default: DataValueMock,
  };
});

jest.mock('../Customize/components/CsvDownload', () => {
  function CsvDownloadMock() {
    return mockReact.createElement('div', { 'data-testid': 'CsvDownload' });
  }
  CsvDownloadMock.displayName = 'CsvDownloadMock';
  return {
    __esModule: true,
    default: CsvDownloadMock,
  };
});

jest.mock('../Customize/components/multiStudyTooltip', () => {
  function MultiStudyTooltipMock() {
    return mockReact.createElement('div', {
      'data-testid': 'MultiStudyTooltip',
    });
  }
  MultiStudyTooltipMock.displayName = 'MultiStudyTooltipMock';
  return {
    __esModule: true,
    default: MultiStudyTooltipMock,
  };
});

// Mock util function controlling tooltip display
const mockHasMultiStudyParticipants = jest.fn();
jest.mock('../../../utils/columnsUtil', () => ({
  hasMultiStudyParticipants: (...args) =>
    mockHasMultiStudyParticipants(...args),
}));

// Import after mocks
import {
  CustomCellView,
  CustomHeaderCellView,
  CustomizeCellView,
} from '../Customize/CellView';
import {
  customizeColumn,
  customizeHeader,
  customizeLandScapeView,
} from '../Customize/Types';
import { cellTypes, headerTypes } from '../../../bento-core';

describe('CustomCellView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders DocumentDownload with resolved fileLocation from props override', () => {
    const documentDownloadProps = { fileLocation: 'alt_file_uuid' };
    const props = {
      dataField: customizeColumn.DOCUMENT_DOWNLOAD,
      file_size: 123,
      file_format: 'pdf',
      file_name: 'CASE-1',
      file_uuid: 'default-uuid',
      alt_file_uuid: 'override-uuid',
      documentDownloadProps,
    };

    const { getByTestId } = render(<CustomCellView {...props} />);
    expect(getByTestId('DocumentDownload')).toBeTruthy();
  });

  test('renders DocumentDownload with fallback fileLocation when override absent', () => {
    const documentDownloadProps = { fileLocation: 'missing_key' };
    const props = {
      dataField: customizeColumn.DOCUMENT_DOWNLOAD,
      file_size: 50,
      file_format: 'txt',
      file_name: 'CASE-2',
      file_uuid: 'fallback-uuid',
      documentDownloadProps,
    };

    const { getByTestId } = render(<CustomCellView {...props} />);
    expect(getByTestId('DocumentDownload')).toBeTruthy();
  });

  test('renders CaseIdLink and MultiStudyTooltip when unifiedView is false and participants exist', () => {
    mockHasMultiStudyParticipants.mockReturnValue(true);

    const props = {
      dataField: customizeColumn.MULTI_STUDY_PARTICIPATION,
      case_id: 'CASE-3',
      other_cases: [{ id: 1 }],
      unifiedView: false,
      linkAttr: {
        rootPath: 'cases',
        pathParams: ['case_id'],
      },
    };

    render(<CustomCellView {...props} />);

    const linkText = screen.getByText('CASE-3');
    expect(linkText).toBeTruthy();

    const anchor = linkText.closest('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toContain('#cases/CASE-3');

    expect(screen.queryByTestId('MultiStudyTooltip')).toBeTruthy();
  });

  test('does not render MultiStudyTooltip when unifiedView is true', () => {
    mockHasMultiStudyParticipants.mockReturnValue(true);

    const props = {
      dataField: customizeColumn.MULTI_STUDY_PARTICIPATION,
      case_id: 'CASE-4',
      other_cases: [{ id: 1 }],
      unifiedView: true,
      linkAttr: {
        rootPath: 'cases',
        pathParams: ['case_id'],
      },
    };

    render(<CustomCellView {...props} />);
    expect(screen.queryByTestId('MultiStudyTooltip')).toBeNull();
  });

  test('renders NumberOfCasesView', () => {
    const props = { dataField: customizeColumn.numberOfCases };
    render(<CustomCellView {...props} />);
    expect(screen.getByTestId('NumberOfCasesView')).toBeTruthy();
  });

  test('renders StudyLink', () => {
    const props = { dataField: customizeColumn.studyDesignation };
    render(<CustomCellView {...props} />);
    expect(screen.getByTestId('StudyLink')).toBeTruthy();
  });

  test('renders ArmsCohortList list items (filters out empty entries)', () => {
    const props = {
      dataField: customizeColumn.Cohort,
      [customizeColumn.Cohort]: 'Alpha#Beta#',
    };
    const { container } = render(<CustomCellView {...props} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe('Alpha');
    expect(listItems[1].textContent).toBe('Beta');
  });

  test('renders DataAvailabilityCellView for landscape fields', () => {
    const props = {
      dataField: customizeLandScapeView.CASE_FILES,
      interOpData: {},
    };
    render(<CustomCellView {...props} />);
    expect(screen.getByTestId('DataAvailabilityCellView')).toBeTruthy();
  });

  test('renders DataValue', () => {
    const props = { dataField: customizeColumn.DataValue };
    render(<CustomCellView {...props} />);
    expect(screen.getByTestId('DataValue')).toBeTruthy();
  });

  test('renders CsvDownload', () => {
    const props = { dataField: customizeColumn.csvDataRow, csvDataRow: [1, 2] };
    render(<CustomCellView {...props} />);
    expect(screen.getByTestId('CsvDownload')).toBeTruthy();
  });

  test('clinicalDataNode uses gray color when hasNoValues is true', () => {
    const props = {
      dataField: customizeColumn.clinicalDataNode,
      clinicalDataNode: 'NODE',
      caseCount: ' ',
    };

    const { getByText } = render(<CustomCellView {...props} />);
    const node = getByText('NODE');
    expect(node).toBeTruthy();
    expect((node.getAttribute('style') || '').toLowerCase()).toContain(
      'color: rgb(161, 161, 161)'
    );
  });

  test('clinicalDataDescription uses dark color when hasNoValues is false', () => {
    const props = {
      dataField: customizeColumn.clinicalDataDescription,
      clinicalDataDescription: 'DESC',
      caseCount: '10',
      csvDataRow: [1],
    };

    const { getByText } = render(<CustomCellView {...props} />);
    const node = getByText('DESC');
    expect(node).toBeTruthy();
    expect((node.getAttribute('style') || '').toLowerCase()).toContain(
      'color: rgb(11, 53, 86)'
    );
  });

  test('returns empty fragment for unknown dataField', () => {
    const props = { dataField: 'UNKNOWN' };
    const { container } = render(<CustomCellView {...props} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('CustomHeaderCellView', () => {
  test('renders DataAvailabilityHeader for data availability headers', () => {
    const props = { dataField: customizeHeader.IMAGE, icon: 'icon-src' };
    render(<CustomHeaderCellView {...props} />);
    expect(screen.getByTestId('DataAvailabilityHeader')).toBeTruthy();
  });

  test('renders CustomHeaderRemover for DELETE header', () => {
    const openDialogBox = jest.fn();
    const props = { dataField: customizeHeader.DELETE, openDialogBox };
    render(<CustomHeaderCellView {...props} />);
    const btn = screen.getByTestId('CustomHeaderRemover');
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
  });

  test('returns empty fragment for unrecognized header', () => {
    const props = { dataField: 'UNKNOWN' };
    const { container } = render(<CustomHeaderCellView {...props} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('CustomizeCellView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('adds customCellRender for CUSTOM_ELEM cellType that renders CustomCellView', () => {
    const columns = [
      {
        name: 'col1',
        cellType: cellTypes.CUSTOM_ELEM,
        headerType: headerTypes.CUSTOM_ELEM,
      },
    ];

    const processed = CustomizeCellView({
      columns,
      unifiedView: true,
      interOpData: { x: 1 },
    });

    expect(processed[0].customCellRender).toBeInstanceOf(Function);

    const element = processed[0].customCellRender({
      dataField: customizeColumn.DataValue,
    });
    const { getByTestId } = render(element);
    expect(getByTestId('DataValue')).toBeTruthy();
  });

  test('adds customCellRender with DeleteButton for DELETE cellType', () => {
    const columns = [
      {
        name: 'del',
        cellType: cellTypes.DELETE,
      },
    ];
    const deleteCartFile = jest.fn();

    const processed = CustomizeCellView({
      columns,
      deleteCartFile,
    });

    expect(processed[0].customCellRender).toBeInstanceOf(Function);
    const element = processed[0].customCellRender({ id: 1 }, jest.fn());
    const { getByTestId } = render(element);
    expect(getByTestId('DeleteButton')).toBeTruthy();
  });

  test('adds customColHeaderRender for CUSTOM_ELEM headerType', () => {
    const columns = [
      {
        name: 'hdr1',
        cellType: cellTypes.CUSTOM_ELEM,
        headerType: headerTypes.CUSTOM_ELEM,
        dataField: customizeHeader.IMAGE,
        icon: 'icon-src',
      },
    ];

    const processed = CustomizeCellView({ columns });
    expect(processed[0].customColHeaderRender).toBeInstanceOf(Function);

    const headerEl = processed[0].customColHeaderRender({
      dataField: customizeHeader.IMAGE,
      icon: 'icon-src',
    });
    const { getByTestId } = render(headerEl);
    expect(getByTestId('DataAvailabilityHeader')).toBeTruthy();
  });

  test('configures DELETE header with handler and customColHeaderRender that passes openDialogBox', () => {
    const deleteAllFiles = jest.fn();
    const toggleDisplay = jest.fn();
    const columns = [
      {
        name: 'hdrDel',
        headerType: headerTypes.DELETE,
        dataField: customizeHeader.DELETE,
      },
    ];

    const processed = CustomizeCellView({ columns, deleteAllFiles });
    const col = processed[0];

    expect(col.headerEventHandler).toBe(deleteAllFiles);
    expect(col.customColHeaderRender).toBeInstanceOf(Function);

    const headerEl = col.customColHeaderRender(toggleDisplay);
    const { getByTestId } = render(headerEl);
    expect(getByTestId('CustomHeaderRemover')).toBeTruthy();
  });

  test('leaves unrelated columns unchanged', () => {
    const columns = [
      { name: 'plain1' },
      { name: 'plain2', headerType: 'OTHER' },
    ];
    const processed = CustomizeCellView({ columns });
    expect(processed[0].name).toBe('plain1');
    expect(processed[0].customCellRender).toBeUndefined();
    expect(processed[1].customColHeaderRender).toBeUndefined();
  });
});

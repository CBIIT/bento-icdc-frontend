import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import DocumentDownloadView from './DocumentDownloadView';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  Link: ({ children, to, onClick, ...rest }) => {
    const href = typeof to === 'string' ? to : to?.pathname || '#';
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  },
}));

jest.mock(
  '../../assets/icons/JbrowseViewIcon.svg',
  () => 'mock-jbrowse-logo.svg'
);

jest.mock('../../utils/env', () => ({
  __esModule: true,
  default: {
    REACT_APP_FILE_SERVICE_API: 'https://files.example.com/',
  },
}));

jest.mock('../../bento-core', () => ({
  __esModule: true,
  ToolTip: ({ title, children }) => (
    <span data-testid="tooltip" data-title={title}>
      {children}
    </span>
  ),
}));

jest.mock('../CustomIcon', () => ({
  __esModule: true,
  default: ({ imgSrc }) => (
    <img
      data-testid="custom-icon"
      alt="custom-icon"
      src={imgSrc}
      data-src={imgSrc}
    />
  ),
}));

jest.mock('../../bento/JBrowseData', () => ({
  __esModule: true,
  jBrowseOptions: { jBrowse: true },
  JbrowserFiles: ['bam', 'bai', 'vcf', 'tbi'],
  SINGLE_FILE_VIEW: 'single',
}));

const mockSetSelectedFiles = jest.fn(files => files);
const mockSetJBrowseSelectedFiles = jest.fn();

jest.mock('../../pages/JbrowseDetail/util', () => ({
  __esModule: true,
  setSelectedFiles: (...args) => mockSetSelectedFiles(...args),
}));

jest.mock('../../pages/JbrowseDetail/store/jborwse.reducer', () => ({
  __esModule: true,
  setJborwseSelectedFiles: (...args) => mockSetJBrowseSelectedFiles(...args),
}));

describe('DocumentDownloadView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the JBrowse link and updates selected files when supported file format is used', () => {
    render(
      <DocumentDownloadView
        fileFormat="bam"
        caseId="CASE-123"
        toolTipTextFileViewer="View in JBrowse"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noreferrer');
    expect(link.getAttribute('href')).toBe('/jBrowse/single');

    const logoImg = screen.getByAltText('jBrowse');
    expect(logoImg).toBeTruthy();
    expect(logoImg.getAttribute('src')).toBe('mock-jbrowse-logo.svg');

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip.getAttribute('data-title')).toBe('View in JBrowse');

    fireEvent.click(link);

    expect(mockSetSelectedFiles).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedFiles).toHaveBeenCalledWith(['CASE-123']);
    expect(mockSetJBrowseSelectedFiles).toHaveBeenCalledTimes(1);
    expect(mockSetJBrowseSelectedFiles).toHaveBeenCalledWith(['CASE-123']);
  });

  it('renders download icon and fetches the file when file size is under max size', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      text: jest
        .fn()
        .mockResolvedValue('https://files.example.com/downloads/file.pdf'),
    });

    render(
      <DocumentDownloadView
        fileSize={100}
        maxFileSize={2000}
        fileLocation="files/abc-123"
        iconFileDownload="download-icon.png"
        toolTipTextFileDownload="Download a copy of this file"
      />
    );

    const icon = screen.getByTestId('custom-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('data-src')).toBe('download-icon.png');

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip.getAttribute('data-title')).toBe(
      'Download a copy of this file'
    );

    await act(async () => {
      fireEvent.click(icon.parentElement);
      await Promise.resolve();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://files.example.com/files/abc-123',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' },
      }
    );
  });

  it('renders preview icon and tooltip when file is too large for download', () => {
    render(
      <DocumentDownloadView
        fileSize={5000}
        maxFileSize={2000}
        iconFilePreview="preview-icon.png"
        toolTipTextFilePreview="Unavailable for download; use My Files"
      />
    );

    const icon = screen.getByTestId('custom-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('data-src')).toBe('preview-icon.png');

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip.getAttribute('data-title')).toBe(
      'Unavailable for download; use My Files'
    );

    expect(screen.queryByRole('link')).toBeNull();
  });

  it('uses the download branch by default when format is unsupported and size is within download range', () => {
    render(<DocumentDownloadView iconFileDownload="dl.png" />);

    const icon = screen.getByTestId('custom-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('data-src')).toBe('dl.png');
  });
});

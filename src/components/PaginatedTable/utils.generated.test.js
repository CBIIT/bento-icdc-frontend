// src/components/PaginatedTable/utils.generated.test.js
import * as utils from './utils';
import { formatBytes } from '../../bento-core';

jest.mock('../../bento-core', () => ({
  formatBytes: jest.fn(bytes => `formatted-${bytes}`),
}));

describe('utils - createFileName', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('creates a filename with zero-padded date and time parts', () => {
    jest.setSystemTime(new Date(2023, 3, 5, 6, 7, 8));

    const result = utils.createFileName('report');

    expect(result).toBe('report 2023-04-05 06-07-08.csv');
  });

  it('creates a filename with already two-digit date and time parts unchanged', () => {
    jest.setSystemTime(new Date(2023, 11, 31, 23, 59, 59));

    const result = utils.createFileName('export');

    expect(result).toBe('export 2023-12-31 23-59-59.csv');
  });

  it('allows an empty file name prefix', () => {
    jest.setSystemTime(new Date(2024, 0, 2, 3, 4, 5));

    const result = utils.createFileName('');

    expect(result).toBe(' 2024-01-02 03-04-05.csv');
  });
});

describe('utils - convertToCSV', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('converts a JSON string to CSV with headers and formatted file_size values', () => {
    const header = ['name', 'file_size', 'type'];
    const keys = ['name', 'file_size', 'type'];
    const data = [
      { name: 'file1', file_size: 10240, type: 'csv' },
      { name: 'file2', file_size: null, type: null },
    ];
    const jsonStr = JSON.stringify(data);

    formatBytes.mockImplementation(bytes => {
      if (bytes === 10240) return '10 KB';
      return `formatted-${bytes}`;
    });

    const csv = utils.convertToCSV(jsonStr, keys, header);

    expect(csv).toBe(
      'name,file_size,type\r\n' +
        '"file1","10 KB","csv"\r\n' +
        '"file2", , \r\n'
    );
    expect(formatBytes).toHaveBeenCalledTimes(1);
    expect(formatBytes).toHaveBeenCalledWith(10240);
  });

  it('accepts an object array directly and returns only the header for an empty array', () => {
    const header = ['col1', 'file_size'];
    const keys = ['col1', 'file_size'];
    const emptyArray = [];

    const csv = utils.convertToCSV(emptyArray, keys, header);

    expect(csv).toBe('col1,file_size');
    expect(formatBytes).not.toHaveBeenCalled();
  });

  it('uses a space for null values in non-file_size fields', () => {
    const header = ['a', 'b'];
    const keys = ['a', 'b'];
    const data = [{ a: null, b: 'text' }];

    const csv = utils.convertToCSV(data, keys, header);

    expect(csv).toBe('a,b\r\n ,"text"\r\n');
  });
});

describe('utils - downloadJson', () => {
  let originalURL;
  let originalBlob;
  let createObjectURLMock;
  let blobMock;
  let appendSpy;
  let removeSpy;
  let createElementSpy;
  let clickSpy;
  let createdAnchor;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 0, 2, 3, 4, 5));
    jest.clearAllMocks();

    originalURL = window.URL;
    originalBlob = global.Blob;

    createObjectURLMock = jest.fn(() => 'blob:mock-url');
    Object.defineProperty(window, 'URL', {
      configurable: true,
      writable: true,
      value: { createObjectURL: createObjectURLMock },
    });

    blobMock = jest.fn(() => ({ mocked: 'blob' }));
    global.Blob = blobMock;

    appendSpy = jest.spyOn(document.body, 'appendChild');
    removeSpy = jest.spyOn(document.body, 'removeChild');

    createdAnchor = null;
    const originalCreateElement = document.createElement.bind(document);

    createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockImplementation(tagName => {
        const element = originalCreateElement(tagName);

        if (String(tagName).toLowerCase() === 'a') {
          createdAnchor = element;
          clickSpy = jest
            .spyOn(createdAnchor, 'click')
            .mockImplementation(() => {});
        }

        return element;
      });
  });

  afterEach(() => {
    jest.useRealTimers();

    Object.defineProperty(window, 'URL', {
      configurable: true,
      writable: true,
      value: originalURL,
    });

    global.Blob = originalBlob;

    if (clickSpy) {
      clickSpy.mockRestore();
    }

    if (createElementSpy) {
      createElementSpy.mockRestore();
    }

    if (appendSpy) {
      appendSpy.mockRestore();
    }

    if (removeSpy) {
      removeSpy.mockRestore();
    }
  });

  it('creates a CSV Blob and triggers a download with the correct filename', () => {
    const tableData = [{ a: 1 }];
    const tableDownloadCSV = {
      keysToInclude: ['a'],
      header: ['a'],
      fileName: 'download',
    };

    utils.downloadJson(tableData, tableDownloadCSV);

    expect(blobMock).toHaveBeenCalledTimes(1);
    expect(blobMock).toHaveBeenCalledWith(['a\r\n"1"\r\n'], {
      type: 'text/csv',
    });

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(createObjectURLMock.mock.calls[0][0]).toEqual({ mocked: 'blob' });

    expect(createdAnchor).toBeTruthy();
    expect(createdAnchor.getAttribute('href')).toBe('blob:mock-url');
    expect(createdAnchor.getAttribute('download')).toBe(
      'download 2024-01-02 03-04-05.csv'
    );

    expect(appendSpy).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalledWith(createdAnchor);

    expect(clickSpy).toHaveBeenCalledTimes(1);

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(createdAnchor);
  });

  it('uses an empty string when fileName is missing', () => {
    const tableData = [{ x: 42 }];
    const tableDownloadCSV = {
      keysToInclude: ['x'],
      header: ['x'],
    };

    utils.downloadJson(tableData, tableDownloadCSV);

    expect(createdAnchor.getAttribute('download')).toBe(
      ' 2024-01-02 03-04-05.csv'
    );
  });
});

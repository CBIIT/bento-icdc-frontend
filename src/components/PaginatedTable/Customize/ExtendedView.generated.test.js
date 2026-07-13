// src/components/PaginatedTable/Customize/ExtendedView.generated.test.js

import { ExtendedViewConfig } from './ExtendedView';
import { useApolloClient } from '@apollo/client';
import { downloadJson } from '../utils';

jest.mock('@apollo/client', () => ({
  useApolloClient: jest.fn(),
}));

jest.mock('../utils', () => ({
  downloadJson: jest.fn(),
}));

describe('ExtendedViewConfig', () => {
  const mockQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useApolloClient.mockReturnValue({
      query: mockQuery,
    });
  });

  test('returns null when extendedViewConfig is missing', () => {
    expect(ExtendedViewConfig({})).toBeNull();
    expect(useApolloClient).not.toHaveBeenCalled();
  });

  test('returns extendedViewConfig when customDownload is falsy', () => {
    const config = {
      extendedViewConfig: {
        download: {
          customDownload: false,
          query: 'FAKE_QUERY',
        },
      },
    };

    const result = ExtendedViewConfig(config);

    expect(result).toBe(config.extendedViewConfig);
    expect(config.extendedViewConfig.download.downloadTable).toBeUndefined();
    expect(useApolloClient).not.toHaveBeenCalled();
    expect(downloadJson).not.toHaveBeenCalled();
  });

  test('attaches downloadTable when customDownload is truthy', () => {
    const config = {
      paginationAPIField: 'items',
      extendedViewConfig: {
        download: {
          customDownload: true,
          query: 'FAKE_QUERY',
          header: ['id'],
          keysToInclude: ['id'],
          fileName: 'test',
        },
      },
    };

    const result = ExtendedViewConfig(config);

    expect(result).toBe(config.extendedViewConfig);
    expect(typeof config.extendedViewConfig.download.downloadTable).toBe(
      'function'
    );
    expect(useApolloClient).toHaveBeenCalledTimes(1);
  });

  test('downloadTable queries with default variables and calls downloadJson on success', async () => {
    const dataRows = [{ id: 1 }, { id: 2 }];
    mockQuery.mockResolvedValueOnce({
      data: { items: dataRows },
    });

    const config = {
      paginationAPIField: 'items',
      extendedViewConfig: {
        download: {
          customDownload: true,
          query: 'FAKE_QUERY',
          header: ['id'],
          keysToInclude: ['id'],
          fileName: 'test',
        },
      },
    };

    const result = ExtendedViewConfig(config);
    const { download } = result;

    download.downloadTable();

    await mockQuery.mock.results[0].value;

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: download.query,
      variables: {
        offset: 0,
        first: 10000,
      },
    });
    expect(downloadJson).toHaveBeenCalledTimes(1);
    expect(downloadJson).toHaveBeenCalledWith(dataRows, download);
  });

  test('downloadTable merges provided filters into query variables', async () => {
    mockQuery.mockResolvedValueOnce({
      data: { items: [] },
    });

    const config = {
      paginationAPIField: 'items',
      extendedViewConfig: {
        download: {
          customDownload: true,
          query: 'FAKE_QUERY',
          header: ['id'],
          keysToInclude: ['id'],
          fileName: 'test',
        },
      },
    };

    const result = ExtendedViewConfig(config);
    const { download } = result;

    download.downloadTable({
      project: 'X',
      status: 'ACTIVE',
    });

    await mockQuery.mock.results[0].value;

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(mockQuery).toHaveBeenCalledWith({
      query: download.query,
      variables: {
        project: 'X',
        status: 'ACTIVE',
        offset: 0,
        first: 10000,
      },
    });
    expect(downloadJson).toHaveBeenCalledTimes(1);
  });

  test('does not call downloadJson when pagination field is missing', async () => {
    mockQuery.mockResolvedValueOnce({
      data: {},
    });

    const config = {
      paginationAPIField: 'items',
      extendedViewConfig: {
        download: {
          customDownload: true,
          query: 'FAKE_QUERY',
          header: ['id'],
          keysToInclude: ['id'],
          fileName: 'test',
        },
      },
    };

    const result = ExtendedViewConfig(config);
    const { download } = result;

    download.downloadTable({});

    await mockQuery.mock.results[0].value;

    expect(mockQuery).toHaveBeenCalledTimes(1);
    expect(downloadJson).not.toHaveBeenCalled();
  });

  test('throws TypeError when download object is missing', () => {
    const config = {
      extendedViewConfig: {},
    };

    expect(() => ExtendedViewConfig(config)).toThrow(TypeError);
  });
});

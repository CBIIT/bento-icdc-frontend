import FileSaver from 'file-saver';
import JSZip from 'jszip';
import {
  truncateLines,
  getType,
  downloadTemplate,
  downloadMultiTemplate,
  parseDictionaryNodes,
  getPropertyDescription,
  getSearchHistoryItems,
  addSearchHistoryItems,
  clearSearchHistoryItems,
} from './utils';

const mockFile = jest.fn();
const mockGenerateAsync = jest.fn().mockResolvedValue('blob-content');

jest.mock('file-saver', () => ({
  __esModule: true,
  default: {
    saveAs: jest.fn(),
  },
}));

jest.mock('jszip', () => {
  const MockJSZip = jest.fn().mockImplementation(() => ({
    file: mockFile,
    generateAsync: mockGenerateAsync,
  }));

  return {
    __esModule: true,
    default: MockJSZip,
  };
});

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('truncateLines', () => {
    it('returns a single line when input fits within maxCharInRow', () => {
      expect(truncateLines('a bb ccc', 10, 12)).toEqual(['a bb ccc']);
    });

    it('splits into multiple lines when words exceed maxCharInRow', () => {
      expect(truncateLines('hello world', 5, 12)).toEqual(['hello', 'world']);
    });

    it('hyphen-breaks a long word exceeding breakwordMinLength', () => {
      expect(truncateLines('abcdefghijklmno', 5, 12)).toEqual([
        'abcd-',
        'efgh-',
        'ijkl-',
        'mno',
      ]);
    });

    it('handles empty string input', () => {
      expect(truncateLines('', 10, 12)).toEqual(['']);
    });
  });

  describe('getType', () => {
    it('returns scalar type string when property.type is string', () => {
      expect(getType({ type: 'string' })).toBe('string');
    });

    it('returns enum array when property.enum is present', () => {
      expect(getType({ enum: ['A', 'B'] })).toEqual(['A', 'B']);
    });

    it('flattens oneOf nested types and enums', () => {
      const property = {
        oneOf: [{ enum: ['X', 'Y'] }, { type: 'integer' }],
      };
      expect(getType(property)).toEqual(['X', 'Y', 'integer']);
    });

    it('flattens anyOf nested types and enums', () => {
      const property = {
        anyOf: [
          { enum: ['P'] },
          { type: 'number' },
          { oneOf: [{ type: 'null' }] },
        ],
      };
      expect(getType(property)).toEqual(['P', 'number', 'null']);
    });

    it('returns UNDEFINED when no type information is available', () => {
      expect(getType({})).toBe('UNDEFINED');
    });
  });

  describe('downloadTemplate', () => {
    let openSpy;

    beforeEach(() => {
      openSpy = jest.spyOn(window, 'open').mockImplementation(() => {});
    });

    afterEach(() => {
      openSpy.mockRestore();
    });

    it('opens a new window with correct URL for valid format tsv', () => {
      downloadTemplate('tsv', 'case');
      expect(openSpy).toHaveBeenCalledWith('FIXMEcase?format=tsv');
    });

    it('opens a new window with correct URL for valid format json', () => {
      downloadTemplate('json', 'file');
      expect(openSpy).toHaveBeenCalledWith('FIXMEfile?format=json');
    });

    it('does nothing for invalid format', () => {
      downloadTemplate('csv', 'node');
      expect(openSpy).not.toHaveBeenCalled();
    });
  });

  describe('downloadMultiTemplate', () => {
    beforeEach(() => {
      mockFile.mockClear();
      mockGenerateAsync.mockClear();
      jest
        .spyOn(Date.prototype, 'toLocaleDateString')
        .mockReturnValue('2024-01-02');
      jest
        .spyOn(Date.prototype, 'toLocaleTimeString')
        .mockReturnValue('03:04:05 PM');
      global.fetch = jest.fn();
    });

    afterEach(() => {
      delete global.fetch;
      jest.restoreAllMocks();
    });

    it('returns early and does not perform any action for invalid format', async () => {
      downloadMultiTemplate('csv', { A: 'A.tsv' }, [], 'Node', 'v1');

      await flushPromises();

      expect(global.fetch).not.toHaveBeenCalled();
      expect(FileSaver.saveAs).not.toHaveBeenCalled();
      expect(JSZip).not.toHaveBeenCalled();
    });

    it('fetches all node templates, creates README, zips and saves for tsv', async () => {
      const format = 'tsv';
      const nodesToDownload = {
        case: 'case.tsv',
        sample: 'sample.tsv',
      };
      const allRoutes = [
        ['Project', 'Case', 'Sample'],
        ['Project', 'Study'],
      ];
      const clickingNodeName = 'Sample';
      const dictionaryVersion = '2024.01';
      const base = 'FIXME';

      global.fetch.mockImplementation(url => {
        const responseMap = {
          [`${base}case?format=${format}`]: 'case-content',
          [`${base}sample?format=${format}`]: 'sample-content',
        };

        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(responseMap[url] ?? 'content'),
        });
      });

      downloadMultiTemplate(
        format,
        nodesToDownload,
        allRoutes,
        clickingNodeName,
        dictionaryVersion
      );

      await flushPromises();
      await flushPromises();

      expect(JSZip).toHaveBeenCalledTimes(1);
      expect(mockFile).toHaveBeenCalledWith('case.tsv', 'case-content');
      expect(mockFile).toHaveBeenCalledWith('sample.tsv', 'sample-content');

      const readmeCall = mockFile.mock.calls.find(
        args => args[0] === 'README.txt'
      );
      expect(readmeCall).toBeTruthy();

      const readmeContent = readmeCall[1];
      expect(readmeContent).toContain(
        'The following TSV templates were downloaded from Data Dictionary Vizualizations on 2024-01-02 03:04:05 PM.'
      );
      expect(readmeContent).toContain('from "Project" node to "Sample"');
      expect(readmeContent).toContain('using data dictionary version 2024.01');
      expect(readmeContent).toContain('1. Project,Case,Sample');
      expect(readmeContent).toContain('2. Project,Study');

      expect(mockGenerateAsync).toHaveBeenCalledWith({ type: 'blob' });
      expect(FileSaver.saveAs).toHaveBeenCalledWith(
        'blob-content',
        'templates-tsv.zip'
      );
    });
  });

  describe('parseDictionaryNodes', () => {
    it('filters out internal keys and mismatched ids, and keeps those with category and id', () => {
      const dict = {
        case: { id: 'case', category: 'Clinical', extra: 1 },
        _settings: { id: '_settings', category: 'Meta' },
        sample: { id: 'SAMPLE', category: 'Biospecimen' },
        study: { id: 'study' },
        file: { id: 'file', category: 'Data' },
      };

      expect(parseDictionaryNodes(dict)).toEqual([
        { id: 'case', category: 'Clinical', extra: 1 },
        { id: 'file', category: 'Data' },
      ]);
    });
  });

  describe('getPropertyDescription', () => {
    it('returns description when only description is present', () => {
      expect(getPropertyDescription({ description: 'foo' })).toBe('foo');
    });

    it('prefers term.description when both are present', () => {
      expect(
        getPropertyDescription({
          description: 'foo',
          term: { description: 'bar' },
        })
      ).toBe('bar');
    });

    it('returns undefined when neither description nor term is provided', () => {
      expect(getPropertyDescription({})).toBeUndefined();
    });
  });

  describe('search history with localStorage', () => {
    const key = 'datadictionary:searchHistory';

    it('getSearchHistoryItems returns parsed items from localStorage', () => {
      localStorage.setItem(
        key,
        JSON.stringify([{ keywordStr: 'k1', matchedCount: 1 }])
      );

      expect(getSearchHistoryItems()).toEqual([
        { keywordStr: 'k1', matchedCount: 1 },
      ]);
    });

    it('addSearchHistoryItems returns existing items when keywordStr is empty', () => {
      localStorage.setItem(
        key,
        JSON.stringify([{ keywordStr: 'old', matchedCount: 2 }])
      );

      const res = addSearchHistoryItems({ keywordStr: '', matchedCount: 0 });

      expect(res).toEqual([{ keywordStr: 'old', matchedCount: 2 }]);
      expect(JSON.parse(localStorage.getItem(key))).toEqual([
        { keywordStr: 'old', matchedCount: 2 },
      ]);
    });

    it('addSearchHistoryItems adds new item to the beginning when not present', () => {
      localStorage.setItem(key, JSON.stringify([]));

      const res = addSearchHistoryItems({ keywordStr: 'new', matchedCount: 5 });

      expect(res).toEqual([{ keywordStr: 'new', matchedCount: 5 }]);
      expect(JSON.parse(localStorage.getItem(key))).toEqual([
        { keywordStr: 'new', matchedCount: 5 },
      ]);
    });

    it('addSearchHistoryItems moves existing item to the beginning and updates it', () => {
      localStorage.setItem(
        key,
        JSON.stringify([
          { keywordStr: 'k1', matchedCount: 1 },
          { keywordStr: 'k2', matchedCount: 2 },
        ])
      );

      const res = addSearchHistoryItems({ keywordStr: 'k2', matchedCount: 99 });

      expect(res).toEqual([
        { keywordStr: 'k2', matchedCount: 99 },
        { keywordStr: 'k1', matchedCount: 1 },
      ]);
      expect(JSON.parse(localStorage.getItem(key))).toEqual(res);
    });

    it('clearSearchHistoryItems clears items and returns an empty array', () => {
      localStorage.setItem(
        key,
        JSON.stringify([{ keywordStr: 'x', matchedCount: 1 }])
      );

      const res = clearSearchHistoryItems();

      expect(res).toEqual([]);
      expect(JSON.parse(localStorage.getItem(key))).toEqual([]);
    });
  });
});

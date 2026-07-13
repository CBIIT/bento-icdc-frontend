// src/components/DocumentDownload/index.test.js

describe('DocumentDownload index re-export', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should re-export default from ./DocumentDownloadView (happy path)', async () => {
    const SENTINEL = { component: 'MockDocumentDownloadView' };

    jest.isolateModules(() => {
      jest.doMock('./DocumentDownloadView', () => ({
        __esModule: true,
        default: SENTINEL,
      }));

      // Use dynamic import to get the ESM namespace consistently
      return import('./index').then(mod => {
        expect(mod.default).toBe(SENTINEL);
      });
    });
  });

  test('should forward null when ./DocumentDownloadView default export is null (edge case)', async () => {
    jest.isolateModules(() => {
      jest.doMock('./DocumentDownloadView', () => ({
        __esModule: true,
        default: null,
      }));

      return import('./index').then(mod => {
        expect(mod.default).toBeNull();
      });
    });
  });

  test('should not expose named exports from ./DocumentDownloadView', async () => {
    jest.isolateModules(() => {
      jest.doMock('./DocumentDownloadView', () => ({
        __esModule: true,
        default: 'ONLY_DEFAULT',
        NamedThing: 'SHOULD_NOT_LEAK',
      }));

      return import('./index').then(mod => {
        expect(mod.default).toBe('ONLY_DEFAULT');
        // The re-export file only re-exports default, so named exports should be undefined.
        expect(mod.NamedThing).toBeUndefined();
      });
    });
  });

  test('throws error if ./DocumentDownloadView import fails (error handling)', async () => {
    jest.isolateModules(() => {
      jest.doMock('./DocumentDownloadView', () => {
        throw new Error('boom while loading view');
      });

      // Dynamic import should reject due to dependency throwing on load.
      return expect(import('./index')).rejects.toThrow(
        'boom while loading view'
      );
    });
  });
});

// File: src/components/PaginatedTable/Customize/PaginationOptions.test.js

jest.mock('../../../bento-core', () => ({
  customPaginationAction: jest.fn(payload => ({
    type: 'CUSTOM_PAGINATION',
    payload,
  })),
}));

jest.mock('../../../bento/fileCentricCartWorkflowData', () => ({
  GET_MY_CART_DATA_QUERY: 'ASC_QUERY',
  GET_MY_CART_DATA_QUERY_DESC: 'DESC_QUERY',
  cartTable: {
    paginationAPIField: 'ascField',
    paginationAPIFieldDesc: 'descField',
  },
}));

jest.mock('../../../pages/dashboard/store/Actions', () => ({
  onInputSearchQueryChange: jest.fn(value => ({
    type: 'ON_SEARCH_INPUT_CHANGE',
    payload: value,
  })),
}));

jest.mock('../../../store', () => ({
  __esModule: true,
  default: { dispatch: jest.fn() },
}));

import {
  myFileTablePaginationOptions,
  paginationOptions,
} from './PaginationOptions';
import { customPaginationAction } from '../../../bento-core';
import { onInputSearchQueryChange } from '../../../pages/dashboard/store/Actions';
import store from '../../../store';

describe('myFileTablePaginationOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('customizeSortByColumn', () => {
    it('should dispatch desc order when current order is asc and sortBy equals column', () => {
      const dispatch = jest.fn();
      const context = { dispatch, sortBy: 'file_name' };

      const { customizeSortByColumn } = myFileTablePaginationOptions(context);

      customizeSortByColumn('file_name', 'asc');

      const expectedPayload = {
        sortOrder: 'desc',
        sortBy: 'file_name',
        query: 'DESC_QUERY',
        paginationAPIField: 'descField',
      };

      expect(customPaginationAction).toHaveBeenCalledWith(expectedPayload);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: expectedPayload,
      });
    });

    it('should dispatch asc order when current order is not asc or sortBy differs', () => {
      const dispatch = jest.fn();
      const context = { dispatch, sortBy: 'other_column' };

      const { customizeSortByColumn } = myFileTablePaginationOptions(context);

      customizeSortByColumn('file_name', 'desc');

      const expectedPayload = {
        sortOrder: 'asc',
        sortBy: 'file_name',
        query: 'ASC_QUERY',
        paginationAPIField: 'ascField',
      };

      expect(customPaginationAction).toHaveBeenCalledWith(expectedPayload);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: expectedPayload,
      });
    });
  });

  describe('customizeToggleSelectAll', () => {
    const rows = [
      { file_uuid: 'uuid-1' },
      { file_uuid: 'uuid-2' },
      { file_uuid: 'uuid-3' },
    ];

    it('should select all when checked and includeIds is falsy', () => {
      const dispatch = jest.fn();
      const context = {
        dispatch,
        selectedRows: ['existingA'],
        selectedFileIds: ['uuid-0'],
      };

      const { customizeToggleSelectAll } =
        myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn(), target: { checked: true } };
      const Ids = ['name-1', 'name-2'];

      customizeToggleSelectAll(event, Ids, false, rows);

      expect(event.stopPropagation).toHaveBeenCalled();

      const expectedRows = Ids.concat(context.selectedRows);
      const expectedIds = ['uuid-0', 'uuid-1', 'uuid-2', 'uuid-3'];

      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: expectedRows,
        selectedFileIds: expectedIds,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: { selectedRows: expectedRows, selectedFileIds: expectedIds },
      });
    });

    it('should uncheck all when event is unchecked', () => {
      const dispatch = jest.fn();
      const context = {
        dispatch,
        selectedRows: ['name-1', 'name-2', 'name-3'],
        selectedFileIds: ['uuid-1', 'uuid-2', 'uuid-3', 'uuid-4'],
      };

      const { customizeToggleSelectAll } =
        myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn(), target: { checked: false } };
      const Ids = ['name-1', 'name-2'];

      customizeToggleSelectAll(event, Ids, true, rows);

      expect(event.stopPropagation).toHaveBeenCalled();

      const expectedRows = ['name-3'];
      const expectedIds = ['uuid-4'];

      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: expectedRows,
        selectedFileIds: expectedIds,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: { selectedRows: expectedRows, selectedFileIds: expectedIds },
      });
    });

    it('should handle undefined selectedRows/selectedFileIds by defaulting to empty arrays', () => {
      const dispatch = jest.fn();
      const context = { dispatch };

      const { customizeToggleSelectAll } =
        myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn(), target: { checked: true } };
      const Ids = ['n1'];

      customizeToggleSelectAll(event, Ids, false, rows);

      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: ['n1'],
        selectedFileIds: ['uuid-1', 'uuid-2', 'uuid-3'],
      });
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('customizeOnRowSelect', () => {
    it('should add file when row is not checked (select)', () => {
      const dispatch = jest.fn();
      const context = {
        dispatch,
        selectedRows: ['old1'],
        selectedFileIds: ['fid-0'],
      };
      const { customizeOnRowSelect } = myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn() };
      const row = {
        isChecked: false,
        file_name: 'newFile',
        file_uuid: 'fid-1',
      };

      customizeOnRowSelect(event, row);

      expect(event.stopPropagation).toHaveBeenCalled();

      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: ['old1', 'newFile'],
        selectedFileIds: ['fid-0', 'fid-1'],
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: {
          selectedRows: ['old1', 'newFile'],
          selectedFileIds: ['fid-0', 'fid-1'],
        },
      });
    });

    it('should remove file when row is checked (deselect)', () => {
      const dispatch = jest.fn();
      const context = {
        dispatch,
        selectedRows: ['keep', 'removeMe'],
        selectedFileIds: ['fid-keep', 'fid-remove'],
      };
      const { customizeOnRowSelect } = myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn() };
      const row = {
        isChecked: true,
        file_name: 'removeMe',
        file_uuid: 'fid-remove',
      };

      customizeOnRowSelect(event, row);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: ['keep'],
        selectedFileIds: ['fid-keep'],
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CUSTOM_PAGINATION',
        payload: { selectedRows: ['keep'], selectedFileIds: ['fid-keep'] },
      });
    });

    it('should default to empty arrays when context does not provide selectedRows/selectedFileIds', () => {
      const dispatch = jest.fn();
      const context = { dispatch };
      const { customizeOnRowSelect } = myFileTablePaginationOptions(context);

      const event = { stopPropagation: jest.fn() };
      const row = {
        isChecked: false,
        file_name: 'onlyOne',
        file_uuid: 'fid-1',
      };

      customizeOnRowSelect(event, row);

      expect(customPaginationAction).toHaveBeenCalledWith({
        selectedRows: ['onlyOne'],
        selectedFileIds: ['fid-1'],
      });
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('paginationOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return myFiles pagination options with handlers', () => {
    const context = { dispatch: jest.fn(), sortBy: 'x' };
    const options = paginationOptions(context, { title: 'myFiles' });

    expect(typeof options.customizeSortByColumn).toBe('function');
    expect(typeof options.customizeToggleSelectAll).toBe('function');
    expect(typeof options.customizeOnRowSelect).toBe('function');
  });

  it('should wire customizeSearchQueryChange to global store dispatch for samples', () => {
    const options = paginationOptions({}, { title: 'samples' });

    expect(typeof options.customizeSearchQueryChange).toBe('function');

    options.customizeSearchQueryChange('abc');

    expect(onInputSearchQueryChange).toHaveBeenCalledWith('abc');
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'ON_SEARCH_INPUT_CHANGE',
      payload: 'abc',
    });
  });

  it('should return empty object for unknown title', () => {
    const options = paginationOptions({}, { title: 'unknown' });
    expect(options).toEqual({});
  });

  it('should safely handle missing config (undefined)', () => {
    const options = paginationOptions({}, undefined);
    expect(options).toEqual({});
  });
});

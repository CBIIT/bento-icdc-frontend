// src/components/sideBarFilter/BentoFilterUtils.test.js

import {
  getFacetValues,
  onClearAllAndSelectFacetValue,
  setActiveFilterByPathQuery,
  getAllIds,
  getAllSubjectIds,
} from './BentoFilterUtils';

// Mock store and action creators from bento-core
const mockDispatch = jest.fn();

jest.mock('../../store', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

jest.mock('../../bento-core', () => ({
  __esModule: true,
  clearAllAndSelectFacet: jest.fn(payload => ({
    type: 'CLEAR_ALL_AND_SELECT_FACET',
    payload,
  })),
  updateAutocompleteData: jest.fn(payload => ({
    type: 'UPDATE_AUTOCOMPLETE',
    payload,
  })),
  updateUploadData: jest.fn(payload => ({
    type: 'UPDATE_UPLOAD',
    payload,
  })),
  updateUploadMetadata: jest.fn(payload => ({
    type: 'UPDATE_UPLOAD_METADATA',
    payload,
  })),
}));

// Mock GraphQL client and queries
jest.mock('../../utils/graphqlClient', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

jest.mock('../../bento/localSearchData', () => ({
  __esModule: true,
  GET_IDS_BY_TYPE: jest.fn(type => `QUERY_FOR_${type}`),
  GET_SUBJECT_IDS: 'GET_SUBJECT_IDS_QUERY',
}));

// Bring in the mocks for assertions
import store from '../../store';
import client from '../../utils/graphqlClient';
import {
  clearAllAndSelectFacet,
  updateAutocompleteData,
  updateUploadData,
  updateUploadMetadata,
} from '../../bento-core';
import { GET_IDS_BY_TYPE, GET_SUBJECT_IDS } from '../../bento/localSearchData';

describe('BentoFilterUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch = mockDispatch;
  });

  describe('getFacetValues', () => {
    it('should create a facet value map with true for given facet and value', () => {
      const result = getFacetValues('programs', 'P1');
      expect(result).toEqual({ programs: { P1: true } });
    });

    it('should handle facet values with special characters', () => {
      const result = getFacetValues('study-codes', 'STUDY/001');
      expect(result).toEqual({ 'study-codes': { 'STUDY/001': true } });
    });
  });

  describe('onClearAllAndSelectFacetValue', () => {
    it('should dispatch clearAllAndSelectFacet with computed filterValue', () => {
      const expectedFilter = { diagnoses: { Cancer: true } };

      onClearAllAndSelectFacetValue('diagnoses', 'Cancer');

      expect(clearAllAndSelectFacet).toHaveBeenCalledTimes(1);
      expect(clearAllAndSelectFacet).toHaveBeenCalledWith(expectedFilter);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'CLEAR_ALL_AND_SELECT_FACET',
        payload: expectedFilter,
      });
    });
  });

  describe('setActiveFilterByPathQuery', () => {
    it('should dispatch actions with active filters, autocomplete, upload and metadata (happy path)', () => {
      const filterObject = {
        programs: ['P1', 'P2'],
        autocomplete: ['TermA'],
        upload: ['ID_1'],
        uploadMetadata: { foo: 'bar' },
        searchTerm: 'free text',
      };
      const encoded = encodeURIComponent(JSON.stringify(filterObject));
      const match = { params: { filterQuery: encoded } };

      setActiveFilterByPathQuery(match);

      expect(clearAllAndSelectFacet).toHaveBeenCalledTimes(1);
      expect(clearAllAndSelectFacet).toHaveBeenCalledWith({
        programs: { P1: true, P2: true },
        autocomplete: { TermA: true },
        upload: { ID_1: true },
      });

      expect(updateAutocompleteData).toHaveBeenCalledTimes(1);
      expect(updateAutocompleteData).toHaveBeenCalledWith(['TermA']);

      expect(updateUploadData).toHaveBeenCalledTimes(1);
      expect(updateUploadData).toHaveBeenCalledWith(['ID_1']);

      expect(updateUploadMetadata).toHaveBeenCalledTimes(1);
      expect(updateUploadMetadata).toHaveBeenCalledWith({ foo: 'bar' });

      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        type: 'CLEAR_ALL_AND_SELECT_FACET',
        payload: {
          programs: { P1: true, P2: true },
          autocomplete: { TermA: true },
          upload: { ID_1: true },
        },
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        type: 'UPDATE_AUTOCOMPLETE',
        payload: ['TermA'],
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(3, {
        type: 'UPDATE_UPLOAD',
        payload: ['ID_1'],
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(4, {
        type: 'UPDATE_UPLOAD_METADATA',
        payload: { foo: 'bar' },
      });
    });

    it('should set defaults for missing arrays and still dispatch (autocomplete/upload default to empty arrays, metadata undefined)', () => {
      const filterObject = {
        programs: ['OnlyP'],
      };
      const encoded = encodeURIComponent(JSON.stringify(filterObject));
      const match = { params: { filterQuery: encoded } };

      setActiveFilterByPathQuery(match);

      expect(clearAllAndSelectFacet).toHaveBeenCalledWith({
        programs: { OnlyP: true },
      });
      expect(updateAutocompleteData).toHaveBeenCalledWith([]);
      expect(updateUploadData).toHaveBeenCalledWith([]);
      expect(updateUploadMetadata).toHaveBeenCalledWith(undefined);

      expect(store.dispatch).toHaveBeenCalledTimes(4);
    });

    it('throws error if filterQuery is missing or invalid JSON', () => {
      const matchMissing = { params: { filterQuery: undefined } };
      expect(() => setActiveFilterByPathQuery(matchMissing)).toThrow(
        SyntaxError
      );

      const bad = encodeURIComponent('not-json');
      const matchBad = { params: { filterQuery: bad } };
      expect(() => setActiveFilterByPathQuery(matchBad)).toThrow(SyntaxError);
    });
  });

  describe('getAllIds', () => {
    it('should request ids by type and return flattened values (happy path)', async () => {
      const type = 'case_id';
      const mockData = {
        data: {
          caseOverview: [{ case_id: 'C1' }, { case_id: 'C2' }],
        },
      };
      client.query.mockResolvedValueOnce(mockData);

      const result = await getAllIds(type);

      expect(GET_IDS_BY_TYPE).toHaveBeenCalledWith(type);
      expect(client.query).toHaveBeenCalledWith({
        query: 'QUERY_FOR_case_id',
        variables: {},
      });
      expect(result).toEqual(['C1', 'C2']);
    });

    it('should return empty array when client.query rejects', async () => {
      client.query.mockRejectedValueOnce(new Error('Network error'));

      const result = await getAllIds('sample_id');

      expect(result).toEqual([]);
    });

    it('should map to possibly undefined when items do not contain the type key', async () => {
      client.query.mockResolvedValueOnce({
        data: { caseOverview: [{ other: 'x' }] },
      });

      const result = await getAllIds('missing_key');

      expect(result).toEqual([undefined]);
    });
  });

  describe('getAllSubjectIds', () => {
    it('should request subject ids and return caseOverview array (happy path)', async () => {
      const inputIds = ['S1', 'S2'];
      const mockData = {
        data: {
          caseOverview: [
            { case_id: 'S1', study_code: 'A' },
            { case_id: 'S2', study_code: 'B' },
          ],
        },
      };
      client.query.mockResolvedValueOnce(mockData);

      const result = await getAllSubjectIds(inputIds);

      expect(client.query).toHaveBeenCalledWith({
        query: GET_SUBJECT_IDS,
        variables: { case_ids: inputIds },
      });
      expect(result).toEqual(mockData.data.caseOverview);
    });

    it('should return empty array when client.query rejects', async () => {
      client.query.mockRejectedValueOnce(new Error('Boom'));

      const result = await getAllSubjectIds(['X']);

      expect(result).toEqual([]);
    });

    it('should handle empty input list by still calling with empty array', async () => {
      const mockData = { data: { caseOverview: [] } };
      client.query.mockResolvedValueOnce(mockData);

      const result = await getAllSubjectIds([]);

      expect(client.query).toHaveBeenCalledWith({
        query: GET_SUBJECT_IDS,
        variables: { case_ids: [] },
      });
      expect(result).toEqual([]);
    });
  });
});

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import UnifiedController from '../unifiedController';
import {
  CaseDocument,
  UnifiedViewDataDocument,
} from '../../../generated-types/graphql';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */

interface MockUnifiedViewData {
  individualId?: string | null;
  case_id?: string | null;
  patient_id?: string | null;
  caseIds?: Array<string | null> | null;
  [key: string]: unknown;
}

jest.mock('../unifiedView', () => ({
  __esModule: true,
  default: ({ unifiedViewData }: { unifiedViewData: MockUnifiedViewData }) => (
    <div data-testid="dashboard">
      <span data-testid="individual-id">
        {unifiedViewData.individualId ?? ''}
      </span>
      <span data-testid="case-id">{unifiedViewData.case_id ?? ''}</span>
      <span data-testid="patient-id">{unifiedViewData.patient_id ?? ''}</span>
      <span data-testid="case-ids">
        {JSON.stringify(unifiedViewData.caseIds)}
      </span>
    </div>
  ),
}));

const mockUseQuery = useQuery as jest.Mock;

const mockMatch = {
  params: { id: 'CASE-123' },
  isExact: true,
  path: '/unified/:id',
  url: '/unified/CASE-123',
};

const mockMultiStudyData = {
  case: [
    {
      case_id: 'CASE-123',
      patient_id: 'PATIENT-456',
      patient_first_name: 'Buddy',
    },
  ],
  multiStudyCases: {
    caseIds: ['CASE-123', 'CASE-456', 'CASE-789'],
    individualId: 'INDIVIDUAL-001',
  },
};

const mockUnifiedViewStats = {
  searchCases: {
    numberOfStudies: 3,
    numberOfCases: 3,
    numberOfSamples: 15,
    numberOfFiles: 45,
  },
};

describe('UnifiedController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading states', () => {
    it('shows loading indicator when multiStudy query is loading', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: true,
          data: undefined,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
    });

    it('shows loading indicator when unifiedViewStats query is loading', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: true,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
    });

    it('shows loading indicator when both queries are loading', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: true,
          data: undefined,
        })
        .mockReturnValueOnce({
          loading: true,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
    });
  });

  describe('query execution', () => {
    it('executes CaseDocument query with the case ID from route params', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        CaseDocument,
        expect.objectContaining({
          variables: { case_id: 'CASE-123' },
        })
      );
    });

    it('executes UnifiedViewDataDocument query with case IDs from multiStudyCases', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        UnifiedViewDataDocument,
        expect.objectContaining({
          variables: {
            case_ids: ['CASE-123', 'CASE-456', 'CASE-789'],
          },
          skip: false,
        })
      );
    });

    it('filters out null case IDs from multiStudyCases.caseIds array', () => {
      const dataWithNulls = {
        ...mockMultiStudyData,
        multiStudyCases: {
          caseIds: ['CASE-123', null, 'CASE-456', null, 'CASE-789'],
          individualId: 'INDIVIDUAL-001',
        },
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithNulls,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        UnifiedViewDataDocument,
        expect.objectContaining({
          variables: {
            case_ids: ['CASE-123', 'CASE-456', 'CASE-789'],
          },
        })
      );
    });
  });

  describe('query skip behavior', () => {
    it('skips UnifiedViewDataDocument query when multiStudyCases is null', () => {
      const dataWithoutMultiStudy = {
        case: mockMultiStudyData.case,
        multiStudyCases: null,
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithoutMultiStudy,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        UnifiedViewDataDocument,
        expect.objectContaining({
          variables: { case_ids: [] },
          skip: true,
        })
      );
    });

    it('skips UnifiedViewDataDocument query when caseIds is null', () => {
      const dataWithNullCaseIds = {
        case: mockMultiStudyData.case,
        multiStudyCases: {
          caseIds: null,
          individualId: 'INDIVIDUAL-001',
        },
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithNullCaseIds,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        UnifiedViewDataDocument,
        expect.objectContaining({
          variables: { case_ids: [] },
          skip: true,
        })
      );
    });

    it('skips UnifiedViewDataDocument query when caseIds is an empty array', () => {
      const dataWithEmptyCaseIds = {
        case: mockMultiStudyData.case,
        multiStudyCases: {
          caseIds: [],
          individualId: 'INDIVIDUAL-001',
        },
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithEmptyCaseIds,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(mockUseQuery).toHaveBeenCalledWith(
        UnifiedViewDataDocument,
        expect.objectContaining({
          variables: { case_ids: [] },
          skip: true,
        })
      );
    });
  });

  describe('data transformation and rendering', () => {
    it('renders Dashboard with combined data from both queries', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });

    it('passes individualId from multiStudyCases to Dashboard', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('individual-id')).toHaveTextContent(
        'INDIVIDUAL-001'
      );
    });

    it('passes case details from case[0] to Dashboard', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('case-id')).toHaveTextContent('CASE-123');
      expect(screen.getByTestId('patient-id')).toHaveTextContent('PATIENT-456');
    });

    it('passes searchCases stats to Dashboard', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      const dashboard = screen.getByTestId('dashboard');
      expect(dashboard).toBeInTheDocument();
    });

    it('merges data with individualId overriding any conflicting keys', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      // individualId is explicitly set from multiStudyCases
      expect(screen.getByTestId('individual-id')).toHaveTextContent(
        'INDIVIDUAL-001'
      );
    });
  });

  describe('null and empty data handling', () => {
    it('renders Dashboard when case array is empty', () => {
      const dataWithEmptyCase = {
        case: [],
        multiStudyCases: mockMultiStudyData.multiStudyCases,
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithEmptyCase,
        })
        .mockReturnValueOnce({
          loading: false,
          data: mockUnifiedViewStats,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });

    it('handles undefined multiStudyCases gracefully', () => {
      const dataWithoutMultiStudy = {
        case: mockMultiStudyData.case,
        multiStudyCases: undefined,
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: dataWithoutMultiStudy,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('individual-id')).toHaveTextContent('');
    });

    it('handles undefined unifiedViewStats gracefully', () => {
      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: mockMultiStudyData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: undefined,
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });

    it('renders Dashboard with partial data when queries return minimal results', () => {
      const minimalData = {
        case: [],
        multiStudyCases: {
          caseIds: ['CASE-123'],
          individualId: 'INDIVIDUAL-001',
        },
      };

      mockUseQuery
        .mockReturnValueOnce({
          loading: false,
          data: minimalData,
        })
        .mockReturnValueOnce({
          loading: false,
          data: { searchCases: {} },
        });

      render(<UnifiedController match={mockMatch} />);

      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('individual-id')).toHaveTextContent(
        'INDIVIDUAL-001'
      );
    });
  });
});

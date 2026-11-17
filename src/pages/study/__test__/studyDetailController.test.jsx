import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import StudyDetailController from '../studyDetailController';
import {
  STUDY_DETAILS_ACTION_LABELS,
  STUDY_DETAILS_MESSAGES,
} from '../constants/studyDetails';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

jest.mock('../studyDetailView', () => ({
  __esModule: true,
  default: () => <main />,
}));

jest.mock('../../studies/studiesController', () => ({
  __esModule: true,
  default: () => <main />,
}));

jest.mock('../../../components/Wrappers/Wrappers', () => ({
  Typography: ({ children }) => <div>{children}</div>,
}));

jest.mock('../studyDiagnostics', () => ({
  logStudyDiagnostic: jest.fn(),
}));

const mockUseQuery = useQuery;

describe('Study Details partial loading', () => {
  beforeEach(() => {
    mockUseQuery.mockReset();
  });

  it('keeps the Study visible and lets the user retry missing details', () => {
    const refetch = jest.fn(() => new Promise(() => undefined));

    mockUseQuery.mockReturnValue({
      loading: true,
      error: {
        graphQLErrors: [
          {
            message: 'Visit count could not be serialized',
            path: ['clinicalDataNodeCounts', 'visit'],
          },
        ],
        networkError: null,
      },
      data: {
        study: [{ clinical_study_designation: 'TEST-STUDY' }],
      },
      refetch,
    });

    render(
      <StudyDetailController
        match={{ params: { id: 'TEST-STUDY', fileType: '' } }}
        history={{ push: jest.fn() }}
      />
    );

    expect(screen.getByRole('main')).toBeTruthy();
    expect(screen.getByText(STUDY_DETAILS_MESSAGES.partialLoad)).toBeTruthy();

    fireEvent.click(screen.getByText(STUDY_DETAILS_ACTION_LABELS.refresh));

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('shows the page-level error when an error leaves no usable Study', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: {
        graphQLErrors: [
          {
            message: 'Study identity could not be loaded',
            path: ['study', 0, 'clinical_study_designation'],
          },
        ],
        networkError: null,
      },
      data: { study: [{ clinical_study_designation: null }] },
      refetch: jest.fn(),
    });

    render(
      <StudyDetailController
        match={{ params: { id: 'TEST-STUDY', fileType: '' } }}
        history={{ push: jest.fn() }}
      />
    );

    expect(screen.queryByRole('main')).toBeNull();
    expect(screen.getByText(STUDY_DETAILS_MESSAGES.unavailable)).toBeTruthy();
  });

  it('uses the invalid-Study screen for an error-free empty result', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { study: [] },
      refetch: jest.fn(),
    });

    render(
      <StudyDetailController
        match={{ params: { id: 'TEST-STUDY', fileType: '' } }}
        history={{ push: jest.fn() }}
      />
    );

    expect(screen.getByRole('main')).toBeTruthy();
    expect(screen.queryByText(STUDY_DETAILS_MESSAGES.unavailable)).toBeNull();
  });
});

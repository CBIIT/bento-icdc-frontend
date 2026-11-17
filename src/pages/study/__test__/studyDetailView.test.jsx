import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClientError } from 'graphql-request';
import StudyDetailView, { TAB_LABELS } from '../studyDetailView';
import { STUDY_DETAILS_MESSAGES } from '../constants/studyDetails';
import { logStudyDiagnostic } from '../studyDiagnostics';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('../../../utils/env', () => ({
  __esModule: true,
  default: { REACT_APP_BACKEND_API: '/graphql' },
}));

jest.mock('../studyDetailsThemeConfig', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('../StudySectionErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

jest.mock('../studyDiagnostics', () => ({
  logStudyDiagnostic: jest.fn(),
}));

jest.mock('../../../components/Stats/StatsView', () => () => null);
jest.mock('../../../components/Breadcrumb/BreadcrumbView', () => () => null);
jest.mock('../../../components/Tab/Tab', () => {
  const MockTab = ({ tabItems, currentTab, handleTabChange }) => (
    <nav>
      {tabItems.map((item, index) => (
        <button
          aria-current={currentTab === index ? 'page' : undefined}
          key={item.value}
          onClick={event => handleTabChange(event, index)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  MockTab.displayName = 'MockTab';
  return MockTab;
});
jest.mock('../views/SampleProfile', () => () => null);
jest.mock('../views/cohort/ArmsAndCohort', () => () => null);
jest.mock('../views/StudyFiles', () => () => null);
jest.mock('../views/Publication', () => () => null);
jest.mock('../views/supporting-data/SupportingDataView', () => () => null);
jest.mock('../views/human-relevance', () => ({
  HumanRelevancePanel: () => null,
}));
jest.mock('../views/clinical-data/ClinicalDataController', () => {
  const MockClinicalData = () => <main />;

  MockClinicalData.displayName = 'MockClinicalData';
  return MockClinicalData;
});

const STUDY_CODE = 'TEST-STUDY';
const clinicalCounts = {
  adverse_event: 0,
  agent: 0,
  agent_administration: 0,
  cycle: 0,
  disease_extent: 0,
  follow_up: 0,
  off_study: 0,
  off_treatment: 0,
  physical_exam: 0,
  prior_surgery: 0,
  prior_therapy: 0,
  visit: 0,
  vital_signs: 0,
};

const studyData = {
  study: [
    {
      clinical_study_designation: STUDY_CODE,
      clinical_study_name: 'Test Study',
      publications: [],
      principal_investigators: [],
      cases: [],
    },
  ],
  clinicalDataNodeCounts: { ...clinicalCounts, visit: null },
  clinicalDataNodeCaseCounts: clinicalCounts,
  studyFiles: [],
  filesOfStudy: [],
  externalDataOverview: [],
  caseCountOfStudy: 0,
  sampleCountOfStudy: 0,
  fileCountOfStudy: 0,
  fileCountOfStudyFiles: 0,
  programCountOfStudy: 0,
  aliquotCountOfStudy: 0,
  volumeOfDataOfStudy: 0,
};

const mockHumanRelevanceQuery = useQuery;

describe('Study Details clinical data availability', () => {
  beforeEach(() => {
    mockHumanRelevanceQuery.mockReturnValue({
      data: undefined,
      error: undefined,
    });
    logStudyDiagnostic.mockReset();
  });

  it('keeps Clinical Data reachable when its count is unavailable', () => {
    render(
      <MemoryRouter>
        <StudyDetailView data={studyData} initTab="" />
      </MemoryRouter>
    );

    expect(screen.queryByRole('main')).toBeNull();

    fireEvent.click(
      screen.getByText(STUDY_DETAILS_MESSAGES.clinicalNodeCountUnavailable)
    );

    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('keeps the Overview visible when optional collections contain unavailable entries', () => {
    render(
      <MemoryRouter>
        <StudyDetailView
          data={{
            ...studyData,
            study: [
              {
                ...studyData.study[0],
                publications: [null],
                principal_investigators: [null],
                cases: [null],
              },
            ],
            studyFiles: [null],
            filesOfStudy: [null],
            clinicalDataNodeCounts: clinicalCounts,
          }}
          initTab=""
        />
      </MemoryRouter>
    );

    expect(screen.getByText(STUDY_CODE)).toBeTruthy();
  });

  it('keeps the Study visible and sanitizes a Human Relevance request failure', () => {
    const privateQuery = 'query PrivateHumanRelevanceData';
    const privateVariable = 'private-study-variable';
    const privateResponse = 'private-response-data';
    const graphQLErrorMessage = 'Human Relevance could not be loaded';
    const graphQLErrorPath = ['humanRelevanceNodeData'];

    mockHumanRelevanceQuery.mockReturnValue({
      data: undefined,
      error: new ClientError(
        {
          data: { value: privateResponse },
          errors: [
            {
              message: graphQLErrorMessage,
              path: graphQLErrorPath,
            },
          ],
          status: 502,
          headers: {},
        },
        {
          query: privateQuery,
          variables: { study_codes: [privateVariable] },
        }
      ),
    });

    render(
      <MemoryRouter>
        <StudyDetailView data={studyData} initTab="" />
      </MemoryRouter>
    );

    expect(screen.getByText(STUDY_CODE)).toBeTruthy();
    expect(screen.queryByText(TAB_LABELS.HUMAN_RELEVANCE)).toBeNull();
    expect(logStudyDiagnostic).toHaveBeenCalledWith({
      operation: 'getHumanRelevanceDataByNode',
      studyCode: STUDY_CODE,
      section: 'Human Relevance',
      graphQLErrors: [
        {
          message: graphQLErrorMessage,
          path: graphQLErrorPath,
        },
      ],
      httpStatus: 502,
    });

    const diagnostic = JSON.stringify(logStudyDiagnostic.mock.calls[0][0]);
    expect(diagnostic).not.toContain(privateQuery);
    expect(diagnostic).not.toContain(privateVariable);
    expect(diagnostic).not.toContain(privateResponse);
  });

  it('returns to Overview when the selected optional tab becomes unavailable', () => {
    const humanRelevanceData = {
      human_relevance_record_id: 'TEST-HUMAN-RELEVANCE',
    };
    mockHumanRelevanceQuery.mockReturnValue({
      data: humanRelevanceData,
      error: undefined,
    });

    const { rerender } = render(
      <MemoryRouter>
        <StudyDetailView data={studyData} initTab="" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(TAB_LABELS.HUMAN_RELEVANCE));
    expect(
      screen.getByText(TAB_LABELS.HUMAN_RELEVANCE).getAttribute('aria-current')
    ).toBe('page');

    mockHumanRelevanceQuery.mockReturnValue({
      data: undefined,
      error: undefined,
    });
    rerender(
      <MemoryRouter>
        <StudyDetailView data={studyData} initTab="" />
      </MemoryRouter>
    );

    expect(screen.queryByText(TAB_LABELS.HUMAN_RELEVANCE)).toBeNull();
    expect(
      screen.getByText(TAB_LABELS.OVERVIEW).getAttribute('aria-current')
    ).toBe('page');
  });
});

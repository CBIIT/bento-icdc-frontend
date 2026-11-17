/**
 * @jest-environment ./test/msw-environment.cjs
 * @jest-environment-options {"customExportConditions":["node","node-addons"]}
 */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import {
  act,
  fireEvent,
  render as renderComponent,
  screen,
  within,
  wait,
} from '@testing-library/react';
import { useQuery } from '@apollo/client';
import ClinicalDataController from '../ClinicalDataController';
import { table } from '../../../../../bento/studyDetailsData';
import { downloadAndZipJson, downloadJson } from '../../../../Cart/utils';
import PaginatedTableView from '../../../../../components/PaginatedTable/TableView';
import CsvDownload from '../../../../../components/PaginatedTable/Customize/components/CsvDownload';
import { CLINICAL_DATA_MESSAGES } from '../../../constants/clinicalData';
import { STUDY_DETAILS_ACTION_LABELS } from '../../../constants/studyDetails';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

jest.mock('../../../../../utils/env', () => ({
  __esModule: true,
  default: { REACT_APP_DATA_MODEL: '/data-model.yml' },
}));

jest.mock('../../../../../components/PaginatedTable/TableView', () =>
  jest.fn()
);

jest.mock('../../../../Cart/utils', () => ({
  downloadAndZipJson: jest.fn(),
  downloadJson: jest.fn(),
}));

jest.mock('../../../studyDiagnostics', () => ({
  logStudyDiagnostic: jest.fn(),
}));

const endpoint = 'http://localhost/data-model.yml';
const server = setupServer(
  http.get(endpoint, () => HttpResponse.text('Nodes: {}'))
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
let queryClient;
const render = ui =>
  renderComponent(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
const findDescription = async text => {
  await wait(async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    expect(screen.getByText(text)).toBeTruthy();
  });
};
const mockUseQuery = useQuery;
const emptyClinicalData = () =>
  Object.fromEntries(table.rows.map(row => [row.csvDownload, []]));
const getClinicalRow = countKey =>
  table.rows.find(row => row.countKey === countKey);
const ClinicalDataTable = ({ tblRows }) => (
  <main>
    {tblRows.map(row => (
      <section aria-label={row.clinicalDataNode} key={row.clinicalDataNode}>
        <p>{row.clinicalDataDescription}</p>
        <CsvDownload {...row} />
      </section>
    ))}
  </main>
);

describe('Clinical Data loading failures', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { gcTime: Infinity } },
    });
    mockUseQuery.mockReset();
    downloadAndZipJson.mockReset();
    downloadJson.mockReset();
    PaginatedTableView.mockReset();
    PaginatedTableView.mockImplementation(ClinicalDataTable);
  });

  afterEach(() => queryClient.clear());

  it('keeps available data visible and lets the user retry', async () => {
    const refetch = jest.fn(() => new Promise(() => undefined));

    mockUseQuery.mockReturnValue({
      loading: false,
      error: {
        graphQLErrors: [
          {
            message: 'Cycle data could not be loaded',
            path: ['cycleNodeData'],
          },
          {
            message: 'Visit number could not be serialized',
            path: ['visitNodeData', 0, 'visit_number'],
          },
        ],
        networkError: null,
      },
      data: {
        ...emptyClinicalData(),
        cycleNodeData: null,
        visitNodeData: [{ case_id: 'TEST-CASE', visit_number: null }, null],
      },
      refetch,
    });

    render(
      <ClinicalDataController
        studyCode="TEST-STUDY"
        dataCount={{
          caseCount: { visit: 1 },
          nodeCount: { visit: 1 },
        }}
      />
    );

    expect(await screen.findByRole('main')).toBeTruthy();
    expect(screen.getByText(CLINICAL_DATA_MESSAGES.partialLoad)).toBeTruthy();

    const visitDownload = within(
      screen.getByRole('region', { name: getClinicalRow('visit').title })
    ).getByRole('img', {
      name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
    });

    expect(
      visitDownload.parentElement.getAttribute('aria-disabled')
    ).toBeNull();

    const cycleDownload = within(
      screen.getByRole('region', { name: getClinicalRow('cycle').title })
    ).getByRole('img', {
      name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
    });

    expect(cycleDownload.parentElement.getAttribute('aria-disabled')).toBe(
      'true'
    );

    fireEvent.click(visitDownload);

    expect(downloadJson).toHaveBeenCalledWith(
      [{ case_id: 'TEST-CASE', visit_number: null }],
      '',
      expect.any(String),
      expect.any(Object)
    );

    fireEvent.click(screen.getByText(STUDY_DETAILS_ACTION_LABELS.refresh));

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('shows an unavailable state and lets the user retry when no clinical data loads', () => {
    const refetch = jest.fn(() => new Promise(() => undefined));

    server.use(
      http.get(endpoint, async () => {
        await delay('infinite');
        return HttpResponse.text('Nodes: {}');
      })
    );
    mockUseQuery.mockReturnValue({
      loading: false,
      error: {
        graphQLErrors: [
          {
            message: 'Clinical data could not be loaded',
            path: ['visitNodeData'],
          },
        ],
        networkError: null,
      },
      data: { visitNodeData: null },
      refetch,
    });

    render(
      <ClinicalDataController
        studyCode="TEST-STUDY"
        dataCount={{ caseCount: {}, nodeCount: {} }}
      />
    );

    expect(screen.queryByRole('main')).toBeNull();
    expect(
      screen.getAllByText(CLINICAL_DATA_MESSAGES.unavailable).length
    ).toBeGreaterThan(0);

    fireEvent.click(screen.getByText(STUDY_DETAILS_ACTION_LABELS.refresh));

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['a failed request', () => new HttpResponse(null, { status: 503 })],
    ['invalid YAML', () => HttpResponse.text('[invalid')],
    [
      'invalid node descriptions',
      () => HttpResponse.text('Nodes:\n  visit: null'),
    ],
  ])(
    'keeps clinical data visible and recovers descriptions after %s',
    async (_reason, response) => {
      const refetch = jest.fn();

      server.use(http.get(endpoint, response));
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: {
          visitNodeData: [{ case_id: 'TEST-CASE' }],
        },
        refetch,
      });

      render(
        <ClinicalDataController
          studyCode="TEST-STUDY"
          dataCount={{
            caseCount: { visit: 1 },
            nodeCount: { visit: 1 },
          }}
        />
      );

      expect(await screen.findByRole('main')).toBeTruthy();
      expect(
        screen.getByText(CLINICAL_DATA_MESSAGES.dictionaryUnavailable)
      ).toBeTruthy();

      server.use(
        http.get(endpoint, () =>
          HttpResponse.text(
            'Nodes:\n  visit:\n    Desc: Visits recorded during the study.'
          )
        )
      );
      fireEvent.click(screen.getByText(STUDY_DETAILS_ACTION_LABELS.refresh));
      expect(screen.getByRole('main')).toBeTruthy();

      await findDescription('Visits recorded during the study.');
      expect(screen.getByRole('main')).toBeTruthy();
      await wait(() =>
        expect(
          screen.queryByText(CLINICAL_DATA_MESSAGES.dictionaryUnavailable)
        ).toBeNull()
      );
    }
  );

  it('keeps descriptions available when the user switches studies', async () => {
    server.use(
      http.get(endpoint, () =>
        HttpResponse.text(
          'Nodes:\n  visit:\n    Desc: Visits recorded during the study.'
        )
      )
    );
    mockUseQuery.mockReturnValue({
      loading: false,
      data: emptyClinicalData(),
      refetch: jest.fn(),
    });
    const StudySelection = () => {
      const [study, setStudy] = React.useState('FIRST-STUDY');
      return (
        <>
          <button onClick={() => setStudy('SECOND-STUDY')}>
            Open second study
          </button>
          <h1>{study}</h1>
          <ClinicalDataController
            studyCode={study}
            dataCount={{ caseCount: {}, nodeCount: {} }}
          />
        </>
      );
    };
    render(<StudySelection />);
    await findDescription('Visits recorded during the study.');

    server.use(
      http.get(endpoint, () => new HttpResponse(null, { status: 503 }))
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open second study' }));
    expect(screen.getByText('SECOND-STUDY')).toBeTruthy();
    expect(screen.getByText('Visits recorded during the study.')).toBeTruthy();
    expect(
      screen.queryByText(CLINICAL_DATA_MESSAGES.dictionaryUnavailable)
    ).toBeNull();
  });

  it('retries both requests when clinical data and descriptions are incomplete', async () => {
    const refetch = jest.fn(() => new Promise(() => undefined));

    server.use(
      http.get(endpoint, () => new HttpResponse(null, { status: 503 }))
    );
    mockUseQuery.mockReturnValue({
      loading: false,
      error: {
        graphQLErrors: [
          {
            message: 'Cycle data could not be loaded',
            path: ['cycleNodeData'],
          },
        ],
        networkError: null,
      },
      data: {
        ...emptyClinicalData(),
        cycleNodeData: null,
        visitNodeData: [{ case_id: 'TEST-CASE' }],
      },
      refetch,
    });

    render(
      <ClinicalDataController
        studyCode="TEST-STUDY"
        dataCount={{
          caseCount: { visit: 1 },
          nodeCount: { visit: 1 },
        }}
      />
    );

    expect(
      await screen.findByText(CLINICAL_DATA_MESSAGES.combinedLoadFailure)
    ).toBeTruthy();

    fireEvent.click(screen.getByText(STUDY_DETAILS_ACTION_LABELS.refresh));

    expect(refetch).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('main')).toBeTruthy();
  });

  it('warns when reported records are unavailable for download', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { visitNodeData: [] },
      refetch: jest.fn(),
    });

    render(
      <ClinicalDataController
        studyCode="TEST-STUDY"
        dataCount={{
          caseCount: { visit: 1 },
          nodeCount: { visit: 1 },
        }}
      />
    );

    expect(await screen.findByRole('main')).toBeTruthy();
    expect(
      screen.getByText(CLINICAL_DATA_MESSAGES.downloadCountMismatch)
    ).toBeTruthy();

    const visitDownload = within(
      screen.getByRole('region', { name: getClinicalRow('visit').title })
    ).getByRole('img', {
      name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
    });

    expect(visitDownload.parentElement.getAttribute('aria-disabled')).toBe(
      'true'
    );
  });

  it('shows successful empty data without a warning or download icon', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: emptyClinicalData(),
      refetch: jest.fn(),
    });

    render(
      <ClinicalDataController
        studyCode="TEST-STUDY"
        dataCount={{ caseCount: {}, nodeCount: {} }}
      />
    );

    expect(await screen.findByRole('main')).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(
      screen.queryByRole('img', {
        name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
      })
    ).toBeNull();
  });

  it.each([
    {
      clinicalData: {
        priorSurgeryNodeData: null,
        priorSurgeryNodeDataOverview: {
          case_count: 1,
          prior_surgeries: [{ case_id: 'TEST-CASE' }],
        },
      },
    },
    {
      clinicalData: {
        priorSurgeryNodeData: [{ case_id: 'TEST-CASE' }],
        priorSurgeryNodeDataOverview: null,
      },
    },
  ])(
    'keeps Prior Surgery downloadable when one of its sources is unavailable',
    async ({ clinicalData }) => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: { ...emptyClinicalData(), ...clinicalData },
        refetch: jest.fn(),
      });

      render(
        <ClinicalDataController
          studyCode="TEST-STUDY"
          dataCount={{
            caseCount: { prior_surgery: 1 },
            nodeCount: { prior_surgery: 1 },
          }}
        />
      );

      await screen.findByRole('main');

      const priorSurgeryDownload = within(
        screen.getByRole('region', {
          name: getClinicalRow('prior_surgery').title,
        })
      ).getByRole('img', {
        name: CLINICAL_DATA_MESSAGES.downloadIconAlt,
      });

      expect(
        priorSurgeryDownload.parentElement.getAttribute('aria-disabled')
      ).toBeNull();

      fireEvent.click(priorSurgeryDownload);
      expect(downloadJson.mock.calls[0][0]).toEqual([{ case_id: 'TEST-CASE' }]);

      fireEvent.click(
        screen.getByText(CLINICAL_DATA_MESSAGES.downloadAllLabel)
      );

      const downloadedRows = downloadAndZipJson.mock.calls[0][0];
      expect(
        downloadedRows.find(
          row => row.clinicalDataNode === getClinicalRow('prior_surgery').title
        )
      ).toEqual(expect.objectContaining({ node: [{ case_id: 'TEST-CASE' }] }));
    }
  );
});

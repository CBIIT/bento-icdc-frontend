/* eslint-disable */
// @ts-check
import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import _, { defaultTo, noop } from 'lodash';
import { toast, Toaster } from 'sonner';

import StatsView from '../../components/Stats/StatsView';
import StudyThemeProvider from './studyDetailsThemeConfig';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import Tab from '../../components/Tab/Tab';
import TabPanel from '../../components/Tab/TabPanel';
import { SkeletonLoader } from '../../components/Skeleton';

import Overview from './views/overview/Overview';
import Publication from './views/Publication';
import ArmsAndCohort from './views/cohort/ArmsAndCohort';
import StudyFiles from './views/StudyFiles';
import SupportingData from './views/supporting-data/SupportingDataView';
import ClinicalData from './views/clinical-data/ClinicalDataController';
import { HumanRelevancePanel } from './views/human-relevance';

import { studyDisposition } from './utils';
import { navigatedToDashboard } from '../../utils/utils';
import useDashboardTabs from '../dashboard/components/dashboard-tabs-store';

import {
  headerIcon,
  embargoHeaderIcon,
  embargoFileIcon,
  tab,
  GET_HUMAN_RELEVANCE_DATA_BY_NODE,
} from '../../bento/studyDetailsData';

import pendingHeaderIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Main.svg';
import pendingFileIcon from '../../assets/icons/PendingRelease-icons.StudiesDetail-Box.svg';

import {
  AccessionLabel,
  AccessionValue,
  Breadcrumb,
  Container,
  DetailContainer,
  EmbargoWrapper,
  FileIcon,
  Header,
  HeaderAccessionItem,
  HeaderButton,
  HeaderButtonLink,
  HeaderButtonLinkNumber,
  HeaderButtonLinkSpan,
  HeaderButtonLinkText,
  HeaderMainTitle,
  HeaderPropertyName,
  HeaderTitle,
  Logo,
  NameWrapper,
  PendingWrapper,
} from './studyDetails.styled.';

import env from '../../utils/env';

import {
  GetStudiesByProgramStudyDetailsDocument,
  StudyQuery,
} from '../../generated-types/graphql';
import { ClinicalDataNodeCounts } from '../../generated-types/types';
import { BreadcrumbData } from '../caseDetails/caseDetailsView';

/* ---------------------------------- */
/* Tightened types & unions           */
/* ---------------------------------- */

const BLADDER_CANCER_STUDIES = [
  'UBC01',
  'UBC02',
  'UBC03',
  'UC01',
  'TCL01',
  'ORGANOIDS01',
] as const;
const BONE_CANCER_STUDIES = [
  'COTC021',
  'COTC022',
  'OSA01',
  'OSA02',
  'OSA03',
  'OSA04',
  'PRECINT01',
  'NCATS-COP01',
] as const;

type CancerType = 'bladder' | 'bone' | undefined;

export const TAB_LABELS = {
  OVERVIEW: 'OVERVIEW',
  ARMS_COHORTS: 'ARMS & COHORTS',
  STUDY_FILES: 'STUDY FILES',
  PUBLICATIONS: 'PUBLICATIONS',
  CLINICAL_DATA: 'CLINICAL DATA',
  SUPPORTING_DATA: 'SUPPORTING DATA',
  HUMAN_RELEVANCE: 'HUMAN RELEVANCE',
} as const;

type TabLabel = (typeof TAB_LABELS)[keyof typeof TAB_LABELS];

interface StudyDetailViewProps {
  data: StudyQuery;
  initTab: string;
}

type HumanRelevanceNode = {
  human_relevance_record_id: string;
  human_relevance_statement: string;
  relevant_human_cancer: string[];
  relevant_experimental_therapeutic_intervention: string[];
  relevant_human_genes: string[];
  relevant_human_pathways: string[];
  nci_link_to_relevant_human_cancer: string;
};

type HumanRelevanceQuery = {
  humanRelevanceNodeData: HumanRelevanceNode[];
};

/* ---------------------------------- */
/* Env typing helper                  */
/* ---------------------------------- */

type Env = {
  REACT_APP_INTEROP_SERVICE_URL: string;
  REACT_APP_BACKEND_API: string;
};

const getEnv = () => env as unknown as Env;

/* ---------------------------------- */
/* Centralized image URLs             */
/* ---------------------------------- */

const HUMAN_REL_IMAGES = {
  bone: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/human_rel_tab_bone.svg',
    alt: 'Side-by-side X-ray images showing the human pelvis and upper legs on the left, and the full skeleton of a dog on the right, illustrating bone structure similarities relevant to osteosarcoma research.',
    caption:
      'In humans, osteosarcoma is also the most common bone cancer, primarily affecting children and adolescents, with about 400-800 new cases diagnosed annually in the U.S. alone. Research shows that osteosarcoma in dogs and humans share 95% of their genetic mutations, making canine studies incredibly valuable for understanding the disease and testing new treatments.',
  },
  bladder: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_bladder.svg',
    alt: 'Diagram showing human anatomy and a dog with the bladder highlighted to illustrate sites affected by bladder cancer.',
    caption:
      'Bladder cancer in dogs closely resembles human muscle invasive bladder cancer, serving as a valuable preclinical model.',
  },
} as const;

/* ---------------------------------- */
/* Helpers        */
/* ---------------------------------- */

const getCancerType = (study_code: string): CancerType => {
  if (
    BLADDER_CANCER_STUDIES.includes(
      study_code as (typeof BLADDER_CANCER_STUDIES)[number]
    )
  )
    return 'bladder';
  if (
    BONE_CANCER_STUDIES.includes(
      study_code as (typeof BONE_CANCER_STUDIES)[number]
    )
  )
    return 'bone';
  return undefined;
};

const getHumanRelevanceTabImage = (
  cancer_type: Exclude<CancerType, undefined>
) => HUMAN_REL_IMAGES[cancer_type];

const getHumanRelevanceTabTitle = (
  cancer_type: Exclude<CancerType, undefined>
) => {
  switch (cancer_type) {
    case 'bone':
      return 'Relevance of this work to human Bone Cancer';
    case 'bladder':
      return 'Relevance of this work to human Bladder Cancer';
  }
};

function hasPositiveValue(arr: (ClinicalDataNodeCounts | null | undefined)[]) {
  return arr.some(
    obj => obj && Object.values(obj).some(value => value && value > 0)
  );
}

const processData = (
  names: (string | null)[] | null | undefined,
  nodeCountArg: ClinicalDataNodeCounts | undefined | null,
  nodeCaseCountArg: ClinicalDataNodeCounts | undefined | null
) =>
  names?.map(name => {
    const objMatcher = _.toLower(
      _.replace(name || '', ' ', '_')
    ) as keyof ClinicalDataNodeCounts;
    const nodeCount = nodeCountArg?.[objMatcher];
    const nodeCaseCount = nodeCaseCountArg?.[objMatcher];

    if (nodeCaseCount === 0 && nodeCount === 0) {
      return {
        name,
        // Preserve original "iEmpty" flag to avoid downstream behavior change.
        iEmpty: true,
      };
    }
    return {
      name,
      nodeCount,
      nodeCaseCount,
      isEmpty: false,
    };
  });

/* ---------------------------------- */
/* Shared style constants             */
/* ---------------------------------- */

const PANEL_MIN_WIDTH = '1404px' as const;
const PANEL_BOTTOM_OFFSET = '16px' as const;

/* ---------------------------------- */
/* Small render helpers               */
/* ---------------------------------- */

const HeaderIcon: React.FC<{ disposition?: string | null }> = ({
  disposition,
}) => {
  const d = studyDisposition(defaultTo(disposition, ''));
  if (d === 'embargo')
    return <img src={embargoHeaderIcon} alt="Embargo Header Icon" />;
  if (d === 'pending')
    return <img src={pendingHeaderIcon} alt="Pending Header Icon" />;
  return <img src={headerIcon} alt="Default Header Icon" />;
};

const renderDispositionLabel = (disposition?: string | null) => {
  const d = studyDisposition(defaultTo(disposition, ''));
  if (d === 'embargo') {
    return (
      <EmbargoWrapper>
        <p> UNDER EMBARGO </p>
        <FileIcon src={embargoFileIcon} alt="Embargo File Icon" />
      </EmbargoWrapper>
    );
  }
  if (d === 'pending') {
    return (
      <PendingWrapper>
        <p>RELEASE PENDING</p>
        <FileIcon src={pendingFileIcon} alt="Pending File Icon" />
      </PendingWrapper>
    );
  }
  return null;
};

/* ---------------------------------- */
/* Component                          */
/* ---------------------------------- */

const StudyDetailView: React.FC<StudyDetailViewProps> = ({ data, initTab }) => {
  const [, actions] = useDashboardTabs();

  const studyData = data.study[0];
  const {
    clinical_study_designation: studyCode,
    accession_id: accessionId,
    clinical_study_name,
    study_disposition,
    publications,
  } = studyData;

  const { REACT_APP_INTEROP_SERVICE_URL, REACT_APP_BACKEND_API } = getEnv();

  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(
        REACT_APP_INTEROP_SERVICE_URL,
        GetStudiesByProgramStudyDetailsDocument
      ),
    staleTime: 5 * 60 * 1000,
  });

  const study_codes = studyCode;

  useEffect(() => {
    if (isError) {
      toast.error('An error has occurred in interoperability api', {
        action: {
          label: 'X',
          onClick: () => undefined,
        },
      });
    }
  }, [isError]);

  const { data: humanRelevanceCardData, isLoading: isLoadingHumanRelData } =
    useQuery<HumanRelevanceQuery, unknown, HumanRelevanceNode | undefined>({
      queryKey: ['humanRelevance', study_codes],
      queryFn: async () =>
        request(REACT_APP_BACKEND_API, GET_HUMAN_RELEVANCE_DATA_BY_NODE, {
          study_codes,
        }),
      enabled: Boolean(study_codes),
      select: (res: HumanRelevanceQuery) => res.humanRelevanceNodeData?.[0],
      staleTime: 5 * 60 * 1000,
    });

  const diagnoses = useMemo(
    () => [
      ...new Set(
        defaultTo(studyData.cases, []).reduce<string[]>(
          (output, caseData) =>
            output.concat(
              caseData?.diagnoses
                ? caseData.diagnoses.map(d =>
                    d?.disease_term ? d.disease_term : ''
                  )
                : []
            ),
          []
        )
      ),
    ],
    [studyData.cases]
  );

  const studyFileTypes = useMemo(
    () => [...new Set(defaultTo(data.studyFiles, []).map(f => f?.file_type))],
    [data.studyFiles]
  );

  const caseFileTypes = useMemo(
    () => [
      ...new Set(
        defaultTo(data.filesOfStudy, [])
          .map(f => f.file_type)
          .filter(f => !studyFileTypes.includes(f))
      ),
    ],
    [data.filesOfStudy, studyFileTypes]
  );

  const {
    clinicalDataNodeNames,
    clinicalDataNodeCounts,
    clinicalDataNodeCaseCounts,
  } = data;

  const hasClinicalData = hasPositiveValue([
    clinicalDataNodeCounts,
    clinicalDataNodeCaseCounts,
  ]);

  const stat = useMemo(
    () => ({
      numberOfStudies: 1,
      numberOfCases: data.caseCountOfStudy,
      numberOfSamples: data.sampleCountOfStudy,
      numberOfFiles: data.fileCountOfStudy,
      numberOfStudyFiles: data.fileCountOfStudyFiles,
      numberOfPrograms: data.programCountOfStudy,
      numberOfAliquots: data.aliquotCountOfStudy ? data.aliquotCountOfStudy : 0,
      volumeOfData: data.volumeOfDataOfStudy,
    }),
    [
      data.caseCountOfStudy,
      data.sampleCountOfStudy,
      data.fileCountOfStudy,
      data.fileCountOfStudyFiles,
      data.programCountOfStudy,
      data.aliquotCountOfStudy,
      data.volumeOfDataOfStudy,
    ]
  );

  const breadCrumbJson: BreadcrumbData[] = useMemo(
    () => [
      { name: 'All Studies', to: '/studies', isALink: true },
      { name: studyCode, isALink: false },
    ],
    [studyCode]
  );

  const [currentTab, setCurrentTab] = useState(initTab === 'file' ? 2 : 0);

  const tabStyleClasses = useMemo(
    () => ({
      tabPrimaryColor: {
        color: '#507B91',
        fontWeight: 600,
        fontFamily: 'Nunito Sans',
        fontSize: '17px',
        lineHeight: '29.75px',
        letterSpacing: '0',
      },
      tabHighlightColor: {
        color: '#000000',
        fontWeight: 600,
        fontSize: '17px',
        lineHeight: '29.75px',
        letterSpacing: '0',
        borderBottom: '5px solid #0296C9',
      },
      hrLine: {
        marginBottom: '0',
        borderTop: '1px solid #81a6b9',
        position: 'relative',
        width: '100%',
        bottom: '15px',
      },
    }),
    []
  );

  const currentStudy = interOpData?.studiesByProgram?.find(
    item => item?.clinical_study_designation === studyCode
  );

  const processedTabs = useMemo(() => {
    let items = currentStudy
      ? tab.items
      : tab.items.filter(i => i.label !== TAB_LABELS.SUPPORTING_DATA);
    if (!hasClinicalData) {
      items = items.filter(i => i.label !== TAB_LABELS.CLINICAL_DATA);
    }
    if (!getCancerType(studyCode)) {
      items = items.filter(i => i.label !== TAB_LABELS.HUMAN_RELEVANCE);
    }
    return items;
  }, [currentStudy, hasClinicalData, studyCode]);

  const processedClinicalDataTabData = useMemo(
    () =>
      processData(
        clinicalDataNodeNames,
        clinicalDataNodeCounts,
        clinicalDataNodeCaseCounts
      ),
    [clinicalDataNodeNames, clinicalDataNodeCounts, clinicalDataNodeCaseCounts]
  );

  let clinicalDataNodeCount = 0;
  const clinicalDataDownloadFlags: Record<string, boolean> = {};
  defaultTo(processedClinicalDataTabData, []).forEach(el => {
    if (el?.isEmpty === false) {
      clinicalDataNodeCount += 1;
      clinicalDataDownloadFlags[el?.name || ''] = true;
    } else {
      clinicalDataDownloadFlags[el?.name || ''] = false;
    }
  });

  const supportingDataCount = useMemo(
    () => currentStudy?.CRDCLinks?.length,
    [currentStudy]
  );

  const supportingDataTabIndex = processedTabs.findIndex(
    t => t.label === TAB_LABELS.SUPPORTING_DATA
  );
  const clinicalDataTabIndex = processedTabs.findIndex(
    t => t.label === TAB_LABELS.CLINICAL_DATA
  );

  const cancer_type = getCancerType(studyCode);
  const humanRelevanceTabFigure = cancer_type
    ? getHumanRelevanceTabImage(cancer_type)
    : undefined;
  const humanRelevanceTabTitle = cancer_type
    ? getHumanRelevanceTabTitle(cancer_type)
    : undefined;

  const {
    human_relevance_record_id,
    human_relevance_statement,
    nci_link_to_relevant_human_cancer,
    relevant_human_pathways,
    relevant_human_genes,
    relevant_experimental_therapeutic_intervention,
  } = humanRelevanceCardData || {};

  // Error is now handled by the useEffect above

  if (isLoading || isLoadingHumanRelData) {
    return <SkeletonLoader variant="withRounded" />;
  }

  const filterStudy = `${studyCode} (${accessionId})`;

  return (
    <StudyThemeProvider>
      <Toaster richColors />
      <StatsView data={stat} />
      <Container>
        <Breadcrumb>
          <CustomBreadcrumb data={breadCrumbJson} />
        </Breadcrumb>

        <Header>
          <div className="header-content">
            <Logo>
              <HeaderIcon disposition={study_disposition} />
            </Logo>

            <div className="title-and-button">
              <HeaderTitle>
                <HeaderMainTitle>
                  <div className="title-wrapper">
                    <HeaderPropertyName>{`Study: `}</HeaderPropertyName>
                    <div className="clinical-study-designation">{` ${studyCode}`}</div>
                  </div>

                  {accessionId !== null &&
                    accessionId !== undefined &&
                    accessionId !== '' && (
                      <HeaderAccessionItem>
                        <AccessionLabel>{'Accession ID: '}</AccessionLabel>
                        <AccessionValue>{accessionId}</AccessionValue>
                      </HeaderAccessionItem>
                    )}
                </HeaderMainTitle>

                <NameWrapper isLong={String(clinical_study_name).length > 85}>
                  <span> {clinical_study_name}</span>
                </NameWrapper>
              </HeaderTitle>

              {renderDispositionLabel(study_disposition) || (
                <HeaderButton>
                  <HeaderButtonLinkSpan>
                    <HeaderButtonLink
                      to={location => ({ ...location, pathname: '/explore' })}
                      onClick={async () => {
                        await actions.changeCurrentTab(0);
                        navigatedToDashboard(filterStudy);
                      }}
                    >
                      <HeaderButtonLinkNumber>{`${data.caseCountOfStudy} `}</HeaderButtonLinkNumber>
                      <HeaderButtonLinkText>
                        Associated Cases
                      </HeaderButtonLinkText>
                    </HeaderButtonLink>
                  </HeaderButtonLinkSpan>
                </HeaderButton>
              )}
            </div>
          </div>
        </Header>

        <DetailContainer>
          <Grid container>
            <Grid item xs={12}>
              <Tab
                tabPadding="12px 0"
                styleClasses={tabStyleClasses}
                tabItems={processedTabs}
                currentTab={currentTab}
                handleTabChange={(_e, v) => setCurrentTab(v)}
              />
            </Grid>
          </Grid>
        </DetailContainer>
      </Container>

      {processedTabs.map((processedTab, index) => {
        switch (processedTab.label as TabLabel) {
          case TAB_LABELS.OVERVIEW:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{
                  minWidth: PANEL_MIN_WIDTH,
                  height: '100%',
                  position: 'relative',
                  bottom: PANEL_BOTTOM_OFFSET,
                }}
                innerDivStyle={{ flex: '1', display: 'flex' }}
                value={currentTab}
                index={index}
              >
                <Overview
                  studyData={studyData}
                  diagnoses={diagnoses}
                  caseFileTypes={caseFileTypes}
                  data={data}
                  nodeCount={clinicalDataNodeCount}
                  supportingDataCount={supportingDataCount}
                  setCurrentTab={setCurrentTab}
                  supportingDataTabIndex={supportingDataTabIndex}
                  clinicalDataTabIndex={clinicalDataTabIndex}
                  humanRelevanceCardData={humanRelevanceCardData}
                />
              </TabPanel>
            );

          case TAB_LABELS.ARMS_COHORTS:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{
                  minWidth: PANEL_MIN_WIDTH,
                  marginBottom: '50px',
                  position: 'relative',
                  bottom: PANEL_BOTTOM_OFFSET,
                }}
                innerDivStyle={{ flex: '1' }}
                value={currentTab}
                index={index}
              >
                <ArmsAndCohort studyData={studyData} />
              </TabPanel>
            );

          case TAB_LABELS.STUDY_FILES:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{ minWidth: PANEL_MIN_WIDTH, marginBottom: '50px' }}
                innerDivStyle={{ flex: '1' }}
                value={currentTab}
                index={index}
              >
                <StudyFiles data={data} studyData={studyData} />
              </TabPanel>
            );

          case TAB_LABELS.PUBLICATIONS:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{
                  minWidth: PANEL_MIN_WIDTH,
                  height: '100%',
                  position: 'relative',
                  bottom: PANEL_BOTTOM_OFFSET,
                }}
                innerDivStyle={{ flex: '1', display: 'flex' }}
                value={currentTab}
                index={index}
              >
                <Publication
                  publications={publications}
                  display={tab.publication}
                />
              </TabPanel>
            );

          case TAB_LABELS.CLINICAL_DATA:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{ minWidth: PANEL_MIN_WIDTH, marginBottom: '50px' }}
                innerDivStyle={{ flex: '1' }}
                value={currentTab}
                index={index}
              >
                {hasClinicalData && currentTab === index && (
                  <ClinicalData
                    dataCount={{
                      caseCount: clinicalDataNodeCaseCounts,
                      nodeCount: clinicalDataNodeCounts,
                    }}
                    studyCode={studyCode}
                  />
                )}
              </TabPanel>
            );

          case TAB_LABELS.SUPPORTING_DATA:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{ minWidth: PANEL_MIN_WIDTH, marginBottom: '50px' }}
                innerDivStyle={{ flex: 1 }}
                value={currentTab}
                index={index}
              >
                {currentStudy && (
                  <SupportingData data={currentStudy} isLoading={isLoading} />
                )}
              </TabPanel>
            );

          case TAB_LABELS.HUMAN_RELEVANCE:
            return (
              <TabPanel
                key={`tab-${processedTab.label}`}
                style={{ minWidth: PANEL_MIN_WIDTH, marginBottom: '50px' }}
                innerDivStyle={{ flex: 1 }}
                value={currentTab}
                index={index}
              >
                {cancer_type && (
                  <HumanRelevancePanel
                    idPrefix={human_relevance_record_id}
                    title={humanRelevanceTabTitle}
                    overview={human_relevance_statement}
                    nciLink={{
                      href: nci_link_to_relevant_human_cancer,
                      label: nci_link_to_relevant_human_cancer,
                    }}
                    figure={{
                      src: humanRelevanceTabFigure?.src,
                      alt: humanRelevanceTabFigure?.alt,
                      caption: humanRelevanceTabFigure?.caption,
                    }}
                    genes={relevant_human_genes}
                    pathways={relevant_human_pathways}
                    therapies={relevant_experimental_therapeutic_intervention}
                  />
                )}
              </TabPanel>
            );

          default:
            return null;
        }
      })}
    </StudyThemeProvider>
  );
};

export default StudyDetailView;

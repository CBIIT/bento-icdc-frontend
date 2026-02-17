import React, { useMemo, useState, CSSProperties } from 'react';
import { Grid } from '@mui/material';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import _, { defaultTo } from 'lodash';

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
import humanSkeletonImage from './views/human-relevance/assets/human-skeleton.jpg';

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

import { StudyQuery } from '../../generated-types/graphql';
import {
  ClinicalDataNodeCounts,
  HumanRelevanceNodeData,
  GetHumanRelevanceDataByNodeQuery,
} from '../../generated-types/types';
import { BreadcrumbData } from '../caseDetails/caseDetailsView';

type CancerType =
  | 'bladder'
  | 'bone'
  | 'brain'
  | 'breast'
  | 'soft_tissue_sarcoma'
  | 'thyroid'
  | 'lymphoma'
  | 'melanoma'
  | 'multiple';

/**
 * Maps study codes to their associated cancer types.
 * Studies that research multiple cancer types will be displayed with
 * the interactive multi-cancer visualization.
 *
 * Reference data:
 * - Bone: COTC021, COTC022, OSA01-OSA04, PRECINCT01, NCATS-COP01, TCL01
 * - Bladder: UBC01-UBC03, UC01, TCL01, ORGANOIDS01
 * - Brain: GLIOMA01
 * - Breast: MGT01, TCL01
 * - Soft Tissue Sarcoma: STS01, TCL01
 * - Thyroid: TCL01
 * - Lymphoma: COTC007B, NCATS-COP01, TCL01
 * - Melanoma/Lung: NCATS-COP01, PRECINCT01, TCL01
 */
const STUDY_TO_CANCER_TYPES: Record<string, CancerType[]> = {
  // Bone cancer studies
  COTC021: ['bone'],
  COTC022: ['bone'],
  OSA01: ['bone'],
  OSA02: ['bone'],
  OSA03: ['bone'],
  OSA04: ['bone'],

  // Bladder cancer studies
  UBC01: ['bladder'],
  UBC02: ['bladder'],
  UBC03: ['bladder'],
  UC01: ['bladder'],
  ORGANOIDS01: ['bladder'],

  // Brain cancer studies
  GLIOMA01: ['brain'],

  // Breast cancer studies
  MGT01: ['breast'],

  // Soft tissue sarcoma studies
  STS01: ['soft_tissue_sarcoma'],

  // Lymphoma studies
  COTC007B: ['lymphoma'],

  // Studies researching multiple cancer types
  PRECINCT01: ['bone', 'melanoma'],
  'NCATS-COP01': ['bone', 'lymphoma', 'melanoma'],
  TCL01: [
    'bone',
    'bladder',
    'breast',
    'soft_tissue_sarcoma',
    'thyroid',
    'lymphoma',
    'melanoma',
  ],
};

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
  brain: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_brain.svg',
    alt: 'Brain and glioma model in human and canine anatomy',
    caption:
      'In humans, gliomas account for the majority of malignant brain tumors and are notoriously difficult to treat due to their invasive growth. Naturally occurring gliomas in dogs exhibit nearly identical molecular and histological features, providing a valuable model for studying tumor progression and evaluating novel therapies targeting the brain.',
  },
  breast: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_breast.svg',
    alt: 'Breast cancer illustration in human and canine models',
    caption:
      'Breast cancer is the most common cancer in women worldwide, driven by hormonal and genetic factors. Canine mammary tumors share similar hormone receptor patterns, mutations, and tumor microenvironments, making dogs an important comparative model for understanding breast cancer biology and improving treatment strategies.',
  },
  soft_tissue_sarcoma: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_soft_tissue_sarcoma.svg',
    alt: 'Soft tissue sarcoma illustration showing human and canine muscle anatomy',
    caption:
      'Soft tissue sarcomas in humans encompass diverse connective tissue tumors with limited targeted therapy options. Canine STS show overlapping genetic mutations and PDGFB fusions that mirror human disease, supporting the use of canine models to identify molecular drivers and test precision-based cancer treatments.',
  },
  thyroid: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_thyroid.svg',
    alt: 'Thyroid cancer in human neck and canine anatomical model',
    caption:
      'Thyroid cancer is the most common endocrine malignancy in humans, often linked to dysregulation in MAPK and PI3K pathways. Spontaneous thyroid tumors in dogs display similar molecular changes, providing a comparative model to explore targeted approaches for thyroid cancer treatment.',
  },
  lymphoma: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_lymphoma.svg',
    alt: 'Lymphoma model highlighting lymphatic system in human and canine',
    caption:
      'Human non-Hodgkin lymphoma and canine lymphoma share remarkably similar cellular origins and gene expression profiles. Studies in dogs with spontaneous lymphoma enable real-time evaluation of immune-targeted therapies that can inform and accelerate advances in human lymphoma treatment.',
  },
  melanoma: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_melanoma.svg',
    alt: 'Melanoma and lung cancer depiction in human and canine anatomy',
    caption:
      'Both melanoma and lung cancer remain among the leading causes of cancer death in humans. Dogs naturally develop these tumors with comparable immune environments and mutational landscapes, offering crucial insights into tumor resistance mechanisms and the development of immunotherapies.',
  },
  multiple: {
    src: humanSkeletonImage,
    alt: 'Human body diagram showing various cancer sites including B Cell Lymphoma, Bladder Cancer, Fibrosarcoma, Hemangiosarcoma, Histiocytic Sarcoma, Lipoma, Lymphoma, Mammary Cancer, Mast Cell Tumor, Melanoma, Osteosarcoma, Soft Tissue Sarcoma, Splenic Hemosarcoma, T Cell Leukemia, and Thyroid Cancer',
    caption:
      'Mouse models play a key role in cancer research, allowing for a wide range of cancer types to be studied under controlled conditions. This study identifies genetic similarities across a panel of canine cancer cell lines that are similar to those found in human cancers. By understanding these genetic similarities, researchers can use canine models to test new targeted therapies and drug combinations, improving the success rate of human clinical trials and advancing cancer treatment.',
  },
} as const;

type HumanRelevanceImageKey = keyof typeof HUMAN_REL_IMAGES;

/**
 * Returns all cancer types associated with a given study code.
 * Useful for studies that research multiple cancer types.
 */
const getStudyCancerTypes = (study_code: string): CancerType[] => {
  return STUDY_TO_CANCER_TYPES[study_code] || [];
};

/**
 * Returns the cancer type for a given study code.
 * - Returns the specific cancer type if the study focuses on one type
 * - Returns 'multiple' if the study researches multiple cancer types
 * - Returns undefined if the study doesn't have human relevance data
 */
const getCancerType = (study_code: string): CancerType | undefined => {
  const cancerTypes = STUDY_TO_CANCER_TYPES[study_code];

  if (!cancerTypes || cancerTypes.length === 0) {
    return undefined;
  }

  // Studies researching multiple cancer types get the special 'multiple' view
  if (cancerTypes.length > 1) {
    return 'multiple';
  }

  return cancerTypes[0];
};

const getHumanRelevanceTabImage = (
  cancer_type: HumanRelevanceImageKey
): (typeof HUMAN_REL_IMAGES)[HumanRelevanceImageKey] =>
  HUMAN_REL_IMAGES[cancer_type];

const getHumanRelevanceTabTitle = (
  cancer_type: Exclude<CancerType, undefined>
) => {
  switch (cancer_type) {
    case 'bone':
      return 'Relevance of this work to human Bone Cancer';
    case 'bladder':
      return 'Relevance of this work to human Bladder Cancer';
    case 'brain':
      return 'Relevance of this work to human Glioma';
    case 'breast':
      return 'Relevance of this work to human Breast Cancer';
    case 'soft_tissue_sarcoma':
      return 'Relevance of this work to human Soft Tissue Sarcoma';
    case 'thyroid':
      return 'Relevance of this work to human Thyroid Cancer';
    case 'lymphoma':
      return 'Relevance of this work to human Lymphoma';
    case 'melanoma':
      return 'Relevance of this work to human Melanoma';
    case 'multiple':
      return 'Relevance of this work to Multiple Human Cancers';
    default:
      return 'Relevance of this work to human cancer';
  }
};

function hasPositiveValue(arr: (ClinicalDataNodeCounts | null | undefined)[]) {
  return arr.some(
    obj =>
      obj &&
      Object.values(obj).some(value => typeof value === 'number' && value > 0)
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
        isEmpty: true,
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

const PANEL_MIN_WIDTH = '1404px';
const PANEL_BOTTOM_OFFSET = '16px';

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
    publications: rawPublications,
  } = studyData;

  // Sort publications: primarily by year (descending), then by title (ascending)
  const publications = useMemo(() => {
    if (!rawPublications) return [];

    return [...rawPublications].sort((a, b) => {
      // First, sort by year in descending order (most recent first)
      const yearA = a?.year_of_publication ?? 0;
      const yearB = b?.year_of_publication ?? 0;

      if (yearA !== yearB) {
        return yearB - yearA; // Descending order (newer first)
      }

      // If years are the same, sort by title in ascending alphabetical order
      const titleA = a?.publication_title ?? '';
      const titleB = b?.publication_title ?? '';

      return titleA.localeCompare(titleB); // Ascending alphabetical order
    });
  }, [rawPublications]);

  const { REACT_APP_BACKEND_API } = getEnv();

  // External data is now part of the main data query
  const interOpData = data;

  const study_codes = [studyCode];

  // Convert relative URL to absolute URL for graphql-request
  const backendApiUrl = REACT_APP_BACKEND_API.startsWith('http')
    ? REACT_APP_BACKEND_API
    : `${window.location.origin}${REACT_APP_BACKEND_API}`;

  const {
    data: humanRelevanceCardData,
    isLoading: isLoadingHumanRelData,
    error,
    isError,
  } = useQuery<
    GetHumanRelevanceDataByNodeQuery,
    unknown,
    HumanRelevanceNodeData | undefined
  >({
    queryKey: ['humanRelevance', study_codes],
    queryFn: async () =>
      request(backendApiUrl, GET_HUMAN_RELEVANCE_DATA_BY_NODE, {
        study_codes,
      }),
    enabled: Boolean(study_codes),
    select: (res: GetHumanRelevanceDataByNodeQuery) =>
      res.humanRelevanceNodeData?.[0],
    staleTime: 5 * 60 * 1000,
  });

  const diagnoses = useMemo(() => {
    type CaseWithDx =
      | {
          diagnoses?: Array<{ disease_term?: string | null }> | null;
        }
      | null
      | undefined;

    const cases = (studyData.cases ?? []) as CaseWithDx[];

    return [
      ...new Set(
        cases
          .map(caseData => caseData?.diagnoses?.[0]?.disease_term ?? null)
          .filter((term): term is string => Boolean(term))
      ),
    ];
  }, [studyData.cases]);

  if (isError) console.error('humanRelevanceNodeData Error', { error });

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
    (): {
      tabPrimaryColor: CSSProperties;
      tabHighlightColor: CSSProperties;
      hrLine: CSSProperties;
    } => ({
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

  const currentStudy = interOpData?.externalDataOverview?.find(
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
    if (!el?.isEmpty) {
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
  const studyCancerTypes = getStudyCancerTypes(studyCode);

  const humanRelevanceTabFigure =
    cancer_type && cancer_type in HUMAN_REL_IMAGES
      ? getHumanRelevanceTabImage(cancer_type as HumanRelevanceImageKey)
      : undefined;
  const humanRelevanceTabTitle = cancer_type
    ? getHumanRelevanceTabTitle(cancer_type)
    : undefined;

  // For multiple cancer type studies, prepare the cancer type images
  const cancerTypeImages =
    cancer_type === 'multiple'
      ? studyCancerTypes.reduce(
          (acc, type) => {
            if (type in HUMAN_REL_IMAGES) {
              acc[type] = HUMAN_REL_IMAGES[type as HumanRelevanceImageKey];
            }
            return acc;
          },
          {} as Record<
            string,
            (typeof HUMAN_REL_IMAGES)[HumanRelevanceImageKey]
          >
        )
      : undefined;

  const {
    human_relevance_record_id,
    human_relevance_statement,
    nci_link_to_relevant_human_cancer,
    relevant_human_pathways,
    relevant_human_genes,
    relevant_experimental_therapeutic_intervention,
  } = humanRelevanceCardData || {};

  if (isLoadingHumanRelData) {
    return <SkeletonLoader variant="withRounded" />;
  }

  const filterStudy = `${studyCode} (${accessionId})`;

  return (
    <StudyThemeProvider>
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
                      onClick={() => {
                        void actions.changeCurrentTab(0);
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
                handleTabChange={(_e, v: number) => setCurrentTab(v)}
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
                {currentStudy && <SupportingData data={currentStudy} />}
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
                    isMultipleCancerTypes={cancer_type === 'multiple'}
                    cancerTypes={studyCancerTypes}
                    cancerTypeImages={cancerTypeImages}
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

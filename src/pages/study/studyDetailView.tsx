import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  CSSProperties,
} from 'react';
import { Grid } from '@mui/material';
import { ClientError, request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { defaultTo } from 'lodash';

import StatsView from '../../components/Stats/StatsView';
import StudyThemeProvider from './studyDetailsThemeConfig';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import Tab from '../../components/Tab/Tab';
import TabPanel from '../../components/Tab/TabPanel';
import PageContent from '../../components/Layout/PageContent';

import Overview from './views/overview/Overview';
import Publication from './views/Publication';
import ArmsAndCohort from './views/cohort/ArmsAndCohort';
import StudyFiles from './views/StudyFiles';
import SupportingData from './views/supporting-data/SupportingDataView';
import ClinicalData from './views/clinical-data/ClinicalDataController';
import { HumanRelevancePanel } from './views/human-relevance';

import { studyDisposition } from './utils';
import compact from './utils/compact';
import { logStudyDiagnostic } from './studyDiagnostics';
import StudySectionErrorBoundary from './StudySectionErrorBoundary';
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

export const TAB_LABELS = {
  OVERVIEW: 'OVERVIEW',
  ARMS_COHORTS: 'ARMS & COHORTS',
  STUDY_FILES: 'STUDY FILES',
  PUBLICATIONS: 'PUBLICATIONS',
  CLINICAL_DATA: 'CLINICAL DATA',
  SUPPORTING_DATA: 'SUPPORTING DATA',
  HUMAN_RELEVANCE: 'HUMAN RELEVANCE',
} as const;

type ClinicalCountKey = Exclude<keyof ClinicalDataNodeCounts, '__typename'>;

const CLINICAL_COUNT_KEYS: ClinicalCountKey[] = [
  'adverse_event',
  'agent',
  'agent_administration',
  'cycle',
  'disease_extent',
  'follow_up',
  'off_study',
  'off_treatment',
  'physical_exam',
  'prior_surgery',
  'prior_therapy',
  'visit',
  'vital_signs',
];

const hasUsableHumanRelevance = (
  value: HumanRelevanceNodeData | null | undefined
): value is HumanRelevanceNodeData =>
  Boolean(value?.human_relevance_record_id?.trim());

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
  lung: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_melanoma.svg',
    alt: 'Melanoma and lung cancer depiction in human and canine anatomy',
    caption:
      'Lung cancer is one of the leading causes of cancer-related deaths in humans. Dogs naturally develop pulmonary neoplasms with comparable immune environments and mutational landscapes, offering crucial insights into tumor biology and the development of targeted therapies and immunotherapies.',
  },
  multiple: {
    src: humanSkeletonImage,
    alt: 'Human body diagram showing various cancer sites including B Cell Lymphoma, Bladder Cancer, Fibrosarcoma, Hemangiosarcoma, Histiocytic Sarcoma, Lipoma, Lymphoma, Mammary Cancer, Mast Cell Tumor, Melanoma, Osteosarcoma, Soft Tissue Sarcoma, Splenic Hemosarcoma, T Cell Leukemia, and Thyroid Cancer',
    caption:
      'Mouse models play a key role in cancer research, allowing for a wide range of cancer types to be studied under controlled conditions. This study identifies genetic similarities across a panel of canine cancer cell lines that are similar to those found in human cancers. By understanding these genetic similarities, researchers can use canine models to test new targeted therapies and drug combinations, improving the success rate of human clinical trials and advancing cancer treatment.',
  },
} as const;

type HumanRelevanceImageKey = keyof typeof HUMAN_REL_IMAGES;

// Maps database cancer type values to image keys
const CANCER_TYPE_TO_IMAGE_KEY: Record<string, HumanRelevanceImageKey> = {
  // Bone cancer variations
  'Bone Cancer': 'bone',
  Osteosarcoma: 'bone',
  bone: 'bone',

  // Bladder cancer variations
  'Bladder Cancer': 'bladder',
  'Urothelial Carcinoma': 'bladder',
  bladder: 'bladder',

  // Brain cancer variations
  'Brain Cancer': 'brain',
  Glioma: 'brain',
  brain: 'brain',

  // Breast cancer variations
  'Breast Cancer': 'breast',
  'Mammary Cancer': 'breast',
  'Mammary Tumor': 'breast',
  breast: 'breast',

  // Soft tissue sarcoma variations
  'Soft Tissue Sarcoma': 'soft_tissue_sarcoma',
  Fibrosarcoma: 'soft_tissue_sarcoma',
  Hemangiosarcoma: 'soft_tissue_sarcoma',
  'Histiocytic Sarcoma': 'soft_tissue_sarcoma',
  Fibrolipoma: 'soft_tissue_sarcoma',
  Lipoma: 'soft_tissue_sarcoma',
  'Mast Cell Tumor': 'soft_tissue_sarcoma',
  'Splenic Hematoma': 'soft_tissue_sarcoma',
  'Splenic Hyperplasia': 'soft_tissue_sarcoma',
  soft_tissue_sarcoma: 'soft_tissue_sarcoma',

  // Thyroid cancer variations
  'Thyroid Cancer': 'thyroid',
  'Thryroid Cancer': 'thyroid', // Typo in database
  thyroid: 'thyroid',

  // Lymphoma variations
  Lymphoma: 'lymphoma',
  'B Cell Lymphoma': 'lymphoma',
  'B Cell Lymhoma': 'lymphoma', // Typo in database
  'T Cell Lymphoma': 'lymphoma',
  'T Cell Leukemia': 'lymphoma',
  lymphoma: 'lymphoma',

  // Melanoma variations
  Melanoma: 'melanoma',
  melanoma: 'melanoma',

  // Lung cancer variations
  'Lung Cancer': 'lung',
  'Pulmonary Neoplasms': 'lung',
  lung: 'lung',
};

// Parses relevant_human_cancer field: handles arrays, comma-separated strings, or multiple strings
const parseRelevantHumanCancer = (
  relevant_human_cancer?: Array<string | null | undefined> | null
): string[] => {
  if (!relevant_human_cancer || relevant_human_cancer.length === 0) {
    return [];
  }

  // Flatten and split by commas, then clean up
  return relevant_human_cancer
    .filter((item): item is string => Boolean(item))
    .flatMap(item => item.split(','))
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

const getImageKeyForCancerType = (
  cancerType: string
): HumanRelevanceImageKey | undefined => {
  return CANCER_TYPE_TO_IMAGE_KEY[cancerType];
};

// Generates title: single type or "Multiple Human Cancers"
const getDynamicHumanRelevanceTitle = (
  relevant_human_cancer?: Array<string | null | undefined> | null
): string | undefined => {
  const cancerTypes = parseRelevantHumanCancer(relevant_human_cancer);

  if (cancerTypes.length === 0) {
    return undefined;
  }

  if (cancerTypes.length === 1) {
    return `Relevance of this work to ${cancerTypes[0]}`;
  }

  return 'Relevance of this work to Multiple Human Cancers';
};

const hasMultipleCancerTypes = (
  relevant_human_cancer?: Array<string | null | undefined> | null
): boolean => {
  const cancerTypes = parseRelevantHumanCancer(relevant_human_cancer);
  return cancerTypes.length > 1;
};

const getHumanRelevanceTabImage = (
  cancer_type: HumanRelevanceImageKey
): (typeof HUMAN_REL_IMAGES)[HumanRelevanceImageKey] =>
  HUMAN_REL_IMAGES[cancer_type];

/* ---------------------------------- */
/* Shared style constants             */
/* ---------------------------------- */

const PANEL_MIN_WIDTH = 0;
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

type CRDCMetadata = Record<string, unknown> | null;

type CRDCLink = {
  url?: string;
  repository?: string;
  metadata?: CRDCMetadata;
};

type ExternalDataOverview = {
  clinical_study_designation?: string;
  CRDCLinks?: CRDCLink[];
};

type FormattedLink = {
  url: string;
  repository: string;
  metadata: CRDCMetadata;
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
    return compact(rawPublications).sort((a, b) => {
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

  const humanRelevanceStudyCode = studyCode?.trim() || undefined;
  const study_codes = humanRelevanceStudyCode ? [humanRelevanceStudyCode] : [];

  // Convert relative URL to absolute URL for graphql-request
  const backendApiUrl = REACT_APP_BACKEND_API.startsWith('http')
    ? REACT_APP_BACKEND_API
    : `${window.location.origin}${REACT_APP_BACKEND_API}`;

  const { data: humanRelevanceCardData, error: humanRelevanceError } = useQuery<
    GetHumanRelevanceDataByNodeQuery,
    unknown,
    HumanRelevanceNodeData | undefined
  >({
    queryKey: ['humanRelevance', study_codes],
    queryFn: async () =>
      request(backendApiUrl, GET_HUMAN_RELEVANCE_DATA_BY_NODE, {
        study_codes,
      }),
    enabled: Boolean(humanRelevanceStudyCode),
    select: (res: GetHumanRelevanceDataByNodeQuery) => {
      const result = res.humanRelevanceNodeData?.[0] ?? undefined;
      return hasUsableHumanRelevance(result) ? result : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!humanRelevanceError) return;

    if (humanRelevanceError instanceof ClientError) {
      const graphQLErrors = humanRelevanceError.response.errors?.map(
        graphQLError => ({
          message: graphQLError.message,
          ...(graphQLError.path ? { path: [...graphQLError.path] } : {}),
        })
      );

      logStudyDiagnostic({
        operation: 'getHumanRelevanceDataByNode',
        studyCode: humanRelevanceStudyCode,
        section: 'Human Relevance',
        ...(graphQLErrors?.length ? { graphQLErrors } : {}),
        httpStatus: humanRelevanceError.response.status,
      });
      return;
    }

    logStudyDiagnostic({
      operation: 'getHumanRelevanceDataByNode',
      studyCode: humanRelevanceStudyCode,
      section: 'Human Relevance',
      errorMessage:
        humanRelevanceError instanceof Error
          ? humanRelevanceError.message
          : 'Human Relevance request failed',
    });
  }, [humanRelevanceError, humanRelevanceStudyCode]);

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

  const studyFiles = useMemo(() => compact(data.studyFiles), [data.studyFiles]);

  const studyFileTypes = useMemo(
    () => [
      ...new Set(
        studyFiles
          .map(file => file.file_type)
          .filter((fileType): fileType is string => fileType != null)
      ),
    ],
    [studyFiles]
  );

  const caseFileTypes = useMemo(
    () => [
      ...new Set(
        compact(data.filesOfStudy)
          .map(file => file.file_type)
          .filter(
            (fileType): fileType is string =>
              fileType != null && !studyFileTypes.includes(fileType)
          )
      ),
    ],
    [data.filesOfStudy, studyFileTypes]
  );

  const { clinicalDataNodeCounts, clinicalDataNodeCaseCounts } = data;

  const clinicalCountObjects = [
    clinicalDataNodeCounts,
    clinicalDataNodeCaseCounts,
  ];

  const clinicalCountsConfirmedZero = clinicalCountObjects.every(
    counts =>
      counts != null &&
      CLINICAL_COUNT_KEYS.every(countKey => counts[countKey] === 0)
  );

  const hasClinicalData = !clinicalCountsConfirmedZero;

  const hasCompleteClinicalCounts = clinicalCountObjects.every(
    counts =>
      counts != null &&
      CLINICAL_COUNT_KEYS.every(countKey => counts[countKey] != null)
  );

  const clinicalDataNodeCount = hasCompleteClinicalCounts
    ? CLINICAL_COUNT_KEYS.filter(
        countKey =>
          (clinicalDataNodeCounts?.[countKey] ?? 0) > 0 ||
          (clinicalDataNodeCaseCounts?.[countKey] ?? 0) > 0
      ).length
    : null;

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

  const [selectedTab, setSelectedTab] = useState(
    initTab === 'file' ? 'study_files' : 'overview'
  );

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

  const externalDataOverview = (interOpData?.externalDataOverview ??
    []) as ExternalDataOverview[];

  const findStudy = externalDataOverview?.filter(
    item => item?.clinical_study_designation === studyCode
  );

  const formattedLinks: { CRDCLinks: FormattedLink[] } = {
    CRDCLinks:
      findStudy?.flatMap(item =>
        (item?.CRDCLinks || []).map(link => ({
          url: link?.url || 'API failed',
          repository: link?.repository || 'Unknown',
          metadata: link?.metadata ?? null,
        }))
      ) || [],
  };

  const currentStudy = {
    clinical_study_designation: studyCode,
    CRDCLinks: formattedLinks.CRDCLinks,
  };
  const hasSupportingData = findStudy.length > 0;

  const processedTabs = useMemo(() => {
    let items = hasSupportingData
      ? tab.items
      : tab.items.filter(i => i.label !== TAB_LABELS.SUPPORTING_DATA);
    if (!hasClinicalData) {
      items = items.filter(i => i.label !== TAB_LABELS.CLINICAL_DATA);
    }
    // Show Human Relevance tab only if we have data from the query
    if (!humanRelevanceCardData) {
      items = items.filter(i => i.label !== TAB_LABELS.HUMAN_RELEVANCE);
    }
    return items;
  }, [hasSupportingData, hasClinicalData, humanRelevanceCardData]);

  const selectedTabIndex = processedTabs.findIndex(
    processedTab => processedTab.value === selectedTab
  );
  const currentTab = selectedTabIndex >= 0 ? selectedTabIndex : 0;

  useEffect(() => {
    if (selectedTabIndex < 0) {
      setSelectedTab('overview');
    }
  }, [selectedTabIndex]);

  const selectClinicalDataTab = useCallback(
    () => setSelectedTab('clinical_data'),
    []
  );
  const selectSupportingDataTab = useCallback(
    () => setSelectedTab('supporting_data'),
    []
  );

  const supportingDataCount = currentStudy.CRDCLinks.length;

  const {
    human_relevance_record_id,
    human_relevance_statement,
    nci_link_to_relevant_human_cancer,
    relevant_human_pathways,
    relevant_human_genes,
    relevant_experimental_therapeutic_intervention,
    relevant_human_cancer,
  } = humanRelevanceCardData || {};

  const cancerTypesFromData = parseRelevantHumanCancer(relevant_human_cancer);
  const isMultipleCancers = hasMultipleCancerTypes(relevant_human_cancer);
  const humanRelevanceTabTitle = getDynamicHumanRelevanceTitle(
    relevant_human_cancer
  );

  let humanRelevanceTabFigure:
    | (typeof HUMAN_REL_IMAGES)[HumanRelevanceImageKey]
    | undefined;
  if (isMultipleCancers) {
    humanRelevanceTabFigure = getHumanRelevanceTabImage('multiple');
  } else if (cancerTypesFromData.length === 1) {
    const imageKey = getImageKeyForCancerType(cancerTypesFromData[0]);
    if (imageKey) {
      humanRelevanceTabFigure = getHumanRelevanceTabImage(imageKey);
    }
  }

  // Deduplicate image keys for multiple cancer types (e.g., B Cell Lymphoma & T Cell Lymphoma both map to 'lymphoma')
  const uniqueImageKeys = Array.from(
    new Set(
      cancerTypesFromData
        .map(getImageKeyForCancerType)
        .filter((key): key is HumanRelevanceImageKey => key !== undefined)
    )
  );

  const cancerTypeImages = isMultipleCancers
    ? uniqueImageKeys.reduce(
        (acc, imageKey) => {
          acc[imageKey] = HUMAN_REL_IMAGES[imageKey];
          return acc;
        },
        {} as Record<string, (typeof HUMAN_REL_IMAGES)[HumanRelevanceImageKey]>
      )
    : undefined;

  const filterStudy = `${studyCode} (${accessionId})`;

  return (
    <StudyThemeProvider>
      <StudySectionErrorBoundary
        key={`${studyCode}:Stats`}
        studyCode={studyCode ?? undefined}
        section="Stats"
      >
        <StatsView data={stat} />
      </StudySectionErrorBoundary>
      <Container>
        <PageContent noPadding>
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
                  handleTabChange={(_e, v: number) => {
                    const nextTab = processedTabs[v];
                    if (nextTab) setSelectedTab(nextTab.value);
                  }}
                />
              </Grid>
            </Grid>
          </DetailContainer>
        </PageContent>
      </Container>

      <PageContent noPadding>
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
                  <StudySectionErrorBoundary
                    key={`${studyCode}:Overview`}
                    studyCode={studyCode ?? undefined}
                    section="Overview"
                  >
                    <Overview
                      studyData={studyData}
                      diagnoses={diagnoses}
                      caseFileTypes={caseFileTypes}
                      data={data}
                      nodeCount={clinicalDataNodeCount}
                      supportingDataCount={supportingDataCount}
                      onSelectSupportingData={selectSupportingDataTab}
                      onSelectClinicalData={selectClinicalDataTab}
                      humanRelevanceCardData={humanRelevanceCardData}
                    />
                  </StudySectionErrorBoundary>
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
                  <StudySectionErrorBoundary
                    key={`${studyCode}:Arms & Cohorts`}
                    studyCode={studyCode ?? undefined}
                    section="Arms & Cohorts"
                  >
                    <ArmsAndCohort studyData={studyData} />
                  </StudySectionErrorBoundary>
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
                  <StudySectionErrorBoundary
                    key={`${studyCode}:Study Files`}
                    studyCode={studyCode ?? undefined}
                    section="Study Files"
                  >
                    <StudyFiles data={data} studyData={studyData} />
                  </StudySectionErrorBoundary>
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
                  <StudySectionErrorBoundary
                    key={`${studyCode}:Publications`}
                    studyCode={studyCode ?? undefined}
                    section="Publications"
                  >
                    <Publication
                      publications={publications}
                      display={tab.publication}
                    />
                  </StudySectionErrorBoundary>
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
                    <StudySectionErrorBoundary
                      key={`${studyCode}:Clinical Data`}
                      studyCode={studyCode ?? undefined}
                      section="Clinical Data"
                    >
                      <ClinicalData
                        dataCount={{
                          caseCount: clinicalDataNodeCaseCounts,
                          nodeCount: clinicalDataNodeCounts,
                        }}
                        studyCode={studyCode}
                      />
                    </StudySectionErrorBoundary>
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
                    <StudySectionErrorBoundary
                      key={`${studyCode}:Supporting Data`}
                      studyCode={studyCode ?? undefined}
                      section="Supporting Data"
                    >
                      <SupportingData data={currentStudy} />
                    </StudySectionErrorBoundary>
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
                  {humanRelevanceCardData && (
                    <StudySectionErrorBoundary
                      key={`${studyCode}:Human Relevance`}
                      studyCode={studyCode ?? undefined}
                      section="Human Relevance"
                    >
                      <HumanRelevancePanel
                        idPrefix={human_relevance_record_id ?? undefined}
                        title={humanRelevanceTabTitle}
                        overview={human_relevance_statement ?? undefined}
                        nciLink={{
                          href: nci_link_to_relevant_human_cancer ?? '',
                          label: nci_link_to_relevant_human_cancer ?? undefined,
                        }}
                        figure={{
                          src: humanRelevanceTabFigure?.src ?? '',
                          alt: humanRelevanceTabFigure?.alt,
                          caption: humanRelevanceTabFigure?.caption,
                        }}
                        genes={relevant_human_genes?.filter(
                          (g): g is string => g != null
                        )}
                        pathways={relevant_human_pathways?.filter(
                          (p): p is string => p != null
                        )}
                        therapies={relevant_experimental_therapeutic_intervention?.filter(
                          (t): t is string => t != null
                        )}
                        isMultipleCancerTypes={isMultipleCancers}
                        cancerTypes={cancerTypesFromData}
                        cancerTypeToImageKey={getImageKeyForCancerType}
                        cancerTypeImages={cancerTypeImages}
                      />
                    </StudySectionErrorBoundary>
                  )}
                </TabPanel>
              );

            default:
              return null;
          }
        })}
      </PageContent>
    </StudyThemeProvider>
  );
};

export default StudyDetailView;

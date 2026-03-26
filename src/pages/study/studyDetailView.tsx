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

  const externalDataOverview = (interOpData?.externalDataOverview ??
    []) as ExternalDataOverview[];
  const formatted = externalDataOverview?.filter(
    item => item?.clinical_study_designation === studyCode
  );

  const formattedLinks: { CRDCLinks: FormattedLink[] } = {
    CRDCLinks:
      formatted?.flatMap(item =>
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

  const processedTabs = useMemo(() => {
    let items = currentStudy
      ? tab.items
      : tab.items.filter(i => i.label !== TAB_LABELS.SUPPORTING_DATA);
    if (!hasClinicalData) {
      items = items.filter(i => i.label !== TAB_LABELS.CLINICAL_DATA);
    }
    // Show Human Relevance tab only if we have data from the query
    if (!humanRelevanceCardData?.human_relevance_record_id) {
      items = items.filter(i => i.label !== TAB_LABELS.HUMAN_RELEVANCE);
    }
    return items;
  }, [currentStudy, hasClinicalData, humanRelevanceCardData]);

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
                {humanRelevanceCardData && (
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

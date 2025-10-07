/* eslint-disable */
// @ts-check
import React, { useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import _, { defaultTo } from 'lodash';
import StatsView from '../../components/Stats/StatsView';
import { studyDisposition } from './utils';
import { navigatedToDashboard } from '../../utils/utils';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import {
  headerIcon,
  embargoHeaderIcon,
  embargoFileIcon,
  tab,
  GET_HUMAN_RELEVANCE_DATA_BY_NODE,
} from '../../bento/studyDetailsData';
import Tab from '../../components/Tab/Tab';
import Overview from './views/overview/Overview';
import Publication from './views/Publication';
import ArmsAndCohort from './views/cohort/ArmsAndCohort';
import StudyFiles from './views/StudyFiles';
import TabPanel from '../../components/Tab/TabPanel';
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
import StudyThemeProvider from './studyDetailsThemeConfig';
import SupportingData from './views/supporting-data/SupportingDataView';
import env from '../../utils/env';
import useDashboardTabs from '../dashboard/components/dashboard-tabs-store';
import ClinicalData from './views/clinical-data/ClinicalDataController';
import {
  GetStudiesByProgramStudyDetailsDocument,
  StudyQuery,
} from '../../generated-types/graphql';
import { ClinicalDataNodeCounts } from '../../generated-types/types';
import { SkeletonLoader } from '../../components/Skeleton';
import { BreadcrumbData } from '../caseDetails/caseDetailsView';
import { HumanRelevancePanel } from './views/human-relevance';

const BLADDER_CANCER_STUDIES = [
  'UBC01',
  'UBC02',
  'UBC03',
  'UC01',
  'TCL01',
  'ORGANOIDS01',
];

const BONE_CANCER_STUDIES = [
  'COTC021',
  'COTC022',
  'OSA01',
  'OSA02',
  'OSA03',
  'OSA04',
  'PRECINT01',
  'NCATS-COP01',
];

const getCancerType = (study_code: string) => {
  let type: 'bladder' | 'bone' | undefined = undefined;

  if (BLADDER_CANCER_STUDIES.includes(study_code)) {
    type = 'bladder';
  } else if (BONE_CANCER_STUDIES.includes(study_code)) {
    type = 'bone';
  }

  return type;
};

const getHumanRelevanceTabImage = (cancer_type: 'bladder' | 'bone') => {
  switch (cancer_type) {
    case 'bone':
      return {
        src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/human_rel_tab_bone.svg',
        alt: 'Side-by-side X-ray images showing the human pelvis and upper legs on the left, and the full skeleton of a dog on the right, illustrating bone structure similarities relevant to osteosarcoma research.',
        caption:
          'In humans, osteosarcoma is also the most common bone cancer, primarily affecting children and adolescents, with about 400-800 new cases diagnosed annually in the U.S. alone. Research shows that osteosarcoma in dogs and humans share 95% of their genetic mutations, making canine studies incredibly valuable for understanding the disease and testing new treatments.',
      };
    case 'bladder':
      return {
        src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/human_rel_tab_bladder.svg',
        alt: 'Diagram showing human anatomy and a dog with the bladder highlighted to illustrate sites affected by bladder cancer.',
        caption:
          'Bladder cancer in dogs closely resembles human muscle invasive bladder cancer, serving as a valuable preclinical model.',
      };
  }
};

const getHumanRelevanceTabTitle = (cancer_type: 'bladder' | 'bone') => {
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

interface StudyDetailViewProps {
  data: StudyQuery;
  initTab: string;
}

const StudyDetailView: React.FC<StudyDetailViewProps> = ({ data, initTab }) => {
  const [, actions] = useDashboardTabs();
  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      request(
        (env as Record<string, string>).REACT_APP_INTEROP_SERVICE_URL,
        GetStudiesByProgramStudyDetailsDocument
      ),
  });

  const study_codes = data.study[0].clinical_study_designation;
  const { data: humanRelevanceData } = useQuery<{
    humanRelevanceNodeData: {
      human_relevance_record_id: string;
      human_relevance_statement: string;
      relevant_human_cancer: string[];
      relevant_experimental_therapeutic_intervention: string[];
      relevant_human_genes: string[];
      relevant_human_pathways: string[];
      nci_link_to_relevant_human_cancer: string;
    }[];
  }>({
    queryKey: ['humanRelevance', study_codes],
    queryFn: async () =>
      request(
        (env as Record<string, string>).REACT_APP_BACKEND_API,
        GET_HUMAN_RELEVANCE_DATA_BY_NODE,
        { study_codes }
      ),
  });

  const humanRelevanceCardData = useMemo(
    () => humanRelevanceData?.humanRelevanceNodeData[0],
    [humanRelevanceData]
  );

  const studyData = data.study[0];
  const { clinical_study_designation: studyCode } = studyData;
  const diagnoses = [
    ...new Set(
      defaultTo(studyData.cases, []).reduce<string[]>(
        (output, caseData) =>
          output.concat(
            caseData?.diagnoses
              ? caseData.diagnoses.map(diagnosis =>
                  diagnosis?.disease_term ? diagnosis.disease_term : ''
                )
              : []
          ),
        []
      )
    ),
  ];
  const studyFileTypes = [
    ...new Set(defaultTo(data.studyFiles, []).map(f => f?.file_type)),
  ];
  const caseFileTypes = [
    ...new Set(
      defaultTo(data.filesOfStudy, [])
        .map(f => f.file_type)
        .filter(f => !studyFileTypes.includes(f))
    ),
  ];
  const {
    clinicalDataNodeNames,
    clinicalDataNodeCounts,
    clinicalDataNodeCaseCounts,
  } = data;
  const clinicalDataTabData = {
    names: clinicalDataNodeNames,
    nodeCount: clinicalDataNodeCounts,
    nodeCaseCount: clinicalDataNodeCaseCounts,
  };
  const hasClinicalData = hasPositiveValue([
    clinicalDataNodeCounts,
    clinicalDataNodeCaseCounts,
  ]);

  const stat = {
    numberOfStudies: 1,
    numberOfCases: data.caseCountOfStudy,
    numberOfSamples: data.sampleCountOfStudy,
    numberOfFiles: data.fileCountOfStudy,
    numberOfStudyFiles: data.fileCountOfStudyFiles,
    numberOfPrograms: data.programCountOfStudy,
    numberOfAliquots: data.aliquotCountOfStudy ? data.aliquotCountOfStudy : 0,
    volumeOfData: data.volumeOfDataOfStudy,
  };

  const breadCrumbJson: BreadcrumbData[] = [
    {
      name: 'All Studies',
      to: '/studies',
      isALink: true,
    },
    {
      name: studyData.clinical_study_designation,
      isALink: false,
    },
  ];

  const [currentTab, setCurrentTab] = React.useState(
    initTab === 'file' ? 2 : 0
  );
  const handleTabChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setCurrentTab(value);
  };

  const renderHeaderIcon = () => {
    const disposition = studyDisposition(
      defaultTo(studyData.study_disposition, '')
    );
    if (disposition === 'embargo')
      return <img src={embargoHeaderIcon} alt="Embargo Header Icon" />;
    if (disposition === 'pending')
      return <img src={pendingHeaderIcon} alt="Pending Header Icon" />;
    return <img src={headerIcon} alt="Default Header Icon" />;
  };

  const renderLabel = () => {
    const disposition = studyDisposition(
      defaultTo(studyData.study_disposition, '')
    );
    if (disposition === 'embargo') {
      return (
        <EmbargoWrapper>
          <p> UNDER EMBARGO </p>
          <FileIcon src={embargoFileIcon} alt="Embargo File Icon" />
        </EmbargoWrapper>
      );
    }
    if (disposition === 'pending') {
      return (
        <PendingWrapper>
          <p>RELEASE PENDING</p>
          <FileIcon src={pendingFileIcon} alt="Pending File Icon" />
        </PendingWrapper>
      );
    }
    return null;
  };

  if (isLoading) {
    return <SkeletonLoader variant="withRounded" />;
  }

  if (isError) {
    return (
      <Typography variant="h5" color="error">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  const { accession_id: accessionId } = data.study[0];
  const filterStudy = `${studyCode} (${accessionId})`;

  const currentStudy = interOpData?.studiesByProgram?.find(
    item =>
      item?.clinical_study_designation === studyData.clinical_study_designation
  );

  let processedTabs: typeof tab.items;
  if (!currentStudy) {
    processedTabs = tab.items.filter(item => item.label !== 'SUPPORTING DATA');
  } else {
    processedTabs = tab.items;
  }

  if (!hasClinicalData) {
    processedTabs = processedTabs.filter(
      item => item.label !== 'CLINICAL DATA'
    );
  }

  const processedClinicalDataTabData = processData(
    clinicalDataTabData.names,
    clinicalDataTabData.nodeCount,
    clinicalDataTabData.nodeCaseCount
  );

  let clinicalDataNodeCount = 0;
  const supportingDataCount = currentStudy?.CRDCLinks?.length;

  const clinicalDataDownloadFlags: Record<string, boolean> = {};

  defaultTo(processedClinicalDataTabData, []).forEach(el => {
    if (el?.isEmpty === false) {
      clinicalDataNodeCount += 1;
      clinicalDataDownloadFlags[el?.name || ''] = true;
    } else {
      clinicalDataDownloadFlags[el?.name || ''] = false;
    }
  });

  const supportingDataTabIndex = processedTabs.findIndex(
    tab => tab.label === 'SUPPORTING DATA'
  );
  const clinicalDataTabIndex = processedTabs.findIndex(
    tab => tab.label === 'CLINICAL DATA'
  );

  const cancer_type = getCancerType(study_codes);
  const humanRelevanceTabFigure = getHumanRelevanceTabImage(cancer_type);
  const humanRelevanceTabTitle = getHumanRelevanceTabTitle(cancer_type);
  const {
    human_relevance_record_id,
    human_relevance_statement,
    nci_link_to_relevant_human_cancer,
    relevant_human_pathways,
    relevant_human_genes,
    relevant_experimental_therapeutic_intervention,
  } = humanRelevanceCardData || {};

  return (
    <StudyThemeProvider>
      <StatsView data={stat} />
      <Container>
        <Breadcrumb>
          <CustomBreadcrumb data={breadCrumbJson} />
        </Breadcrumb>
        <Header>
          <div className="header-content">
            <Logo>{renderHeaderIcon()}</Logo>
            <div className="title-and-button">
              <HeaderTitle>
                <HeaderMainTitle>
                  <div className="title-wrapper">
                    {' '}
                    <HeaderPropertyName>{`Study: `}</HeaderPropertyName>
                    <div className="clinical-study-designation">
                      {' '}
                      {` ${studyData.clinical_study_designation}`}
                    </div>
                  </div>
                  {studyData.accession_id !== null &&
                    studyData.accession_id !== undefined &&
                    studyData.accession_id !== '' && (
                      <>
                        <HeaderAccessionItem>
                          <AccessionLabel>{'Accession ID: '}</AccessionLabel>
                          <AccessionValue>
                            {studyData.accession_id}
                          </AccessionValue>
                        </HeaderAccessionItem>
                      </>
                    )}
                </HeaderMainTitle>
                <NameWrapper
                  isLong={String(studyData.clinical_study_name).length > 85}
                >
                  <span> {studyData.clinical_study_name}</span>
                </NameWrapper>
              </HeaderTitle>
              {renderLabel() || (
                <HeaderButton>
                  <HeaderButtonLinkSpan>
                    <HeaderButtonLink
                      to={location => ({ ...location, pathname: '/explore' })}
                      onClick={async () => {
                        await actions.changeCurrentTab(0);
                        navigatedToDashboard(filterStudy);
                      }}
                    >
                      <HeaderButtonLinkNumber>
                        {`${data.caseCountOfStudy} `}
                      </HeaderButtonLinkNumber>
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
                styleClasses={{
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
                }}
                tabItems={processedTabs}
                currentTab={currentTab}
                handleTabChange={handleTabChange}
              />
            </Grid>
          </Grid>
        </DetailContainer>
      </Container>
      {processedTabs.map((processedTab, index) => {
        switch (processedTab.label) {
          case 'OVERVIEW':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  height: '100%',
                  position: 'relative',
                  bottom: '16px',
                }}
                innerDivStyle={{
                  flex: '1',
                  display: 'flex',
                }}
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

          case 'ARMS & COHORTS':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  marginBottom: '50px',
                  position: 'relative',
                  bottom: '16px',
                }}
                innerDivStyle={{
                  flex: '1',
                }}
                value={currentTab}
                index={index}
              >
                <ArmsAndCohort studyData={studyData} />
              </TabPanel>
            );
          case 'STUDY FILES':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  marginBottom: '50px',
                }}
                innerDivStyle={{
                  flex: '1',
                }}
                value={currentTab}
                index={index}
              >
                <StudyFiles data={data} studyData={studyData} />
              </TabPanel>
            );
          case 'PUBLICATIONS':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  height: '100%',
                  position: 'relative',
                  bottom: '16px',
                }}
                innerDivStyle={{
                  flex: '1',
                  display: 'flex',
                }}
                value={currentTab}
                index={index}
              >
                <Publication
                  publications={studyData.publications}
                  display={tab.publication}
                />
              </TabPanel>
            );
          case 'CLINICAL DATA':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  marginBottom: '50px',
                }}
                innerDivStyle={{
                  flex: '1',
                }}
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
          case 'SUPPORTING DATA':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  marginBottom: '50px',
                }}
                innerDivStyle={{
                  flex: 1,
                }}
                value={currentTab}
                index={index}
              >
                {currentStudy && (
                  <SupportingData data={currentStudy} isLoading={isLoading} />
                )}
              </TabPanel>
            );
          case 'HUMAN RELEVANCE':
            return (
              <TabPanel
                style={{
                  minWidth: '1404px',
                  marginBottom: '50px',
                }}
                innerDivStyle={{
                  flex: 1,
                }}
                value={currentTab}
                index={index}
              >
                {true && (
                  <HumanRelevancePanel
                    idPrefix={human_relevance_record_id}
                    title={humanRelevanceTabTitle}
                    overview={human_relevance_statement}
                    nciLink={{
                      href: nci_link_to_relevant_human_cancer,
                      label: nci_link_to_relevant_human_cancer,
                    }}
                    figure={{
                      src: humanRelevanceTabFigure.src,
                      alt: humanRelevanceTabFigure.alt,
                      caption: humanRelevanceTabFigure.caption,
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

import React from 'react';
import { customSorting, studyDisposition } from '../../utils';
import SampleProfile from '../SampleProfile';
import OverviewThemeProvider from './overviewThemeConfig';
import { Button, Grid } from '@mui/material';
import { Study, StudyQuery } from '../../../../generated-types/types';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Container,
  DetailContainer,
  BorderRightGrid,
  DetailContainerLeftGrid,
  ContainerHeaderGrid,
  DetailContainerHeaderText,
  StudyDescriptionGrid,
  ContentSpan,
  HrLine,
  DetailContainerItemsGrid,
  DetailContainerItemGrid,
  TitleGrid,
  ContentGrid,
  DetailContainerRightGrid,
  DetailContainerRightTopGrid,
  PaddingTopTwelveGrid,
  ContentDiv,
  HrLineRight,
  MarginTopTenGrid,
  TitleCDGrid,
  AdditionalDataLink,
  HumanRelevanceCard,
} from './overview.styled';

interface OverviewProps {
  studyData: Study;
  diagnoses: string[];
  caseFileTypes: string[];
  data: StudyQuery;
  nodeCount: number;
  supportingDataCount: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  supportingDataTabIndex: number;
  clinicalDataTabIndex: number;
  humanRelevanceCardData: {
    human_relevance_statement: string;
    nci_link_to_relevant_human_cancer: string;
  };
}

const Overview: React.FC<OverviewProps> = ({
  studyData,
  diagnoses,
  caseFileTypes,
  data,
  nodeCount,
  supportingDataCount,
  clinicalDataTabIndex,
  supportingDataTabIndex,
  setCurrentTab,
  humanRelevanceCardData,
}) => {
  return (
    <OverviewThemeProvider>
      <Container>
        <DetailContainer>
          <Grid container>
            <BorderRightGrid item lg={6} md={6} sm={6} xs={12}>
              <DetailContainerLeftGrid container spacing={1} direction="row">
                <HumanRelevanceCard>
                  <div className="text header">
                    Relevance of this work to human Cancer
                  </div>

                  <div className="text content">
                    {humanRelevanceCardData.human_relevance_statement ?? ''}
                  </div>

                  <Button
                    target="_blank"
                    href={
                      humanRelevanceCardData.nci_link_to_relevant_human_cancer ??
                      ''
                    }
                    sx={{
                      borderColor: '#FFFFFF',
                      color: '#FFFFFF',
                      maxWidth: '180px',
                    }}
                    variant="outlined"
                    endIcon={<LaunchIcon sx={{ color: '#ffffff' }} />}
                  >
                    Resource Link
                  </Button>
                </HumanRelevanceCard>
                <ContainerHeaderGrid item xs={12}>
                  <DetailContainerHeaderText>
                    Description
                  </DetailContainerHeaderText>
                </ContainerHeaderGrid>
                <StudyDescriptionGrid item xs={12}>
                  <div>
                    <ContentSpan>
                      {' '}
                      {studyData.clinical_study_description}{' '}
                    </ContentSpan>
                  </div>
                  <div>
                    <HrLine />
                  </div>
                </StudyDescriptionGrid>
                <DetailContainerItemsGrid container>
                  <DetailContainerItemGrid item xs={12}>
                    <Grid item container direction="row">
                      <TitleGrid item xs={12} sm={4}>
                        Study Type:
                      </TitleGrid>
                      <ContentGrid item xs={12} sm={6}>
                        {studyData.clinical_study_type}
                      </ContentGrid>
                    </Grid>
                  </DetailContainerItemGrid>
                  <DetailContainerItemGrid item xs={12}>
                    <Grid item container direction="row">
                      <TitleGrid item xs={12} sm={4}>
                        Principal Investigators:
                      </TitleGrid>
                      <ContentGrid item xs={12} sm={6}>
                        {studyData.principal_investigators
                          ? studyData.principal_investigators.map(
                              (principalInvestigator, index) => {
                                if (
                                  index + 1 ===
                                  studyData.principal_investigators.length
                                ) {
                                  return `${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name}`;
                                }
                                return `${principalInvestigator.pi_first_name} ${principalInvestigator.pi_middle_initial} ${principalInvestigator.pi_last_name},  `;
                              }
                            )
                          : ''}
                      </ContentGrid>
                    </Grid>
                  </DetailContainerItemGrid>
                  <DetailContainerItemGrid item xs={12}>
                    <Grid item container direction="row">
                      <TitleGrid item xs={12} sm={4}>
                        Date of IACUC Approval:
                      </TitleGrid>
                      <ContentGrid item xs={12} sm={6}>
                        {studyData.date_of_iacuc_approval}
                      </ContentGrid>
                    </Grid>
                  </DetailContainerItemGrid>
                  <DetailContainerItemGrid item xs={12}>
                    <Grid item container direction="row">
                      <TitleGrid item xs={12} sm={4}>
                        Conducted:
                      </TitleGrid>
                      <ContentGrid item xs={12} sm={6}>
                        {studyData.dates_of_conduct}
                      </ContentGrid>
                    </Grid>
                  </DetailContainerItemGrid>
                </DetailContainerItemsGrid>
              </DetailContainerLeftGrid>
            </BorderRightGrid>
            {!studyDisposition(studyData.study_disposition) && (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <DetailContainerRightGrid container spacing={1} direction="row">
                  <DetailContainerRightTopGrid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                  >
                    <Grid container spacing={1}>
                      <ContainerHeaderGrid item xs={12}>
                        <DetailContainerHeaderText>
                          DIAGNOSES
                        </DetailContainerHeaderText>
                      </ContainerHeaderGrid>
                    </Grid>
                    <PaddingTopTwelveGrid container>
                      {diagnoses
                        .sort((a, b) => customSorting(a, b, 'alphabetical'))
                        .map((diagnosis, index) => (
                          <Grid item xs={12} key={index}>
                            <ContentSpan> {diagnosis}</ContentSpan>
                          </Grid>
                        ))}
                    </PaddingTopTwelveGrid>
                  </DetailContainerRightTopGrid>
                  <DetailContainerRightTopGrid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                  >
                    <Grid container spacing={1}>
                      <ContainerHeaderGrid item xs={12}>
                        <DetailContainerHeaderText>
                          Case File Types
                        </DetailContainerHeaderText>
                      </ContainerHeaderGrid>
                    </Grid>
                    <PaddingTopTwelveGrid container>
                      {caseFileTypes.length > 0 ? (
                        caseFileTypes
                          .sort((a, b) => customSorting(a, b, 'alphabetical'))
                          .map((fileType, index) => (
                            <Grid item xs={12} key={index}>
                              <ContentSpan>{fileType}</ContentSpan>
                            </Grid>
                          ))
                      ) : (
                        <ContentDiv>
                          This study currently has no Files associated with its
                          cases
                        </ContentDiv>
                      )}
                    </PaddingTopTwelveGrid>
                  </DetailContainerRightTopGrid>
                  <div>
                    <HrLineRight />
                  </div>
                </DetailContainerRightGrid>
                <DetailContainerRightGrid container spacing={1} direction="row">
                  <SampleProfile data={data} />

                  {/* START: Image Collection */}
                  <MarginTopTenGrid item lg={6} md={6} sm={6} xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <DetailContainerHeaderText>
                          ADDITIONAL DATA
                        </DetailContainerHeaderText>
                      </Grid>
                    </Grid>
                    <DetailContainerItemsGrid container>
                      {supportingDataCount > 0 || nodeCount > 0 ? (
                        <DetailContainerItemGrid item xs={12}>
                          {nodeCount > 0 && (
                            <Grid item container direction="row">
                              <TitleCDGrid>Clinical Data in:</TitleCDGrid>
                              <ContentGrid item>
                                <AdditionalDataLink
                                  type="button"
                                  onClick={() =>
                                    setCurrentTab(clinicalDataTabIndex)
                                  }
                                >
                                  {nodeCount > 1 ? (
                                    <div>
                                      <span className="number">
                                        {nodeCount}
                                      </span>{' '}
                                      Nodes
                                    </div>
                                  ) : (
                                    <div>
                                      <span className="number">
                                        {nodeCount}
                                      </span>{' '}
                                      Node
                                    </div>
                                  )}
                                </AdditionalDataLink>
                              </ContentGrid>
                            </Grid>
                          )}
                          {supportingDataCount > 0 && (
                            <Grid item container direction="row">
                              <TitleCDGrid item>
                                Supporting Data in:
                              </TitleCDGrid>
                              <ContentGrid>
                                <AdditionalDataLink
                                  type="button"
                                  onClick={() =>
                                    setCurrentTab(supportingDataTabIndex)
                                  }
                                >
                                  {supportingDataCount > 1 ? (
                                    <div>
                                      <span className="number">
                                        {supportingDataCount}
                                      </span>{' '}
                                      Repositories
                                    </div>
                                  ) : (
                                    <div>
                                      <span className="number">
                                        {supportingDataCount}
                                      </span>{' '}
                                      Repository
                                    </div>
                                  )}
                                </AdditionalDataLink>
                              </ContentGrid>
                            </Grid>
                          )}
                        </DetailContainerItemGrid>
                      ) : (
                        <ContentGrid item xs={12} sm={10}>
                          <ContentDiv>
                            This study currently has no Additional Data
                            associated with it
                          </ContentDiv>
                        </ContentGrid>
                      )}
                    </DetailContainerItemsGrid>
                  </MarginTopTenGrid>
                  {/* END: Image Collection */}
                </DetailContainerRightGrid>
              </Grid>
            )}
          </Grid>
        </DetailContainer>
      </Container>
    </OverviewThemeProvider>
  );
};

export default Overview;

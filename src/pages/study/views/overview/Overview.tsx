/* eslint-disable */
import React from 'react';
import { customSorting, studyDisposition } from '../../utils';
import SampleProfile from '../SampleProfile';
import { Grid, Button } from '@mui/material';
import {
  Study,
  StudyQuery,
  HumanRelevanceNodeData,
} from '../../../../generated-types/types';
import LaunchIcon from '@mui/icons-material/Launch';
import pluralize from 'pluralize';
import styled from '@emotion/styled';
import {
  Content,
  DetailContainerHeaderText,
  HrLine,
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
  humanRelevanceCardData: HumanRelevanceNodeData | undefined;
}

const Container = styled.div({
  display: 'flex',
  flex: 1,
  height: '100%',
  padding: '0 82px',
  paddingBottom: '20px',
});

const LeftPanel = styled.div({
  maxWidth: '800px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #81A6B9',
  padding: '50px 50px 50px 0',
  gap: '32px',
});

const RightPanel = styled.div({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '300px 1fr',
  padding: '50px',
  gap: '42px 0',
});

const DescriptionWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const MetadataWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '& .item': {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '0 32px',
    alignItems: 'center',
    '& .key': {
      color: '#01769D',
      fontFamily: 'Open Sans',
      fontSize: '14px',
      lineHeight: '23px',
      letterSpacing: '0.2px',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    '& .value': {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '30px',
      letterSpacing: '0.2px',
      fontFamily: 'Open Sans',
      color: '#000000',
    },
  },
});

const MetadataWrapperV2 = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '& .number-span': {},
  '& .item': {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    gap: '0 8px',
    alignItems: 'center',
    '& .key': {
      color: '#000000',
      fontFamily: 'Open Sans',
      fontSize: '18px',
      lineHeight: '23px',
      letterSpacing: '0.2px',
    },
    '& .value': {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '30px',
      letterSpacing: '0.2px',
      fontFamily: 'Open Sans',
      color: '#000000',
      '& .number-span': {
        fontWeight: 600,
        color: '#B85300',
        textDecoration: 'underline',
        pointer: 'cursor',
      },
    },
  },
});

const DiagnosesWrapper = styled.div<{ willOverflow?: boolean }>(
  ({ willOverflow }) => ({
    '& .list': {
      overflowY: 'auto',
      maxHeight: '235px',
      maxWidth: '50%',
      height: '100%',
    },
    '& .custom-study-details-scrollbar': {
      direction: 'rtl',
      textAlign: 'left',
      paddingLeft: willOverflow ? '32px' : 0,
    },
  })
);

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
  const willOverflow = diagnoses.length >= 8;

  return (
    <Container>
      <LeftPanel>
        {humanRelevanceCardData && (
          <div
            style={{
              position: 'relative',
            }}
          >
            <img
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/refs/heads/main/icdc/images/svgs/study-details-human-rel-icon.svg"
              alt="Human relevance icon"
              style={{
                width: '54px',
                height: '54px',
                position: 'absolute',
                top: '20px',
                left: '-35px',
              }}
            />
            <HumanRelevanceCard>
              <div className="text header">
                Relevance of this work to human Cancer
              </div>

              <div className="text content">
                {humanRelevanceCardData?.human_relevance_statement ?? ''}
              </div>

              <Button
                target="_blank"
                href={
                  humanRelevanceCardData?.nci_link_to_relevant_human_cancer ??
                  ''
                }
                sx={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  maxWidth: '180px',
                  '&:hover': {
                    backgroundColor: '#1E1E1E', // Change background color on hover
                  },
                }}
                variant="outlined"
                endIcon={<LaunchIcon sx={{ color: '#ffffff' }} />}
              >
                Resource Link
              </Button>
            </HumanRelevanceCard>
          </div>
        )}

        {/* Description */}
        <DescriptionWrapper>
          <DetailContainerHeaderText>Description</DetailContainerHeaderText>
          <Content>{studyData.clinical_study_description}</Content>
        </DescriptionWrapper>

        <div
          style={{
            marginRight: 'auto',
            marginLeft: '0',
            marginTop: '32px',
          }}
        >
          <HrLine />
        </div>

        {/*Metada*/}
        <MetadataWrapper>
          {/* Item One */}
          <div className="item">
            <div className="key">Study Type:</div>
            <div className="value">{studyData.clinical_study_type}</div>
          </div>

          {/* Item Two */}
          <div className="item">
            <div className="key">Principal Investigators:</div>
            <div className="value">
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
            </div>
          </div>

          {/* Item Three */}
          <div className="item">
            <div className="key">Date of IACUC Approval:</div>
            <div className="value">{studyData.date_of_iacuc_approval}</div>
          </div>

          {/* Item Four */}
          <div className="item">
            <div className="key">Conducted:</div>
            <div className="value">{studyData.dates_of_conduct}</div>
          </div>
        </MetadataWrapper>
      </LeftPanel>
      <RightPanel>
        {!studyDisposition(studyData.study_disposition) && (
          <>
            <DiagnosesWrapper willOverflow={diagnoses.length >= 8}>
              <DetailContainerHeaderText
                isDiagnosis={true}
                willOverflow={willOverflow}
              >
                Diagnoses
              </DetailContainerHeaderText>
              <div className="list custom-study-details-scrollbar">
                {diagnoses
                  .sort((a, b) => customSorting(a, b, 'alphabetical'))
                  .map(diagnosis => (
                    <Content>{diagnosis}</Content>
                  ))}
              </div>
              <HrLine
                style={{
                  marginLeft: willOverflow ? '32px' : 0,
                  marginTop: '32px',
                }}
              />
            </DiagnosesWrapper>

            <div>
              <DetailContainerHeaderText>
                Case file types
              </DetailContainerHeaderText>
              <div>
                {caseFileTypes.length > 0 ? (
                  caseFileTypes
                    .sort((a, b) => customSorting(a, b, 'alphabetical'))
                    .map((fileType, index) => (
                      <Grid item xs={12} key={index}>
                        <Content>{fileType}</Content>
                      </Grid>
                    ))
                ) : (
                  <Content>
                    This study currently has no Files associated with its cases
                  </Content>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <DetailContainerHeaderText>
                Sample profile
              </DetailContainerHeaderText>
              <SampleProfile data={data} />
            </div>

            <div>
              <DetailContainerHeaderText>
                Additional data
              </DetailContainerHeaderText>
              <div>
                {supportingDataCount > 0 || nodeCount > 0 ? (
                  <MetadataWrapperV2>
                    {nodeCount > 0 && (
                      <div className="item">
                        <div className="key">Clinical Data in:</div>
                        <div className="value">
                          <span
                            className="number-span"
                            onClick={() => setCurrentTab(clinicalDataTabIndex)}
                          >
                            {nodeCount}
                          </span>{' '}
                          {pluralize('Node', nodeCount)}
                        </div>
                      </div>
                    )}
                    {supportingDataCount > 0 && (
                      <div className="item">
                        <div className="key">Supporting Data in:</div>
                        <div className="value">
                          <span
                            className="number-span"
                            onClick={() =>
                              setCurrentTab(supportingDataTabIndex)
                            }
                          >
                            {supportingDataCount}
                          </span>{' '}
                          {pluralize('Repository', supportingDataCount)}
                        </div>
                      </div>
                    )}
                  </MetadataWrapperV2>
                ) : (
                  <div>
                    <Content>
                      This study currently has no Additional Data associated
                      with it
                    </Content>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </RightPanel>
    </Container>
  );
};

export default Overview;

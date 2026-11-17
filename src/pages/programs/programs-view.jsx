import React from 'react';
import { ProgramCard } from './program-card';
import Stats from '../../components/Stats/AllStatsController';
import { pageDataV2 as pageData } from '../../bento/programData';
import {
  ProgramsContainer,
  ProgramsHeader,
  IconTitleWrapper,
  ClipboardIcon,
  ProgramsTitle,
  ProgramsContent,
} from './programs-view.styled';
import PageContent from '../../components/Layout/PageContent';

const Programs = ({ data }) => {
  return (
    <>
      <Stats />
      <ProgramsContainer>
        <PageContent noPadding>
          <ProgramsHeader>
            <IconTitleWrapper>
              <ClipboardIcon src={pageData.headerIcon} alt="Clipboard Icon" />
              <ProgramsTitle>Programs</ProgramsTitle>
            </IconTitleWrapper>
          </ProgramsHeader>
          <ProgramsContent>
            {data.program.map((programData, index) => {
              return (
                <ProgramCard
                  cardTitle={data.program_name}
                  key={index}
                  {...programData}
                  {...pageData.programs.find(
                    program =>
                      program.programName === programData.program_acronym
                  )}
                />
              );
            })}
          </ProgramsContent>
        </PageContent>
      </ProgramsContainer>
    </>
  );
};

export default Programs;

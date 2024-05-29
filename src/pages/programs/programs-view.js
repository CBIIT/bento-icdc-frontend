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
  ProgramsContent
} from './programs-view.styled';

const Programs = ({ classes, data }) => {
  return (
    <>
      <Stats />
      <ProgramsContainer>
        <ProgramsHeader>
          <IconTitleWrapper>
            <ClipboardIcon src={pageData.headerIcon} alt="Clipboard Icon" />
            <ProgramsTitle>Programs</ProgramsTitle>
          </IconTitleWrapper>
        </ProgramsHeader>
        <ProgramsContent>
          {data.program.map((programData, index) => {
            return (
              <ProgramCard cardTitle={data.program_name} key={index} {...programData} {...pageData.programs.find((program) => program.prgramName === programData.program_acronym)} />
            )
          })}
        </ProgramsContent>
      </ProgramsContainer>
    </>
  )
};


export default Programs;

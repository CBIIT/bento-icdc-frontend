import React from 'react';
import { getOptions } from '@bento-core/util';
import Stats from '../../components/Stats/StatsView';
import { table, pageData, tableLayOut } from '../../bento/programDetailData';
import { pageDataV2 as programImageConfig } from '../../bento/programData';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import { TableContextProvider } from '../../bento-core';
import StudiesTable from '../../components/DataAvailabilityTable/StudiesTable';
import {
  ProgramDetailContainer,
  ProgramDetailHeader,
  IconTitleWrapper,
  ClipboardIcon,
  ProgramDetailTitle,
  ProgramDetailContent,
  ProgramDetailSubTitle,
  ProgramDetailHeaderExternalLinkWrapper,
  ProgramDetailHeaderExternalLinkButton,
  TableContainer,
  TableContainerTitle,
} from './program-detail-view.styled';
import PhotoView from './components/photo-view';
import VideoView from './components/video-view';
import { ProgramQuery } from '../../generated-types/graphql';

interface ProgramDetailViewProps {
  data: ProgramQuery;
  classes?: any;
  interOpData: any;
}

const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({
  classes,
  data,
  interOpData,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const programDetail = data.program[0];

  const stat = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfStudies: data.studyCountOfProgram,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfCases: data.caseCountOfProgram,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfSamples: data.sampleCountOfProgram,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfFiles: data.fileCountOfProgram,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfStudyFiles: data.studyFileCountOfProgram,
    numberOfPrograms: 1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    numberOfAliquots: data.aliquotCountOfProgram
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        data.aliquotCountOfProgram
      : 0,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    volumeOfData: data.volumeOfDataOfProgram,
  };

  const breadCrumbJson = [
    {
      name: 'All Programs',
      to: '/programs',
      isALink: true,
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: programDetail.program_acronym,
    },
  ];

  const programConfig = programImageConfig.programs.find(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    element => element.prgramName === programDetail.program_acronym
  );
  const programImage = programConfig ? programConfig.secondaryImage : '';
  const programVideo = programConfig?.video ? programConfig.video : '';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const tableOptions = getOptions(table, classes);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  tableOptions.downloadOptions.filename =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    tableOptions.downloadOptions.filename.replace(
      'Program',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      `${programDetail.program_acronym}`
    );

  return (
    <>
      <Stats data={stat} />
      <ProgramDetailContainer>
        <CustomBreadcrumb data={breadCrumbJson} />
        <ProgramDetailHeader>
          <IconTitleWrapper>
            <ClipboardIcon src={pageData.headerIcon} alt="Clipboard Icon" />
            <ProgramDetailTitle>
              <div>Programs:</div>
              <ProgramDetailSubTitle>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {`${programDetail.program_name} (${programDetail.program_acronym})`}
              </ProgramDetailSubTitle>
            </ProgramDetailTitle>
          </IconTitleWrapper>

          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          {programDetail.program_external_url && (
            <ProgramDetailHeaderExternalLinkWrapper>
              <a
                style={{ textDecoration: 'none' }}
                href={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  programDetail.program_external_url
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <ProgramDetailHeaderExternalLinkButton
                  variant="contained"
                  endIcon={
                    <img
                      src={pageData.externalLinkIcon}
                      alt="external link icon"
                    />
                  }
                >
                  Go to Site
                </ProgramDetailHeaderExternalLinkButton>
              </a>
            </ProgramDetailHeaderExternalLinkWrapper>
          )}
        </ProgramDetailHeader>
        <ProgramDetailContent>
          {programVideo ? (
            <VideoView
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              programDetail={programDetail}
              programVideo={programVideo}
            />
          ) : (
            <PhotoView
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              programDetail={programDetail}
              programImage={programImage}
            />
          )}
        </ProgramDetailContent>
      </ProgramDetailContainer>
      <TableContainer>
        <TableContainerTitle>STUDIES IN THIS PROGRAM</TableContainerTitle>
        <div>
          <TableContextProvider>
            <StudiesTable
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              data={data.studiesByProgramId}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              interOpData={interOpData}
              table={table}
              tableLayOut={tableLayOut}
            />
          </TableContextProvider>
        </div>
      </TableContainer>
    </>
  );
};

export default ProgramDetailView;

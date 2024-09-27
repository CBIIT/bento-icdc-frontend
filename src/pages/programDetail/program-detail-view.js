import React from 'react';
import {
  Typography,
  CircularProgress,
} from '@mui/material';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import {
  getOptions,
} from '@bento-core/util';
import Stats from '../../components/Stats/StatsView';
import {
  table,
  pageData,
  tableLayOut,
} from '../../bento/programDetailData';
import {
  pageDataV2 as programImageConfig,
} from '../../bento/programData';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import env from '../../utils/env';
import {
  TableContextProvider,
} from '../../bento-core';
import StudiesTable from '../../components/DataAvailabilityTable/StudiesTable';
import { studiesByProgram } from './queries/program-detail';
import {
  ProgramDetailContainer,
  ProgramDetailHeader,
  IconTitleWrapper,
  ClipboardIcon,
  ProgramDetailTitle,
  ProgramDetailContent,
  ProgramDetailSubTitle,
  ProgramDetailHeaderExternalLinkWrapper,
  ProgramDetailSubTitleAcronym,
  ProgramDetailHeaderExternalLinkButton,
  TableContainer,
  TableContainerTitle
} from './program-detail-view.styled'
import PhotoView from './components/photo-view';
import VideoView from './components/video-view';


const ProgramDetailView = ({ classes, data }) => {
  const { data: interOpData, isLoading, isError } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () => request(
      env.REACT_APP_INTEROP_SERVICE_URL,
      studiesByProgram,
    ),
  });

  const programDetail = data.program[0];
  
  const stat = {
    numberOfStudies: data.studyCountOfProgram,
    numberOfCases: data.caseCountOfProgram,
    numberOfSamples: data.sampleCountOfProgram,
    numberOfFiles: data.fileCountOfProgram,
    numberOfStudyFiles: data.studyFileCountOfProgram,
    numberOfPrograms: 1,
    numberOfAliquots: data.aliquotCountOfProgram ? data.aliquotCountOfProgram : 0,
    volumeOfData: data.volumeOfDataOfProgram,
  };

  const breadCrumbJson = [{
    name: 'All Programs',
    to: '/programs',
    isALink: true,
  }, {
    name: programDetail.program_acronym,
    to: '/explore',
    isALink: true,
  }];

  const programConfig = programImageConfig.programs.find((element) => element.prgramName === programDetail.program_acronym);
  const programImage = programConfig ? programConfig.secondaryImage : '';
  const programVideo = programConfig?.video ? programConfig.video : '';
  const tableOptions = getOptions(table, classes);
  tableOptions.downloadOptions.filename = tableOptions.downloadOptions.filename.replace('Program', `${programDetail.program_acronym}`);

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (isError) {
    return (
      <Typography variant="h5" color="error" size="sm">
        An error has occurred in interoperability api
      </Typography>
    );
  }

  return (
    <>
      <Stats data={stat} />
      <ProgramDetailContainer>
        <CustomBreadcrumb data={breadCrumbJson} />
        <ProgramDetailHeader>
          <IconTitleWrapper>
            <ClipboardIcon src={pageData.headerIcon} alt="Clipboard Icon" />
            <ProgramDetailTitle><div>Programs:</div> <ProgramDetailSubTitle>{`${programDetail.program_name}`} <ProgramDetailSubTitleAcronym>{`(${programDetail.program_acronym})`}</ProgramDetailSubTitleAcronym></ProgramDetailSubTitle></ProgramDetailTitle>
          </IconTitleWrapper>

          { programDetail.program_external_url && <ProgramDetailHeaderExternalLinkWrapper>
            <ProgramDetailHeaderExternalLinkButton
              target="_blank"
              href={programDetail.program_external_url}
              variant='contained' endIcon={<img src={pageData.externalLinkIcon}
                alt='external link icon' />}
            >
              Go to Site
            </ProgramDetailHeaderExternalLinkButton>
          </ProgramDetailHeaderExternalLinkWrapper>}
        </ProgramDetailHeader>
        <ProgramDetailContent>
          {
            programVideo ? (<VideoView programDetail={programDetail} programVideo={programVideo} />) : (
              <PhotoView programDetail={programDetail} programImage={programImage} programVideo={programVideo} />
            )
          }
        </ProgramDetailContent>
      </ProgramDetailContainer>
      <TableContainer>
        <TableContainerTitle>STUDIES IN THIS PROGRAM</TableContainerTitle>
        <div>
          <TableContextProvider>
            <StudiesTable
              data={data.studiesByProgramId}
              interOpData={interOpData}
              table={table}
              tableLayOut={tableLayOut}
            />
          </TableContextProvider>
        </div>
      </TableContainer>
    </>);
};

export default ProgramDetailView;
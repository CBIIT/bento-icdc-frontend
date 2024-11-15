import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { getOptions } from '@bento-core/util';
import Stats from '../../components/Stats/StatsView';
import { table, pageData, tableLayOut } from '../../bento/programDetailData';
import { pageDataV2 as programImageConfig } from '../../bento/programData';
import CustomBreadcrumb from '../../components/Breadcrumb/BreadcrumbView';
import env from '../../utils/env';
import { TableContextProvider } from '../../bento-core';
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
}

const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({
  classes,
  data,
}) => {
  const {
    data: interOpData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['studiesByProgram'],
    queryFn: async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      request(env.REACT_APP_INTEROP_SERVICE_URL, studiesByProgram),
  });

  const programDetail = data.program[0];

  const stat = {
    numberOfStudies: data.studyCountOfProgram,
    numberOfCases: data.caseCountOfProgram,
    numberOfSamples: data.sampleCountOfProgram,
    numberOfFiles: data.fileCountOfProgram,
    numberOfStudyFiles: data.studyFileCountOfProgram,
    numberOfPrograms: 1,
    numberOfAliquots: data.aliquotCountOfProgram
      ? data.aliquotCountOfProgram
      : 0,
    volumeOfData: data.volumeOfDataOfProgram,
  };

  const breadCrumbJson = [
    {
      name: 'All Programs',
      to: '/programs',
      isALink: true,
    },
    {
      name: programDetail.program_acronym,
    },
  ];

  const programConfig = programImageConfig.programs.find(
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
      `${programDetail.program_acronym}`
    );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography component="h5" color="error">
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
            <ProgramDetailTitle>
              <div>Programs:</div>
              <ProgramDetailSubTitle>
                {`${programDetail.program_name} (${programDetail.program_acronym})`}
              </ProgramDetailSubTitle>
            </ProgramDetailTitle>
          </IconTitleWrapper>

          {programDetail.program_external_url && (
            <ProgramDetailHeaderExternalLinkWrapper>
              <ProgramDetailHeaderExternalLinkButton
                href={programDetail.program_external_url}
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
            </ProgramDetailHeaderExternalLinkWrapper>
          )}
        </ProgramDetailHeader>
        <ProgramDetailContent>
          {programVideo ? (
            <VideoView
              programDetail={programDetail}
              programVideo={programVideo}
            />
          ) : (
            <PhotoView
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
              rowsPerPage={8}
              data={data.studiesByProgramId}
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

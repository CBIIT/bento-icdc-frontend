/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { BarChartV2 } from '../../../components/BarChartV2';
import useDashboardTabs from '../../dashboard/components/dashboard-tabs-store';
import { navigatedToDashboard } from '../../../utils/utils';
import { palette } from '../../../bento/studyDetailsData';
import { useSampleProfileModal } from './sample-profile-modal-store';
import { Box, IconButton } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { StudyQuery } from '../../../generated-types/types';
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledLink,
  StyledTab,
  StyledTabPanel,
} from './sample-profile-modal.styled';

const tabLabels = ['Site', 'Type', 'Pathology'];

interface SampleProfileModalProps {
  sampleProfile: {
    tabs: {
      index: number;
      label: React.JSX.Element;
      value: string;
    }[];
  };
  data: StudyQuery;
  studyCode: string;
  accessionId: string;
}

const SampleProfileModal: React.FC<SampleProfileModalProps> = ({
  sampleProfile,
  data,
  studyCode,
  accessionId,
}) => {
  const [{ isModalOpen, currentTab }, { setIsModalOpen, setCurrentTab }] =
    useSampleProfileModal();

  const [, actions] = useDashboardTabs();
  const filterStudy = `${studyCode} (${accessionId})`;

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    await setCurrentTab(newValue);
  };

  const showModal = async () => {
    await setIsModalOpen(true);
  };

  const handleClose = async () => {
    await setIsModalOpen(false);
  };

  const linkToDashboard = async () => {
    navigatedToDashboard(filterStudy);
    await setIsModalOpen(false);
    await actions.changeCurrentTab(1);
  };

  return (
    <>
      <Box
        sx={{
          color: '#DC762F',
          textDecoration: 'underline',
          cursor: 'pointer',
          marginLeft: '45px',
          fontFamily: 'Open Sans',
          fontWeight: '600',
          fontSize: '16px',
        }}
        component={'div'}
        onClick={showModal}
      >
        Open Expanded View
      </Box>
      <StyledDialog onClose={handleClose} open={isModalOpen}>
        <StyledDialogTitle>
          <div>{`Sample Profiles for the ${studyCode} study`}</div>
          <IconButton aria-label="close modal" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <TabContext value={currentTab}>
            <Box sx={{ height: '100%' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  position: 'sticky',
                  top: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: '16px',
                  gap: '32px',
                }}
              >
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  {tabLabels.map((tabLabel, index) => (
                    <StyledTab
                      key={`tab-label-${index + 1}`}
                      label={tabLabel}
                      value={String(index + 1)}
                    />
                  ))}
                </TabList>
                <Box
                  component={'div'}
                  sx={{
                    fontFamily: 'custom.fontFamilySans',
                    border: '3px solid #81a6b9',
                    // float: 'right',
                    width: '220px',
                    height: '35px',
                    textAlign: 'center',
                    background: '#f6f4f4',
                    padding: '4px 10px 4px 5px',
                    position: 'relative',
                    bottom: '16px',
                  }}
                >
                  <Box
                    component={'span'}
                    sx={{
                      fontFamily: 'custom.fontFamilySans',
                      width: '200px',
                      fontSize: '13px',
                      display: 'inherit',
                      height: '15px',
                      marginTop: '-2px',
                    }}
                  >
                    <StyledLink
                      to={() => ({
                        pathname: '/explore',
                      })}
                      onClick={() => linkToDashboard()}
                    >
                      <Box
                        component={'div'}
                        sx={{
                          fontFamily: 'Roboto',
                          fontSize: '13px',
                          paddingBottom: '3px',
                          margin: '0',
                          display: 'inherit',
                          fontWeight: '900',
                          marginRight: '4px',
                        }}
                      >
                        {data.sampleCountOfStudy}
                      </Box>
                      <Box
                        component={'span'}
                        sx={{
                          fontFamily: 'Roboto',
                          color: '#0B3556',
                          fontSize: '13px',
                          fontStyle: 'normal',
                          fontWeight: '900',
                          lineHeight: '14px',
                          letterSpacing: '0.15px',
                        }}
                      >
                        Associated Samples
                      </Box>
                    </StyledLink>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  m: 'auto',
                  height: '100%',
                  width: '100%',
                  overflowY: 'auto',
                }}
              >
                {sampleProfile?.tabs?.map((item, index) => {
                  return (
                    <StyledTabPanel
                      key={`tab-${index}`}
                      value={String(index + 1)}
                    >
                      <BarChartV2
                        chartData={data[item.value as keyof StudyQuery]}
                        palette={palette}
                        yAxisLabel={item.yAxisLabel}
                        xAxisLabel={item.xAxisLabel}
                        height={300}
                        width={600}
                        showLegend
                      />
                    </StyledTabPanel>
                  );
                })}
              </Box>
            </Box>
          </TabContext>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
};

export default SampleProfileModal;

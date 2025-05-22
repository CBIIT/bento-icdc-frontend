/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react';
import {
  sampleProfile,
  palette,
  sampleProfileChartData,
} from '../../../bento/studyDetailsData';
import { navigatedToDashboard } from '../../../utils/utils';
import useDashboardTabs from '../../dashboard/components/dashboard-tabs-store';
import SampleProfileModal from './sample-profile-madal';
import { useSampleProfileModal } from './sample-profile-modal-store';
import { StudyQuery } from '../../../generated-types/types';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import styled from '@emotion/styled';
import { BarChartV2 } from '../../../components/BarChartV2';
import { upperCase, toString } from 'lodash';
import {
  HeaderButton,
  HeaderButtonLink,
  HeaderButtonLinkText,
  HeaderButtonLinkSpan,
  HeaderButtonLinkNumber,
} from './sample-profile.styled';

export const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    height: '5px ',
    background: '#0296C9',
  },
});

export const StyledTab = styled(Tab)({
  '& .MuiTab-root': {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    color: '#000',
  },
});

interface SampleProfileProps {
  data: StudyQuery;
}

const SampleProfile: React.FC<SampleProfileProps> = ({ data }) => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [_, { setIsModalOpen }] = useSampleProfileModal();
  const [, actions] = useDashboardTabs();
  const { accession_id: accessionId, clinical_study_designation: studyCode } =
    data.study[0];
  const filterStudy = `${studyCode} (${accessionId})`;
  const [currentTab, setCurrentTab] = useState(0);
  const { tabs } = sampleProfileChartData;

  const handleTabChange = (activeKey: string) => {
    setCurrentTab(parseInt(activeKey, 10));
  };

  const tabCount = tabs.filter(
    tab =>
      data?.[sampleProfileChartData?.[tab]?.value as keyof StudyQuery]?.length >
      0
  );

  // const tabCount = sampleProfile.tabs.filter(
  //   tab =>
  //     data[tab.value as keyof StudyQuery] &&
  //     (data[tab.value as keyof StudyQuery] as []).length > 0
  // );

  const linkToDashboard = async () => {
    navigatedToDashboard(filterStudy);
    await actions.changeCurrentTab(1);
  };

  console.log('checking -->', sampleProfileChartData);
  return (
    <>
      {tabCount?.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ maxWidth: '395px' }}>
            <HeaderButton>
              <HeaderButtonLinkSpan>
                <HeaderButtonLink
                  to={() => ({ pathname: '/explore' })}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => await linkToDashboard()}
                >
                  <HeaderButtonLinkNumber>
                    {data.sampleCountOfStudy}
                  </HeaderButtonLinkNumber>
                  <HeaderButtonLinkText>
                    Associated Samples
                  </HeaderButtonLinkText>
                </HeaderButtonLink>
              </HeaderButtonLinkSpan>
            </HeaderButton>
          </div>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                margin: '0px 16px',
                maxWidth: '395px',
              }}
            >
              <StyledTabs
                onChange={handleChange}
                aria-label="lab API tabs example"
                value={value}
              >
                {tabs.map(item => (
                  <StyledTab label={upperCase(item)} key={toString(item)} />
                ))}
              </StyledTabs>
            </Box>
            <BarChartV2
              chartData={
                data[
                  sampleProfileChartData[tabs[value]].value as keyof StudyQuery
                ]
              }
              palette={palette}
              yAxisLabel={sampleProfileChartData[tabs[value]].yAxisLabel}
              xAxisLabel={sampleProfileChartData[tabs[value]].xAxisLabel}
              width={395}
              height={395}
            />
            <SampleProfileModal
              sampleProfile={sampleProfile}
              data={data}
              studyCode={studyCode}
              accessionId={accessionId}
            />
          </TabContext>
        </div>
      ) : (
        <div
          style={{
            fontSize: '18px',
            color: '#000000',
            fontWeight: 400,
            fontFamily: 'Open Sans',
            lineHeight: '30px',
            letterSpacing: '0.2px',
          }}
        >
          This study currently has no associated Samples
        </div>
      )}
    </>
  );
};

export default SampleProfile;

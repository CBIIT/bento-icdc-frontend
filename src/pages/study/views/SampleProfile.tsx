import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Tabs } from 'antd';
import BarChart from '../../../components/BarCharts';
import {
  sampleProfile,
  palette,
  valueConfiguration,
  argumentConfiguration,
} from '../../../bento/studyDetailsData';
import TabPanel from '../../../components/Tab/TabPanel';
import { navigatedToDashboard } from '../../../utils/utils';
import useDashboardTabs from '../../dashboard/components/dashboard-tabs-store';
import SampleProfileModal from './sample-profile-madal';
import { useSampleProfileModal } from './sample-profile-modal-store';
import { StudyQuery } from '../../../generated-types/types';
import {
  BarChartWrapper,
  Content,
  DetailContainerHeader,
  DetailContainerItems,
  HeaderButton,
  HeaderButtonLink,
  HeaderButtonLinkNumber,
  HeaderButtonLinkSpan,
  HeaderButtonLinkText,
  MarginTopTenGrid,
  StyledTabs,
} from './sample-profile.styled';

const { TabPane } = Tabs;

const tooltipContent = ({
  argument,
  originalValue,
}: {
  argument: string;
  originalValue: string;
}) => (
  <>
    <div>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '13px',
          color: '#444444',
        }}
      >
        {argument}
        {', '}
      </span>
      <span
        style={{
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '13px',
          color: '#444444',
        }}
      >
        {originalValue}
      </span>
    </div>
  </>
);

interface SampleProfileProps {
  data: StudyQuery;
}

const SampleProfile: React.FC<SampleProfileProps> = ({ data }) => {
  const [_, { setIsModalOpen }] = useSampleProfileModal();
  const [, actions] = useDashboardTabs();
  const { accession_id: accessionId, clinical_study_designation: studyCode } =
    data.study[0];
  const filterStudy = `${studyCode} (${accessionId})`;
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (activeKey: string) => {
    setCurrentTab(parseInt(activeKey, 10));
  };

  const tabCount = sampleProfile.tabs.filter(
    tab =>
      data[tab.value as keyof StudyQuery] &&
      (data[tab.value as keyof StudyQuery] as []).length > 0
  );

  const linkToDashboard = async () => {
    navigatedToDashboard(filterStudy);
    await actions.changeCurrentTab(1);
  };

  const tabItem = (
    items: {
      index: number;
      label: React.JSX.Element;
      value: string;
    }[]
  ) => (
    <StyledTabs activeKey={String(currentTab)} onChange={handleTabChange}>
      {items.map((item, index) => (
        <TabPane tab={item.label} key={String(index)} />
      ))}
    </StyledTabs>
  );

  return (
    <MarginTopTenGrid item lg={6} md={6} sm={6} xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DetailContainerHeader> SAMPLE PROFILES </DetailContainerHeader>
        </Grid>
      </Grid>
      {tabCount !== undefined && tabCount.length > 0 ? (
        <>
          <Grid container spacing={1}>
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
          </Grid>
          <Grid item xs={12}>
            {tabItem(sampleProfile.tabs)}
          </Grid>
          <DetailContainerItems container>
            {sampleProfile.tabs.map((item, index) => (
              <TabPanel index={item.index} value={currentTab} key={index}>
                <BarChartWrapper>
                  <div
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      await setIsModalOpen(true);
                    }}
                  >
                    <BarChart
                      data={data[item.value as keyof StudyQuery]}
                      palette={palette}
                      tooltipContent={tooltipContent}
                      argument={argumentConfiguration(item.xAxisLabel)}
                      value={valueConfiguration}
                    />
                  </div>
                  <SampleProfileModal
                    sampleProfile={sampleProfile}
                    data={data}
                    studyCode={studyCode}
                    accessionId={accessionId}
                  />
                </BarChartWrapper>
              </TabPanel>
            ))}
          </DetailContainerItems>
        </>
      ) : (
        <Grid container spacing={1}>
          <DetailContainerItems item xs={12} sm={10}>
            <Content>This study currently has no associated Samples</Content>
          </DetailContainerItems>
        </Grid>
      )}
    </MarginTopTenGrid>
  );
};

export default SampleProfile;

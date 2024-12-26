import styled from '@emotion/styled';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Chart } from './chart';
import { MockData, mockData } from './data';
import Open from '../../assets/open.svg';
import Collapse from '../../assets/collapse.svg';
import Files from '../../assets/files.svg';
import Studies from '../../assets/studies.svg';
import Cases from '../../assets/cases.svg';
import { Dialog, DialogContent, DialogTitle, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { upperCase } from 'lodash';

export const modalWidth = '1000px';

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  lineHeight: '14px',
  fontWeight: 'bold',
  position: 'relative',
  top: '2px',
  color: '#dc762f',
  '&:hover': {
    textDecoration: 'none',
  },
});

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    maxWidth: modalWidth,
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
  },
});

export const StyledDialogContent = styled(DialogContent)({
  '&.MuiDialogContent-root': {
    padding: '32px 16px',
    overflowY: 'hidden',
  },
});

export const StyledTab = styled(Tab)({
  '&.MuiTab-root': {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '14px',
    color: '#000',
  },
});

export const StyledDialogTitle = styled(DialogTitle)({
  '&.MuiDialogTitle-root': {
    borderBottom: '1px solid #d1dbe0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const StyledTabPanel = styled(TabPanel)({
  '&.MuiTabPanel-root': {
    '& .recharts-responsive-container': {
      width: '580px',
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
    '@media (max-width: 959px)': {
      height: '100%',
    },
  },
});

export const Container = styled.div({
  width: '100%',
});

export const Wrapper = styled.div({
  // background: "yellow",
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  borderRadius: '8px',
  border: '1px solid black',
  height: '60px',
});

export const Panel = styled(Wrapper)({
  height: '100%',
});
export const LeftContainerSection = styled.div({
  borderRight: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  color: '#CB8311',
  fontSize: '23px',
  fontWeight: '700',
  fontFamily: 'Lato',
  lineHeight: '19px',
});
export const RightContainerSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
export const LeftPanelSection = styled.div({
  borderRight: '1px solid black',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  alignItems: 'center',
  '& .left-panel-title': {
    color: '#CB8311',
    fontSize: '23px',
    fontWeight: '700',
    fontFamily: 'Lato',
    lineHeight: '19px',
  },
  // gap: "16px",
});
export const RightPanelSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
export const IconAndTextWrapper = styled.div({
  display: 'flex',
  gap: '32px',
  '& .icon': {
    height: '50px',
    width: '50px',
  },
  '& .title-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  '& .title': {
    color: '#6A6A6A',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: 'Lato',
    lineHeight: '19px',
  },
  '& .subtitle': {
    color: '#383838',
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Lato',
    lineHeight: '19px',
  },
});
export const IconAndTextContainer = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr 1fr 1fr',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

export const OverviewWidget = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [value, setValue] = React.useState<string | number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      {!isPanelVisible && (
        <Wrapper
          onClick={e => {
            e.preventDefault();
            setIsPanelVisible(!isPanelVisible);
          }}
        >
          <LeftContainerSection>{'Case Count Overview'}</LeftContainerSection>

          <RightContainerSection>
            <div
              style={{
                alignSelf: 'end',
                marginRight: '16px',
              }}
            >
              <img src={Open} />
            </div>
          </RightContainerSection>
        </Wrapper>
      )}
      {isPanelVisible && (
        <Panel>
          <LeftPanelSection
            onClick={e => {
              e.preventDefault();
              setIsPanelVisible(!isPanelVisible);
            }}
          >
            <div className="left-panel-title">Case Count Overview</div>
            <IconAndTextContainer>
              <IconAndTextWrapper>
                <img className="icon" src={Files} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Files</div>
                  <div className="subtitle">926 Files</div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper>
                <img className="icon" src={Studies} />
                <div className="title-wrapper">
                  <div className="title">Studies in this Cart</div>
                  <div className="subtitle">GLIOMA01, MGT01</div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper>
                <img className="icon" src={Cases} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Cases</div>
                  <div className="subtitle">94 Cases</div>
                </div>
              </IconAndTextWrapper>
            </IconAndTextContainer>
          </LeftPanelSection>

          <RightPanelSection
            onClick={e => {
              e.preventDefault();
              // setIsPanelVisible(!isPanelVisible);
            }}
          >
            <div
              style={{
                alignSelf: 'end',
                marginRight: '16px',
              }}
              onClick={e => {
                e.preventDefault();
                setIsPanelVisible(!isPanelVisible);
              }}
            >
              <img src={Collapse} />
            </div>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  margin: '0px 16px',
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {Object.keys(mockData.charts).map((item, index) => (
                    <Tab
                      label={upperCase(item)}
                      value={index}
                      key={`${item}`}
                    />
                  ))}
                </TabList>
              </Box>
              {Object.keys(mockData.charts).map((item, index) => (
                <StyledTabPanel value={index} key={`${item}`}>
                  <Chart
                    chartData={
                      mockData.charts[item as keyof MockData['charts']]
                    }
                  />
                </StyledTabPanel>
              ))}
            </TabContext>
          </RightPanelSection>
        </Panel>
      )}
    </Container>
  );
};

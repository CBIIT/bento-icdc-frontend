import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Chart } from './chart';
import Open from '../../assets/open.svg';
import Collapse from '../../assets/collapse.svg';
import Files from '../../assets/files.svg';
import Studies from '../../assets/studies.svg';
import Cases from '../../assets/cases.svg';
import { defaultTo, startCase, toString, upperCase } from 'lodash';
import { useQuery } from '@apollo/client';
import { GetCartOverviewDataDocument } from '../../../../generated-types/graphql';
import {
  Container,
  Wrapper,
  LeftContainerSection,
  RightContainerSection,
  Panel,
  LeftPanelSection,
  IconAndTextContainer,
  IconAndTextWrapper,
  RightPanelSection,
  StyledTab,
  StyledTabs,
} from './overview-widget.styled';
import { SkeletonLoader } from '../../../../components/Skeleton';
import { CartChartData } from '../../../../generated-types/types';

const emptyStateChartData = [
  {
    label: '',
    value: 1,
  },
  {
    label: '',
    value: 1,
  },
  {
    label: '',
    value: 1,
  },
  {
    label: '',
    value: 1,
  },
  {
    label: '',
    value: 1,
  },
];

type CartChartKeys = keyof Omit<
  CartChartData,
  'schema_validation_placeholder' | '__typename'
>;

export const OverviewWidget = ({ fileIds }: { fileIds: string[] }) => {
  const { loading, error, data } = useQuery(GetCartOverviewDataDocument, {
    variables: {
      file_uuids: defaultTo(fileIds, []),
    },
    skip: !fileIds,
  });

  const cartOverviewData = useMemo(
    () => defaultTo(data?.cartOverview, {}),
    [data]
  );

  const { totalNumberOfFiles, totalNumberOfCases, studiesInCart, charts } =
    cartOverviewData;

  const isTransparent = useMemo(
    () => !!error || totalNumberOfFiles === 0,
    [error, totalNumberOfFiles]
  );

  const chartKeys = useMemo(
    () =>
      Object.keys(defaultTo(charts, {})).filter(
        item => item !== '__typename'
      ) as CartChartKeys[],
    [charts]
  );

  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTogglePanel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsPanelVisible(!isPanelVisible);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <Container>
      {!isPanelVisible && (
        <Wrapper onClick={handleTogglePanel}>
          <LeftContainerSection error={!!error}>
            Case Count Overview
          </LeftContainerSection>

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
          <LeftPanelSection onClick={handleTogglePanel}>
            <div className="left-panel-title">Case Count Overview</div>
            <IconAndTextContainer
              style={{ opacity: isTransparent ? '0.5' : '1' }}
            >
              <IconAndTextWrapper>
                <img className="icon" src={Files} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Files</div>
                  <div className="subtitle">
                    {isTransparent ? 'NA' : `${totalNumberOfFiles} Files`}{' '}
                  </div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper>
                <img className="icon" src={Studies} />
                <div className="title-wrapper">
                  <div className="title">Studies in this Cart</div>
                  <div className="subtitle">
                    {isTransparent ? 'NA' : studiesInCart.join(', ')}{' '}
                  </div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper style={{ marginBottom: 0 }}>
                <img className="icon" src={Cases} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Cases</div>
                  <div className="subtitle">
                    {isTransparent ? 'NA' : `${totalNumberOfCases} Cases`}{' '}
                  </div>
                </div>
              </IconAndTextWrapper>
            </IconAndTextContainer>
          </LeftPanelSection>

          <RightPanelSection>
            {isTransparent && (
              <div className="error-overlay">
                {error
                  ? 'Overview Data failed to be displayed'
                  : totalNumberOfFiles === 0 &&
                    'Add files to the cart to see available metrics'}
              </div>
            )}
            <div
              style={{
                alignSelf: 'end',
                marginRight: '16px',
              }}
              onClick={handleTogglePanel}
            >
              <img src={Collapse} />
            </div>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  margin: '0px 16px',
                  opacity: isTransparent ? '0.5' : '1',
                }}
              >
                <StyledTabs
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  value={value}
                >
                  {chartKeys.map(item => (
                    <StyledTab label={upperCase(item)} key={toString(item)} />
                  ))}
                </StyledTabs>
              </Box>
              <Chart
                chartData={
                  isTransparent ? emptyStateChartData : charts[chartKeys[value]]
                }
                yAxisLabel={startCase(chartKeys[value])}
                isTransparent={isTransparent}
              />
            </TabContext>
          </RightPanelSection>
        </Panel>
      )}
    </Container>
  );
};

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
import { useQuery, ApolloError } from '@apollo/client';
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
import {
  CartChartData,
  GetCartOverviewDataQuery,
  GetCartOverviewDataQueryVariables,
} from '../../../../generated-types/types';
import { GetCartOverviewDataDocument } from '../../../../generated-types/graphql';

type CartChartKeys = keyof Omit<
  CartChartData,
  'schema_validation_placeholder' | '__typename'
>;

export const OverviewWidget = ({ fileIds }: { fileIds: string[] }) => {
  const {
    loading,
    error,
    data,
  }: { loading: boolean; error?: ApolloError; data: GetCartOverviewDataQuery } =
    useQuery<GetCartOverviewDataQuery, GetCartOverviewDataQueryVariables>(
      GetCartOverviewDataDocument,
      {
        variables: {
          file_uuids: defaultTo(fileIds, []),
        },
        skip: !fileIds,
      }
    );

  const cartOverviewData = useMemo(
    () => defaultTo(data?.cartOverview, {}),
    [data]
  );

  const { totalNumberOfFiles, totalNumberOfCases, studiesInCart, charts } =
    cartOverviewData;

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
    return <SkeletonLoader variant="cartOverviewWidget" />;
  }

  return (
    <Container>
      {!isPanelVisible && (
        <Wrapper onClick={handleTogglePanel}>
          <LeftContainerSection error={!!error}>
            Cart Overview
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
          <LeftPanelSection>
            <div className="left-panel-title">Cart Overview</div>
            <IconAndTextContainer>
              <IconAndTextWrapper>
                <img className="icon" src={Files} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Files</div>
                  <div className="subtitle">
                    {`${totalNumberOfFiles} Files`}
                  </div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper>
                <img className="icon" src={Studies} />
                <div className="title-wrapper">
                  <div className="title">Studies in this Cart</div>
                  <div className="subtitle studies-subtitle">
                    {studiesInCart.join(', ')}
                  </div>
                </div>
              </IconAndTextWrapper>

              <IconAndTextWrapper style={{ marginBottom: 0 }}>
                <img className="icon" src={Cases} />
                <div className="title-wrapper">
                  <div className="title">Total Number of Cases</div>
                  <div className="subtitle">
                    {`${totalNumberOfCases} Cases`}
                  </div>
                </div>
              </IconAndTextWrapper>
            </IconAndTextContainer>
          </LeftPanelSection>

          <RightPanelSection>
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
                chartData={charts[chartKeys[value]]}
                yAxisLabel={startCase(chartKeys[value])}
              />
            </TabContext>
          </RightPanelSection>
        </Panel>
      )}
    </Container>
  );
};

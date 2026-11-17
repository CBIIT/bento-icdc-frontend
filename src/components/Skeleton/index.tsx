import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const FullHeightFlex = styled.div`
  padding: 16px 0;
  display: flex;
  height: 100vh;
  gap: 8px;
  min-width: 0;
`;

const CartOverviewWidgetContainer = styled.div({
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 90px',
  flex: 1,
  boxSizing: 'border-box',
  '& .wrapper': {
    width: '100%',
    height: '413px',
    borderRadius: '12px',
    border: '1px solid #D5D5D5',
  },
  '@media (max-width: 900px)': {
    padding: '0 24px',
  },
});

const SidebarContainer = styled.div`
  width: 200px;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentBlock = styled.div`
  flex: 1;
`;

const RoundedWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 70px;
  gap: 8px;
`;

const DefaultWrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 70px;
`;

const FullFlex = styled.div`
  flex: 1;
`;

export const SkeletonLoader = ({
  variant,
}: {
  variant?: 'withRounded' | 'withSidebar' | 'cartOverviewWidget';
}) => {
  switch (variant) {
    case 'withSidebar':
      return (
        <FullHeightFlex>
          <SidebarContainer>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </SidebarContainer>

          <MainContent>
            <ContentBlock>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </ContentBlock>
            <ContentBlock>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="100%"
              />
            </ContentBlock>
          </MainContent>
        </FullHeightFlex>
      );

    case 'cartOverviewWidget':
      return (
        <CartOverviewWidgetContainer>
          <div className="wrapper">
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              height="100%"
            />
          </div>
        </CartOverviewWidgetContainer>
      );

    case 'withRounded':
      return (
        <RoundedWrapper>
          <div>
            <Skeleton
              animation="wave"
              variant="circular"
              width={100}
              height={100}
            />
          </div>
          <FullFlex>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </FullFlex>
        </RoundedWrapper>
      );

    default:
      return (
        <DefaultWrapper>
          <FullFlex>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height="100%"
            />
          </FullFlex>
        </DefaultWrapper>
      );
  }
};

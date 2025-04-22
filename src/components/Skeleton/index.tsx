import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const FullHeightFlex = styled.div`
  padding: 16px 0;
  display: flex;
  height: 100vh;
  gap: 8px;
`;

const CartOverviewWidgetContainer = styled.div({
  minWidth: '1279px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 90px',
  flex: 1,
  '& .wrapper': {
    width: '100%',
    height: '60px',
  },
});

const SidebarContainer = styled.div`
  width: 200px;
`;

const MainContent = styled.div`
  flex: 1;
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

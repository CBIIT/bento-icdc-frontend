import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 700;
  left: 0;
  right: 0;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;

  .switchWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    margin-top: 48px;
  }
`;

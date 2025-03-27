import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  left: 0;
  right: 0;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  margin-top: 179px;
  display: flex;
  flex: 1;
  flex-direction: column;

  .switchWrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

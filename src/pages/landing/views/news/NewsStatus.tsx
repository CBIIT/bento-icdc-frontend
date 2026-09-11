import React from 'react';
import styled from '@emotion/styled';

import { NEWS_COLORS, NEWS_COPY, NEWS_FONT_FAMILIES } from './constants';

const StatusRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em 1em;
  text-align: center;
`;

const StatusText = styled.span<{ isError: boolean }>`
  color: ${props =>
    props.isError ? NEWS_COLORS.statusError : NEWS_COLORS.statusLoading};
  font-family: ${NEWS_FONT_FAMILIES.openSans};
  font-size: 15px;
  line-height: 16px;
`;

export const NewsStatus = ({ isError }: { isError: boolean }) => (
  <StatusRow>
    <StatusText isError={isError}>
      {isError ? NEWS_COPY.failedToLoad : NEWS_COPY.loading}
    </StatusText>
  </StatusRow>
);

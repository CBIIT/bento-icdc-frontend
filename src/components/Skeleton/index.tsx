import { Stack, Skeleton } from '@mui/material';
import styled from '@emotion/styled';
import React from 'react';

const StyledStack = styled(Stack)({
  padding: '32px',
});

export const SkeletonLoader = ({ variant }: { variant?: 'withRounded' }) => {
  return (
    <StyledStack spacing={1}>
      {variant === 'withRounded' && (
        <Skeleton
          animation="wave"
          variant="circular"
          width={100}
          height={100}
        />
      )}
      <Skeleton animation="wave" variant="rectangular" height={500} />
      <Skeleton animation="wave" variant="rounded" height={500} />
    </StyledStack>
  );
};

import React from 'react';
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { IconButton, type IconButtonProps } from '@mui/material';

import { NEWS_COLORS } from './constants';

const Button = styled(IconButton)`
  && {
    width: 32px;
    height: 32px;
    padding: 0;
    color: ${NEWS_COLORS.closeControl};
  }
`;

const CloseIcon = styled(Close)`
  width: 16px;
  height: 16px;
`;

export const DialogCloseButton = (props: IconButtonProps) => (
  <Button {...props}>
    <CloseIcon />
  </Button>
);

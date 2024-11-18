import React from 'react';
import styled from '@emotion/styled';
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';

export const DataAvailabilityTooltipTextWrapper = styled.div({
  display: 'grid',
  paddingTop: '0em',
});

export const DataAvailabilityTooltipTextTitle = styled.h3({
  textAlign: 'center',
});

export const DataAvailabilityTooltipTextIconAndLabelWrapper = styled.div({
  display: 'flex',
  gap: '2em',
  marginBottom: '0.5em',
});

export const DataAvailabilityTooltipTextIcon = styled.img({
  width: '3em',
});

export const Group = styled.span({
  fontSize: '16px',
  fontWeight: '600',
  color: '#000',
});

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: '#1c2023',
    border: '2px solid #a7afb3',
    fontFamily: 'Open Sans',
    padding: '12px',
  },
}));

export const AvailabilityColumnGroupingIcon = styled.img({
  width: '0.7em',
  marginBottom: '0.6em',
});

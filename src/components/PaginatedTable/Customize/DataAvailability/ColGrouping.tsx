import React from 'react';
import { IconButton } from '@mui/material';
import SpeechBubble from '../../assets/speechBubble.svg';
import { ICDC_DATA_AVAIL_ICONS } from './constants';
import {
  AvailabilityColumnGroupingIcon,
  DataAvailabilityTooltipTextIcon,
  DataAvailabilityTooltipTextIconAndLabelWrapper,
  DataAvailabilityTooltipTextTitle,
  DataAvailabilityTooltipTextWrapper,
  Group,
  Tooltip,
} from './ColGrouping.styled';

export const generateDataAvailabilityTooltipText = () => (
  <DataAvailabilityTooltipTextWrapper>
    <DataAvailabilityTooltipTextTitle>
      Data Availability:
    </DataAvailabilityTooltipTextTitle>
    {ICDC_DATA_AVAIL_ICONS.map((item, index) => (
      <DataAvailabilityTooltipTextIconAndLabelWrapper
        key={`${item.label}-${index}`}
      >
        <DataAvailabilityTooltipTextIcon
          src={item.icon}
          alt={`${item.label} icon`}
          style={{}}
        />{' '}
        {item.label}
      </DataAvailabilityTooltipTextIconAndLabelWrapper>
    ))}
  </DataAvailabilityTooltipTextWrapper>
);

const AvailabilityColumnGrouping = () => (
  <Group>
    Data Availability
    <Tooltip title={generateDataAvailabilityTooltipText()} placement="top">
      <IconButton aria-label="help">
        <AvailabilityColumnGroupingIcon src={SpeechBubble} alt="tooltip" />
      </IconButton>
    </Tooltip>
  </Group>
);

export default AvailabilityColumnGrouping;

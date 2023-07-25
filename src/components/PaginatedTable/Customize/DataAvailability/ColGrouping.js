import React from 'react';
import {
  IconButton,
  Tooltip,
  withStyles,
//   withStyles,
} from '@material-ui/core';

const ICDC_DATA_AVAIL_ICONS = [
  {
    label: 'Case Files',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
  },
  {
    label: 'Study Files',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
  },
  {
    label: 'Image Collections',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
  },
  {
    label: 'Publications',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-Publications.svg',
  },
  {
    label: 'Additional CRDC Nodes',
    icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-CRDCnodes.svg',
  },
];

export const generateDataAvailabilityTooltipText = () => (
  <div style={{ display: 'grid', paddingTop: '0em' }}>
    <h3 style={{ textAlign: 'center' }}>Data Availability:</h3>
    {
      ICDC_DATA_AVAIL_ICONS.map((item) => (
        <div style={{ display: 'flex', gap: '2em', marginBottom: '0.5em' }}>
          <img src={item.icon} alt={`${item.label} icon`} style={{ width: '3em' }} />
          {' '}
          {item.label}
        </div>
      ))
    }
  </div>
);

const AvailabilityColumnGrouping = ({
  classes,
}) => (
  <span styles={classes.group}>
    Data Availability
    <Tooltip
      title={generateDataAvailabilityTooltipText()}
      interactive
      classes={{
        tooltip: classes.dalTooltip,
        popper: classes.dalPopper,
      }}
      placement="top"
    >
      <IconButton aria-label="help">
        <img
          style={{ width: '0.7em', marginBottom: '0.6em' }}
          src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg"
          alt="tooltip"
        />
      </IconButton>
    </Tooltip>
  </span>
);

const styles = () => ({
  group: {
    marginRight: '24em',
    fontSize: '16px',
    fontWeight: '600',
    color: '#000',
  },
  icon: {
    width: '25px',
    textAlign: 'center',
  },
  dalTooltip: {
    padding: '0px 12px !important',
  },
  dalPopper: {
    left: '-278px !important',
  },
});

export default withStyles(styles)(AvailabilityColumnGrouping);

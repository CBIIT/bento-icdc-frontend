import React from 'react';
import {
  AccordionSummary,
  withStyles,
} from '@material-ui/core';
import style from './AccordionSummaryStyle';
import expandIcon from '../../../../../assets/icons/expandIcon.svg';
import collapseIcon from '../../../../../assets/icons/CollapseIcon.svg';

const Summary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 6,
    width: '100%',
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

const CustomAccordionSummary = ({
  children,
  classes,
  expand,
}) => (
  <Summary
    expandIcon={<img src={expand ? collapseIcon : expandIcon} alt="exp-icon" />}
    classes={{
      expandIcon: classes.ExpansionPaneldropDownIcon,
    }}
  >
    {children}
  </Summary>
);

export default withStyles(style)(CustomAccordionSummary);

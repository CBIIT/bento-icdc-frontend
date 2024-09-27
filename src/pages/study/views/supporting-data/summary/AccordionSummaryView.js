import React from 'react';
import {
  AccordionSummary,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import style from './AccordionSummaryStyle';
import expandIcon from '../../../../../assets/icons/expandIcon.svg';
import collapseIcon from '../../../../../assets/icons/CollapseIcon.svg';

const Summary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    width: '100%',
    borderTop: '3px solid #007EA8',
    borderBottom: '3px solid #007EA8',
    background: '#f2fcff',
  },
  content: {
    margin: '15px 0px 10px 0px',
    '&$expanded': {
      margin: '15px 0px 10px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

const CustomAccordionSummary = ({
  children,
  classes,
  expand,
}) => {
  const expandCoppllapseIcon = () => (
    <img
      className={classes.ExpPanelIcon}
      src={expand ? collapseIcon : expandIcon}
      alt="exp-icon"
    />
  );
  return (
    <Summary
      expandIcon={expandCoppllapseIcon()}
      classes={{
        expandIcon: classes.ExpansionPanelIcon,
      }}
    >
      {children}
    </Summary>
  );
};

export default withStyles(style)(CustomAccordionSummary);

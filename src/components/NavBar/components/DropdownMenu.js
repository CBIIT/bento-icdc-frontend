import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  withStyles, Paper,
} from '@material-ui/core';
import cn from '../../../utils/classNameConcat';

const CustomDropdownMenu = ({ classes, handleClick }) => (
  <>
    <Paper className={classes.paper}>
      <div className={classes.aboutItemsWrapper} id="aboutDropDown">
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/purpose"
          onClick={handleClick}
        >
          Purpose
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/steeringCommittee"
          onClick={handleClick}
        >
          Steering Committee
        </NavLink>
        <NavLink
          className={cn(classes.sublink, classes.link)}
          activeStyle={{ color: 'white' }}
          to="/DGAB"
          onClick={handleClick}
        >
          <div>- Data Governance </div>
          <div className={classes.paddingLeft10}>Advisory Board (DGAB)</div>
        </NavLink>
        <NavLink
          className={cn(classes.sublink, classes.link)}
          activeStyle={{ color: 'white' }}
          to="/BPSC"
          onClick={handleClick}
        >
          <div>- Best Practices</div>
          <div className={classes.paddingLeft10}> Sub-Committee (BPSC)</div>
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/crdc"
          onClick={handleClick}
        >
          CRDC & Analysis
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/model"
          onClick={handleClick}
        >
          ICDC Data & Model
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/developers"
          onClick={handleClick}
        >
          Developers
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/support"
          onClick={handleClick}
        >
          Support
        </NavLink>
        <NavLink
          className={classes.link}
          activeStyle={{ color: 'white' }}
          to="/submit"
          onClick={handleClick}
        >
          Submitting Data
        </NavLink>

      </div>
    </Paper>
  </>
);

const styles = (theme) => ({
  paper: {
    background: '#309EC4',
    width: '200px',
    padding: '0px 18px 18px 18px',
    marginLeft: '15px',
    position: 'absolute',
    marginTop: '-1px',
    borderRadius: '0',
  },
  sublink: {
    fontWeight: '500 !important',
  },
  paddingLeft10: {
    paddingLeft: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: theme.custom.fontFamilyRaleway,
    fontSize: '14px',
    fontWeight: '900',
    lineSpacing: '1px',
    display: 'block',
    marginTop: '10px',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },
  aboutItemsWrapper: {
    maxWidth: '180px',
  },
});

export default withStyles(styles)(CustomDropdownMenu);

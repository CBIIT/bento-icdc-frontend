import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = ({ classes, data }) => (
  <div className={classes.headerNav}>
    {data
      .reduce((acc, current, index) => {
        if (current.isALink) {
          acc.push(
            <Link
              className={
                index === 0 ? classes.parentNav : classes.headerNavLink
              }
              to={current.to}
              onClick={current.onClick}
            >
              {current.name}
            </Link>
          );
        } else {
          acc.push(<div className={classes.headerNavLink}>{current.name}</div>);
        }
        if (index < data.length - 1) {
          acc.push(<div style={{ fontSize: '15px' }}>{'>'}</div>);
        }
        return acc;
      }, [])
      .map(item => item)}
  </div>
);

const styles = _theme => ({
  headerNav: {
    paddingTop: '8px',
    color: '#5e8ca5',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  parentNav: {
    textTransform: 'none',
    textDecoration: 'none',
    color: '#3E5C6F',
    fontWeight: '900',
    fontFamily: 'Lato',
    fontSize: '15px',
    letterSpacing: '0.025em',
  },
  headerNavLink: {
    textDecoration: 'none',
    color: '#0B4E75',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: '15px',
    letterSpacing: '0.025em',
  },
});

export default withStyles(styles)(CustomBreadcrumb);

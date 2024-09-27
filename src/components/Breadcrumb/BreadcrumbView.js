import React from 'react';
import { withStyles } from "@mui/styles";
import { Link } from 'react-router-dom';

const CustomBreadcrumb = ({ classes, data }) => (
  <div className={classes.headerNav}>
    {
      data.reduce((acc, current, index) => {
        if (current.isALink) {
          acc.push(
            <Link className={classes.headerNavLink} to={current.to} onClick={current.onClick}>
              <span className={classes.headerNavClickableLink}>
                {current.name}
              </span>
            </Link>,
          );
        } else {
          acc.push(<span className={classes.headerNavLink}>{current.name}</span>);
        }
        if (index < data.length - 1) {
          acc.push(<div style={{ fontSize: '15px'}}>{'>'}</div>);
        }
        return acc;
      }, []).map((item) => (item))
    }
  </div>
);

const styles = (theme) => ({
  headerNav: {
    paddingTop: '8px',
    color: '#5e8ca5',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  headerNavLink: {
    paddingLeft: '2px',
    paddingRight: '2px',
    textDecoration: 'none',
    color: '#0B4E75',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: '15px',
    letterSpacing: '0.025em',

  },
});

export default withStyles(styles)(CustomBreadcrumb);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { multiStudyIcon } from '../../../bento/caseDetailsData';

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '295px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const MuiMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
        backgroundColor: 'none',
      },
    },
  },
}))(MenuItem);

const MultiStudyCases = ({
  classes, cases, caseID,
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const clickHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const navigateToCase = (caseId) => '/case/'.concat(caseId);

  const menuItem = (id) => (
    <MuiMenuItem className={classes.menuItem}>
      Case:
      <Link
        rel="noreferrer"
        color="inherit"
        to={(location) => ({ ...location, pathname: navigateToCase(id) })}
        className={classes.link}
        onClick={closeHandler}
      >
        <span>{id}</span>
      </Link>
    </MuiMenuItem>
  );
  const menuItems = cases.map((caseId) => (caseID !== caseId) && menuItem(caseId));

  return (
    <div>
      <Button
        aria-controls="mui-menu"
        variant="outlined"
        onClick={clickHandler}
        className={classes.studyDisplayBtn}
      >
        <div className={classes.icon}>
          <span className={classes.badge}>
            <img
              className={classes.cartIcon}
              src={multiStudyIcon.src}
              alt={multiStudyIcon.alt}
            />
            <span className={classes.cartCounter}>
              {menuItems.length - 1}
            </span>
          </span>
        </div>
        <div className={classes.dropDownText}>
          Multi-study participant also enrolled as:
        </div>
        <ArrowDropDownIcon className={classes.arrowDropDown} />
      </Button>
      <MuiMenu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeHandler}
      >
        {menuItems}
        <div className={classes.dashboarLink}>
          <Link
            rel="noreferrer"
            color="inherit"
            to={{
              pathname: `/unifiedView/${caseID}`,
            }}
            className={classes.link}
          >
            View all related cases via dashboard
          </Link>
        </div>
      </MuiMenu>
    </div>
  );
};

const styles = (theme) => ({
  studyDisplayBtn: {
    width: '295px',
    height: '40px',
    padding: '4px 14px 2px 12px',
    boxSizing: 'border-box',
    border: '2.5px solid #C2C2C2',
    backgroundColor: '#F2F3F3',
    textTransform: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dropDownText: {
    lineHeight: '1.05',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#525252',
    textAlign: 'left',
    position: 'relative',
  },
  arrowDropDown: {
    fontSize: '30px',
    color: '#DC762F',
  },
  cartIcon: {
    height: '28px',
    width: '28px',
    margin: '0px 3px 0px 2px',
  },
  cartCounter: {
    position: 'relative',
    top: '-3px',
    right: '7px',
  },
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
    bottom: '3px',
  },
  noOfStudies: {
    position: 'absolute',
    top: '2px',
    left: '28px',
    border: '1px solid #708090',
    borderRadius: '18px',
    backgroundColor: '#ffffff',
    width: '18px',
    height: '18px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#000001',
  },
  menuItem: {
    color: '#DC762F',
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: '55px',
  },
  link: {
    marginLeft: '5px',
    color: '#DC762F',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    fontWeight: '700',
    verticalAlign: 'bottom',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dashboarLink: {
    paddingLeft: '50px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
  canineIcon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginBottom: '3px',
  },
});

export default withStyles(styles, { withTheme: true })(MultiStudyCases);

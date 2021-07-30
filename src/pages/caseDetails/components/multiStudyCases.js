/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { multiStudyIcon } from '../../../bento/caseDetailsData';
import { Typography } from '../../../components/Wrappers/Wrappers';

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '289px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
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

const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    border: '1px solid #708090',
    borderRadius: '14px',
    backgroundColor: '#FFFFFF',
    padding: '0 4px',
    height: '14px',
    width: '14px',
  },
}))(Badge);

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
  classes, cases, caseID, multiStudyData,
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
        <div className={classes.flexContainer}>

          <div className={classes.icon}>
            <StyledBadge badgeContent={1}>
              <Avatar src={multiStudyIcon.src} className={classes.canineIcon} />
            </StyledBadge>
          </div>

          <div className={classes.textContainer}>
            Study participant also enrolled as
          </div>

          <div>
            <ArrowDropDownIcon className={classes.arrowDropDown} />
          </div>

        </div>

        {/* <div className={classes.flexContainer}>
          <div className={classes.icon}>
            <StyledBadge badgeContent={1}>
              <Avatar src={multiStudyIcon.src} className={classes.canineIcon} />
            </StyledBadge>
          </div>
          <div className={classes.textContainer}>
            Study participant also enrolled as
          </div>
        </div>
        <ArrowDropDownIcon className={classes.arrowDropDown} /> */}
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
              pathname: '/cases',
              state: {
                fromCaseDetails: true,
                data: multiStudyData,
              },
            }}
            className={classes.link}
          >
            View All Related Cases via Dashboard
          </Link>
        </div>
      </MuiMenu>
    </div>
  );
};

const styles = (theme) => ({
  // icon: {
  //   marginTop: '7px',
  // },
  studyDisplayBtn: {
    boxSizing: 'border-box',
    height: '39px',
    width: '281px',
    border: '2.5px solid #C2C2C2',
    backgroundColor: '#F2F3F3',
  },
  textContainer: {
    fontSize: '10px',
    marginTop: '10px',
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  canineIcon: {
    height: '29px',
    width: '29px',
  },
  // studyDisplayBtn: {
  //   textTransform: 'none',
  //   borderRadius: '0px',
  //   backgroundColor: '#f3f3f3',
  //   fontSize: '12px',
  //   border: '2px solid #d3d4d5',
  //   padding: '5px 0px 0px 5px',
  //   height: '39px',
  //   width: '290px',
  //   '&:hover': {
  //     cursor: 'pointer',
  //   },
  // },
  // studyDisplayBtnText: {
  //   fontSize: '12px',
  //   // height: '12px',
  //   textAlign: 'center',
  //   letterSpacing: '0',
  //   overflow: 'hidden',
  //   whiteSpace: 'nowrap',
  //   color: '#525252',
  //   fontFamily: 'Open Sans',
  //   fontWeight: '600',
  //   marginBottom: '7px',
  // },
  // icon: {
  //   marginRight: '20px',
  //   marginBottom: '15px',
  //   height: '33px',
  //   width: '35px',
  // },
  // noOfStudies: {
  //   position: 'absolute',
  //   top: '2px',
  //   left: '28px',
  //   border: '1px solid #708090',
  //   borderRadius: '18px',
  //   backgroundColor: '#ffffff',
  //   width: '18px',
  //   height: '18px',
  //   fontSize: '12px',
  //   fontWeight: '700',
  //   color: '#000001',
  // },
  menuItem: {
    color: '#DC762F',
    fontSize: '12px',
    fontWeight: '700',
  },
  link: {
    marginLeft: '5px',
    color: '#DC762F',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    fontWeight: '700',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dashboarLink: {
    paddingLeft: '30px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
  arrowDropDown: {
    fontSize: '35px',
    color: '#DC762F',
    marginBottom: '5px',
  },
  // canineIcon: {
  //   width: '35px',
  //   marginTop: '5px',
  // },
});

export default withStyles(styles, { withTheme: true })(MultiStudyCases);

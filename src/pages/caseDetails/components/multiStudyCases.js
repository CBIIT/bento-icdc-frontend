import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import Avatar from '@material-ui/core/Avatar';
// import Badge from '@material-ui/core/Badge';
import { multiStudyIcon } from '../../../bento/caseDetailsData';

const MuiMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    borderTop: '0',
    width: '292px',
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

// const StyledBadge = withStyles(() => ({
//   badge: {
//     right: -1,
//     top: 7,
//     border: '1px solid #708090',
//     padding: '0 4px',
//     height: '20px',
//     width: '20px',
//     borderRadius: '50%',
//     fontSize: '8px',
//     fontFamily: 'Open Sans',
//     backgroundColor: '#FFF',
//     fontWeight: '700',
//     color: '#000000',
//   },
//   root: {
//     marginTop: '1px',
//   },
// }))(Badge);

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

  /**
 * Returns a string version of the unified view data to be passed through
 * the url.
 * @return {json}
 */
  const stringfyData = () => {
    const obj = {
      caseID,
      ...cases,
    };

    return JSON.stringify(obj);
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
          {/* <StyledBadge badgeContent={menuItems.length - 1}>
            <Avatar
              src={multiStudyIcon.src}
              alt={multiStudyIcon.alt}
              className={classes.canineIcon}
            />
          </StyledBadge> */}
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
          Other studies subject is enrolled in
        </div>
        <ArrowDropDownIcon className={classes.arrowDropDown} />
        {/* <div className={classes.icon}>
          <img src={multiStudyIcon.src} alt={multiStudyIcon.alt} className={classes.canineIcon} />
          <Avatar className={classes.noOfStudies}>{menuItems.length - 1}</Avatar>
        </div>
        <Typography>
          Multi-study participant also enrolled as:
        </Typography>
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
              pathname: `/unifiedView/${stringfyData()}`,
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
    textTransform: 'none',
    textAlign: 'center',
    borderRadius: '0px',
    backgroundColor: '#f2f3f3',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    letterSpacing: '0',
    lineHeight: '0',
    border: '2.5px solid #c2c2c2',
    padding: '5px 0px 0px 5px',
    boxSizing: 'border-box',
    height: '36px',
    width: '292px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cartIcon: {
    height: '28px',
    width: '28px',
    margin: '0px 0px 0px 2px',
  },
  cartCounter: {
    position: 'relative',
    top: '5px',
    right: '3px',
  },
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
    bottom: '3px',
  },
  dropDownText: {
    position: 'relative',
    bottom: '3px',
    right: '6px',
    marginLeft: '8px',
    marginRight: '-10px',
  },
  icon: {
    marginRight: '5px',
    marginLeft: '-5px',
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
    paddingLeft: '30px',
    height: '30px',
    '&:hover': {
      backgroundColor: '#f3f3f3',
    },
  },
  arrowDropDown: {
    fontSize: '35px',
    color: '#DC762F',
    position: 'relative',
    bottom: '3px',
    width: '40px',
    marginRight: '-10px',
  },
  canineIcon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginBottom: '3px',
  },
});

export default withStyles(styles, { withTheme: true })(MultiStudyCases);

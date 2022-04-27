import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  Typography,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const twoColumnsView = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '0px',
      },
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 2,
        MozColumns: 2,
        columns: 2,
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-9px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      gutters: {
        paddingLeft: '2px',
        marginBottom: '1px',
      },
    },
  },
};

const threeColumnsView = {
  overrides: {
    MuiList: {
      root: {
        paddingBottom: '0',
        fontWeight: '500',
        listStyleType: 'disc',
        WebkitColumns: 3,
        MozColumns: 3,
        columns: 3,
      },
      padding: {
        paddingTop: '0px',
        marginTop: '-10px',
      },
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        display: 'initial',
        paddingTop: '4px',
        minWidth: '10px',
        color: '#00002dd9',
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      MuiListItemText: {
        root: {
          padding: '4px',
          marginTop: '-2px',
          marginBottom: '3px',
        },
      },
      gutters: {
        margin: 'auto',
        marginBottom: '-10px',
        paddingLeft: '0px',
      },
    },
  },
};

const theme = {
  overrides: {
    MuiList: {
      padding: {
        paddingTop: '2px',
      },
    },
    MuiListItem: {
      root: {
        paddingLeft: '0px',
        paddingTop: '2px',
        marginTop: '-10px',
        paddingBottom: '0',
        alignItems: 'inherit',
        fontWeight: '300',
      },
      gutters: {
        paddingLeft: '0',
      },
    },
    MuiListItemIcon: {
      root: {
        paddingLeft: '0',
        paddingTop: '11px',
        minWidth: '10px',
        color: '#00002dd9',
      },
    },
    MuiListItemText: {
      root: {
        padding: '4px',
        marginTop: '0px',
        marginBottom: '0px',
      },
    },
  },
};

const ListComponent = ({
  classes,
  items,
  maxNoOfItems,
  maxNoOfItemDlgBox,
  expand,
}) => {
  const customTheme = (expand && items.length > maxNoOfItemDlgBox + maxNoOfItems)
    ? { overrides: { ...theme.overrides, ...threeColumnsView.overrides } }
    : (items.length > maxNoOfItems)
      ? { overrides: { ...theme.overrides, ...twoColumnsView.overrides } } : theme;
  return (
    <MuiThemeProvider theme={createTheme(customTheme)}>
      <List>
        {items.map((item, index) => (
          <>
            {((items.length / 2 === index) && expand) ? (
              <>
                <div className={classes.longText}>
                  <span className={classes.label}>
                    {item}
                  </span>
                  <div className={classes.listIcon}>
                    <ListItemIcon>
                      <FiberManualRecord style={{ fontSize: 8, marginTop: '3px' }} />
                    </ListItemIcon>
                  </div>
                </div>
              </>
            ) : (
              <ListItem key={`${index}`}>
                <ListItemIcon>
                  <FiberManualRecord style={{ fontSize: 8 }} />
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <Typography className={classes.listItemText}>
                      {item}
                    </Typography>
                  )}
                />
              </ListItem>
            )}
          </>
        ))}
      </List>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  listItemText: {
    fontWeight: '300',
    fontSize: '14px',
  },
  longText: {
    fontSize: '13px',
    fontWeight: '300',
    marginBottom: '4px',
  },
  listIcon: {
    float: 'left',
    paddingTop: '-10px',
    height: '20px',
    marginTop: '-45px',
  },
  label: {
    paddingLeft: '15px',
    display: 'block',
    fontSize: '14px',
    fontWeight: 300,
    marginBottom: '-4px',
  },
});

export default withStyles(styles)(ListComponent);

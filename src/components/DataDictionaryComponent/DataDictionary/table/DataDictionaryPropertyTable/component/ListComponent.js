import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  Typography,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const CustomList = withStyles({
  root: {
    paddingBottom: '0',
    fontWeight: '500',
    listStyleType: 'disc',
    WebkitColumns: 2,
    MozColumns: 2,
    columns: 2,
  },
})(List);

const CustomListItem = withStyles({
  root: {
    paddingLeft: '0',
    paddingTop: '2px',
    marginTop: '-10px',
    paddingBottom: '0',
    alignItems: 'inherit',
    fontWeight: '300',
  },
})(ListItem);

const CustomListItemIcon = withStyles({
  root: {
    paddingLeft: '0',
    paddingTop: '11px',
    minWidth: '5px',
    color: '#00002dd9',
  },
})(ListItemIcon);

const ListComponent = ({ classes, items }) => {
  const View = items.length > 15 ? CustomList : List;
  return (
    <View>
      {items.map((item, index) => (
        <CustomListItem key={`${index}`}>
          <CustomListItemIcon>
            <FiberManualRecord style={{ fontSize: 8 }} />
          </CustomListItemIcon>
          <ListItemText
            primary={(
              <Typography className={classes.listItemText}>
                {item}
              </Typography>
            )}
          />
        </CustomListItem>
      ))}
    </View>
  );
};

const styles = () => ({
  listItemText: {
    fontWeight: '300',
    fontSize: '15px',
  },
});

export default withStyles(styles)(ListComponent);

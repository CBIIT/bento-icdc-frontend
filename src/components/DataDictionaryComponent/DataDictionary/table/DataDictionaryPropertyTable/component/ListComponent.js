import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const CustomListItem = withStyles({
  root: {
    paddingLeft: '0',
    paddingTop: '10px',
    alignItems: 'inherit',
  },
})(ListItem);

const CustonListItemIcon = withStyles({
  root: {
    paddingLeft: '0',
    minWidth: '5px',
  },
})(ListItemIcon);

const ListComponent = ({ items }) => (
  <List>
    {items.map((item, index) => (
      <CustomListItem key={`${index}`}>
        <CustonListItemIcon>
          <FiberManualRecord style={{ fontSize: 12, paddingLeft: '2px' }} />
        </CustonListItemIcon>
        <ListItemText>
          {item}
        </ListItemText>
      </CustomListItem>
    ))}
  </List>
);

export default ListComponent;

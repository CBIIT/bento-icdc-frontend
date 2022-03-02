import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

const ListComponent = ({ items }) => (
  <List>
    {items.map((item, index) => (
      <ListItem key={`${index}`}>
        <ListItemIcon>
          <FiberManualRecord style={{ fontSize: 8 }} />
        </ListItemIcon>
        <ListItemText>
          {item}
        </ListItemText>
      </ListItem>
    ))}
  </List>
);

export default ListComponent;

import React from 'react';
import {
  Button,
  Tooltip,
  withStyles,
} from '@material-ui/core';

const CustomHeaderRemove = ({
  openDialogBox,
  classes: {
    removeBtn,
  },
}) => (
  <div>
    <Tooltip title="Remove all items in cart" arrow>
      <Button
        classes={{ root: removeBtn }}
        onClick={openDialogBox}
      >
        Clear Cart
      </Button>
    </Tooltip>
  </div>
);

const styles = () => ({
  removeThCell: {
    top: '0px',
    color: '#A61401',
    zIndex: '100',
    position: 'relative',
    fontSize: '11pt',
    borderTop: '#024466 3px solid',
    fontStyle: 'normal',
    fontFamily: "'Lato Regular','Raleway', sans-serif",
    fontWeight: 'bold',
    paddingRight: '-15px',
    borderBottom: '#024466 3px solid',
    letterSpacing: '0.06em',
    backgroundColor: '#F5F5F5',
    width: '120px',
    textAlign: 'center',
  },
  removeBtn: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '15px',
    background: '#FFF',
    border: '1px solid #003559',
    borderRadius: '8px',
    color: '#DA6300',
    height: '38px',
    width: '95px',
    padding: '5px',
    textTransform: 'none',
  },
});

export default withStyles(styles)(CustomHeaderRemove);

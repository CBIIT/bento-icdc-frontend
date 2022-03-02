import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  // DialogContentText,
  Button,
  DialogTitle,
  // DialogActions,
} from '@material-ui/core';
import DialogBoxComponent from '../../../../../Dialog/DialogComponent';
import ListComponent from './ListComponent';

const DialogComponent = ({ display, closeHandler, items }) => {
  const [open, setOpen] = useState(display);
  useEffect(() => {
    setOpen(display);
  }, [display, open]);
  // const [maxWidth, setMaxWidth] = useState('md');

  return (
    <DialogBoxComponent
      open={open}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        Acceptable Value
        <Button onClick={closeHandler}>
          Continue
        </Button>
      </DialogTitle>
      <DialogContent>
        <ListComponent items={items} />
      </DialogContent>
    </DialogBoxComponent>
  );
};

export default DialogComponent;

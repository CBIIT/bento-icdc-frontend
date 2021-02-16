import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, Button,
} from '@material-ui/core';
import DialogThemeProvider from './dialogThemeConfig';

function AddToCartDialogView(props) {
  const {
    open,
    numberOfRowsSelected,
    onYesClick,
    onNoClick,
    classes,
  } = props;

  return (
    <DialogThemeProvider>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.popUpWindow}
      >
        <DialogContent className={classes.popUpWindowContent}>
          {numberOfRowsSelected !== undefined && (
            numberOfRowsSelected.activeTab !== 'Files' ? (
              <DialogContentText id="alert-dialog-description">
                Add all files for the
                {' '}
                {numberOfRowsSelected.count || 0}
                {' '}
                selected
                {' '}
                {numberOfRowsSelected.activeTab || 'Files'}
                {' '}
                to your files?
              </DialogContentText>
            )
              : (
                <DialogContentText id="alert-dialog-description">
                  Add all
                  {' '}
                  {numberOfRowsSelected.count || 0}
                  {' '}
                  files to your files?
                </DialogContentText>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onYesClick()} className={classes.okButton}>
            Yes
          </Button>
          <Button onClick={() => onNoClick()} className={classes.cancelButton}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </DialogThemeProvider>
  );
}

export default AddToCartDialogView;

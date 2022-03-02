import React from 'react';
import {
  Dialog,
} from '@material-ui/core';

import DialogThemeProvider from './ThemeProvider';

const DialogBoxComponent = ({ open, maxWidth, children }) => (
  <DialogThemeProvider>
    <Dialog open={open} maxWidth={maxWidth}>
      {children}
    </Dialog>
  </DialogThemeProvider>
);

export default DialogBoxComponent;

import React, { useEffect, useState } from 'react';
import {
  Grid,
  DialogContent,
  Button,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListComponent from './ListComponent';

const style = {
  backdrop: {
    timeout: 500,
    style: {
      backgroundColor: '#4a4a4a52',
    },
  },
  PaperProps: {
    style: {
      borderRadius: '5px',
      padding: '0px 20px 0px 20px',
      boxShadow: 'none',
    },
  },
};

const DialogComponent = ({
  classes,
  display,
  closeHandler,
  items,
  maxNoOfItems,
}) => {
  const [open, setOpen] = useState(display);
  const [expand, setExpand] = useState(false);
  const [values, setValues] = useState([]);
  const [boxSize, setBoxSize] = useState('sm');
  useEffect(() => {
    setOpen(display);
    setValues(items);

    if (items && items.length > maxNoOfItems) {
      console.log('set value');
      setValues(items.slice(0, maxNoOfItems));
      setExpand(false);
    }
  }, [display, open]);

  const expandView = () => {
    setBoxSize('lg');
  };

  return (
    <Dialog
      open={open}
      maxWidth={boxSize}
      BackdropComponent={Backdrop}
      BackdropProps={style.backdrop}
      PaperProps={style.PaperProps}
    >
      <Grid container>
        <Grid item xs={11}>
          <span className={classes.title}>
            Acceptable Value
          </span>
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.closeBtn} onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <DialogContent>
        <ListComponent items={values} />
        {expand && (
          <Button onClick={expandView}>
            ...show more
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

const styles = () => ({
  title: {
    paddingLeft: '20px',
    fontSize: '18px',
    marginTop: '20px',
    display: 'inherit',
    fontWeight: '600',
    color: '#0d71a3',
  },
  closeBtn: {
    marginTop: '15px',
    marginLeft: '15px',
  },
});

DialogComponent.defaultProps = {
  maxNoOfItems: 30,
};

export default withStyles(styles)(DialogComponent);

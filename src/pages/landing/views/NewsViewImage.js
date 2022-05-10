/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const NewsViewImage = ({ img, classes, label }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} classes={{ paperWidthSm: classes.paper }}>
        <div className={classes.dialogTitle}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
            <h3 className={classes.title}>{`Image: ${label}`}</h3>
          </DialogTitle>
          <IconButton
            onClick={handleClose}
            className={classes.closeIconButton}
          >
            <Close
              className={classes.closeIcon}
            />
          </IconButton>
        </div>
        <DialogContent
          dividers
          className={classes.dialogContent}
        >
          <div className={classes.imgContainer}>
            <img src={img} alt="icdc news" className={classes.img} />
          </div>
          <p className={classes.dialogParagraph}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions> */}
      </Dialog>
      <img aria-label="button" onClick={handleClickOpen} className={classes.img} src={img} alt="icdc news" />
    </>
  );
};

const styles = () => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '1.3em',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: '600',
    fontFamily: 'Raleway',
    fontSize: '1.3em',
  },
  closeIconButton: {
    color: 'black',
    height: 'fit-content',
  },
  closeIcon: {
    width: '15px',
    height: '15px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dialogParagraph: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: '1.21em',
  },
  paper: {
    maxWidth: '800px',
  },
});

export default withStyles(styles)(NewsViewImage);

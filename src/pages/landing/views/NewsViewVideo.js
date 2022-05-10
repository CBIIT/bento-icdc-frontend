import React from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  withStyles,
} from '@material-ui/core';
import ReactPlayer from 'react-player/youtube';
import { Close } from '@material-ui/icons';

const NewsViewVideo = ({ url, label, classes }) => {
  const [open, setOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  const handleClickOpen = () => {
    setPlaying(true);
    setOpen(true);
  };
  const handleClose = () => {
    setPlaying(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} classes={{ paperWidthSm: classes.paper }}>
        <div className={classes.dialogTitle}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
            <h3 className={classes.title}>{`Video: ${label}`}</h3>
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
          <div className={classes.videoContainer}>
            <ReactPlayer playing muted onStart={handleClickOpen} url={url} height="30em" width="100%" />
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
      <ReactPlayer playing={playing} muted onStart={handleClickOpen} url={url} height="100%" width="100%" />
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
  videoContainer: {
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

export default withStyles(styles)(NewsViewVideo);

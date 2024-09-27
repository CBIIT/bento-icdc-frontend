import React from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import ReactPlayer from 'react-player/youtube';
import { Close } from '@mui/icons-material';

const NewsViewVideo = ({
  url, label, classes, description,
}) => {
  const [open, setOpen] = React.useState(false);
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
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
            <ReactPlayer
              playing
              onProgress={({ playedSeconds }) => open || setSecondsElapsed(playedSeconds)}
              url={`${url}&start=${secondsElapsed}`}
              height="30em"
              width="100%"
            />
          </div>
          <p className={classes.dialogParagraph}>
            {description}
          </p>
        </DialogContent>
      </Dialog>
      <ReactPlayer playing={playing} muted onPlay={handleClickOpen} url={url} height="100%" width="100%" />
    </>
  );
};

const styles = () => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '1.3em',
    height: '4.5em',
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
    width: '1.4em',
    height: '1.4em',
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

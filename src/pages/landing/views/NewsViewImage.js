import React from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  ImageListItem,
} from '@mui/material';
import { withStyles } from "@mui/styles";
import { Close } from '@mui/icons-material';

const NewsViewImage = ({
  img, classes, label, caption,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} classes={{ paperWidthSm: classes.paper }}>
      <div className={classes.dialogTitle}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
          <h3 className={classes.title}>{`Image: ${label}`}</h3>
        </DialogTitle>
        <IconButton onClick={handleClose} className={classes.closeIconButton} size="large">
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
          {caption}
        </p>
      </DialogContent>
    </Dialog>
    <ImageListItem onClick={handleClickOpen} classes={{ root: classes.imageListItem }} key={img}>
      <img src={img} alt={label} className={classes.img} />
    </ImageListItem>
  </>);
};

const styles = () => ({
  imageListItem: {
    height: '100%',
    width: '13.6em',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '1.3em',
    height: '4.5em',
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
    width: '1.4em',
    height: '1.4em',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '58em',
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

import React from 'react';
import {
  withStyles,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const NewsItem = ({
  paragraph, index, total, classes, label,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <ListItem classes={{ root: classes.listItem }} alignItems="flex-start">
        <div className={classes.listItemContent}>
          <div className={classes.listItemCount}>
            {`${index}/${total}`}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemText
              secondary={(
                <>
                  <Typography
                      // sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    className={classes.listItemBody}
                  >
                    {paragraph}
                  </Typography>
                </>
            )}
            />

          </div>
        </div>
      </ListItem>
      <Button
        onClick={handleClickOpen}
        className={classes.btn}
      >
        READ MORE
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} classes={{ paperWidthSm: classes.paper }}>
        <div className={classes.dialogTitle}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
            <h3 className={classes.title}>{`Update: ${label}`}</h3>
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
          <p className={classes.dialogParagraph}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </DialogContent>
      </Dialog>
      <Divider />
    </div>
  );
};

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    padding: '0.5em 1em 0.5em 1em',
  },
  listItemContent: {
    display: 'flex',
    gap: '1em',
    alignItems: 'center',
  },
  listItemCount: {
    color: '#fff',
    backgroundColor: '#1977CC',
    padding: '1.2em',
    borderRadius: '100%',
    height: '4em',
    width: '4em',
    textAlign: 'center',
  },
  listItemBody: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: '1em',
    fontWeight: '300',
  },
  btn: {
    color: '#fff',
    backgroundColor: '#CB8311',
    width: '8em',
    alignSelf: 'end',
    margin: '1em',
    fontSize: '0.8em',
    fontWeight: '600',
    fontFamily: 'Raleway',
    borderRadius: '3em',
    '&:hover': {
      backgroundColor: '#CB8311',
    },
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '1.3em',
    height: '4.5em',
  },
  dialogParagraph: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: '1.21em',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  paper: {
    maxWidth: '800px',
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
});

export default withStyles(styles)(NewsItem);

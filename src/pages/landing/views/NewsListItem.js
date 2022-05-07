/* eslint-disable no-unused-vars */
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
  DialogActions,
} from '@material-ui/core';

const NewsItem = ({
  newsItem, index, total, classes,
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
      <ListItem alignItems="flex-start" className={classes.listItem}>
        <div className={classes.listItemContent}>
          <div className={classes.listItemCount}>
            {`${index}/${total}`}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListItemText
            // primary="Brunch this weekend?"
              secondary={(
                <>
                  <Typography
                      // sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    className={classes.listItemBody}
                  >
                    {newsItem.paragraph}
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

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
          <Button onClick={handleClose}>X</Button>
        </DialogTitle>
        <DialogContent
          dividers
        >
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions> */}
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
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'end',
  },
});

export default withStyles(styles)(NewsItem);

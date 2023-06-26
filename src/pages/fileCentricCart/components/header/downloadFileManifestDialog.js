import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from '@material-ui/core/Typography';
// import { blue } from '@material-ui/core/colors';
import {
  Button,
  DialogContent, DialogContentText, withStyles,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DownloadFileManifestIcon from './assets/dwnldFileManifest.svg';
// import { noop } from 'lodash';
// import PDFIcon from './assets/Download_PDF.svg';

const useStyles = makeStyles({
  dialogContainer: {
    width: '844px',
    maxWidth: '844px',
  },
  contentText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'justify',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '14px',
    color: '#000',
  },
  textArea: {
    width: '100%',
    height: '215px',
    border: '3px solid #B2C0C6',
    borderRadius: '12px',
    backgroundColor: '#ECF3F7',
    '& .MuiInputBase-input': {
      height: '172px !important',
      border: '0px !important',
    },
  },
  downloadFileManifestBtn: {
    width: 'fit-content',
    marginTop: '23px',
  },
  dialogTitle: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    color: '#7896A9',
  },
});

const CustomDialogContent = withStyles(() => ({
  root: {
    backgroundColor: '#fff',
    margin: '15px 61px 65px 61px',
    overflowY: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))((props) => (
  <DialogContent {...props} />
));

// const CartDialogContentTwo = withStyles(() => ({
//   root: {
//     backgroundColor: '#E3F4FD',
//     margin: '24px 46px 8px 46px',
//     padding: '18px 24px',
//     overflowY: 'initial',
//   },
// }))((props) => (
//   <DialogContent {...props} />
// ));
//
// const CartDialogContentThree = withStyles(() => ({
//   root: {
//     backgroundColor: '#F2F2F2',
//   },
// }))((props) => (
//   <CartDialogContentTwo {...props} />
// ));

const DownloadFileManifestDialog = React.forwardRef(({
  onClose, selectedValue, open, prepareDownload,
}, ref) => {
  const [comment, setComment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  React.useImperativeHandle(ref, () => ({
    getValue() {
      return comment;
    },
  }));
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleTextFieldChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogContainer }}>
      <DialogTitle id="simple-dialog-title" classes={{ root: classes.dialogTitle }}>
        Optional User Comments
      </DialogTitle>

      <CustomDialogContent>
        <DialogContentText classes={{ root: classes.contentText }}>
          {/* eslint-disable-next-line max-len */}
          If you wish to annotate the file manifest with comments regarding the files included, enter them here. Comments will be saved as part of the file manifest.
        </DialogContentText>
        <TextField
          multiline
          value={comment}
          onChange={handleTextFieldChange}
          variant="outlined"
          minRows={4}
          classes={{ root: classes.textArea, input: classes.input }}
        />
        <Button
          onClick={prepareDownload}
          classes={{
            root: classes.downloadFileManifestBtn,
          }}
        >
          <img
            src={DownloadFileManifestIcon}
            alt="download icon"
          />
        </Button>
      </CustomDialogContent>
    </Dialog>
  );
});

// DownloadFileManifestDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

export default DownloadFileManifestDialog;

import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { DialogTitle, Dialog,  Button,
    IconButton,
    DialogContent, DialogContentText,
    TextField,
} from '@mui/material';
import { withStyles, makeStyles } from "@mui/styles";
import { Close as CloseIcon} from '@mui/icons-material';
import DownloadFileManifestIcon from './assets/dwnldFileManifest.svg';
import { GET_MY_CART_DATA_QUERY, manifestData, myFilesPageData } from '../../../bento/fileCentricCartWorkflowData';
import { downloadJsonV2 } from '../utils';

const useStyles = makeStyles({
  dialogContainer: {
    maxWidth: '700px',
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
  dialogHeaderSection: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '46px',
  },
  closeBtn: {
    color: '#0d71a3',
  },
  dialogTitle: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 700,
    width: '100%',
    fontSize: '18px',
    color: '#7896A9',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const CustomDialogContent = withStyles(() => ({
  root: {
    backgroundColor: '#fff',
    margin: '15px 61px 30px 61px',
    overflowY: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))((props) => (
  <DialogContent {...props} />
));

const DownloadFileManifestDialog = React.forwardRef(({
  onClose, selectedValue, open, filesId,
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

  const client = useApolloClient();
  async function downloadSCSVFile() {
    const result = await client.query({
      query: GET_MY_CART_DATA_QUERY,
      variables: {
        uuids: filesId,
        first: 10000,
      },
    }).then((response) => response.data.filesInList);
    downloadJsonV2(
      result,
      comment,
      myFilesPageData.manifestFileName,
      manifestData,
    );
  }

  return (
    (<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogContainer }}>
      <div className={classes.dialogHeaderSection}>
        <DialogTitle id="simple-dialog-title" classes={{ root: classes.dialogTitle }}>
          Optional User Comments
        </DialogTitle>
        <IconButton className={classes.closBtnContainer} onClick={handleClose} size="large">
          <CloseIcon
            fontSize="small"
            className={classes.closeBtn}
          />
        </IconButton>
      </div>
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
          onClick={downloadSCSVFile}
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
    </Dialog>)
  );
});

export default DownloadFileManifestDialog;

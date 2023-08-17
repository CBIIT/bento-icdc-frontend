import React from 'react';
import PropTypes from 'prop-types';
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
  DialogContent, DialogContentText, Divider, withStyles,
} from '@material-ui/core';
import { noop } from 'lodash';
import PDFIcon from './assets/Download_PDF.svg';

const reuseTextStyle = {
  color: '#7896A9',
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
};

const useStyles = makeStyles({
  dialogContainer: {
    width: '844px',
    maxWidth: '844px',
    paddingBottom: '10px',
  },
  textStyleOne: {
    ...reuseTextStyle,
  },
  textStyleTwo: {
    ...reuseTextStyle,
    marginBottom: '12px',
  },
  dialogContentOneTitle: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '23px',
    backgroundColor: '#7896A9',
    marginBottom: '20px',
    padding: '8px',
    height: '39px',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  dialogContextText: {
    fontStyle: 'normal',
    fontFamily: 'Nunito',
    fontWeight: 300,
    fontSize: '14px',
  },
});

const CartDialogContentOne = withStyles(() => ({
  root: {
    backgroundColor: '#fff',
    margin: '22px 43px 33px 43px',
    overflowY: 'initial',
  },
}))((props) => (
  <DialogContent {...props} />
));

const CartDialogContentTwo = withStyles(() => ({
  root: {
    backgroundColor: '#E3F4FD',
    margin: '24px 46px 8px 46px',
    padding: '18px 24px',
    overflowY: 'initial',
  },
}))((props) => (
  <DialogContent {...props} />
));

const CartDialogContentThree = withStyles(() => ({
  root: {
    backgroundColor: '#F2F2F2',
  },
}))((props) => (
  <CartDialogContentTwo {...props} />
));

function ReadMoreDialog(props) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{ paper: classes.dialogContainer }}>
      <DialogTitle id="simple-dialog-title" classes={{ root: classes.textStyleOne }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Understanding the "My Files" Cart Page
          <Button onClick={noop}>
            <img src={PDFIcon} alt="pdf download icon" />
          </Button>
        </div>
      </DialogTitle>
      <CartDialogContentOne>
        <div
          className={classes.dialogContentOneTitle}
        >
          The "My Files" Cart Page
        </div>
        <DialogContentText
          classes={{ root: classes.dialogContextText }}
        >
          {/* eslint-disable-next-line max-len */}
          The Integrated Canine Data Commons (ICDC) is a repository that enables cohort building and discovery through the interactive “Explore” Dashboard. Once cases and samples of interest have been identified the files can be added to the “My Files” cart page. This page is intended to compile data files of interest and facilitate downstream analysis using publicly available or custom cloud-based bioinformatic workflows, pipelines, or applications within the Cancer Research Data Commons (CRDC).
        </DialogContentText>
        <Divider />
      </CartDialogContentOne>

      <CartDialogContentTwo>
        <div className={classes.textStyleTwo}>The Concept of a File Manifest in the CRDC</div>
        <DialogContentText classes={{ root: classes.dialogContextText }}>
          {/* eslint-disable-next-line max-len */}
          The CRDC is a cloud-based ecosystem that provides secure access to cancer research data and seamless integration with analytics tools to empower scientific discovery. The CRDC is comprised of repositories, infrastructure, and cloud resources. The repositories host case and subject-level data and cohort building tools. The infrastructure provides interoperability tools that can interrogate data across repositories and the mechanisms to support authentication, authorization, and permanent digital object identifiers for files. The cloud resources provide web-based applications and analysis tools that can be used at scale to support downstream computational research using the data discovered through the repositories and infrastructure. Data is most commonly transferred from the repositories to the cloud resources using a file manifest.  A file manifest is simply a comma separated value (CSV) file that contains certain elements of metadata unique to a particular file that is required for a downstream cloud resource, such as the Seven Bridges Cancer Genomics Cloud (SBG CGC), to access selected files directly from cloud storage. This negates the need for a user to download any files locally which ensures a safe and efficient transfer of data within the CRDC ecosystem.
        </DialogContentText>
      </CartDialogContentTwo>

      <CartDialogContentThree>
        <div className={classes.textStyleTwo}>The ICDC File Manifest</div>
        <DialogContentText classes={{ root: classes.dialogContextText }}>
          {/* eslint-disable-next-line max-len */}
          In the ICDC, a user can easily generate a file manifest using the Dashboard Explorer page. Data can be filtered by various attributes using a robust menu of facet filters. Cases, samples, and files matching selected filter criteria are displayed in a table and represented by color-coded widgets. After the desired level of filtering has been completed, cases and samples can be added to a user’s “My Files” cart page. Once files have been added to the cart clicking on the “Download File Manifest” button will generate a file manifest compatible with any of the CRDC Cloud Resources. The ICDC file manifest is ascribed a timestamp at the time of download and includes the study code, case ID, file name, file ID, and MD5sum pertaining to each file.
        </DialogContentText>
      </CartDialogContentThree>

      <CartDialogContentTwo>
        <div className={classes.textStyleTwo}>Exporting the ICDC File Manifest to SBG </div>
        <DialogContentText classes={{ root: classes.dialogContextText }}>
          {/* eslint-disable-next-line max-len */}
          After downloading the file manifest from the ICDC, there is no need to download any of the ICDC files locally, instead the manifest provides all of the instructions needed for the Cloud Resources to access these files directly from cloud storage.
        </DialogContentText>
      </CartDialogContentTwo>
    </Dialog>
  );
}

ReadMoreDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ReadMoreDialog;

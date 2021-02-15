import React, { useRef } from 'react';
import {
  withStyles,
} from '@material-ui/core';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull } from '../../fileCentricCart/store/cart';
import { fetchAllFileIDsForSelectAll, getCountForAddAllFilesModal, getFilesCount } from '../store/dashboardReducer';

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '120px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#142D64',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '24px',
  },
});

const SimpleDialogDemo = ({ classes, openSnack }) => {
  const childRef = useRef();

  const handleClickOpen = () => {
    childRef.current.open();
  };

  const handleClose = () => {
    childRef.current.close();
  };

  async function exportFiles() {
    // Find the newly added files by comparing
    const getAllFilesData = await fetchAllFileIDsForSelectAll(getFilesCount());
    openSnack(getAllFilesData.length || 0);
    addToCart({ fileIds: getAllFilesData });
    handleClose();
  }

  const numberOfRowsSelected = getCountForAddAllFilesModal();
  const numberOfFilesSelected = getFilesCount();

  const OnYesClick = () => { exportFiles(); };
  const onNoClick = () => { handleClose(); };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        Add All Files
      </button>
      <Dialog
        ref={childRef}
        onYesClick={OnYesClick}
        onNoClick={onNoClick}
        numberOfRowsSelected={numberOfRowsSelected}
        cartWillFull={cartWillFull(numberOfFilesSelected)}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(SimpleDialogDemo);

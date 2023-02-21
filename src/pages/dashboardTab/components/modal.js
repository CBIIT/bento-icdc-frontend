import React, { useRef } from 'react';
import {
  withStyles,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { ToolTip as Tooltip } from 'bento-components';
import {
  clearTableSelections, fetchAllFileIDsForSelectAll, getCountForAddAllFilesModal, getFilesCount,
} from '../store/dashboardReducer';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull, getFilesIdsInCart } from '../../fileCentricCart/store/cart';
import { selectAllToolTip } from '../../../bento/dashboardTabData';

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '220px',
    lineHeight: '37px',
    fontSize: '16px',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#142D64',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '5px',

  },
  helpIcon: {
    zIndex: '600',
    width: '17px',
  },
  helpIconButton: {
    verticalAlign: 'top',
    marginLeft: '-5px',
    marginRight: '24px',
  },
});

const SelectAllModalDialog = ({
  classes, openSnack, addAllButtonText, selectAllToolTipStatus, tabIndex,
}) => {
  const childRef = useRef();

  const handleClickOpen = () => {
    childRef.current.open();
  };

  const handleClose = () => {
    childRef.current.close();
  };

  const numberOfRowsSelected = getCountForAddAllFilesModal();
  // const numberOfFilesSelected = getFilesCount();

  async function getAllFilesData() {
    // Find the newly added files by comparing
    const allFilesData = await fetchAllFileIDsForSelectAll(getFilesCount());
    const currentFileIdsInCart = getFilesIdsInCart();
    const newFileIDSLength = (currentFileIdsInCart !== null || currentFileIdsInCart !== [])
      ? allFilesData.filter(
        (e) => !currentFileIdsInCart.find((a) => e === a),
      ).length : allFilesData.length;
    const filesData = {};
    filesData.allFilesData = allFilesData;
    filesData.newFileIDSLength = newFileIDSLength;
    return filesData;
  }

  async function exportFiles() {
    const { allFilesData, newFileIDSLength } = await getAllFilesData();
    openSnack(newFileIDSLength || 0);
    addToCart({ fileIds: allFilesData });
    // tell the reducer to clear the selection on the table.
    clearTableSelections();
    handleClose();
  }

  const OnYesClick = () => { exportFiles(); };
  const onNoClick = () => { handleClose(); };
  const isCartFull = () => {
    const { newFileIDSLength } = getAllFilesData();
    return cartWillFull(newFileIDSLength);
  };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        {addAllButtonText}
      </button>
      <Tooltip title={selectAllToolTip[tabIndex]} arrow placement="bottom">
        <IconButton aria-label="help" className={classes.helpIconButton}>
          {selectAllToolTipStatus.src ? (
            <img
              src={selectAllToolTipStatus.src}
              alt={selectAllToolTipStatus.alt}
              className={classes.helpIcon}
            />
          ) : (
            <HelpIcon
              className={classes.helpIcon}
              fontSize="small"
            />
          )}
        </IconButton>
      </Tooltip>
      <Dialog
        ref={childRef}
        onYesClick={OnYesClick}
        onNoClick={onNoClick}
        numberOfRowsSelected={numberOfRowsSelected}
        cartWillFull={isCartFull()}
      />
    </>
  );
};

export default withStyles(styles, { withTheme: true })(SelectAllModalDialog);

import React, { useRef } from 'react';
import {
  withStyles,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import {
  clearTableSelections, fetchAllFileIDsForSelectAll, getCountForAddAllFilesModal, getFilesCount,
} from '../store/dashboardReducer';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull, getFilesIdsInCart } from '../../fileCentricCart/store/cart';

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
  classes, openSnack, addAllButtonText, selectAllToolTipStatus, toggleMessageStatus,
}) => {
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
    const currentFileIdsInCart = getFilesIdsInCart();

    const newFileIDSLength = (currentFileIdsInCart !== null || currentFileIdsInCart !== [])
      ? getAllFilesData.filter(
        (e) => !currentFileIdsInCart.find((a) => e === a),
      ).length : getAllFilesData.length;
    openSnack(newFileIDSLength || 0);
    addToCart({ fileIds: getAllFilesData });
    // tell the reducer to clear the selection on the table.
    clearTableSelections();
    handleClose();
  }

  const numberOfRowsSelected = getCountForAddAllFilesModal();
  const numberOfFilesSelected = getFilesCount();

  const OnYesClick = () => { exportFiles(); };
  const onNoClick = () => { handleClose(); };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        {addAllButtonText}
      </button>
      <IconButton aria-label="help" className={classes.helpIconButton} onMouseOver={() => toggleMessageStatus('addAll', 'open')} onMouseEnter={() => toggleMessageStatus('addAll', 'open')} onMouseLeave={() => toggleMessageStatus('addAll', 'close')}>
        {selectAllToolTipStatus.src ? (
          <img
            onMouseEnter={() => toggleMessageStatus('addAll', 'open')}
            onMouseOver={() => toggleMessageStatus('addAll', 'open')}
            onFocus={() => toggleMessageStatus('addAll', 'open')}
            src={selectAllToolTipStatus.src}
            alt={selectAllToolTipStatus.alt}
            className={classes.helpIcon}
          />
        ) : (
          <HelpIcon
            className={classes.helpIcon}
            fontSize="small"
            onMouseOver={() => toggleMessageStatus('addAll', 'open')}
            onMouseEnter={() => toggleMessageStatus('addAll', 'open')}
            onFocus={() => toggleMessageStatus('addAll', 'open')}
          />
        )}
      </IconButton>
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

export default withStyles(styles, { withTheme: true })(SelectAllModalDialog);

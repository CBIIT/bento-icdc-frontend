import React, { useRef } from 'react';
import {
  withStyles,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull } from '../../fileCentricCart/store/cart';
import { fetchAllFileIDsForSelectAll, getCountForAddAllFilesModal, getFilesCount } from '../store/dashboardReducer';

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

import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListComponent from './ListComponent';
import ButtonComponent from './ButtonComponent';

const theme = {
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: '5px',
        padding: '0px 0px 0px 20px',
        boxShadow: 'none',
        overflowX: 'hidden',
        overflowY: 'hidden',
      },
      paperScrollPaper: {
        maxHeight: '510px',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '15px 25px 35px 15px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: '#4a4a4a52',
      },
    },
    MuiIconButton: {
      root: {
        textTransform: 'none',
        padding: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#0d71a3',
      },
    },
  },
};

const DialogComponent = ({
  classes,
  display,
  closeHandler,
  items,
  maxNoOfItems,
  maxNoOfItemDlgBox,
}) => {
  const [open, setOpen] = useState(display);
  const [expand, setExpand] = useState(false);
  const [values, setValues] = useState([]);
  const [boxSize, setBoxSize] = useState('sm');
  useEffect(() => {
    setOpen(display);
    setValues(items);

    if (items && items.length > maxNoOfItemDlgBox) {
      setValues(items.slice(0, maxNoOfItemDlgBox));
      setExpand(false);
    }
  }, [display, open]);

  const expandView = () => {
    if (items.length > maxNoOfItemDlgBox + maxNoOfItems) {
      setBoxSize('md');
    }
    setValues(items);
    setExpand(true);
  };

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <Dialog
        open={open}
        onClose={closeHandler}
        maxWidth={boxSize}
        BackdropProps={{
          timeout: 500,
        }}
        BackdropComponent={Backdrop}
      >
        <div className={classes.titleContent}>
          <div item xs={1} className={classes.closeBtn}>
            <IconButton
              onClick={closeHandler}
            >
              <CloseIcon
                fontSize="small"
              />
            </IconButton>
          </div>
          <div>
            <span className={classes.title}>
              Acceptable Value
            </span>
          </div>
        </div>
        <DialogContent>
          <ListComponent
            items={values}
            maxNoOfItems={maxNoOfItems}
            maxNoOfItemDlgBox={maxNoOfItemDlgBox}
            expand={expand}
          />
          <br />
          {(items.length > maxNoOfItemDlgBox && !expand) && (
            <ButtonComponent
              label="...show more"
              openHandler={expandView}
            />
          )}
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  titleContent: {
    width: '100%',
  },
  title: {
    paddingLeft: '20px',
    fontSize: '18px',
    marginTop: '20px',
    display: 'inherit',
    fontWeight: '600',
    color: '#0d71a3',
  },
  closeBtn: {
    padding: '20px',
    textAlign: 'right',
    float: 'right',
  },
});

DialogComponent.defaultProps = {
  maxNoOfItems: 30,
};

export default withStyles(styles)(DialogComponent);
